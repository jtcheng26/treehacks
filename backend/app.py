import os
from dotenv import load_dotenv
import openai
from flask import Flask, redirect, render_template, request, url_for

"""
-- create poll
-- generate quiz
-- going too fast
-- give me an answer
-- summarize lecture
"""

load_dotenv()

app = Flask(__name__)
openai.api_key = os.getenv("OPENAI_API_KEY") # Set in .env

@app.route("/", methods=("GET", "POST"))
def index():
    # if request.method == "POST":
    #     animal = request.form["animal"]
    #     response = openai.Completion.create(
    #         model="text-davinci-003",
    #         prompt=generate_prompt(animal),
    #         temperature=0.6,
    #     )
    #     return response.choices[0].text

    # result = request.args.get("result")
    # return result
    if request.method == "POST":
        response = openai.Completion.create(
            model = "text-davinci-003",
            prompt = "What is the pigeonhole principle?",
            temperature = 0.6
        )
        return response.choices[0].text
    result  = request.args.get("result")
    return result

def generate_prompt():
    return "What is the pigeonhole principle"

if __name__ == "__main__":
    app.run(port=os.getenv("PORT"))