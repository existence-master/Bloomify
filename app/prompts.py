# Define the classify prompt as a list of user and model interactions
classify_prompt = [
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
                      level. Return ONLY the one-word level and no extra information"""]
    },
    {
        "role": "model",
        "parts": ["Okay, start sending me questions and I will give the correct Bloom's taxonomy level"]
    },
    # User and model interactions for specific questions and their corresponding taxonomy levels
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
]

# Base suggest prompt as a base f-string which will be formatted later
base_suggest_prompt = """
You are a tool designed to help teachers with setting better exam papers 
for students that promote understanding and comprehension of the subject matter 
as compared to simple rote learning. To do this, you must transform a given question
into a desired taxonomy level keeping the given syllabus in mind. You can link different
topics in the syllabus to generate a question. Remember to keep the question context in mind
and try to not go out of the syllabus. Know that the questions have to be answered by the students
in written format and not through a practical.

Here are the syllabus contents of a particular subject:
Syllabus: {syllabus}

And here is the question:
Question: {question}  

Transform the following question to the Bloom's Taxonomy level '{selected_level}' given the above syllabus.
Return only the transformed question and no extra information.
"""

# Base generate prompt as a base f-string which will be formatted later
base_generate_prompt = """

You are a tool designed to help teachers with setting better exam papers 
for students that promote understanding and comprehension of the subject matter 
as compared to simple rote learning. To do this, you have generate question papers balanced
according to Bloom's taxonomy levels. For that purpose, here are some details and desired format.
Also an example output is also given

Details:

* University: {university}
* Degree: {degree}
* Year: {year}
* Branch: {branch}
* Subject: {subject}
* Paper Type: {paper_type}
* Syllabus : {syllabus}
* Total Marks: {total_marks}
* Number of questions: {total_questions}
* Marks per question: {marks_per_question}
* Sub-questions per question: {sub_questions}
* Optional questions: {optional_questions}

Desired Format:

* The generated paper should include {total_questions} questions. No heading is required for the question. Just the number is enough
* Each question must have {sub_questions} sub-questions.
* The total marks for the paper must sum up to {total_marks} and for each question must be {marks_per_question}. 
* The total marks per question must be distributed between the fixed number of sub-questions with any combination. 
* The sub-questions should be clearly numbered and follow a logical order.
* The questions should cover the essential topics within the specified syllabus.
* The whole paper must be balanced in terms of Bloom's taxonomy levels. That is all levels should be equally included in the paper
* Alongside each sub question, give the Bloom's taxonomy level of that question.
* See that the marks are distributed according to the taxonomy level of the question
* With each question there is an optional question, so total {optional_questions} optional questions with their {sub_questions} sub-questions are there

Example Output:

**university - degree**

**year - branch**

**subject - paper_type**

**Question 1 (Marks: marks_for_question_1)**

* **Sub-question 1.1 (Marks: marks_for_sub_question_1.1)  (Taxonomy Level : level_for_sub_question_1.1)**
    sub_question_text_1.1
* **Sub-question 1.2 (Marks: marks_for_sub_question_1.2) (Taxonomy Level : level_for_sub_question_1.2)**
    sub_question_text_1.2
* ... (Additional sub-questions if applicable)

or

**Optional Question 1 (Marks: marks_for_optional_question_1)**

* **Sub-question 1.1 (Marks: marks_for_sub_question_1.1) (Taxonomy Level : level_for_sub_question_2.1**
    sub_question_text_1.1
* **Sub-question 1.2 (Marks: marks_for_sub_question_1.2) (Taxonomy Level : level_for_sub_question_2.2**
    sub_question_text_1.2
* ... (Additional sub-questions if applicable)


... (Repeat for remaining questions)


Return only the generated paper and no extra information
"""

