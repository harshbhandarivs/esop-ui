import APIService from "../src/js/service/APIService";

class AxiosStub {
  get(url, config) {
    return Promise.reject("Something happened");
  }
}

it("Should test API Service", () => {
  const apiService = new APIService(new AxiosStub());
  expect(apiService.placeRequest("", "")).rejects.toEqual("Something happened");
});
