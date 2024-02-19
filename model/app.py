from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

import google.generativeai as genai

app = FastAPI()

genai.configure(api_key="API_KEY_HERE")

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
    model_name="gemini-1.0-pro",
    generation_config=generation_config,
    safety_settings=safety_settings,
)

convo = model.start_chat(history=[
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

class UserInput(BaseModel):
    input_text: str

@app.post("/classify/")
async def classify_question(user_input: UserInput):
    #convo = model.continue_chat(convo, message={"role": "user", "parts": [user_input.input_text]})
    convo.send_message(user_input.input_text)
    #model_response = convo.last.parts[0]
    model_response = convo.last.text
    return {"gemini_response": model_response}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
