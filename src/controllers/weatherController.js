require("dotenv").config();
import { response } from "express";
import request from "request";
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

function callSendAPI(sender_psid, response) {
  let request_body = {
    recipient: {
      id: sender_psid,
    },
    message: response,
  };

  request(
    {
      uri: "https://graph.facebook.com/v2.6/me/messages",
      qs: { access_token: PAGE_ACCESS_TOKEN },
      method: "POST",
      json: request_body,
    },
    (err, res, body) => {
      if (!err) {
        console.log("message sent!");
      } else {
        console.error("Unable to send message:" + err);
      }
    }
  );
}

let getDataWeather = (city) => {
  return new Promise((resolve, reject) => {
    request(
      {
        uri: `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=028e22550cd2e267e1cf9fb8415546c7`,
        method: "GET",
      },
      (err, res, body) => {
        if (!err) {
          body = JSON.parse(body);
          console.log(body);
          resolve(data);
        } else {
          console.error("Unable to send message:" + err);
          reject(err);
        }
      }
    );
  });
};
let handleGetDataWeather = (sender_psid, cityname) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await getDataWeather(cityname);
      let response = { text: data };
      callSendAPI(sender_psid, response);
      resolve("done");
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  handleGetDataWeather: handleGetDataWeather,
};
