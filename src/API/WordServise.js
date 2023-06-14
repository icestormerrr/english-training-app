import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://194.147.115.197:3600"
});

export default class WordService {
  static async getAll() {
    const response = await axiosInstance.get("/dictionary");
    return response.data;
  }
}