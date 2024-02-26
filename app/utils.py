# Import necessary modules and libraries
import os
from marking_scheme import *
from fpdf import FPDF
from prompts import *
import streamlit as st
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
generate_chat = model.start_chat()

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


def generate(university, degree, branch, year, subject, paper_type, syllabus):
    # Get marking scheme from the session state based on university, degree, branch, and paper type
    marking_scheme = st.session_state[f"{university.lower()}_{degree.lower().replace(' ', '_')}_{branch.lower()}"][paper_type.lower()]
    
    # Format the generate prompt using the base_generate_prompt template
    generate_prompt = base_generate_prompt.format(university=university,
                                                  degree=degree,
                                                  year=year,
                                                  branch=branch,
                                                  subject=subject,
                                                  paper_type=paper_type,
                                                  syllabus=syllabus,
                                                  total_marks=marking_scheme["total_marks"],
                                                  total_questions=marking_scheme["total_questions"],
                                                  optional_questions=marking_scheme["optional_questions"],
                                                  marks_per_question=marking_scheme["marks_per_question"],
                                                  sub_questions=marking_scheme["sub_questions"],
                                                  )
    
    # Send the generate prompt to the model and get the response
    response = generate_chat.send_message(generate_prompt)
    generated_paper = response.text
    
    # Check if the "result" directory exists, create it if not
    if not os.path.isdir("result"):
        os.mkdir("result")
    
    # Write the generated paper to a text file
    with open("./result/generated_paper.txt", "w+") as f:
        f.write(generated_paper)

    # Create an FPDF object
    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Arial", size=10)
    
    # Open the text file in read mode
    with open("./result/generated_paper.txt", "r") as f:
        # Insert the texts into the PDF
        for x in f:
            pdf.cell(200, 10, txt=x, ln=1, align="L")
    
    # Save the PDF file
    pdf.output("./result/generated_paper.pdf") 

    return True