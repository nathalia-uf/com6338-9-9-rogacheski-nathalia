const weatherContainer = document.getElementById('weather')
const formEl = document.querySelector('form')
const inputEl = document.querySelector('input')

formEl.onsubmit = function (e) {
    e.preventDefault()

    const userInput = inputEl.value.trim()

    if(!userInput) return

    getWeather(userInput)
        .then(displayWeatherInfo)
        .catch(displayLocNotFound)

    inputEl.value = ""
}

function getWeather(query){
    if(!query.includes(",")) query += ',us'

    return fetch(
        'https://api.openweathermap.org/data/2.5/weather?q=' + query + '&units=imperial&APPID=e89fac7ae6e0f6ceaf56d0c8424f5ecc'
    )
    .then(function(res){
        return res.json()
    })
    .then (function(data){
        if(data.cod === "404")throw new Error('location not found')

        const iconUrl = 'https://openweathermap.org/img/wn/' + 
        data.weather[0].icon +
        '@2x.png'

        const description = data.weather[0].description
        const actualTemp = data.main.temp
        const feelsLikeTemp = data.main.feels_like
        const place = data.name + ", " + data.sys.country

        const updatedAt = new Date(data.dt *1000)

        return{
            coords: data.coord.lat + "," + data.coord.lon,
            description : description,
            iconUrl : iconUrl,
            actualTemp: actualTemp,
            feelsLikeTemp: feelsLikeTemp,
            place: place,
            updatedAt: updatedAt
        }

    })
}
function displayLocNotFound(){
    weatherContainer.innerHTML = "";

    const errMsg = document.createElement('h2')
    errMsg.textContent = "Location not found"
    weatherContainer.appendChild(errMsg)
}

function displayWeatherInfo(weatherObj){
    weatherContainer.innerHTML = "";

    function addBreak(){
        weatherContainer.appendChild(
            document.createElement('br')
        )
    }

    const placeName= document.createElement('h2')
    placeName.textContent = weatherObj.place
    weatherContainer.appendChild(placeName)

    const whereLink = document.createElement('a')
    whereLink.textContent = "Click to view map"
    whereLink.href = "https://www.google.com/maps/search/?api=1&query=" + weatherObj.coords
    whereLink.target = "_BLANK"
    weatherContainer.appendChild(whereLink)

    const icon = document.createElement('img')
    icon.src = weatherObj.iconUrl
    weatherContainer.appendChild(icon)

    const description = document.createElement('p')
    description.textContent = weatherObj.description
    description.style.textTransform = 'capitalize'
    weatherContainer.appendChild(description)

    addBreak()

    const temp = document.createElement('p')
    temp.textContent = "Current: " + 
    weatherObj.actualTemp +
    "℉"
    weatherContainer.appendChild(temp)

    const feelsLikeTemp = document.createElement('p')
    feelsLikeTemp.textContent = "Feels Like: " + 
    weatherObj.feelsLikeTemp + 
    "℉"
    weatherContainer.appendChild(feelsLikeTemp)

    addBreak()

    const updatedAt = document.createElement('p')
    updatedAt.textContent = "Last updated: " +
    weatherObj.updatedAt.toLocaleTimeString (
        'en-US',
        {
            hour: 'numeric', 
            minute: '2-digit'
        }
    )
    weatherContainer.appendChild(updatedAt)
}