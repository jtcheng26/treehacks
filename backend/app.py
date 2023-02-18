import os
import re
from dotenv import load_dotenv
import openai
from flask import Flask, redirect, render_template, request, url_for, jsonify
from firebase_admin import credentials, firestore, initialize_app
from datetime import datetime
from flask_cors import CORS, cross_origin
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
CORS(app, support_credentials=True)
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
    pass

@app.route("/generateQuiz", methods=["GET", "POST"])
def get_quiz():
    if request.method == "POST":
        transcript = request.form["transcript"]
        response = openai.Completion.create(
            model = "text-davinci-003",
            prompt = generate_quiz_prompt(transcript=transcript),
            temperature = 0.6,
            max_tokens=200
        )
        # process data
        quiz = {
            "question" : "",
            "choice1": "",
            "choice2": "",
            "choice3": "",
            "choice4": "",
            "answer": 0
        }
        resList = (response.choices[0].text).split("\n")
        resList = [res for res in resList if res.strip() != ""]
        ans = 1
        for c in resList[-1]:
            if c.isdigit():
                ans = int(c)
                break
        if ans > 4:
            ans %= 4
            ans += 1
        quiz["answer"] = ans
        if resList[0].count(".") == 0 and resList[0].count(":") == 0:
            quiz["question"] = resList[0]
        elif resList[0].count(":") == 1:
            quiz["question"] = re.split("\:", resList[0])[1].strip()
        elif (resList[0].count(".") == 1):
            quiz["question"] = re.split("\.", resList[0])[1].strip()
        else:
            quiz["question"] = re.split("\..*\.", resList[0][:-1])[1].strip() if resList[0][-1] == '.' else re.split("\..*\.", resList[0])[1].strip()
        if (resList[1].count(".") <= 2):
            quiz["choice1"] = re.split("\.", resList[1])[1].strip()
        else:
            quiz["choice1"] = re.split("\..*\.", resList[1][:-1])[1].strip() if resList[1][-1] == '.' else re.split("\..*\.", resList[1])[1].strip()
        if (resList[2].count(".") <= 2):
            quiz["choice2"] = re.split("\.", resList[2])[1].strip()
        else:
            quiz["choice2"] = re.split("\..*\.", resList[2][:-1])[1].strip() if resList[2][-1] == '.' else re.split("\..*\.", resList[2])[1].strip()
        if (resList[3].count(".") <= 2):
            quiz["choice3"] = re.split("\.", resList[3])[1].strip()
        else:
            quiz["choice3"] = re.split("\..*\.", resList[3][:-1])[1].strip() if resList[3][-1] == '.' else re.split("\..*\.", resList[3])[1].strip()
        if (resList[4].count(".") <= 2):
            quiz["choice4"] = re.split("\.", resList[4])[1].strip()
        else:
            quiz["choice4"] = re.split("\..*\.", resList[4][:-1])[1].strip() if resList[4][-1] == '.' else re.split("\..*\.", resList[4])[1].strip()
        return jsonify(quiz)
    result = request.args.get("result")
    return result

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
    return jsonify({"result": result})

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