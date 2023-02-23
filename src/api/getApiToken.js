import axios from "axios";
import { BASE_URL } from "./generateQuiz";

export default async function getApiToken() {
  const token = (await axios.get(BASE_URL + "/token")).data
  console.log("Refreshed API key:", token)
  return token;
}
