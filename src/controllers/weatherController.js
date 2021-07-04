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
  const URI = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=028e22550cd2e267e1cf9fb8415546c7`;
  const encodedURI = encodeURI(URI);
  return new Promise((resolve, reject) => {
    request(
      {
        uri: encodedURI,
        method: "GET",
      },
      (err, res, body) => {
        if (!err) {
          body = JSON.parse(body);
          let main = body.main;
          let temp = Number(main.temp) - 273;
          let feels_like = main.feels_like;
          let temp_max = main.temp_max;
          let temp_min = main.temp_min;
          let humidity = main.humidity;
          let data = `Nhiệt độ: ${temp}
Cảm giác như: ${feels_like}
Nhiệt độ thấp nhât: ${temp_min}
Nhiệt độ cao nhất: ${temp_max}
Độ ẩm trong không khí: ${humidity}%
`;
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
