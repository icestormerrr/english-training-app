import axios from "axios";

export default class WordService {
  static async getAll() {
    const response = await axios.get("http://194.147.115.197:3600/dictionary");
    return response.data;
  }
}