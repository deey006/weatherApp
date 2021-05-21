const searchBtn = document.querySelector('#searchBtn')
const visible = document.querySelector('.visible')
const searchInput = document.querySelector('#search')
const todayTemp = document.querySelector('#todayT')
const currentLocation = document.querySelector('#current-location')
const vRange = document.querySelector('#v-range')
const windSpeed = document.querySelector('#wind-speed')
const windDirection = document.querySelector('#wind-direction')
const pressure = document.querySelector('#pressure')
const mainCloud = document.querySelector('#main-cloud')
const sunrise = document.querySelector('#sunrise')
const fDate  = document.querySelector('.fDate ')
const fImg  = document.querySelector('.fImg ')
const fMinTemp = document.querySelector('.fMinTemp ')
const fMaxTemp = document.querySelector('.fMaxTemp ')
const sDate = document.querySelector('.sDate ')
const tDate = document.querySelector('.tDate ')
const sImg = document.querySelector(' .sImg')
const tImg  = document.querySelector('.tImg ')
const sMinTemp = document.querySelector('.sMinTemp ')
const tMinTemp = document.querySelector('.tMinTemp ')
const sMaxTemp = document.querySelector('.sMaxTemp ')
const tMaxTemp = document.querySelector(' .tMaxTemp')
const forthDate = document.querySelector('.forthDate ')
const lDate = document.querySelector('.lDate ')
const forthImg = document.querySelector('.forthImg ')
const lImg = document.querySelector('.lImg ')
const forthMinTemp = document.querySelector('.forthMinTemp ')
const lMinTemp = document.querySelector('.lMinTemp ')
const forthMaxTemp = document.querySelector('.forthMaxTemp ')
const lMaxTemp = document.querySelector('.lMaxTemp ')
const loader = document.querySelector('#loading ')

loader.style.display='none'

let forecastData;
let myLatitude
let myLongitude
let country;
let city;
let result

// // date input setting minumum date to today's date
// let date = new Date()
// let month = ("0" + (date.getMonth() + 1 )).slice(-2)
// let day =  ("0" + date.getDate()).slice(-2)
// let maxDate = (year + '-' + month + ('-' + day))
// let days = ['Tomorrow']
// mon = ['Jan', 'Feb', 'March', 'April', 'May', 'june', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']


const requestUrl = "http://ip-api.com/json";

async function countryGet () {
  try {
    const response = await (await fetch(requestUrl)).json()
    myLatitude =response.lat;
    myLongitude =response.lon;
    country =response.country;
    city =response.city;
  }catch(error){
    console.log('err')
  }
}

let collectValue

function inputValue () {
  collectValue = searchInput.value
  console.log(collectValue)
}



async function getData () {
  await countryGet()
  const options = {
    method: 'GET',
    url: 'https://community-open-weather-map.p.rapidapi.com/weather',
    params: {
        q: `${city}, ${country}`,
        lat:  `${myLatitude}`,
        lon: `${myLongitude}`,
        lang: 'null',
        units: '"metric" or "imperial"',
        mode: 'xml, html'    },
    headers: {
      // 'x-rapidapi-key': '74485a40a0mshfb75614e64d6897p1806bcjsn1273f1531ef2',
      "x-rapidapi-key": "ff20d96a40msh71ef9a4484e56b4p151d3fjsn767cb25271aa",
      'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com'
    }
  };
  
    try{
      loader.style.display='flex'

        const response = await axios.request(options)
        result = response.data
      
        console.log(result)
            displayCurrentData()
            forecast()
            loader.style.display='none'

    }catch (error){
        console.error('err');
    }
}
async function forecast () {
  let temp;
  const options = {
    method: 'GET',
    url: 'https://community-open-weather-map.p.rapidapi.com/forecast',
    params: {
      // q: 'lagos,nigeria',
      q: `${city}, ${country}`,
      lat:  `${myLatitude}`,
      lon: `${myLongitude}`,

  },
    headers: {
      // 'x-rapidapi-key': '74485a40a0mshfb75614e64d6897p1806bcjsn1273f1531ef2',
      "x-rapidapi-key": "ff20d96a40msh71ef9a4484e56b4p151d3fjsn767cb25271aa",
      'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com'
    }
  };   
   try{
        const response = await axios.request(options)
        forecastData = response.data.list
         displayTemp ()
          operationGetImageOne()
          operationGetImageTwo()
          operationGetImageThree()
          operationGetImageFour()
          operationGetImageFive()
    }catch (error){
        console.error('err');
    }
}

function displayCurrentData (){
  todayTemp.innerHTML = result.main.temp + " " + "°C"
  currentLocation.innerHTML = result.name 
  if (result.weather[0].id === 500){
    mainCloud.setAttribute('src', './weather-app-assets/HeavyRain.png')
  }else if (result.weather[0].id === 804){
    mainCloud.setAttribute('src', './weather-app-assets/LightCloud.png')
  }else if (result.weather[0].id === 802){
    mainCloud.setAttribute('src', './weather-app-assets/Clear.png')
  }else if (result.weather[0].id === 501){
    mainCloud.setAttribute('src', './weather-app-assets/HeavyRain.png')
  }else if (result.weather[0].id === 803){
    mainCloud.setAttribute('src', './weather-app-assets/Thunderstorm.png')
  }

  windSpeed.innerHTML = result.wind.speed + " " +"mph"
  windDirection.innerHTML = result.wind.deg + " " + "wsw"
  pressure.innerHTML = result.main.pressure + " " + "Mb"
  vRange.innerHTML = result.visibility
  sunrise.innerHTML ="Sun Rise:" + " " + result.sys.sunrise
  sunset.innerHTML ="Sun set:" + " " + result.sys.sunset
}

function displayTemp () {
  fMinTemp.innerHTML = forecastData[0].main. temp_min + " " + "°C"
  fMaxTemp.innerHTML = forecastData[0].main. temp_max + " " + "°C"
  sMinTemp.innerHTML = forecastData[1].main. temp_min + " " + "°C"
  sMaxTemp.innerHTML = forecastData[1].main. temp_max + " " + "°C"
  tMinTemp.innerHTML = forecastData[2].main. temp_min+ " " + "°C"
  tMaxTemp.innerHTML = forecastData[2].main. temp_max + " " + "°C"
  forthMinTemp.innerHTML = forecastData[3].main. temp_min + " " + "°C"
  forthMaxTemp.innerHTML = forecastData[3].main. temp_max + " " + "°C"
  lMinTemp.innerHTML = forecastData[4].main. temp_min + " " + "°C"
  lMaxTemp.innerHTML = forecastData[4].main. temp_max + " " + "°C"
}
let array 

function operationGetImageOne (){
  array= forecastData.slice(0,5);

    if (array[0].weather[0].id === 500){
      fImg.setAttribute('src', './weather-app-assets/HeavyRain.png')
    }else if (array[0].weather[0].id === 804){
      fImg.setAttribute('src', './weather-app-assets/LightCloud.png')
    }else if (array[0].weather[0].id === 802){
      fImg.setAttribute('src', './weather-app-assets/Clear.png')
    }else if (array[0].weather[0].id === 501){
      fImg.setAttribute('src', './weather-app-assets/HeavyRain.png')
    }else if (array[0].weather[0].id === 803){
      fImg.setAttribute('src', './weather-app-assets/Thunderstorm.png')
    }
}
function operationGetImageTwo (){
  array= forecastData.slice(0,5);

  if (array[1].weather[0].id === 500){
    sImg.setAttribute('src', './weather-app-assets/HeavyRain.png')
  }else if (array[1].weather[0].id === 804){
    sImg.setAttribute('src', './weather-app-assets/LightCloud.png')
  }else if (array[1].weather[0].id === 802){
    sImg.setAttribute('src', './weather-app-assets/Clear.png')
  }else if (array[1].weather[0].id === 501){
    sImg.setAttribute('src', './weather-app-assets/HeavyRain.png')
  }else if (array[1].weather[0].id === 803){
    sImg.setAttribute('src', './weather-app-assets/Thunderstorm.png')
  }
}

function operationGetImageThree (){
  array= forecastData.slice(0,5);

  if (array[2].weather[0].id === 500){
    tImg.setAttribute('src', './weather-app-assets/HeavyRain.png')
  }else if (array[2].weather[0].id === 804){
    tImg.setAttribute('src', './weather-app-assets/LightCloud.png')
  }else if (array[2].weather[0].id === 802){
    tImg.setAttribute('src', './weather-app-assets/Clear.png')
  }else if (array[2].weather[0].id === 501){
    tImg.setAttribute('src', './weather-app-assets/HeavyRain.png')
  }else if (array[2].weather[0].id === 803){
    tImg.setAttribute('src', './weather-app-assets/Thunderstorm.png')
  }
}

function operationGetImageFour (){
  array= forecastData.slice(0,5);

  if (array[3].weather[0].id === 500){
    forthImg.setAttribute('src', './weather-app-assets/HeavyRain.png')
  }else if (array[3].weather[0].id === 804){
    forthImg.setAttribute('src', './weather-app-assets/LightCloud.png')
  }else if (array[3].weather[0].id === 802){
    forthImg.setAttribute('src', './weather-app-assets/Clear.png')
  }else if (array[3].weather[0].id === 501){
    forthImg.setAttribute('src', './weather-app-assets/HeavyRain.png')
  }else if (array[3].weather[0].id === 803){
    forthImg.setAttribute('src', './weather-app-assets/Thunderstorm.png')
  }
}

function operationGetImageFive (){
  array= forecastData.slice(0,5);

  if (array[4].weather[0].id === 500){
    lImg.setAttribute('src', './weather-app-assets/HeavyRain.png')
  }else if (array[4].weather[0].id === 804){
    lImg.setAttribute('src', './weather-app-assets/LightCloud.png')
  }else if (array[4].weather[0].id === 802){
    lImg.setAttribute('src', './weather-app-assets/Clear.png')
  }else if (array[4].weather[0].id === 501){
    lImg.setAttribute('src', './weather-app-assets/HeavyRain.png')
  }else if (array[4].weather[0].id === 803){
    lImg.setAttribute('src', './weather-app-assets/Thunderstorm.png')
  }
}


async function getSearch () {
  let outCome
  await inputValue ()
  const options = {
    method: 'GET',
    url: 'https://community-open-weather-map.p.rapidapi.com/find',
    params: {
      q: `${collectValue}`,
      cnt: '1',
      mode: 'null',
      lon: '0',
      type: 'link, accurate',
      lat: '0',
      units: 'imperial, metric'
    },
    headers: {
      // 'x-rapidapi-key': '74485a40a0mshfb75614e64d6897p1806bcjsn1273f1531ef2',
      "x-rapidapi-key": "ff20d96a40msh71ef9a4484e56b4p151d3fjsn767cb25271aa",
      'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com'
    }
  };  
  loader.style.display='flex' 
   try{
        const response = await axios.request(options)
        outCome = response.data.list
            console.log(outCome);
            todayTemp.innerHTML = outCome[0].main.temp + " " + "°C"
            currentLocation.innerHTML = outCome[0].name
            windSpeed.innerHTML = outCome[0].wind.speed + " " +"mph"
            windDirection.innerHTML = outCome[0].wind.deg + " " + "wsw"
            pressure.innerHTML = outCome[0].main.pressure + " " + "Mb"
            visible.textContent = "Humidity"
            vRange.innerHTML = outCome[0].main.humidity
            sunrise.textContent = 'Clouds'
            sunset.innerHTML =outCome[0].weather[0].description
          
            if (outCome[0].weather[0].id === 500){
              mainCloud.setAttribute('src', './weather-app-assets/HeavyRain.png')
            }else if (outCome[0].weather[0].id === 804){
              mainCloud.setAttribute('src', './weather-app-assets/LightCloud.png')
            }else if (outCome[0].weather[0].id === 802){
              mainCloud.setAttribute('src', './weather-app-assets/Clear.png')
            }else if (outCome[0].weather[0].id === 501){
              mainCloud.setAttribute('src', './weather-app-assets/HeavyRain.png')
            }else if (outCome[0].weather[0].id === 803){
              mainCloud.setAttribute('src', './weather-app-assets/Thunderstorm.png')
            }
            loader.style.display='none'

    }catch (error){
        console.error('err');
    }
}




getData()
searchBtn.addEventListener('click', getSearch)
