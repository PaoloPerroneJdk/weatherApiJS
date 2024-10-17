// Questa chiave è necessaria per autenticare le richieste fatte all'API. Ogni richiesta all'API include questa chiave per identificarti come utente autorizzato.

const apikey = "f8517b8dfea1d49a14b20be8c8e9c91e";

// Accediamo ai NODI del DOM in particolare facciamo riferimento agli elementi html con id "weather-data"(contenitore principale dove verranno visualizzati i dati meteo: temperatura,descrizione,icona,meteo) e "city-input"(campo in cui l'utente inserisce il nome della città)

const weatherDataEl = document.getElementById('weather-data');
const cityInputEl = document.getElementById('city-input');


//  Il form contiene il campo di input e il pulsante di submit. Questo riferimento permette di ascoltare l'evento submit, per inviare la richiesta meteo quando l'utente invia il form.
const formEl = document.querySelector('form');


//  cattura il testo inserito dall'utente nel campo input (ossia il nome della città) e lo memorizza nella variabile cityValue. Viene poi passato alla funzione getWeatherData.
formEl.addEventListener('submit',(event)=> {
  event.preventDefault();
  const cityValue = cityInputEl.value;
   getWeatherData(cityValue);
})

async function getWeatherData(cityValue) {
  try{
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`
    );

    if(!response.ok){
      throw new Error("Network response was not ok")
    }

    // Utilizziamo await per attendere che la richiesta HTTP finisca. Una volta che la risposta è PermissionStatus, la convertiamo in formato JSON per poterla utilizzare come oggetto Javascript
    const data = await response.json();

    const temperature = Math.round(data.main.temp);

    const description = data.weather[0].description;

    const icon = data.weather[0].icon;

    const country = data.sys.country;

    const details = [
      `Feels like: ${Math.round(data.main.feels_like)}`,
      `Humidity: ${data.main.humidity}%`,
      `Wind speed: ${data.wind.speed} m/s`,
    ];
    


    weatherDataEl.querySelector(
      ".icon"
    ).innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">`;

    weatherDataEl.querySelector(".temperature").textContent = `${temperature}°C `;

    weatherDataEl.querySelector('.description').textContent = description;
    weatherDataEl.querySelector(".country").textContent = country;



     weatherDataEl.querySelector(".details").innerHTML = details
       .map((detail) => `<div>${detail}</div>`)
       .join("");

  }
  catch(error){

    weatherDataEl.querySelector(".icon").innerHTML = "";
    weatherDataEl.querySelector(".temperature").textContent = "";
    weatherDataEl.querySelector(".description").textContent =
      "An error happened, please try again later";

    weatherDataEl.querySelector(".details").innerHTML = "";

  }
  
}