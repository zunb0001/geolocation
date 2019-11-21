//geolocation.js
// How to use Navigator.geolocation
//
let options, spans;
 
document.addEventListener('DOMContentLoaded', init);
 
function init(){
    if(navigator.geolocation){
        let giveUp = 1000 * 30;  //30 seconds
        let tooOld = 1000 * 60 * 60;  //one hour
        options ={
            enableHighAccuracy: true,
            timeout: giveUp,
            maximumAge: tooOld
        }
        
        navigator.geolocation.getCurrentPosition(gotPos, posFail, options);
    }else{
        //using an old browser that doesn't support geolocation
        alert('you have an old brower');
    }
}
 
function gotPos(position){
    spans = document.querySelectorAll('p span');
    spans[0].textContent = position.coords.latitude;
    spans[1].textContent = position.coords.longitude;
    spans[2].textContent = position.coords.accuracy;
    spans[3].textContent = position.timestamp;
    buildMyMap(position);
}
 
function buildMyMap(position){
    console.log(position);
   let map = new google.maps.Map(document.getElementById("output"),{
       center: {
           lat: position.coords.latitude,
           lng: position.coords.longitude
       },
       zoom: 4
      
   });
   let marker = new google.maps.Marker({
    position: {
        lat: position.coords.latitude,
        lng: position.coords.longitude
    },
    map: map,
    title: 'Welcome!'
  });
}
function posFail(err){
    //err is a number
    let errors = {
        1: 'No permission',
        2: 'Unable to determine',
        3: 'Took too long'
    }
    document.querySelector('h1').textContent = errors[err];
}
 