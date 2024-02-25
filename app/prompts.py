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
]

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