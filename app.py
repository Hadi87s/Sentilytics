from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from bson import ObjectId
from fuzzywuzzy import process,fuzz
from Scraper.amazon_scraper import scrape_reviews_and_product_name
from Sentiment.analyzer import analyze_sentiment
import openai
import re

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

# MongoDB Configuration
MONGO_URI = "mongodb://localhost:27017/"
client = MongoClient(MONGO_URI)
analysis_db = client["sentiment_analysis"]

# OpenAI API Key
openai.api_key = "API KEY"

# Helper function to serialize ObjectId
def serialize_objectid(obj):
    if isinstance(obj, ObjectId):
        return str(obj)
    return obj

# Function to extract Amazon product ID
def extract_product_id(url):
    match = re.search(r"(B0[A-Z0-9]{8})", url)
    return match.group(1) if match else None

# Function to match product names with fuzzy matching
def find_closest_product_name(query):
    product_names = []
    for product_id in analysis_db.list_collection_names():
        collection = analysis_db[product_id]
        distinct_names = collection.distinct("product_name")
        product_names.extend(distinct_names)

    best_match, score = process.extractOne(query, product_names)
    if score >= 70:
        return best_match
    return None
# Embedded FAQs
faq_data = [
    {"question": "Who are the founders of this website?", "answer": "The founders of this website are: Ali Abu Nimah, Ali Odeh, Amr Qamhieh, and Muawiya Nasser supervised by Dr. Najwah Deleq."},
    {"question": "What does this website do?", "answer": "This website analyzes Amazon product reviews and provides insights into customer sentiments."},
    {"question": "How do I start using the website?", "answer": "Simply enter an Amazon product URL into the input field on the homepage and click 'Analyze.'"},
    {"question": "What happens after I click 'Analyze'?", "answer": "The website fetches reviews for the product, performs sentiment analysis, and displays the results."},
    {"question": "Can I download the analysis results?", "answer": "Yes, you can download the results in JSON or CSV format from the results page."},
    {"question": "How does the website handle my data?", "answer": "The website stores analyzed reviews securely in a database and does not share your data with third parties."},
    {"question": "What is sentiment analysis?", "answer": "Sentiment analysis determines whether customer reviews are Happy, Neutral, or Unhappy."},
    {"question": "Why do I need to enter an Amazon product URL?", "answer": "The Amazon product URL allows the website to fetch reviews for that specific product."},
    {"question": "What happens if the product has already been analyzed?", "answer": "If the product has already been analyzed, the website instantly retrieves the results from its database."},
    {"question": "Why am I seeing an error message after entering a URL?", "answer": "You might see an error if no reviews are found for the product or if the URL is invalid."},
    {"question": "Is the website free to use?", "answer": "Yes, the website is completely free for you to analyze Amazon product reviews."},
    {"question": "Can I analyze multiple products at the same time?", "answer": "Currently, the website allows you to analyze one product at a time."},
    {"question": "How do I report a bug or issue with the website?", "answer": "You can contact support using the 'Contact Us' link at the bottom of the page."},
    {"question": "Are my search and analysis results private?", "answer": "Yes, your searches and analysis results are private and securely stored."},
    {"question": "How do I get back to the homepage?", "answer": "Click on the website logo at the top of any page to return to the homepage."}
]
# Endpoint: Chatbot Interactive
@app.route('/chatbot', methods=['POST'])
def chatbot():
    data = request.get_json()
    user_message = data.get("query", "").lower()
    chat_history = data.get("history", [])
# Fuzzy matching for FAQs
    best_match = None
    highest_score = 0
    threshold = 75  # Set a threshold for fuzzy match confidence

    for faq in faq_data:
        score = fuzz.partial_ratio(user_message, faq['question'].lower())
        if score > highest_score:
            highest_score = score
            best_match = faq

    if highest_score >= threshold:
        return jsonify({
            "response": best_match['answer'],
            "history": chat_history + [{"role": "user", "content": user_message}, {"role": "assistant", "content": best_match['answer']}]
        })
    if "summarize" in user_message or "product" in user_message:
        product_name_match = re.search(r"summarize (.+)", user_message)
        query_product_name = product_name_match.group(1) if product_name_match else user_message

        closest_product_name = find_closest_product_name(query_product_name)

        if closest_product_name:
            for product_id in analysis_db.list_collection_names():
                collection = analysis_db[product_id]
                reviews = list(collection.find({"product_name": closest_product_name}, {"_id": 0, "text": 1, "sentiment": 1}))

                if reviews:
                    positive_reviews = [r['text'] for r in reviews if r['sentiment'] == "Happy"][:3]
                    negative_reviews = [r['text'] for r in reviews if r['sentiment'] == "Unhappy"][:3]
                    prompt = f"""
                    Summarize the reviews for '{closest_product_name}' into **very short and simple points**:

                    ## Summary of {closest_product_name} Reviews

                    ### Positive Points:
                    - {positive_reviews[0]}
                    - {positive_reviews[1]}
                    - {positive_reviews[2]}

                    ### Negative Points:
                    - {negative_reviews[0]}
                    - {negative_reviews[1]}
                    - {negative_reviews[2]}

                    ### Recommendations:
                    In one or two short sentences, give a simple and clear recommendation for the product.
                    """
                    messages = [{"role": "system", "content": "You summarize product reviews into clear, concise key points."}]
                    for entry in chat_history:
                        messages.append({"role": entry["role"], "content": entry["content"]})
                    messages.append({"role": "user", "content": prompt})

                    response = openai.ChatCompletion.create(
                        model="gpt-4-turbo",
                        messages=messages,
                        max_tokens=700,
                        stop=["\nRecommendation: Done"]
                    )
                    summary = response['choices'][0]['message']['content'].strip()

                    return jsonify({
                        "response": summary,
                        "history": chat_history + [{"role": "user", "content": user_message}, {"role": "assistant", "content": summary}]
                    })
        
        return jsonify({"response": "Product not found in the database. Please provide a product URL to scrape reviews."})

    try:
        messages = [{"role": "system", "content": "You are a helpful assistant that answers user queries."}]
        for entry in chat_history:
            messages.append({"role": entry["role"], "content": entry["content"]})
        messages.append({"role": "user", "content": user_message})

        response = openai.ChatCompletion.create(
            model="gpt-4-turbo",
            messages=messages,
            max_tokens=300
        )
        general_response = response['choices'][0]['message']['content'].strip()
        return jsonify({
            "response": general_response,
            "history": chat_history + [{"role": "user", "content": user_message}, {"role": "assistant", "content": general_response}]
        })
    except Exception as e:
        print(f"Error calling GPT-4 Turbo: {e}")
        return jsonify({"response": "An error occurred. Please try again."})

# Endpoint: Scrape Product Reviews
@app.route('/scrape', methods=['POST'])
def scrape():
    data = request.get_json()
    product_url = data.get('product_url')

    # Step 1: Extract Product ID
    product_id = extract_product_id(product_url)
    if not product_id:
        return jsonify({"error": "Invalid Amazon URL. Please provide a valid product link."}), 400

    # Step 2: Check if product already exists in the database
    if product_id in analysis_db.list_collection_names():
        print(f"Product '{product_id}' found in database. Fetching...")
        existing_product = analysis_db[product_id]
        product_name_doc = existing_product.find_one({}, {"product_name": 1, "_id": 0})
        product_name = product_name_doc.get("product_name", "Unknown Product")
        reviews = list(existing_product.find({}, {"_id": 0, "text": 1, "sentiment": 1}))

        return jsonify({
            "product_name": product_name,
            "reviews": reviews,
            "sentiment_counts": {
                "Happy": sum(1 for r in reviews if r["sentiment"] == "Happy"),
                "Neutral": sum(1 for r in reviews if r["sentiment"] == "Neutral"),
                "Unhappy": sum(1 for r in reviews if r["sentiment"] == "Unhappy"),
            }
        })

    # Step 3: Scrape product name and reviews
    print(f"Product '{product_id}' not found. Scraping data...")
    result = scrape_reviews_and_product_name(f"https://www.amazon.com/product-reviews/{product_id}")
    product_name = result.get("product_name", "Unknown Product")
    reviews = result.get("reviews", [])

    if not reviews:
        return jsonify({"error": "No reviews found. Please check the URL and try again."}), 404

    # Step 4: Perform sentiment analysis
    processed_reviews, sentiment_counts = analyze_sentiment(reviews)

    # Step 5: Save reviews to MongoDB
    product_collection = analysis_db[product_id]
    for review in processed_reviews:
        review["product_name"] = product_name
        product_collection.insert_one(review)

    return jsonify({
        "product_name": product_name,
        "reviews": [{"text": r["text"], "sentiment": r["sentiment"]} for r in processed_reviews],
        "sentiment_counts": sentiment_counts
    })

if __name__ == '__main__':
    app.run(debug=True)