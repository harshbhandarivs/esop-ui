const form = document.querySelector("#form");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const { username, orderType, quantity, price, esopType } =
    event.target.elements;
  const reqBody = {
    type: orderType.value,
    price: price.value,
    esopType: esopType.value,
    quantity: quantity.value,
  };
  fetch(`http://localhost:8080/user/${username.value}/order`, {
    method: "POST",
    body: JSON.stringify(reqBody),
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((reason) => {
      console.log(reason);
    });
});
