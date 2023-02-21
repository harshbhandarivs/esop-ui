const form = document.querySelector("#form");
const successMessage = document.querySelector("#successMessage");
const errorMessage = document.querySelector("#errorMessage");
const orderTypeSelector=document.querySelector("#orderType");
const esopTypeSelector=document.querySelector("#esopType");

orderTypeSelector.addEventListener("change",(event)=>{
    if(event.target.value=="SELL")
    {
            esopTypeSelector.style.display="block"
    }
    else{
      esopTypeSelector.style.display="none"
    }
});
 
form.addEventListener("submit", (event) => {
  
  event.preventDefault();
  const reqBody= createRequestBody(event)
  placeOrder(reqBody,event)
});


function createRequestBody(event)
{
  const { orderType, quantity, price, esopType } =event.target.elements;
  const reqBody = {
    type: orderType.value,
    price: parseInt(price.value),
    quantity: parseInt(quantity.value),
  };
  if(orderType.value=="SELL")
  {
    reqBody["esopType"]=esopType.value
  }
  return reqBody
}

function placeOrder(reqBody,event)
{
  successMessage.innerHTML = ""
  errorMessage.innerHTML = ""
  const {userName}=event.target.elements

  fetch(`http://localhost:8080/user/${userName.value}/order`, {
    method: "POST",
    body: JSON.stringify(reqBody),
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const list = document.createElement("ul")
      if (data.error) {
        appendErrorMessage(list,data.error)
      } else {
        appendOrderSummary(list,data)
      }
    })
    .catch((reason) => {
      console.log(reason);
    });
}

function appendErrorMessage(list,error)
{
  const title=document.createElement("p")
  title.innerText="Errors"
  title.style.fontWeight=1000
  title.style.paddingBottom="15px"
  errorMessage.appendChild(title);
  list.append(
    ...error.map(element => {
    const listElement = document.createElement("li")
    listElement.innerText = element
    return listElement
  }));
  list.style.paddingLeft="16px"  
  errorMessage.appendChild(list);
}

function appendOrderSummary(list,data)
{
  const message=document.createElement("p")
        message.innerText="Order Placed Successfully!!"
        message.style.fontWeight=1000
        message.style.paddingBottom="15px"
        const title=document.createElement("p")
        title.innerText="Order Summary"
        title.style.fontWeight=900
        successMessage.append(message,title);
        for(key in data)
        {
          if(key=="orderID"||key=="type"||key=="quantity"||key=="price"||(key=="esopType"&&data["type"]=="SELL"))
          {
           const listElement=document.createElement("li")
           listElement.innerText=`${key}: ${data[key]}`
           list.appendChild(listElement)
         }
        }  
        list.style.paddingLeft="16px"        
        successMessage.appendChild(list); 
}