import axios from "axios";
import { transcriptall } from "../components/SpeechToTextProcess";
import { BASE_URL } from "./generateQuiz";
import { RANDOM_SEED } from "./randomSeed";

export default async function generateSummary(query, id) {
  const form = new FormData();
  form.append("transcript", transcriptall);
  form.append("meeting_id", RANDOM_SEED);
  const d = await axios.post(BASE_URL + "/post/summarize", form);
  const res = await axios.post(BASE_URL + "/summarize", form);
  console.log(res);
  return res.data;
}
