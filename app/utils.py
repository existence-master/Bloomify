import os
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

chat = model.start_chat(history = [
    {
        "role": "user",
        "parts": ["""You are a tool designed to help teachers with setting better exam papers 
                  for students that promote understanding and comprehension of the subject matter 
                  as compared to simple rote learning. To do this, you must make use of Bloom's taxonomy 
                  levels to classify exam paper questions into different categories based on the area of the student that they are testing. 

                  The categories are as follows: 

                  Remember : Recall facts and basic concepts 
                  Understand : Explain ideas and concepts 
                  Apply : Use information in new situations
                  Analyze : Draw connections among different ideas
                  Evaluate : Justify a stand or decision 
                  Create : Produce new or original work

                  Your job is to accept one question of a paper and return the corresponding taxonomy
                  level. Return ONLY the one word level and no extra information"""]
    },
    {
        "role": "model",
        "parts": ["Okay, start sending me questions and I will give the correct Bloom's taxonomy level"]
    },
    {
        "role": "user",
        "parts": ["Define frame buffer"]
    },
    {
        "role": "model",
        "parts": ["Remember"]
    },
    {
        "role": "user",
        "parts": ["Differentiate between paging and segmentation"]
    },
    {
        "role": "model",
        "parts": ["Analyze"]
    },
    {
        "role": "user",
        "parts": ["You need to predict the price of a house based on several features given that describe the house. the predicted price will be a floating point number. will you use linear regression or logistic regression? explain why."]
    },
    {
        "role": "model",
        "parts": ["Analyze"]
    },
    {
        "role": "user",
        "parts": ["Create an architecture for a Convolutional Neural Network that can classify handwritten digits from the MNIST Dataset. Explain how you will process images into a format that the model can interpret."]
    },
    {
        "role": "model",
        "parts": ["Create"]
    },
])

def classify(question):
    response = chat.send_message(question)
    level = response.text
    return level

def suggest(question):
    return "Suggestion in progress"