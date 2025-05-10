import Axios from "axios";

export const axios = Axios.create({
  baseURL: "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1",
  headers: {
    Accept: "application/json"
  }
});
