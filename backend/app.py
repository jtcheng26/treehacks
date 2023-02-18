import os
from dotenv import load_dotenv
import openai
from flask import Flask, redirect, render_template, request, url_for, jsonify
from firebase_admin import credentials, firestore, initialize_app
from datetime import datetime
# from flask_cors import CORS, cross_origin
from utils import *

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


cred = credentials.Certificate("../key.json")
default_app = initialize_app(cred)
db = firestore.client()
todo_ref = db.collection('summaries')

@app.route("/", methods=("GET", "POST"))
def index():
    # This allows you to get a response from chatgpts
    if request.method == "POST":
        response = openai.Completion.create(
            model = "text-davinci-003",
            prompt = "What is pigeonhole principle",
            temperature = 0.6,
            max_tokens=200
        )
        return response.choices[0].text
    result  = request.args.get("result")
    return result

@app.route("/generatePoll", methods=["GET", "POST"])
def get_poll():
    if request.method == "POST":
        transcript = request.form["transcript"]
        response = openai.Completion.create(
            model = "text-davinci-003",
            prompt = generate_poll_prompt(transcript=transcript),
            temperature = 0.6,
            max_tokens=200
        )
        return response.choices[0].text
    result = request.args.get("result")
    return jsonify({"result": result})

@app.route("/generateQuiz", methods=["GET", "POST"])
def get_quiz():
    pass

@app.route("/answerQuestion", methods=["GET", "POST"])
def answer_question():
    if request.method == "POST":
        question = request.form["question"]
        response = openai.Completion.create(
            model = "text-davinci-003",
            prompt = question,
            temperature = 0.6,
            max_tokens=200
        )
        return response.choices[0].text
    result  = request.args.get("result")
    return result

@app.route("/post/summarize", methods=["POST"])
def append_summary():
    transcript = request.form["transcript"]
    response = openai.Completion.create(
            model = "text-davinci-003",
            prompt = generate_summary_prompt(transcript=transcript),
            temperature = 0.6,
            max_tokens=200
        )
    
    todo_ref.document(datetime.now().strftime("%Y-%m-%d:%H:%M:%S")).set({"summary" :response.choices[0].text})
    return {"result": "True"}

@app.route("/get/summarize", methods=["GET"])
def get_summary():
    summary = ""
    for doc in todo_ref.stream():
        summary += doc.to_dict()["summary"]
    return summary


if __name__ == "__main__":
    app.run(port=os.getenv("PORT"))