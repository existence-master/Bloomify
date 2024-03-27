from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

import google.generativeai as genai

app = FastAPI()

genai.configure(api_key="YOUR_API_KEY_HERE")

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

generate_convo = generate_model.start_chat(history=[
    {
        "role": "user",
        "parts": ["you are a tool designed to help teachers with setting better exam papers for students that promote understanding and comprehension of the subject matter as compared to simple rote learning. to do this, you must make use of BLOOM'S TAXONOMY LEVELS. BLOOM'S TAXONOMY LEVELS are as follows: REMEMBER - recall facts and basic concepts; UNDERSTAND - explain ideas and concepts; APPLY - use information in new situations; ANALYZE - draw connections among different ideas; EVALUATE - justify a stand or decision; CREATE - produce new or original work. your job is to accept the YEAR OF STUDY, DISCIPLINE OF STUDY, SUBJECT, SYLLABUS, PAPER PATTERN (this will include the number of questions in the paper, say N, among other things) and AVERAGE BLOOM LEVEL from the user and return a list of N questions. to compute the average bloom level use the following mechanism: each bloom level has a corresponding score: REMEMBER - 1, UNDERSTAND - 2, APPLY - 3, ANALYZE - 4, EVALUATE - 5, CREATE - 6. to determine the average bloom's score of a list of questions, find the sum of bloom scores of each question and then divide by the number of questions (N). it is IMPERATIVE that you get the correct average bloom's score in your generated list of questions. start the chat by sending \"Welcome to Bloomify. Please provide the YEAR OF STUDY, DISCIPLINE OF STUDY, SUBJECT, SYLLABUS, PAPER PATTERN and AVERAGE BLOOM LEVEL of the paper.\" and then wait for the user to respond."]
    },
    {
        "role": "model",
        "parts": ["Welcome to Bloomify. Please provide the YEAR OF STUDY, DISCIPLINE OF STUDY, SUBJECT, SYLLABUS, PAPER PATTERN and AVERAGE BLOOM LEVEL of the paper."]
    },
    {
        "role": "user",
        "parts": ["YEAR OF STUDY = Second Year, DISCIPLINE OF STUDY = Artificial Intelligence and Data Science, SUBJECT = Fundamentals of Data Science, SYLLABUS = UNIT 1 Introduction to Algorithm and Data Structures Introduction: From Problem to Program (Problem, Solution, Algorithm, Data Structure and Program). Data Structures: Data, Information, Knowledge, and Data structure, Abstract Data Types (ADT), Data Structure Classification (Linear and Non-linear, Static and Dynamic, Persistent and Ephemeral data structures). Algorithms: Problem Solving, Introduction to algorithm, Characteristics of algorithm, Algorithm design tools: Pseudo-code and flowchart. Complexity of algorithm: Space complexity, Time complexity, Asymptotic notation- Big-O, Theta and Omega, finding complexity using step count method, Analysis of programming constructs-Linear, Quadratic, Cubic, Logarithmic. Algorithmic Strategies: Introduction to algorithm design strategies- Divide and Conquer, and Greedy strategy. UNIT 2 Linear Data Structure Using Sequential Organization Concept of Sequential Organization, Overview of Array, Array as an Abstract Data Type, Operations on Array, Merging of two arrays, Storage Representation and their Address Calculation: Row major and Column Major, Multidimensional Arrays: Two-dimensional arrays, n-dimensional arrays. Concept of Ordered List, Single Variable Polynomial: Representation using arrays, Polynomial as array of structure, Polynomial addition, Polynomial multiplication. Sparse Matrix: Sparse matrix representation using array, Sparse matrix addition, Transpose of sparse matrix- Simple and Fast Transpose, Time and Space tradeoff., PAPER PATTERN = 12 questions,  6 from each unit of the syllabus, AVERAGE BLOOM LEVEL = 3"]
    },
    {
        "role": "model",
        "parts": ["Question 1 (Bloom's Level: 2)\n Explain the concept of an Abstract Data Type (ADT) and provide an example in the context of data science.\n Question 2 (Bloom's Level: 3) \n Given an array of integers, write an algorithm to merge it with another sorted array of integers. Analyze the time complexity of your algorithm using the step count method. \n Question 3 (Bloom's Level: 4) \n Compare and contrast the characteristics of linear and non-linear data structures, providing specific examples for each. \n Question 4 (Bloom's Level: 2) \n Define the concept of polynomial addition and describe how it can be implemented using an array. \n Question 5 (Bloom's Level: 5) \n Evaluate the time and space trade-offs involved in using different sparse matrix representations. Which representation is most suitable for a specific application and why? \n Question 6 (Bloom's Level: 1) \n Recall the definition of 'data structure' and provide three examples. \n Question 7 (Bloom's Level: 3) \n Demonstrate the use of the greedy strategy to design an algorithm for finding a minimum spanning tree in a weighted graph. \n Question 8 (Bloom's Level: 4) \n Analyze the asymptotic time complexity of the following algorithm: \n for i = 1 to n \n   for j = 1 to m \n    print(i * j) \n Question 9 (Bloom's Level: 2) \n Explain the difference between row-major and column-major storage representations for multidimensional arrays. \n Question 10 (Bloom's Level: 6) \n Create an original algorithm for representing a binary tree using an array, ensuring efficient memory usage and fast access to nodes. \n Question 11 (Bloom's Level: 5) \n Justify the choice of a specific data structure for storing large volumes of time-series data, considering factors such as performance, scalability, and ease of access. \n Question 12 (Bloom's Level: 4) \n Analyze the strengths and weaknesses of the Divide and Conquer strategy for algorithm design, providing examples of its applications in data science."]
    },
])


class UserInput(BaseModel):
    input_text: str

@app.post("/classify/")
async def classify_question(user_input: UserInput):
    #convo = classify_model.start_chat(history=[...])  # Initialize context for classification
    classify_convo.send_message(user_input.input_text)
    model_response = classify_convo.last.text
    return {"gemini_response_classify": model_response}

@app.post("/suggest/")
async def suggest_question(user_input: UserInput):
    #convo = suggest_model.start_chat(history=[...])  # Initialize context for suggestion
    suggest_convo.send_message(user_input.input_text)
    model_response = suggest_convo.last.text
    return {"gemini_response_suggest": model_response}

@app.post("/generate/")
async def generate_questions(user_input: UserInput):
    #convo = generate_model.start_chat(history=[...])  # Initialize context for generation
    generate_convo.send_message(user_input.input_text)
    model_response = generate_convo.last.text
    return {"gemini_response_generate": model_response}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=5000)
