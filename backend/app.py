import os
from dotenv import load_dotenv
import openai
from flask import Flask, redirect, render_template, request, url_for
# from flask_cors import CORS, cross_origin

"""
-- create poll
-- generate quiz
-- going too fast
-- give me an answer
-- summarize lecture
"""

load_dotenv()

app = Flask(__name__)
# CORS(app, support_credentials=True)
openai.api_key = os.getenv("OPENAI_API_KEY") # Set in .env

@app.route("/", methods=("GET", "POST"))
def index():
    # This allows you to get a response from chatgpts
    if request.method == "POST":
        response = openai.Completion.create(
            model = "text-davinci-003",
            prompt = "What is pigeonhole principle",
            temperature = 0.6
        )
        return response.choices[0].text
    result  = request.args.get("result")
    return result

@app.route("/generatePoll", methods=["GET", "POST"])
def get_poll():
    pass


    


if __name__ == "__main__":
    app.run(port=os.getenv("PORT"))