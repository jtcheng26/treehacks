import React, { useEffect, useState } from "react";
import generateQuiz from "../../../api/generateQuiz";
import generateSummary from "../../../api/generateSummary";
import ZazuHeader from "../../panels/ZazuHeader";
import Loader from "../../spinners";
import { PRIMARY_COLOR } from "../../../constants/colors";
import QuizPanel from "../../panels/QuizPanel";

export default function Notes({
  transcript = "The Holocaust was a genocide that occurred during World War II in which Nazi Germany, led by Adolf Hitler, systematically murdered around six million Jews, along with other targeted groups such as Romani people, people with disabilities, homosexuals, political dissidents, and others. The Nazi regime employed a range of brutal tactics including forced labor, starvation, mass shootings, and extermination in gas chambers at concentration and extermination camps. The Holocaust has had a profound impact on the world, leading to the recognition of human rights as a universal principle and the establishment of Israel as a Jewish homeland. It serves as a stark reminder of the dangers of hate, prejudice, and unchecked power, and stands as a call to action to work towards a more just and equitable world.",
  resetPage = () => {},
}) {
  const [notes, setNotes] = useState("");
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    (async () => {
      setLoading(true);
      const s = await generateSummary(transcript, 1);
      setNotes(s);
      const reqs = [];
      const len = s.length;
      //   for (let i = 0; i < Math.min(2 * 500, len); i += 500) {
      const st = s.substring(0, Math.min(len, 0 + 500));
      reqs.push(generateQuiz(st));
      //   }
      reqs.push(generateQuiz(s.substring(-500)));
      setQuestions(await Promise.all(reqs));
      setLoading(false);
    })();
  }, [transcript]);
  return (
    <div className="bg-slate-900 min-h-screen font-sans text-white p-10">
      <div className="flex flex-row space-between items-center w-full">
        <div className="mx-4 text-white text-xl font-bold flex flex-col flex-grow">
          <span>Finished Lecture — Indigenous Studies</span>
          <span className="text-sm font-normal text-slate-500">
            {new Date().toDateString()}
          </span>
        </div>
        <div
          className="py-2 bg-gradient-from-l bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-full px-10 font-bold hover:scale-110 hover:cursor-pointer transition-all duration-200"
          onClick={resetPage}
        >
          Exit Classroom
        </div>
      </div>
      <div className="w-full flex justify-center items-center">
        {loading && (
          <div className="flex flex-col space-y-2 items-center mt-8">
            <Loader color={PRIMARY_COLOR[500]} />
            <span className="text-emerald-500">
              Loading your lecture notes and practice questions...
            </span>
          </div>
        )}
      </div>
      <div className="flex flex-row">
        {notes && (
          <div
            className="bg-slate-800 p-10 rounded-2xl m-4 mt-10 shadow-xl"
            style={{ width: "1500px" }}
          >
            <div className="">
              <ZazuHeader text={"Zazu's Notes"} gradient />
            </div>
            <div className="flex flex-col space-y-4 text-slate-400">
              {notes
                .split("-")
                .filter((s) => {
                  const k = s.trim();
                  return k !== "";
                })
                .map((b) => (
                  <div className="flex flex-row" key={b}>
                    –<span className="pl-2">{b}</span>
                  </div>
                ))}
            </div>
          </div>
        )}
        <div className="mt-10">
          {questions.map((q, i) => (
            <QuizPanel
              infinite
              key={i}
              visible={i === 0}
              quiz={q}
              loading={false}
              temp
              clearQuiz={() =>
                setQuestions(
                  questions.length === 1 ? questions : questions.slice(1)
                )
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}
