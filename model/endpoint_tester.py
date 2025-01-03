import requests

host = 'localhost' #0.0.0.0
port = 5000        #10000
# User input
user_input = {"input_text": "What is the definition of a frame buffer?"}

# Make a POST request to the FastAPI endpoint
response = requests.post(f"http://{host}:{port}/classify/", json=user_input)

print(response.json())
print("\n\n\n\n")

user_input = {"input_text": "QUESTION = Define Management Information System. DESIRED LEVEL = APPLY"}

# Make a POST request to the FastAPI endpoint
response = requests.post(f"http://{host}:{port}/suggest/", json=user_input)

print(response.json())
print("\n\n\n\n")

genstring = "#YEAR OF STUDY = Second Year, #DISCIPLINE OF STUDY = Artificial Intelligence and Data Science, #SUBJECT = Software Engineering, #SYLLABUS = Unit 1: Introduction to software engineering, The Nature of Software, Defining Software, Software Engineering Practice. Software Process: A Generic Process Model, defining a Framework Activity, Identifying a Task Set, Process Patterns, Process Assessment and Improvement, Prescriptive Process Models, The Waterfall Model, Incremental Process Models, Evolutionary Process Models, Concurrent Models, A Final Word on Evolutionary Processes. Unified Process, Agile software development: Agile methods, plan driven and agile development. Unit 2: Modeling: Requirements Engineering, Establishing the Groundwork, Identifying Stakeholders, Recognizing Multiple Viewpoints, working toward Collaboration, Asking the First Questions, Eliciting Requirements, Collaborative Requirements Gathering, Usage Scenarios, Elicitation Work Products, Developing Use Cases, Building the Requirements Model, Elements of the Requirements Model, Negotiating Requirements, Validating Requirements. #PAPER PATTERN = 12 questions,  6 from each unit of the syllabus, #AVERAGE BLOOM LEVEL = 3"

user_input = {"input_text": genstring}

response = requests.post(f"http://{host}:{port}/generate/", json=user_input)

# Print the response from the endpoint
print(response.json())
print("\n\n\n\n")