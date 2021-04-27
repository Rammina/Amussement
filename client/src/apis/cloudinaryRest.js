import axios from "axios";

// const serverURL = ENDPOINT || "https://amussement-server.herokuapp.com";
const serverURL = "https://amussement-server.herokuapp.com";

export default axios.create({
  baseURL: serverURL,
  headers: { "Content-type": "application/json" },
});
