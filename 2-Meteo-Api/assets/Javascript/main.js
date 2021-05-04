const CLEAPI = 'a6e357b3e40503aae85a6b37543bb4e0';
let resultatsAPI;

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
        let long = position.coords.longitude;
        let lat = position.coords.latitude;
        AppelAPI(long,lat);
        // console.log(position);
    }, () => {
        alert(`Vous avez refusé la géolocalisation, l'application ne peut pas fonctionner, veuillez l'activer. ! `)
    })
}

function AppelAPI(long, lat) {

    console.log(long, lat);
}