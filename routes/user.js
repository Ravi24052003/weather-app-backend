const express = require('express');
const {getCurrentUser, getInputCityWeather, getCitiesWeather, getDelhiWeather, clearWeatherHistory, getWeatherHistory} = require("../controller/user.js");
const userRouter = express.Router();



module.exports = userRouter;

userRouter
.get('/user', getCurrentUser)
.get("/cityName/:city", getInputCityWeather)
.get("/cities", getCitiesWeather)
.get("/delhi", getDelhiWeather)
.get("/weatherHistory", getWeatherHistory)
.delete("/clearHistory", clearWeatherHistory);

userRouter.use("*", (req, res)=>{
    res.sendStatus(404);
  })

