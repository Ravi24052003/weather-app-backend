const { default: axios } = require("axios");
const User = require("../model/user.js");
const Weather = require("../model/weather.js");
const moment = require('moment-timezone');

  
  
  exports.getCurrentUser = async (req, res)=>{
    try {
      const token = req?.get('Authorization')?.split('Bearer ');

       const user = await User.findOne({'token': token[1]});
   
    res.json(user)
    } catch (error) {
      res.status(400).json(error);
    }
  }

  exports.getInputCityWeather = async (req, res)=>{
    try {
      const token = req?.get('Authorization')?.split('Bearer ');

      const user = await User.findOne({'token': token[1]});

      const url = process.env.WEATHER_API_URL;

const options = {
method: "GET",
headers: {
  "X-RapidAPI-Key": process.env.RAPID_API_KEY,
  "X-RapidAPI-Host": process.env.RAPID_API_HOST
},
};

    const response = await  axios(`${url}city=${req.params.city}`, options);

    console.log("user.js getInputCityWeather response", response);

    const result = response.data;

    console.log("user.js getInputCityWeather result", result);

    const windSpeedKmH = result.wind_speed*(18/5);

    const finalSpeed = Number(windSpeedKmH.toFixed(2));

   result.cityName = req.params.city
   result.finalSpeed = finalSpeed
   

   console.log(" user.js getInputCityWeather result", result);

   const weatherInstance = new Weather(result);
   console.log("user.js getInputCityWeather weatherInstance1", weatherInstance);

   weatherInstance.user = user._id;

   console.log("user.js getInputCityWeather weatherInstance2", weatherInstance);
   
   const dateIndia = moment.tz(Date.now(), "Asia/Kolkata");

   console.log("user.js getInputCityWeahter dateIndia", dateIndia);
   weatherInstance.ist = String(dateIndia)

   console.log("user.js getInputCityWeahter dateIndia", dateIndia);
   user.ist = String(dateIndia)

  await weatherInstance.save();

    user.weatherHistory.push(weatherInstance._id);

    await user.save();

    res.status(200).json(weatherInstance);

    } catch (error) {
      res.status(400).json({error: error.message, inputCityErr: `Unable to get weather information for the input ${req.params.city}`});
    }
  }







  exports.getCitiesWeather = async (req, res)=>{
    try {

      const url = process.env.WEATHER_API_URL;

const options = {
method: "GET",
headers: {
  "X-RapidAPI-Key": process.env.RAPID_API_KEY,
  "X-RapidAPI-Host": process.env.RAPID_API_HOST
},
};

    const response1 = await  axios(`${url}city=mumbai`, options);

    const result1 = response1.data;

    const windSpeedKmH1 = result1.wind_speed*(18/5);

    const finalSpeed1 = Number(windSpeedKmH1.toFixed(2));

   result1.cityName = "mumbai"
   result1.finalSpeed1 = finalSpeed1

   console.log("user.js getCitiesWeather result1", result1)



   const response2 = await  axios(`${url}city=chennai`, options);

   const result2 = response2.data;

   const windSpeedKmH2 = result2.wind_speed*(18/5);

   const finalSpeed2 = Number(windSpeedKmH2.toFixed(2));

  result2.cityName = "chennai"
  result2.finalSpeed2 = finalSpeed2
  console.log("user.js getCitiesWeather result2", result2)


  
  const response3 = await  axios(`${url}city=kolkata`, options);

  const result3 = response3.data;

  const windSpeedKmH3 = result3.wind_speed*(18/5);

  const finalSpeed3 = Number(windSpeedKmH3.toFixed(2));

 result3.cityName = "kolkata"
 result3.finalSpeed3 = finalSpeed3
 console.log("user.js getCitiesWeather result3", result3)
 



 const response4 = await  axios(`${url}city=jaipur`, options);

 const result4 = response4.data;

 const windSpeedKmH4 = result4.wind_speed*(18/5);

 const finalSpeed4 = Number(windSpeedKmH4.toFixed(2));

result4.cityName = "jaipur"
result4.finalSpeed4 = finalSpeed4
console.log("user.js getCitiesWeather result4", result4)


const response5 = await  axios(`${url}city=chandigarh`, options);

const result5 = response5.data;

const windSpeedKmH5 = result5.wind_speed*(18/5);

const finalSpeed5 = Number(windSpeedKmH5.toFixed(2));

result5.cityName = "changdigarh"
result5.finalSpeed5 = finalSpeed5
console.log("user.js getCitiesWeather result5", result5)



    res.status(200).json([result1, result2, result3, result4, result5]);

    } catch (error) {
      res.status(400).json({error: error.message, citiesWeatherErr: "something went wrong"});
    }
  }




  exports.getDelhiWeather = async (req, res)=>{
    try {
      const url = process.env.WEATHER_API_URL;

      const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": process.env.RAPID_API_KEY,
        "X-RapidAPI-Host": process.env.RAPID_API_HOST
      },
      };
      
          const response = await  axios(`${url}city=delhi`, options);
      
          const result = response.data;
      
          const windSpeedKmH = result.wind_speed*(18/5);
      
          const finalSpeed = Number(windSpeedKmH.toFixed(2));
      
         result.cityName = "delhi"
         result.finalSpeed = finalSpeed

         res.status(200).json(result)
    } catch (error) {
      res.status(400).json({error: error.message, delhiWeatherErr: "soemthing went wrong"})
    }
  }


  exports.clearWeatherHistory = async (req, res)=>{
    try {
      const token = req?.get('Authorization')?.split('Bearer ');

      const user = await User.findOne({'token': token[1]});

      const deletedWeatherDocsCount = await Weather.deleteMany({user: user._id});

      user.weatherHistory = [];

      await user.save();

      res.status(200).json(deletedWeatherDocsCount);

    } catch (error) {
      res.status(400).json({error: error.message, clearWeatherHistoryErr: "something wen twrong with deletion of clearweatherhistory"})
    }
  }


  exports.getWeatherHistory = async (req, res)=>{
    try {
      const token = req?.get('Authorization')?.split('Bearer ');

      const user = await User.findOne({'token': token[1]}).populate("weatherHistory");

      res.status(200).json(user.weatherHistory);
      
    } catch (error) {
      res.status(400).json({error: "something went wrong in get weahter history"});
    }
  }