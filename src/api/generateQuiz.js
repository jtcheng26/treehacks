import axios from "axios";

export default async function generateQuiz(query) {
  const form = new FormData();
  form.append("transcript", query);
  console.log(form);
  const d = await axios.post("http://localhost:6969/generateQuiz", form);
  console.log(d);
  return d.data;
}
