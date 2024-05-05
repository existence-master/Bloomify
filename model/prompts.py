classification_prompt = """Below is an instruction that describes a task, paired with an input that provides further context. Write a response that appropriately completes the request.

### Instruction:

You are an AI agent expert on the subject of Bloom's taxonomy. I will send you a question and you have to return the Bloom's taxonomy level of the question. Please return only the level and no extra information.

### Input:

Question: {}

### Response:

Bloom's Taxonomy Level: """

suggestion_prompt = """Below is an instruction that describes a task, paired with an input that provides further context. Write a response that appropriately completes the request.

### Instruction:

You are an AI agent expert on the subject of Bloom's taxonomy. I will send you a question, its current taxonomy level and a desired taxonomy level. You have to transform the given question into the given desired taxonomy level. The question must remain within the original context. Please return only the transformed question and no extra information.

### Input:

Question: {}

Desired Bloom's Taxonomy Level: {}

### Response:

Transformed Question: """

generation_prompt = """Below is an instruction that describes a task, paired with an input that provides further context. Write a response that appropriately completes the request.

### Instruction:

You are a tool designed to help teachers with setting better exam papers 
for students that promote understanding and comprehension of the subject matter 
as compared to simple rote learning. To do this, you have generate question papers balanced
according to Bloom's taxonomy levels. An example output is also given

Example Output:

**university - degree**

**year - branch**

**subject - subject**

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

### Input:

For that purpose, here are some details and desired format.

Details:

* University: {university}
* Degree: {degree}
* Year: {year}
* Branch: {branch}
* Subject: {subject}
* Syllabus : {syllabus}
* Total Marks: {total_marks}
* Main Questions Per Unit: {main_questions_per_unit}
* Marks Per Main Question: {marks_per_main_question}
* Sub-questions Per Main Question: {sub_questions_per_main_question}
* Optional Questions Per Unit: {main_questions_per_unit}
* Marks Per Optional Question: {marks_per_main_question}
* Sub-questions Per Optional Question: {sub_questions_per_main_question}
* Average Blooms Score: {average_blooms_score}

Desired Format:

* In the generated paper, each unit should include {main_questions_per_unit} questions. No heading is required for the question. Just the number is enough
* Each question must have {sub_questions_per_main_question} sub-questions.
* The total marks for the paper must sum up to {total_marks} and for each question must be {marks_per_main_question}. 
* With every main question, include an optional question too. It must be of equal marks of the main question and should belong to the same syllabus. It should also have {sub_questions_per_main_question} sub questions.
* The total marks per question must be distributed between the fixed number of sub-questions with any combination. 
* The sub-questions should be clearly numbered and follow a logical order.
* The questions should cover the essential topics within the specified syllabus of that specific unit.
* The whole paper should have a Bloom's score of {average_blooms_score}. Decide the level of questions accordingly.
* Alongside each sub question, give the Bloom's taxonomy level of that question.
* See that the marks are distributed according to the taxonomy level of the question

### Response:

Generated Question Paper: """