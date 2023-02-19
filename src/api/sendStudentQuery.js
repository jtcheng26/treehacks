import axios from "axios";
import { BASE_URL } from "./generateQuiz";

export default async function sendStudentQuery(query) {
  const form = new FormData();
  form.append("question", query);
  console.log(form);
  const d = await axios.post(BASE_URL + "/answerQuestion", form);
  console.log(d);
  return d.data;
}
