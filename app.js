const APP_ID = 'cf26e7b2c25b5acd18ed5c3e836fb235';
const DEFAULT_VALUE = '--';

const temperatureDegree = document.querySelector('.temperature-degree');
const temperatureSection = document.querySelector('.temperature-section');
const temperatureSpan = document.querySelector('.temperature-section span');
const description = document.querySelector('.temperature-description');
const humidity = document.querySelector('.humidity')
const wind = document.querySelector('.wind');
const icon = document.querySelector('.icon');
const searchBox = document.querySelector('.search-box');
const locationTimezone = document.querySelector('.location-timezone');
const alertBox = document.querySelector('.alert');
const alertMessage = document.querySelector('.alert .msg');
const btnCloseAlert = document.querySelector('.close-btn');
let celsius = 0;

window.addEventListener('load', () => {
    let long;
    let lat;



    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${APP_ID}&units=metric&lang=en`;
            getData(api);
        });
    }
    btnCloseAlert.addEventListener('click', () => {
        alertBox.classList.remove('show');
        alertBox.classList.add('hide');
    })
    temperatureSection.addEventListener('click', () => {
        if (temperatureSpan.textContent === "F") {
            temperatureSpan.textContent = "C";
            temperatureDegree.innerHTML = celsius;
        }
        else {
            temperatureSpan.textContent = "F";
            temperatureDegree.innerHTML = Math.round(celsius * 1.8 + 32) || DEFAULT_VALUE;
        }
    })
});

function getData(request) {
    fetch(request)
        .then(async res => {
            const data = await res.json();
            // console.log(data)
            if (data.cod === 200) {
                // SET DATA
                locationTimezone.innerHTML = data.name;
                description.innerHTML = data.weather[0].description || DEFAULT_VALUE;
                humidity.innerHTML = data.main['humidity'] || DEFAULT_VALUE;
                wind.innerHTML = data.wind['speed'] || DEFAULT_VALUE;
                temperatureDegree.innerHTML = data.main['temp'] || DEFAULT_VALUE;
                // FORUMULA FOR CELSIUS
                celsius = Math.round(data.main['temp']) || DEFAULT_VALUE;
                temperatureDegree.innerHTML = celsius;
                // SET ICON
                icon.setAttribute('src', `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`)
            }
            if (data.cod === "404") {
                alertMessage.innerHTML = "Can not find your location!"
                alertBox.classList.remove('hide');
                alertBox.classList.add('show');
                alertBox.classList.add('showAlert');
            }
        })
}

searchBox.addEventListener('keyup', (input) => {
    if (input.keyCode == 13) {
        input.preventDefault();
        const cityApi = `https://api.openweathermap.org/data/2.5/weather?q=${searchBox.value}&appid=${APP_ID}&units=metric&lang=en`;
        getData(cityApi);
    }
});