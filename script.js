
const apiKey = "4f5d4c390aa21ff6c627c5cbbd905f4d"
let results = document.getElementById("contents-js");
let WeatherImage = document.getElementById('weather-js');
const CancelBtn = document.getElementById("cancel-icon");

function weather_des(weatherDescription) {
  if (weatherDescription.includes("clear")) {
    WeatherImage.src = 'WeatherImages/clear.png'; 
  } else if (weatherDescription.includes("few clouds") || 
             weatherDescription.includes("scattered clouds") || 
             weatherDescription.includes("broken clouds") ||
             weatherDescription.includes("overcast clouds")) {
    WeatherImage.src = 'WeatherImages/clouds.png'; 
  } else if (weatherDescription.includes("shower rain") || 
             weatherDescription.includes("rain") || 
             weatherDescription.includes("drizzle")) {
    WeatherImage.src = 'WeatherImages/rainy.png'; 
  } else if (weatherDescription.includes("snow")) {
    WeatherImage.src = 'WeatherImages/snow.png'; 
  } else if (weatherDescription.includes("mist") || 
             weatherDescription.includes("fog") || 
             weatherDescription.includes("haze") || 
             weatherDescription.includes("smoke") || 
             weatherDescription.includes("dust") || 
             weatherDescription.includes("sand") || 
             weatherDescription.includes("ash")) {
    WeatherImage.src = 'WeatherImages/mist.png'; 
  } else if (weatherDescription.includes("thunderstorm") || 
             weatherDescription.includes("squalls") || 
             weatherDescription.includes("tornado")) {
    WeatherImage.src = 'WeatherImages/thunderstorm.png'; 
  } else if (weatherDescription.includes("wind")) {
    WeatherImage.src = 'WeatherImages/wind.png'; 
  } else {
    WeatherImage.src = 'WeatherImages/default.png'; 
  }
}



let SearchBox = document.getElementById("input-js");
async function CallApi(){
  SearchBox.addEventListener("keydown",async(event)=>{
    if(event.key === "Enter"){
      let inputValue = document.getElementById("input-js").value;
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${apiKey}&units=metric`;
      try{
        let response = await fetch(url);
        let data = await response.json(); 
        console.log(data);
        let weather_description = data.weather[0].description.toLowerCase();
        weather_des(weather_description);
      
        results.innerHTML = ` 
         <div class="temperature">
        <p> ${Math.round(data.main.temp)}°C</p>
      </div>
      <div class="weather-image">
        <img src = "${WeatherImage.src}" width = "200px">
      </div>
      <div class="col-direction">
      <div class="weather">
        <p>${data.weather[0].description}</p>

      </div>
      <div class="weather-city">
        <p> ${data.name} <span>, ${data.sys.country}</span></p>
      </div>
      </div>
      <div class="weather-humidity">
        <img src = "Humidity.png" alt = "Humidity-png">
        <div class="column-direction">
        <p>${data.main.humidity}%</p>
        <p id = "humidity-text">Humidity</p>
        </div>
      </div>
      <div class="weather-windSpeed">
        <img src = "windSpeed.png">
        <div class="column-direction">
        <p>${data.wind.speed} km/h</p>
        <p id = "WindSpeed">WindSpeed</p>
        </div>
        
      </div>`;
      results.classList.remove("contents")
      }catch (error){
          results.innerHTML = `<p style = "color:red; margin-top:24px;"> City not found! Try again.</p>`
          results.classList.remove("contents");
          setTimeout(()=>{
            SearchBox.value ="";
            results.classList.add("contents")
            results.innerHTML="";
            },3000)
           
          
      

          
      }
    }
    }
    
  )
};
CallApi();

CancelBtn.addEventListener("click",()=>{
  let inputValue = document.getElementById("input-js");
  inputValue.value ="";
  results.classList.add("contents")
  
})

 