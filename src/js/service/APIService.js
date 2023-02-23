export default class APIService {
  constructor(httpClient) {
    this.httpClient = httpClient;
  }

  placeRequest(url, config) {
    return this.httpClient(url, config);
  }
}
