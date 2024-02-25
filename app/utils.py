# Import necessary modules and libraries
import os
from prompts import *
from dotenv import load_dotenv
import google.generativeai as genai

# Load environment variables from a .env file
load_dotenv()

# Configure the Generative AI API with the Google API key
genai.configure(api_key=os.environ["GOOGLE_API_KEY"])

# Configuration settings for text generation
generation_config = {
    "temperature": 0.9,
    "top_p": 1,
    "top_k": 1,
    "max_output_tokens": 2048,
}

# Safety settings to filter harmful content during text generation
safety_settings = [
    {"category": "HARM_CATEGORY_HARASSMENT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
    {"category": "HARM_CATEGORY_HATE_SPEECH", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
    {"category": "HARM_CATEGORY_SEXUALLY_EXPLICIT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
    {"category": "HARM_CATEGORY_DANGEROUS_CONTENT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
]

# Initialize the GenerativeModel with specified settings
model = genai.GenerativeModel(
    model_name="gemini-1.0-pro-latest",
    generation_config=generation_config,
    safety_settings=safety_settings,
)

# Start chat sessions for classification and suggestion
classify_chat = model.start_chat(history=classify_prompt)
suggest_chat = model.start_chat()

# Function to classify a question using the GenerativeModel
def classify(question):
    response = classify_chat.send_message(question)
    level = response.text
    return level

# Function to suggest a transformed question based on syllabus, selected level, and original question
def suggest(syllabus, selected_level, question):
    # Format the base suggestion prompt with provided information
    suggest_prompt = base_suggest_prompt.format(syllabus=syllabus,
                                                selected_level=selected_level,
                                                question=question)
    # Send the suggestion prompt to the GenerativeModel and get the response
    response = suggest_chat.send_message(suggest_prompt)
    transformed_question = response.text
    return transformed_question