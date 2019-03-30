/*
First thing we need to do is the longitude and latitude:
There is a very very simple way to do that and that is built into JavaScript


"Navigator.geolocation" is a "read-only property" that returns a "Geolocation object" that gives
"Web Content Access to the location of the device."This allows a Web site or app to offer customized
results based on the user's location.


"Navigator.geolocation.getCurrentPosition()" method is used to get the current position of the device.


Syntax:
navigator.geolocation.getCurrentPosition(success[, err[, [options])

success: A callback function that takes a Position object as its sole input parameter.


// So what do we do with this information: latitude, longitude [acquired from JavaScript using built-in functions: primarily navigator.geolocation.getCurrentPosition]
We need use this information: latitude and longitude for finding the Weather.



*/

//basically when the page loads: this function runs.
window.addEventListener('load', () => {
   let long;
   let lat;
   let temperatureDescription = document.querySelector('.temperature-description');
   let temperatureDegree = document.querySelector('.temperature-degree');
   let locationTimezone = document.querySelector('location-timezone');
   let temperatureSection = document.querySelector('.temperature');
   const temperatureSpan = document.querySelector('.temperature span');

    if (navigator.geolocation){ // if this thing  exists in the browser: then we can find the exac location of the user.
      navigator.geolocation.getCurrentPosition(position => { //postion has all the details of that particular location.
        //  console.log(position);
        long = position.coords.longitude;
        lat = position.coords.latitude;

        //this is the way to do the sample API call:
        //where the API key unique to me is : 4d5cd724e30bed36ec972f0c5b014648

        const proxy = 'https://cors-anywhere.herokuapp.com/';
        const api = `${proxy}https://api.darksky.net/forecast/4d5cd724e30bed36ec972f0c5b014648/${lat},${long}`;

        //this is like a get request: So we are fetching the details for our own custom latitude and longitude.
        //So we are passing the api as a paramter.
          fetch(api)   // you get the information from the api call: url.
             .then(data => {
               return data.json();
             }) // after you get the information /after you are done fetching/ done getting the "data" from the server (probably after 1sec/ 0.5 sec), only then can you do something with this "data":
             .then(data2 => { // after it made it into json, after that we again do .then
               console.log(data2);
               const {temperature, summary} = data2.currently;
               //Set DOM Elements from the API
               temperatureDegree.textContent = temperature;
               temperatureDescription.textContent = summary;
               //locationTimezone.textContent = data2.Timezone;


               //Formula for celsius:
               let celsius = (temperature-32) * (5 / 9);

               // Change temperature to celsius/ farhenheit
               temperatureSection.addEventListener('click', ()=> {
                 if (temperatureSpan.textContent === "F"){
                   temperatureSpan.textContent = "C";
                   temperatureDegree.textContent = Math.floor(celsius);
                 }
                 else{
                   temperatureSpan.textContent = "F";
                   temperatureDegree.textContent = Math.floor(temperature);
                 }
               });

             });
      });


    }
    // else{ // if it does not allow for some reason, or the browser does not support for some reason.
    //   h1.textContent = "hey this is not working because reasons."
    //  }

});
