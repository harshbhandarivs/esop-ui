const form = document.querySelector("#form");
const successMessage = document.querySelector("#successMessage");
const errorMessage = document.querySelector("#errorMessage");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const { username } = event.target.elements;
  clearPreviousResponse();
  getOrderHistory(username);
});

function getOrderHistory(username) {
  const config = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  };
  fetch(`http://localhost:8080/user/${username.value}/order`, config)
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        showErrorMessage(data);
      } else {
        const message = document.createElement("p");
        if (data.length == 0) {
          message.innerText = "No orders placed";
          successMessage.appendChild(message);
        } else {
          successMessage.appendChild(message);
          message.innerText = "Order History";
          const table = createTable(data);
          successMessage.appendChild(table);
        }
      }
    })
    .catch((reason) => {
      appendNetworkError(reason);
    });
}

function showErrorMessage(data) {
  const list = document.createElement("ul");
  list.append(
    ...data.error.map((element) => {
      const listElement = document.createElement("li");
      listElement.innerText = element;
      return listElement;
    })
  );
  errorMessage.appendChild(list);
}

function createTable(data) {
  const table = document.createElement("table");
  const headings = [
    "Order ID",
    "Order Type",
    "Quantity",
    "Price",
    "ESOP Type",
    "Remaining Quanity",
    "Status",
    "Filled",
  ];
  const keys = [
    "orderId",
    "type",
    "quantity",
    "price",
    "esopType",
    "remainingQuantity",
    "status",
    "filled",
  ];
  const tableHeadingRow = document.createElement("tr");
  headings.forEach((value) => {
    const tableHeading = document.createElement("th");
    tableHeading.innerText = value;
    tableHeadingRow.appendChild(tableHeading);
  });
  table.appendChild(tableHeadingRow);
  for (row of data) {
    const tableRow = document.createElement("tr");
    keys.forEach((key) => {
      const tableRowData = document.createElement("td");
      if (row[key] == undefined) {
        tableRowData.innerText = "-";
      } else if (key == "filled") {
        tableRowData.append(...createFilledList(row[key]));
      } else {
        tableRowData.innerText = row[key];
      }
      tableRow.appendChild(tableRowData);
    });
    table.appendChild(tableRow);
  }
  return table;
}

function createFilledList(filled) {
  return filled.map(({ quantity, price }) => {
    const element = document.createElement("p");
    element.innerText = `Quantity: ${quantity} Price: ${price}`;
    return element;
  });
}

function appendNetworkError(reason) {
  const list = document.createElement("ul");
  const title = document.createElement("p");
  title.innerText = "Error";
  title.style.fontWeight = 900;
  title.style.paddingBottom = "15px";
  errorMessage.appendChild(title);
  const listElement = document.createElement("li");
  listElement.innerText = reason.message;
  list.appendChild(listElement);
  list.style.paddingLeft = "16px";
  errorMessage.appendChild(list);
}

function clearPreviousResponse() {
  successMessage.innerHTML = "";
  errorMessage.innerHTML = "";
}
