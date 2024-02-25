import os
from prompts import *
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()
genai.configure(api_key = os.environ["GOOGLE_API_KEY"])

generation_config = {
    "temperature": 0.9,
    "top_p": 1,
    "top_k": 1,
    "max_output_tokens": 2048,
}

safety_settings = [
    {"category": "HARM_CATEGORY_HARASSMENT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
    {"category": "HARM_CATEGORY_HATE_SPEECH", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
    {"category": "HARM_CATEGORY_SEXUALLY_EXPLICIT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
    {"category": "HARM_CATEGORY_DANGEROUS_CONTENT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
]

model = genai.GenerativeModel(
    model_name = "gemini-1.0-pro-latest",
    generation_config = generation_config,
    safety_settings = safety_settings,
)

classify_chat = model.start_chat(history = classify_prompt)
suggest_chat = model.start_chat()

def classify(question):
    response = classify_chat.send_message(question)
    level = response.text
    return level

def suggest(syllabus, selected_level, question):
    suggest_prompt = base_suggest_prompt.format(syllabus = syllabus, 
                                                selected_level = selected_level, 
                                                question = question)
    response = suggest_chat.send_message(suggest_prompt)
    transformed_question = response.text
    return transformed_question