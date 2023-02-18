###### HELPER FUNCTIONS ######

def has_numbers(inputString):
    return any(char.isdigit() or char == '.' or char == ')' for char in inputString)

def find_topic(transcript: str) -> str:
    prompt = f"What is {transcript} talking about in a few words"
    return prompt

def info_on_new_topic(topic: str) -> str:
    prompt = f"Write a couple sentences summary on {topic}"
    return prompt

def generate_summary_prompt(transcript: str) -> str:
    prompt = "Create a few bullet points summary on: " + transcript
    return prompt

def generate_quiz_prompt(transcript: str) -> str:
    prompt = f"generate one multiple choice quiz question using only numbers and a period after as identifiers on ({transcript}) with one correct answer choice, and three incorrect answer choices. The question must come first, followed by a newline. And then, each choice should begin with first a number and then a following period ONLY and then end with a new line. At the end, show what the correct answer choice is and dont explain the answer. Also, make sure no answer choice has a period in it and no double identifers for the answer choices. Also, make sure that 3 of the answer choices are wrong answers."
    return prompt