const form = document.querySelector("#form");
const successMessage = document.querySelector("#successMessage");
const errorMessage = document.querySelector("#errorMessage");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const { username } = event.target.elements;
  successMessage.innerHTML = "";
  errorMessage.innerHTML = "";
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
      const list = document.createElement("ul");
      if (data.error) {
        list.append(
          ...data.error.map((element) => {
            const listElement = document.createElement("li");
            listElement.innerText = element;
            return listElement;
          })
        );
        errorMessage.appendChild(list);
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
      console.log(reason);
    });
});

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
      console.log(row, row[key]);
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
    console.log("twicd");
    return element;
  });
}
