import axios from "axios";

// const serverURL = ENDPOINT || "http://localhost:5000";
const serverURL = "http://localhost:5000";

export default axios.create({
  baseURL: serverURL
});
