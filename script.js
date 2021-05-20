const searchBtn = document.querySelector('#searchBtn')
const searchInput = document.querySelector('#search')
const todayTemp = document.querySelector('#todayT')
const currentLocation = document.querySelector('#current-location')
const vRange = document.querySelector('#v-range')
const windSpeed = document.querySelector('#wind-speed')
const windDirection = document.querySelector('#wind-direction')
const pressure = document.querySelector('#pressure')
const sunrise = document.querySelector('#sunrise')
const sunset = document.querySelector('#sunset')

const requestUrl = "http://ip-api.com/json";

async function countryGet () {
  try {
    const response = await (await fetch(requestUrl)).json()
    myLatitude =response.lat;
    myLongitude =response.lon;
    country =response.country;
    city =response.city;
    console.log(response)
  }catch(error){
    console.log('err')
  }
}
countryGet()

function inputValue () {
  console.log(searchInput.value)
}
searchBtn.addEventListener('click', inputValue)

let myLatitude
let myLongitude
let country;
let city;

async function getData () {
  const options = {
    method: 'GET',
    url: 'https://community-open-weather-map.p.rapidapi.com/weather',
    params: {
            q: 'lagos,nigeria',
        // q: `${city}, ${country}`,
        lat:  `${myLatitude}`,
        lon: `${myLongitude}`,
        lang: 'null',
        units: '"metric" or "imperial"',
        mode: 'xml, html'    },
    headers: {
      'x-rapidapi-key': '74485a40a0mshfb75614e64d6897p1806bcjsn1273f1531ef2',
      'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com'
    }
  };
    try{
        const response = await axios.request(options)
        result = response.data
            console.log(response.data);
            displayCurrentData()
            forecast()
    }catch (error){
        console.error('err');
    }
}
let forecastData;
async function forecast () {
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
      'x-rapidapi-key': '74485a40a0mshfb75614e64d6897p1806bcjsn1273f1531ef2',
      'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com'
    }
  };   
   try{
        const response = await axios.request(options)
        forecastData = response.data
            console.log(response.data);
    }catch (error){
        console.error('err');
    }
}

function displayCurrentData (){
  todayTemp.innerHTML = result.main.temp + " " + "°C"
  currentLocation.innerHTML = result.name 
  windSpeed.innerHTML = result.wind.speed + " " +"mph"
  windDirection.innerHTML = result.wind.deg + " " + "wsw"
  pressure.innerHTML = result.main.pressure + " " + "Mb"
  vRange.innerHTML = result.visibility
  sunrise.innerHTML ="Sun Rise:" + " " + result.sys.sunrise
  sunset.innerHTML ="Sun set:" + " " + result.sys.sunset
}


// async function getSearch () {
//   const options = {
//     method: 'GET',
//     url: 'https://community-open-weather-map.p.rapidapi.com/find',
//     params: {
//       q: 'london',
//       cnt: '1',
//       mode: 'null',
//       lon: '0',
//       type: 'link, accurate',
//       lat: '0',
//       units: 'imperial, metric'
//     },
//     headers: {
//       'x-rapidapi-key': '74485a40a0mshfb75614e64d6897p1806bcjsn1273f1531ef2',
//       'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com'
//     }
//   };    try{
//         const response = await axios.request(options)
//             console.log(response.data);
//     }catch (error){
//         console.error('err');
//     }
// }

// getSearch()


getData()
