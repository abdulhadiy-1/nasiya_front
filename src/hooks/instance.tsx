import axios from "axios";
import { API } from "./getEnv";

export default axios.create({
  baseURL: API,
});
