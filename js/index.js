const form = document.querySelector("#form");
const successMessage = document.querySelector("#successMessage");
const errorMessage = document.querySelector("#errorMessage");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const { username, orderType, quantity, price, esopType } =
    event.target.elements;
  const reqBody = {
    type: orderType.value,
    price: parseInt(price.value),
    esopType: esopType.value,
    quantity: parseInt(quantity.value),
  };
  successMessage.innerHTML = ""
  errorMessage.innerHTML = ""
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
      const list = document.createElement("ul")
      if (data.error) {
        list.append(
          data.error.map(element => {
          return document.createElement("li").innerText = element
        }));
        errorMessage.appendChild(list);
      } else {
         list.append(document.createElement("li").innerText = "Order Placed Successfully")
         successMessage.appendChild(list);
      }
    })
    .catch((reason) => {
      console.log(reason);
    });
});
