import axios from "axios";
import { BASE_URL } from "./generateQuiz";
import { RANDOM_SEED } from "./randomSeed";

export default async function updateTranscript(query) {
  const form = new FormData();
  form.append("transcript", query);
  form.append("meeting_id", RANDOM_SEED)
  console.log(form);
  const d = await axios.post(BASE_URL + "/post/summarize", form);
  console.log(d);
  return d.data;
}
