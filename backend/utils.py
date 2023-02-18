###### HELPER FUNCTIONS ######

def generate_poll_prompt(transcript: str) -> str:
    pass

def generate_summary_prompt(transcript: str) -> str:
    prompt = "Create a few bullet points summary on: " + transcript
    return prompt

def generate_quiz_prompt(transcript: str) -> str:
    prompt = "Create 3 question quiz using: " + transcript
    return prompt