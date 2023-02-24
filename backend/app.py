import os
import re
from dotenv import load_dotenv
import openai
from flask import Flask, redirect, render_template, request, url_for, jsonify, session
from firebase_admin import credentials, firestore, initialize_app
from datetime import datetime
from flask_cors import CORS, cross_origin
from flask_socketio import SocketIO, emit, join_room, leave_room
from flask_session import Session
from utils import *

import requests
import base64

load_dotenv()

app = Flask(__name__)
Session(app)
CORS(app, support_credentials=True)
socketio = SocketIO(app, cors_allowed_origins=['http://localhost:3000', 'https://meetzazu.vercel.app'], manage_session=False)
openai.api_key = os.getenv("OPENAI_API_KEY") # Set in .env


cred = credentials.Certificate("./key.json")
default_app = initialize_app(cred)
db = firestore.client()
summaries = db.collection('summaries')
answers = db.collection('answers')

@app.route("/", methods=["GET", "POST"])
def index():
    return "", 200

@app.route("/token", methods=["GET"])
def token():
    CONSUMER_KEY = os.environ['DOLBY_APP_KEY']
    CONSUMER_SECRET = os.environ['DOLBY_APP_SECRET']

    auth_str = f"{CONSUMER_KEY}:{CONSUMER_SECRET}"
    auth_bytes = auth_str.encode("ascii")
    auth_b64_bytes = base64.b64encode(auth_bytes)
    auth_header = f"Basic {auth_b64_bytes.decode('ascii')}"

    token_url = "https://session.voxeet.com/v1/oauth2/token"
    token_params = {
        "grant_type": "client_credentials",
    }
    token_headers = {
        "Authorization": auth_header,
    }

    response = requests.post(token_url, headers=token_headers, data=token_params)
    jwt = response.json()

    print(f"returned access_token is {jwt['access_token']}")

    # Return the access_token to the application
    return jwt["access_token"]




@app.route("/test", methods=("GET", "POST"))
def test():
    if request.method == "POST":
        response = openai.Completion.create(
            model = "text-davinci-003",
            prompt = "What is pigeonhole principle",
            temperature = 1.3,
            max_tokens=200
        )
        return response.choices[0].text
    result  = request.args.get("result")
    return result

@app.route("/chatt")
def join_classroom():
    pass

# @app.route("/chat", methods=["POST"])
# def chat():
#     session.set('name', )
    

@app.route("/generatePoll", methods=["GET", "POST"])
def get_poll():
    if request.method == "POST":
        transcript = request.form["transcript"]
        quiz = {}
        if "fast" in transcript or "slow" in transcript:
            quiz = {
                "question": "Am I going too fast?",
                "choice1": "Yes",
                "choice2": "No"
            }
        elif "understand" in transcript:
            quiz = {
                "question": "Are you all following?",
                "choice1": "Yes",
                "choice2": "No"
            }
        return jsonify(quiz)
    result = request.args.get("result")
    return result


@app.route("/generateQuiz", methods=["GET", "POST"])
def get_quiz():
    if request.method == "POST":
        while True:
            old_transcript = request.form["transcript"]
            # Make sure only ever one space is 
            transcript = re.sub(' +', ' ', old_transcript)
            if len(transcript.split(" ")) <= 75:
                response = openai.Completion.create(
                    model = "text-davinci-003",
                    prompt = find_topic(transcript=transcript),
                    temperature = 0.6,
                    max_tokens = 200
                )
                new_response = openai.Completion.create(
                    model = "text-davinci-003",
                    prompt = info_on_new_topic(topic=response.choices[0].text),
                    temperature = 0.6,
                    max_tokens = 200
                )
                transcript = new_response.choices[0].text + transcript
            response = openai.Completion.create(
                model = "text-davinci-003",
                prompt = imagine_prompt(transcript=transcript),
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
            resList = [res.strip() for res in resList if res.strip() != ""]
            ans = 1
            if resList[1][0].isalpha():
                for i in range(len(resList[-1]) - 1):
                    if resList[-1][i] == '.' and resList[-1][i + 1] == ' ':
                        ch = resList[-1][i - 1]
                        if ch == 'A':
                            ans = 1
                        elif ch == 'B':
                            ans = 2
                        elif ch == 'C':
                            ans = 3
                        else:
                            ans = 4
            else:
                for c in resList[-1]:
                    if c.isdigit() and int(c) != 0:
                        ans = int(c)
                        break
            print(resList)
            quiz["answer"] = ans
            try:
                if resList[0].count(".") == 0 and resList[0].count(":") == 0:
                    quiz["question"] = resList[0]
                elif resList[0].count(":") == 1:
                    quiz["question"] = re.split("\:", resList[0])[1].strip()
                elif (resList[0].count(".") == 1):
                    quiz["question"] = re.split("\.", resList[0])[1].strip()
                else:
                    quiz["question"] = re.split("\..*\.", resList[0][:-1])[1].strip() if resList[0][-1] == '.' else re.split("\..*\.", resList[0])[1].strip()
                # quiz["question"] = resList[0].strip()
                if (resList[1].count(".") <= 2):
                    quiz["choice1"] = re.split("\.", resList[1])[1].strip()
                else:
                    quiz["choice1"] = re.split("\..*\.", resList[1][:-1])[1].strip() if resList[1][-1] == '.' else re.split("\..*\.", resList[1])[1].strip()
                if (resList[2].count(".") <= 2):
                    quiz["choice2"] = re.split("\.", resList[2][:-1])[1].strip() if resList[2][-1] == '.' else re.split("\.", resList[2])[1].strip()
                else:
                    quiz["choice2"] = re.split("\..*\.", resList[2][:-1])[1].strip() if resList[2][-1] == '.' else re.split("\..*\.", resList[2])[1].strip()
                if (resList[3].count(".") <= 2):
                    quiz["choice3"] = re.split("\.", resList[3][:-1])[1].strip() if resList[3][-1] == '.' else re.split("\.", resList[3])[1].strip()
                else:
                    quiz["choice3"] = re.split("\..*\.", resList[3][:-1])[1].strip() if resList[3][-1] == '.' else re.split("\..*\.", resList[3])[1].strip()
                if (resList[4].count(".") <= 2):
                    quiz["choice4"] = re.split("\.", resList[4][:-1])[1].strip() if resList[4][-1] == '.' else re.split("\.", resList[4])[1].strip()
                else:
                    quiz["choice4"] = re.split("\..*\.", resList[4][:-1])[1].strip() if resList[4][-1] == '.' else re.split("\..*\.", resList[4])[1].strip()
            except:
                continue
            if quiz["choice1"] != "" and quiz["choice2"] != "" and quiz["choice3"] != "" and quiz["choice4"] != "" and len(quiz["question"].split(" ")) >= 3:
                break
        return jsonify(quiz)
    result = request.args.get("result")
    return result

@app.route("/answerQuestion", methods=["GET", "POST"])
def answer_question():
    if request.method == "POST":
        question = request.form["question"]
        ans = list(answers.stream())
        if "elaborate" in question:
            response = openai.Completion.create(
                model = "text-davinci-003",
                prompt = "Answer the question: " + question + "; while using the following as the latest interaction between you and the user:" + ans[-1].to_dict()["answer"],
                temperature = 1.3,
                max_tokens=200
            )
        else:
            response = openai.Completion.create(
                model = "text-davinci-003",
                prompt = question,
                temperature = 1.3,
                max_tokens=200
            )
        answers.document(datetime.now().strftime("%Y-%m-%d:%H:%M:%S")).set({
            "question" : question,
            "answer": response.choices[0].text
        })
        
        return response.choices[0].text
    result  = request.args.get("result")
    return jsonify({"result": result})

@app.route("/post/summarize", methods=["POST"])
def append_summary():
    transcript = request.form["transcript"]
    meeting_id = request.form["meeting_id"]
    response = openai.Completion.create(
            model = "text-davinci-003",
            prompt = generate_summary_prompt(transcript=transcript),
            temperature = 1.3,
            max_tokens=1000
        )
    
    print(response.choices[0].text)
    
    summaries.document(datetime.now().strftime("%Y-%m-%d")+f"/{meeting_id}/"+datetime.now().strftime("%Y-%m-%d:%H:%M:%s")).set({"summary" :response.choices[0].text})
    return {"result": "True"}

@app.route("/summarize", methods=["POST"])
def get_summary():
    meeting_id = request.form["meeting_id"]
    docs = db.collection('summaries/'+datetime.now().strftime("%Y-%m-%d")+f"/{meeting_id}").stream()
    summary = ""
    documen = list(docs)
    print(documen)
    for doc in documen:
        print("hello")
        print(doc.to_dict())
        summary += doc.to_dict()["summary"]
        
    return summary


# Socket Stuff
@socketio.on('joined', namespace='/chat')
def joined(message):
    # room = session.get('room')
    room = 1
    join_room(room)
    emit('status', {'msg': message['name'] + ' has entered the room.'}, room=room)


@socketio.on('text', namespace='/chat')
def text(message):
    room = 1
    emit('message', {'msg':message['name'] + ':' + message['msg']}, room=room)


@socketio.on('left', namespace='/chat')
def left(message):
    room = 1
    leave_room(room)
    emit('status', {'msg': message['name'] + ' has left the room.'}, room=room)

@socketio.on('quiz', namespace="/chat")
def quiz(data):
    # print(data)
    room = 1
    emit("json", data, room=room)

@socketio.on('poll', namespace='/chat')
def poll(data):
    # print(data)
    room = 1
    emit("poll_data", data, room=room)

@socketio.on('quiz_answer', namespace='/chat')
def correct_answer(data):
    room = 1
    emit("quiz_answer", data, room=room)

@socketio.on('poll_answer', namespace='/chat')
def correct_answer(data):
    room = 1
    emit("poll_answer", data, room=room)


if __name__ == "__main__":
    socketio.run(app, debug=os.getenv("ENV", "debug") == "debug", allow_unsafe_werkzeug=True, port=os.getenv("PORT"))
    # app.run(port=os.getenv("PORT"))
