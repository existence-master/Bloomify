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
While generating the questions try to use various key words which perfectly describes the blooms Taxonomy Level of that question.

### Instruction:

You are an AI agent expert on the subject of Bloom's taxonomy. I will send you some syllabus topics and a desired taxonomy level. You have to generate a question within the context of the syllabus. The question must be of the given taxonomy level. Please return only the generated question and no extra information.

### Input:

Syllabus: {}

Desired Bloom's Taxonomy Level: {}

### Response:

Generated Question: """