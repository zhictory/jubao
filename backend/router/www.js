/**
 * ---------------------------------------------------
 *
 *  author: landy
 *  date:   17/1/20
 *
 * ---------------------------------------------------
 */
const router = require('express').Router();
const parseMap = require("../config/parser-map");
const config = require('../config/production.json');
//const request = require('request');
//const md5 = require('md5');
const express = require('../api/express');
const weather = require('../api/wether');
const getLocationInfo = require('../api/getLocationInfo');

/**
 * 首页路由
 */

router.get('/', function(req, res){
  res.render('pages/index', {
    'title': 'landy的个人网站',
    'styles': [parseMap('base', 'css'), parseMap('index', 'css')],
    'scripts': [parseMap('base', 'js'), parseMap('index', 'js')]
  });
});

// 获取快递信息
router.get('/express/info', function(req, res){
  let no = req.query.no;
  express.getExpressInfo(no, (responese) => {
    res.json(responese);
  });
});

// 获取快递信息第二版
router.get('/express/info/v2', function(req, res){
  let no = req.query.no;
  express.getExpressInfoV2(no, function(result){
    res.json(result);
  })
});

// 获取天气信息第一版
router.get('/wether/info', function(req, res){
  let code = req.query.code;
  let time = req.query.time;
  let type = req.query.type || 1;
  weather.getWetherInfo(code, time, type, (response) => {
    res.send(response);
  });
});
/**
 * 获取天气信息第二版
 */
// 获取当天实况天气
router.get('/weather/condition', function(req, res){
  let lat = req.query.lat || 0;
  let lon = req.query.lon || 0;

  weather.getWeatherInfoV2({
    lat: lat,
    lon: lon
  }, 'today', function(response){
    res.json(response);
  });

});
// 获取24小时天气预报
router.get('/weather/forceast24hours', function(req, res){
  let lat = req.query.lat || 0;
  let lon = req.query.lon || 0;

  weather.getWeatherInfoV2({
    lat: lat,
    lon: lon
  }, 24, function(response){
    res.json(response);
  });

});
// 获取15天天气预报
router.get('/weather/forceast15days', function(req, res){
  let lat = req.query.lat || 0;
  let lon = req.query.lon || 0;

  weather.getWeatherInfoV2({
    lat: lat,
    lon: lon
  }, 15, function(response){
    res.json(response);
  });

});



// 获取地区信息
router.get('/location/info', function(req, res){
  let lat = req.query.lat;
  let lng = req.query.lng;

  getLocationInfo(lat, lng, function(result){
    res.json(result);
  });
});

module.exports = router;