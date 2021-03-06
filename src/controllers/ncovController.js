require("dotenv").config();
import { response } from "express";
import request from "request";
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const IMAGE_GETSTARTED =
  "https://static.vecteezy.com/system/resources/previews/001/436/006/original/cute-cartoon-cat-eating-fish-free-vector.jpg";
function callSendAPI(sender_psid, response) {
  let request_body = {
    recipient: {
      id: sender_psid,
    },
    message: response,
  };

  // Send the HTTP request to the Messenger Platform
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

let getDataNcovGlobal = () => {
  return new Promise((resolve, reject) => {
    request(
      {
        uri: `https://api.covid19api.com/summary`,
        method: "GET",
      },
      (err, res, body) => {
        if (!err) {
          body = JSON.parse(body);

          let global = body.Global;
          let newconfirmed = global.NewConfirmed;
          let totalconfirmed = global.TotalConfirmed;
          let newdeaths = global.NewDeaths;
          let totaldeaths = global.TotalDeaths;
          let newrecovered = global.NewRecovered;
          let totalrecovered = global.TotalRecovered;
          let date = global.Date;
          let data = `Số ca nhiễm mới: ${newconfirmed}
Tổng số ca nhiễm: ${totalconfirmed}
Số ca tử vong mới: ${newdeaths}
Tổng số ca tử vong: ${totaldeaths}
Số ca được chữa khỏi mới: ${newrecovered}
Tổng số ca được chữa khỏi: ${totalrecovered}
Ngày cập nhật: ${date}`;
          resolve(data);
        } else {
          console.error("Unable to send message:" + err);
          reject(err);
        }
      }
    );
  });
};
let handleGetDataNcovGlobal = (sender_psid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await getDataNcovGlobal();
      let response = { text: data };
      callSendAPI(sender_psid, response);
      resolve("done");
    } catch (e) {
      reject(e);
    }
  });
};

let getDataNcovVietNam = () => {
  return new Promise((resolve, reject) => {
    request(
      {
        uri: `https://api.covid19api.com/summary`,
        method: "GET",
      },
      (err, res, body) => {
        if (!err) {
          body = JSON.parse(body);
          let locale = body.Countries[188];
          let newconfirmed = locale.NewConfirmed;
          let totalconfirmed = locale.TotalConfirmed;
          let newdeaths = locale.NewDeaths;
          let totaldeaths = locale.TotalDeaths;
          let newrecovered = locale.NewRecovered;
          let totalrecovered = locale.TotalRecovered;
          let date = locale.Date;
          let data = `Số ca nhiễm mới: ${newconfirmed}
Tổng số ca nhiễm: ${totalconfirmed}
Số ca tử vong mới: ${newdeaths}
Tổng số ca tử vong: ${totaldeaths}
Số ca được chữa khỏi mới: ${newrecovered}
Tổng số ca được chữa khỏi: ${totalrecovered}
Ngày cập nhật: ${date}`;
          resolve(data);
        } else {
          console.error("Unable to send message:" + err);
          reject(err);
        }
      }
    );
  });
};
let handleGetDataNcovVietNam = (sender_psid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await getDataNcovVietNam();
      let response = { text: data };
      callSendAPI(sender_psid, response);
      resolve("done");
    } catch (e) {
      reject(e);
    }
  });
};
let localeNcov = () => {
  let response = {
    attachment: {
      type: "template",
      payload: {
        template_type: "button",
        text: "Thông tin Covid19 của:",
        buttons: [
          {
            type: "postback",
            title: "Việt Nam",
            payload: "VIETNAM",
          },
          {
            type: "postback",
            title: "Thế giới",
            payload: "GLOBAL",
          },
        ],
      },
    },
  };
  return response;
};
async function handlePostbackNcov(sender_psid, received_postback) {
  let response;
  let payload = received_postback.payload;

  switch (payload) {
    case "COVID19":
      response = localeNcov();
      break;
    case "GLOBAL":
      await handleGetDataNcovGlobal(sender_psid);
      break;
    case "VIETNAM":
      await handleGetDataNcovVietNam(sender_psid);
      break;
    default:
      response = { text: "I don't understand!" };
      break;
  }
  callSendAPI(sender_psid, response);
}
module.exports = {
  handleGetDataNcovGlobal: handleGetDataNcovGlobal,
  handleGetDataNcovVietNam: handleGetDataNcovVietNam,
  localeNcov: localeNcov,
  handlePostbackNcov: handlePostbackNcov,
};
