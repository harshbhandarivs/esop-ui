import axios from "axios";

export default class APIService {
  constructor(httpClient = axios) {
    this.httpClient = httpClient;
  }

  placeRequest(url, config) {
    return this.httpClient(url, config);
  }
}
