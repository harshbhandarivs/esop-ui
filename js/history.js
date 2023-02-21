const form = document.querySelector("#form");
const successMessage = document.querySelector("#successMessage");
const errorMessage = document.querySelector("#errorMessage");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const { username } =
    event.target.elements;
  successMessage.innerHTML = ""
  errorMessage.innerHTML = ""
  fetch(`http://localhost:8080/user/${username.value}/order`, {
    method: "GET",
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
          ...data.error.map(element => {
          const listElement = document.createElement("li")
          listElement.innerText = element
          return listElement
        }));
        errorMessage.appendChild(list);
      } else {
        const title=document.createElement("p")
        title.innerText="Order History"
        successMessage.appendChild(title);
        for(key in data)
        {
           const listElement=document.createElement("li")
           listElement.innerText=`${key}: ${JSON.stringify(data[key])}`
           list.appendChild(listElement)
        }          
        successMessage.appendChild(list);
      }
    })
    .catch((reason) => {
      console.log(reason);
    });
});
