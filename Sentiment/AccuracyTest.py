#### Accuracy 44% distilbert-base-uncased-finetuned-sst-2-english
# import pandas as pd
# from sklearn.model_selection import KFold
# from sklearn.metrics import accuracy_score
# from transformers import AutoTokenizer, AutoModelForSequenceClassification
# import torch
# import re
# from bs4 import BeautifulSoup
# from nltk.corpus import stopwords
# from nltk.stem import WordNetLemmatizer
# import nltk

# # Initialize NLTK tools and download resources
# nltk.download('stopwords')
# nltk.download('wordnet')

# lemmatizer = WordNetLemmatizer()
# stop_words = set(stopwords.words('english'))

# # Function for text cleaning
# def clean_text(text):
#     if not isinstance(text, str):
#         return ""  # Return an empty string if the input is not valid text
#     text = BeautifulSoup(text, "html.parser").get_text()
#     text = re.sub(r"[^a-zA-Z\s]", "", text)
#     text = text.lower()
#     words = text.split()
#     words = [lemmatizer.lemmatize(word) for word in words if word not in stop_words]
#     return " ".join(words)

# # Load dataset
# file_path = "train.csv"  # Ensure the file is in the same directory
# # Load the dataset with proper encoding
# try:
#     dataset = pd.read_csv(file_path, encoding='utf-8')
# except UnicodeDecodeError:
#     dataset = pd.read_csv(file_path, encoding='latin1')  # Try 'latin1' if 'utf-8' fails

# # Limit the dataset to 1001 rows
# dataset = dataset.head(500)

# # Prepare data for cross-validation
# texts = dataset['text']
# labels = dataset['sentiment']

# # Map sentiment labels to numeric values for evaluation
# label_mapping = {'positive': 2, 'neutral': 1, 'negative': 0}
# numeric_labels = labels.map(label_mapping)

# # Load Pre-Trained Fine-Tuned RoBERTa Large Sentiment Model
# model_name = "distilbert-base-uncased-finetuned-sst-2-english"
# tokenizer = AutoTokenizer.from_pretrained(model_name)
# model = AutoModelForSequenceClassification.from_pretrained(model_name)
# device = torch.device("cuda") if torch.cuda.is_available() else torch.device("cpu")
# model.to(device)

# # Define cross-validation
# n_folds = 3
# kf = KFold(n_splits=n_folds, shuffle=True, random_state=42)
# accuracies = []

# # Perform cross-validation
# fold_number = 1
# for train_index, test_index in kf.split(texts):
#     print(f"Computing Fold {fold_number}/{n_folds}...")

#     # Split data
#     train_texts, test_texts = texts.iloc[train_index], texts.iloc[test_index]
#     train_labels, test_labels = numeric_labels.iloc[train_index], numeric_labels.iloc[test_index]

#     # Predict sentiments for test set
#     predictions = []
#     for text in test_texts:
#         cleaned_text = clean_text(text)
#         # Tokenize and prepare inputs for RoBERTa
#         inputs = tokenizer(cleaned_text, return_tensors="pt", truncation=True, padding=True, max_length=128).to(device)
#         with torch.no_grad():
#             outputs = model(**inputs)
#         # Convert logits to labels
#         predicted_label = torch.argmax(outputs.logits, dim=-1).item()
#         predictions.append(predicted_label)

#     # Calculate accuracy
#     accuracy = accuracy_score(test_labels, predictions)
#     accuracies.append(accuracy)

#     print(f"Fold {fold_number} Accuracy: {accuracy:.4f}")
#     fold_number += 1

# # Print cross-validation results
# average_accuracy = sum(accuracies) / len(accuracies)
# print(f"Cross-Validation Accuracies: {accuracies}")
# print(f"Average Accuracy: {average_accuracy:.4f}")
########################





# ### Accuracy 40% sohan-ai/sentiment-analysis-model-amazon-reviews
# import pandas as pd
# from sklearn.model_selection import KFold
# from sklearn.metrics import accuracy_score
# from transformers import AutoTokenizer, AutoModelForSequenceClassification
# import torch
# import re
# from bs4 import BeautifulSoup
# from nltk.corpus import stopwords
# from nltk.stem import WordNetLemmatizer
# import nltk

# # Initialize NLTK tools and download resources
# nltk.download('stopwords')
# nltk.download('wordnet')

# lemmatizer = WordNetLemmatizer()
# stop_words = set(stopwords.words('english'))

# # Function for text cleaning
# def clean_text(text):
#     if not isinstance(text, str):
#         return ""  # Return an empty string if the input is not valid text
#     text = BeautifulSoup(text, "html.parser").get_text()
#     text = re.sub(r"[^a-zA-Z\s]", "", text)
#     text = text.lower()
#     words = text.split()
#     # Apply only lemmatization, do not remove stopwords
#     words = [lemmatizer.lemmatize(word) for word in words]
#     return " ".join(words)

# # Load dataset
# file_path = "train.csv"  # Ensure the file is in the same directory
# # Load the dataset with proper encoding
# try:
#     dataset = pd.read_csv(file_path, encoding='utf-8')
# except UnicodeDecodeError:
#     dataset = pd.read_csv(file_path, encoding='latin1')  # Try 'latin1' if 'utf-8' fails

# # Limit the dataset to 500 rows for faster testing
# dataset = dataset.head(500)

# # Prepare data for cross-validation
# texts = dataset['text']
# labels = dataset['sentiment']

# # Map sentiment labels to numeric values for evaluation
# label_mapping = {'positive': 2, 'neutral': 1, 'negative': 0}
# numeric_labels = labels.map(label_mapping)


# model_name = "sohan-ai/sentiment-analysis-model-amazon-reviews"

# # Use the tokenizer from the base model
# tokenizer = AutoTokenizer.from_pretrained("distilbert-base-uncased")
# model = AutoModelForSequenceClassification.from_pretrained(model_name)
# device = torch.device("cuda") if torch.cuda.is_available() else torch.device("cpu")
# model.to(device)

# # Define cross-validation
# n_folds = 3
# kf = KFold(n_splits=n_folds, shuffle=True, random_state=42)
# accuracies = []

# # Perform cross-validation
# fold_number = 1
# for train_index, test_index in kf.split(texts):
#     print(f"Computing Fold {fold_number}/{n_folds}...")

#     # Split data
#     train_texts, test_texts = texts.iloc[train_index], texts.iloc[test_index]
#     train_labels, test_labels = numeric_labels.iloc[train_index], numeric_labels.iloc[test_index]

#     # Predict sentiments for test set
#     predictions = []
#     for text in test_texts:
#         cleaned_text = clean_text(text)
#         # Tokenize and prepare inputs for RoBERTa
#         inputs = tokenizer(cleaned_text, return_tensors="pt", truncation=True, padding=True, max_length=128).to(device)
#         with torch.no_grad():
#             outputs = model(**inputs)
#         # Convert logits to labels
#         predicted_label = torch.argmax(outputs.logits, dim=-1).item()
#         predictions.append(predicted_label)

#     # Calculate accuracy
#     accuracy = accuracy_score(test_labels, predictions)
#     accuracies.append(accuracy)

#     print(f"Fold {fold_number} Accuracy: {accuracy:.4f}")
#     fold_number += 1

# # Print cross-validation results
# average_accuracy = sum(accuracies) / len(accuracies)
# print(f"Cross-Validation Accuracies: {accuracies}")
# print(f"Average Accuracy: {average_accuracy:.4f}")
#######################


### Accuracy 63% VADER
# import pandas as pd
# from nltk.sentiment.vader import SentimentIntensityAnalyzer
# import re
# from bs4 import BeautifulSoup
# from nltk.corpus import stopwords
# from nltk.stem import WordNetLemmatizer
# from sklearn.model_selection import KFold
# from sklearn.metrics import accuracy_score
# import nltk
# import json

# # Initialize NLTK tools and download resources
# nltk.download('vader_lexicon')
# nltk.download('stopwords')
# nltk.download('wordnet')

# vader_analyzer = SentimentIntensityAnalyzer()
# lemmatizer = WordNetLemmatizer()
# stop_words = set(stopwords.words('english'))

# # Function for text cleaning
# def clean_text(text):
#     if not isinstance(text, str):
#         return ""  # Return an empty string if the input is not valid text
#     text = BeautifulSoup(text, "html.parser").get_text()
#     text = re.sub(r"[^a-zA-Z\s]", "", text)
#     text = text.lower()
#     words = text.split()
#     words = [lemmatizer.lemmatize(word) for word in words if word not in stop_words]
#     return " ".join(words)


# # Function for sentiment analysis using VADER
# def vader_sentiment_analysis(text):
#     score = vader_analyzer.polarity_scores(text)['compound']
#     if score >= 0.05:
#         return "positive"
#     elif score <= -0.05:
#         return "negative"
#     else:
#         return "neutral"

# # Load dataset
# file_path = "train.csv"  # Ensure the file is in the same directory as this script
# # Load the dataset with proper encoding
# try:
#     dataset = pd.read_csv(file_path, encoding='utf-8')
# except UnicodeDecodeError:
#     dataset = pd.read_csv(file_path, encoding='latin1')  # Try 'latin1' if 'utf-8' fails
# dataset = dataset.head(2000)

# # Prepare data for cross-validation
# texts = dataset['text']
# labels = dataset['sentiment']

# # Map sentiment labels to numeric values for evaluation
# label_mapping = {'positive': 2, 'neutral': 1, 'negative': 0}
# numeric_labels = labels.map(label_mapping)
# # Define cross-validation
# n_folds = 3
# kf = KFold(n_splits=n_folds, shuffle=True, random_state=42)
# accuracies = []

# # Perform cross-validation
# fold_number = 1
# for train_index, test_index in kf.split(texts):
#     print(f"Computing Fold {fold_number}/{n_folds}...")

#     # Split data
#     train_texts, test_texts = texts.iloc[train_index], texts.iloc[test_index]
#     train_labels, test_labels = numeric_labels.iloc[train_index], numeric_labels.iloc[test_index]

#     # Predict sentiments for test set
#     predictions = []
#     for text in test_texts:
#         cleaned_text = clean_text(text)
#         predicted_sentiment = vader_sentiment_analysis(cleaned_text)
#         predictions.append(label_mapping.get(predicted_sentiment.lower(), 1))  # Default to neutral

#     # Calculate accuracy
#     accuracy = accuracy_score(test_labels, predictions)
#     accuracies.append(accuracy)

#     print(f"Fold {fold_number} Accuracy: {accuracy:.4f}")
#     fold_number += 1

# # Print cross-validation results
# average_accuracy = sum(accuracies) / len(accuracies)
# print(f"Cross-Validation Accuracies: {accuracies}")
# print(f"Average Accuracy: {average_accuracy:.4f}")
#######################


## Accuracy 73% cardiffnlp/twitter-roberta-base-sentiment
import pandas as pd
from sklearn.model_selection import KFold
from sklearn.metrics import accuracy_score
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch
import re
from bs4 import BeautifulSoup
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
import nltk

# Initialize NLTK tools and download resources
nltk.download('stopwords')
nltk.download('wordnet')

lemmatizer = WordNetLemmatizer()
stop_words = set(stopwords.words('english'))

# Function for text cleaning
def clean_text(text):
    if not isinstance(text, str):
        return ""  # Return an empty string if the input is not valid text
    text = BeautifulSoup(text, "html.parser").get_text()
    text = re.sub(r"[^a-zA-Z\s]", "", text)
    text = text.lower()
    words = text.split()
    # Apply only lemmatization, do not remove stopwords
    words = [lemmatizer.lemmatize(word) for word in words]
    return " ".join(words)

# Load dataset
file_path = "train.csv"  # Ensure the file is in the same directory
# Load the dataset with proper encoding
try:
    dataset = pd.read_csv(file_path, encoding='utf-8')
except UnicodeDecodeError:
    dataset = pd.read_csv(file_path, encoding='latin1')  # Try 'latin1' if 'utf-8' fails

# Limit the dataset to 500 rows for faster testing
dataset = dataset.head(500)

# Prepare data for cross-validation
texts = dataset['text']
labels = dataset['sentiment']

# Map sentiment labels to numeric values for evaluation
label_mapping = {'positive': 2, 'neutral': 1, 'negative': 0}
numeric_labels = labels.map(label_mapping)

# Load Pre-Trained Fine-Tuned RoBERTa Model
model_name = "cardiffnlp/twitter-roberta-base-sentiment"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForSequenceClassification.from_pretrained(model_name)
device = torch.device("cuda") if torch.cuda.is_available() else torch.device("cpu")
model.to(device)

# Define cross-validation
n_folds = 3
kf = KFold(n_splits=n_folds, shuffle=True, random_state=42)
accuracies = []

# Perform cross-validation
fold_number = 1
for train_index, test_index in kf.split(texts):
    print(f"Computing Fold {fold_number}/{n_folds}...")

    # Split data
    train_texts, test_texts = texts.iloc[train_index], texts.iloc[test_index]
    train_labels, test_labels = numeric_labels.iloc[train_index], numeric_labels.iloc[test_index]

    # Predict sentiments for test set
    predictions = []
    for text in test_texts:
        cleaned_text = clean_text(text)
        # Tokenize and prepare inputs for RoBERTa
        inputs = tokenizer(cleaned_text, return_tensors="pt", truncation=True, padding=True, max_length=128).to(device)
        with torch.no_grad():
            outputs = model(**inputs)
        # Convert logits to labels
        predicted_label = torch.argmax(outputs.logits, dim=-1).item()
        predictions.append(predicted_label)

    # Calculate accuracy
    accuracy = accuracy_score(test_labels, predictions)
    accuracies.append(accuracy)

    print(f"Fold {fold_number} Accuracy: {accuracy:.4f}")
    fold_number += 1

# Print cross-validation results
average_accuracy = sum(accuracies) / len(accuracies)
print(f"Cross-Validation Accuracies: {accuracies}")
print(f"Average Accuracy: {average_accuracy:.4f}")