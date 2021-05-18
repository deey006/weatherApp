// async function getData () {
//     const proxyURL = 'https://cors-anywhere.herokuapp.com/'
//     try{
//         const response = await fetch("https://community-open-weather-map.p.rapidapi.com/onecall/timemachine?lat=37.774929&lon=-122.419418&dt=1590094153%20", {
//             "method": "GET",
//             "headers": {
//                 "x-rapidapi-key": "74485a40a0mshfb75614e64d6897p1806bcjsn1273f1531ef2",
//                 "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com"
//             }
//         } + proxyURL)
//         const data = await response.json()
//         console.log(data)

//     }catch(error){
//         console.log('error')
//     }
// }

// getData()

// fetch("https://gas-price.p.rapidapi.com/europeanCountries", {
// 	"method": "GET",
// 	"headers": {
// 		"x-rapidapi-key": "74485a40a0mshfb75614e64d6897p1806bcjsn1273f1531ef2",
// 		"x-rapidapi-host": "gas-price.p.rapidapi.com"
// 	}
// })
// .then(response => {
// 	console.log(response);
// })
// .catch(err => {
// 	console.error(err);
// });