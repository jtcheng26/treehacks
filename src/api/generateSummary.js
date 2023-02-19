import axios from "axios";
import { BASE_URL } from "./generateQuiz";
import { RANDOM_SEED } from "./randomSeed";

export default async function generateSummary(query, id) {
  const form = new FormData();
  form.append("transcript", query);
  form.append("meeting_id", RANDOM_SEED);
  const res = await axios.post(BASE_URL + "/summarize", form);
  console.log(res);
  return res.data;
}
