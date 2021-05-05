import tabJoursEnOrdre from '../Javascript/gestiontemps.js';


const CLEAPI = 'a6e357b3e40503aae85a6b37543bb4e0';
let resultatsAPI;
const temps = document.querySelector('.temps');
const temperature = document.querySelector('.temperature');
const localisation = document.querySelector('.localisation');
const heure = document.querySelectorAll('.heure-nom-prevision');
const tempPourH = document.querySelectorAll('.heure-prevision-valeur');
const joursDiv = document.querySelectorAll('.jour-prevision-nom');
const tempJoursDiv = document.querySelectorAll('.jour-prevision-temp');
const imgIcone = document.querySelector('.logo-meteo');
const chargementContainer = document.querySelector('.overlay-icone-chargement');

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
        let long = position.coords.longitude;
        let lat = position.coords.latitude;
        AppelAPI(long, lat);
        // console.log(position);
    }, () => {
        alert(`Vous avez refusé la géolocalisation, l'application ne peut pas fonctionner, veuillez l'activer. ! `)
    })
}

function AppelAPI(long, lat) {

    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely&units=metric&lang=fr&appid=${CLEAPI}`)
        .then((reponse) => {
            return reponse.json();
        })
        .then((data) => {
            // console.log(data);

            resultatsAPI = data;

            temps.innerText = resultatsAPI.current.weather[0].description;
            temperature.innerText = `${Math.trunc(resultatsAPI.current.temp)}°`
            localisation.innerText = resultatsAPI.timezone;

            let heureActuelle = new Date().getHours();

            for(let i = 0; i < heure.length; i++) {
    
                let heureIncr = heureActuelle + i * 3;
    
                if(heureIncr > 24) {
                    heure[i].innerText = `${heureIncr - 24} h`;
                } else if(heureIncr === 24) {
                    heure[i].innerText = "00 h"
                } else {
                    heure[i].innerText = `${heureIncr} h`;
                }
    
            }

            // temp pour 3h
            for (let j = 0; j < tempPourH.length; j++) {
                tempPourH[j].innerText = `${Math.trunc(resultatsAPI.hourly[j * 3].temp)}°`
            }


            // trois premieres lettres des jours 

            for (let k = 0; k < tabJoursEnOrdre.length; k++) {
                joursDiv[k].innerText = tabJoursEnOrdre[k].slice(0, 3);
            }


            // Temp par jour
            for (let m = 0; m < 7; m++) {
                tempJoursDiv[m].innerText = `${Math.trunc(resultatsAPI.daily[m + 1].temp.day)}°`
            }

            // Icone dynamique 
            if (heureActuelle >= 6 && heureActuelle < 21) {
                imgIcone.src = `ressources/jour/${resultatsAPI.current.weather[0].icon}.svg`
            } else {
                imgIcone.src = `ressources/nuit/${resultatsAPI.current.weather[0].icon}.svg`
            }


            chargementContainer.classList.add('disparition');

        })
}