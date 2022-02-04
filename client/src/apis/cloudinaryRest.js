import axios from "axios";

const serverURL = "https://amussement-server.herokuapp.com";

export default axios.create({
  baseURL: serverURL,
  headers: { "Content-type": "application/json" },
});
