import os
import uvicorn
from prompts import *
from fastapi import FastAPI
from typing import List
from fastapi.responses import PlainTextResponse
from dotenv import load_dotenv
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import google.generativeai as genai

load_dotenv()

app = FastAPI()

genai.configure(api_key=os.environ["GOOGLE_API_KEY"])

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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

# Model for classification endpoint
classify_model = genai.GenerativeModel(
    model_name="gemini-1.0-pro",
    generation_config=generation_config,
    safety_settings=safety_settings,
)

classify_convo = classify_model.start_chat(history=[
    {
        "role": "user",
        "parts": ["you are a tool designed to help teachers with setting better exam papers for students that promote understanding and comprehension of the subject matter as compared to simple rote learning. to do this, you must make use of BLOOM'S TAXONOMY LEVELS to classify exam paper questions into different categories based on the area of the student that they are testing. the categories are as follows: REMEMBER - recall facts and basic concepts; UNDERSTAND - explain ideas and concepts; APPLY - use information in new situations; ANALYZE - draw connections among different ideas; EVALUATE - justify a stand or decision; CREATE - produce new or original work. your job is to accept one question of a paper and RETURN THE CORRESPONDING BLOOM LEVEL. return ONLY the bloom level. to start with, send the message: \"Welcome to Bloomify! Send a question you would like me to classify\" and then wait for the user to send a question."]
    },
    {
        "role": "model",
        "parts": ["Welcome to Bloomify! Send a question you would like me to classify"]
    },
    {
        "role": "user",
        "parts": ["Define frame buffer"]
    },
    {
        "role": "model",
        "parts": ["REMEMBER"]
    },
    {
        "role": "user",
        "parts": ["Differentiate between paging and segmentation"]
    },
    {
        "role": "model",
        "parts": ["ANALYZE"]
    },
    {
        "role": "user",
        "parts": ["You need to predict the price of a house based on several features given that describe the house. the predicted price will be a floating point number. will you use linear regression or logistic regression? explain why."]
    },
    {
        "role": "model",
        "parts": ["ANALYZE"]
    },
    {
        "role": "user",
        "parts": ["create an architecture for a Convolutional Neural Network that can classify handwritten digits from the MNIST Dataset. Explain how you will process images into a format that the model can interpret."]
    },
    {
        "role": "model",
        "parts": ["CREATE"]
    },
])

# Model for suggestion endpoint
suggest_model = genai.GenerativeModel(
    model_name="gemini-1.0-pro",
    generation_config=generation_config,
    safety_settings=safety_settings,
)

suggest_convo = suggest_model.start_chat(history=[
    {
        "role": "user",
        "parts": ["you are a tool designed to help teachers with setting better exam papers for students that promote understanding and comprehension of the subject matter as compared to simple rote learning. to do this, you must make use of BLOOM'S TAXONOMY LEVELS. BLOOM'S TAXONOMY LEVELS are as follows: REMEMBER - recall facts and basic concepts; UNDERSTAND - explain ideas and concepts; APPLY - use information in new situations; ANALYZE - draw connections among different ideas; EVALUATE - justify a stand or decision; CREATE - produce new or original work. your job is to accept a question from a user along with a desired level. you will then return THE CURRENT LEVEL of the question along with the modified question that is of the desired level. the user MAY also provide additional information (this is optional for the user) for this task using the tag #additional-information = "" and pass a string containing instructions/information that you may need to transform the question. start the chat by sending \"Welcome to Bloomify. Please provide a question and the desired level you want me to transform it to\" and then wait for the user to respond."]
    },
    {
        "role": "model",
        "parts": ["Welcome to Bloomify! Please provide a question and the desired level you want me to transform it to"]
    },
    {
        "role": "user",
        "parts": ["#question=Define Paging. #desired-level=APPLY"]
    },
    {
        "role": "model",
        "parts": ["Current Level: Remember \n Modified Question: How can paging be used to improve the performance of a virtual memory system?"]
    },
])

# Model for generation endpoint
generate_model = genai.GenerativeModel(
    model_name="gemini-1.0-pro",
    generation_config=generation_config,
    safety_settings=safety_settings,
)

generate_convo = generate_model.start_chat(history=[])


# Model for suggestion endpoint
suggest_model = genai.GenerativeModel(
    model_name="gemini-1.0-pro",
    generation_config=generation_config,
    safety_settings=safety_settings,
)

suggest_convo = suggest_model.start_chat(history=[])

# Model for generation endpoint
generate_model = genai.GenerativeModel(
    model_name="gemini-1.0-pro",
    generation_config=generation_config,
    safety_settings=safety_settings,
)

generate_convo = generate_model.start_chat(history=[])

class ClassificationInput(BaseModel):
    question: str
class SuggestionInput(BaseModel):
    question: str
    desired_level: str

class MarkingScheme(BaseModel):
    marks_per_unit: int
    main_questions_per_unit: int
    sub_questions_per_main_question: int
    marks_per_main_question: int

class Syllabus(BaseModel):
    unit: int
    content: str

class GenerationInput(BaseModel):
    syllabus: List[Syllabus]
    marking_scheme: MarkingScheme
    university: str
    degree: str
    branch: str
    year: str
    subject: str
    average_blooms_score: int

@app.get("/hello")
async def helloWorld():
    return "hello world"

@app.post("/classify/", response_class=PlainTextResponse)
async def classify_question(input: ClassificationInput):
    prompt = classification_prompt.format(input.question)
    response = classify_convo.send_message(prompt)
    level = response.text
    return level

@app.post("/suggest/", response_class=PlainTextResponse)
async def suggest_question(input: SuggestionInput):
    prompt = suggestion_prompt.format(input.question, input.desired_level)
    response = suggest_convo.send_message(prompt)
    transformed_question = response.text
    return transformed_question

@app.post("/generate/", response_class=PlainTextResponse)
async def generate_questions(input: GenerationInput):
    prompt = generation_prompt.format(
        university=input.university,
        degree=input.degree,
        branch=input.branch,
        year=input.year,
        subject=input.subject,
        syllabus=input.syllabus,
        total_marks=input.marking_scheme.marks_per_unit * len(input.syllabus),
        marks_per_main_question=input.marking_scheme.marks_per_main_question,
        marks_per_unit = input.marking_scheme.marks_per_unit,
        main_questions_per_unit=input.marking_scheme.main_questions_per_unit,
        sub_questions_per_main_question=input.marking_scheme.sub_questions_per_main_question,
        average_blooms_score = input.average_blooms_score,
    )
    response = generate_convo.send_message(prompt)
    generated_question = response.text
    return generated_question

# Set host and port based on environment variables
host = os.getenv("HOST", "127.0.0.1")  # Default to 127.0.0.1 if HOST variable is not set
port = int(os.getenv("PORT", 5000))     # Default to port 5000 if PORT variable is not set

uvicorn.run(app, host=host, port=port)