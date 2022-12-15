/* Global Variables */
const zipCode = document.getElementById("zip");
const feelings = document.getElementById("feelings");
const entryHolder = document.getElementById("lol");
const date = document.getElementById("date");
const temp = document.getElementById("temp");
const content = document.getElementById("content");
const btn = document.getElementById("generate");

// Personal API Key for OpenWeatherMap API
const apiKey = "85b904827b7830b3bedd2ab3141a9146";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;

/*
 *this will be our call back function to fetch data from api and return the needed data to the webpage
 *after the data is viewed on the webpage it will be posted to our server with the function postData
 */
const callBackFunction = async () => {
  await fetch(
    `https://api.openweathermap.org/data/2.5/weather?units=metric&zip=${zipCode.value}&appid=${apiKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      temp.innerText = `The tempreture now is ${data.main.temp} °C`;
      date.innerText = `Today is : ${newDate}`;
      content.innerText = `You feel : ${feelings.value}`;
      entryHolder.innerText = "Here are your results :- ";
      return data;
    })
    .then((data) => {
      postData("/data", data.main);
    })
    .catch((error) => {
      if (error) {
        entryHolder.innerText =
          "Please enter a valid zip code, for examble france zip code is 75020";
        temp.innerText = `The tempreture now is : N/A `;
        date.innerText = `Today is : N/A`;
        content.innerText = `You feel : N/A`;
      }
    });
};

//event listener to the button
btn.addEventListener("click", callBackFunction);

//the function that let data go to our server
async function postData(url = "", data = {}) {
  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data),
  });
  return response.json();
}
