import axios from "axios";
export const BASE_URL = "https://treehacks-demo.onrender.com"
export default async function generateQuiz(query) {
  const form = new FormData();
  form.append("transcript", query);
  console.log(form);
  const d = await axios.post(BASE_URL + "/generateQuiz", form);
  console.log(d);
  return d.data;
}
