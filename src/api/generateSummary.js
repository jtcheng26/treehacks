import axios from "axios";
import { BASE_URL } from "./generateQuiz";

export default async function generateSummary(query, id) {
  const form = new FormData();
  form.append("transcript", query);
  form.append("meeting_id", id);
  const res = await axios.post(BASE_URL + "/summarize", form);
  console.log(res);
  return res.data;
}
