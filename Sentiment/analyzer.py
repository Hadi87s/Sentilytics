from transformers import AutoTokenizer, AutoModelForSequenceClassification
from wordcloud import WordCloud
import torch
import re
from bs4 import BeautifulSoup
from nltk.stem import WordNetLemmatizer
from nltk.corpus import stopwords
import nltk
import os

# Download NLTK resources
nltk.download('wordnet')
nltk.download('stopwords')

lemmatizer = WordNetLemmatizer()
stop_words = set(stopwords.words("english"))  # Load English stopwords

# Load Pre-Trained Fine-Tuned RoBERTa Model
model_name = "cardiffnlp/twitter-roberta-base-sentiment"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForSequenceClassification.from_pretrained(model_name)
device = torch.device("cuda") if torch.cuda.is_available() else torch.device("cpu")
model.to(device)

def clean_text(text):
    """
    Cleans the input text by removing non-alphabetic characters, HTML tags, and lemmatizing.
    """
    if not isinstance(text, str):
        return ""
    text = BeautifulSoup(text, "html.parser").get_text()
    text = re.sub(r"[^a-zA-Z\s]", "", text)
    text = text.lower()
    words = text.split()
    words = [lemmatizer.lemmatize(word) for word in words]
    return " ".join(words)

def roberta_sentiment_analysis(text):
    """
    Perform sentiment analysis using RoBERTa.
    """
    cleaned_text = clean_text(text)
    inputs = tokenizer(cleaned_text, return_tensors="pt", truncation=True, padding="max_length", max_length=128).to(device)
    with torch.no_grad():
        outputs = model(**inputs)
    prediction = torch.argmax(outputs.logits, dim=-1).item()
    label_mapping = {2: "Happy", 1: "Neutral", 0: "Unhappy"}
    return label_mapping.get(prediction, "Neutral")

def generate_wordcloud(text_list, output_file):
    """
    Generates a word cloud from a list of text, filters out stopwords, and saves it to an output file.
    """
    # Combine all text into a single string
    text = " ".join(text_list)
    # Remove stop words
    filtered_words = [word for word in text.split() if word.lower() not in stop_words]
    
    # Check if there are words to generate a word cloud
    if not filtered_words:
        print(f"Skipping word cloud generation for {output_file}: No words to display.")
        return
    
    # Generate the word cloud
    wordcloud = WordCloud(width=400, height=200, background_color="white").generate(" ".join(filtered_words))
    # Save the word cloud to a file
    wordcloud.to_file(output_file)


def analyze_sentiment(reviews):
    """
    Performs sentiment analysis on reviews, generates word clouds, and counts sentiment categories.
    """
    if not reviews:
        return [], {"Happy": 0, "Neutral": 0, "Unhappy": 0}

    sentiment_counts = {"Happy": 0, "Neutral": 0, "Unhappy": 0}
    processed_reviews = []

    for review in reviews:
        text = review.get("text", "").strip()
        if not text:
            continue  # Skip empty reviews

        roberta_label = roberta_sentiment_analysis(text)
        sentiment_counts[roberta_label] += 1
        processed_reviews.append({"text": text, "sentiment": roberta_label})

    # Generate word clouds only if there are valid reviews
    os.makedirs("static/images", exist_ok=True)
    positive_reviews = [r['text'] for r in processed_reviews if r['sentiment'] == 'Happy']
    negative_reviews = [r['text'] for r in processed_reviews if r['sentiment'] == 'Unhappy']

    if positive_reviews:  # Check if positive reviews exist
        generate_wordcloud(positive_reviews, "static/images/positive_wordcloud.png")
    if negative_reviews:  # Check if negative reviews exist
        generate_wordcloud(negative_reviews, "static/images/negative_wordcloud.png")

    return processed_reviews, sentiment_counts
