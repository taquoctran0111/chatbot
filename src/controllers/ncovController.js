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
let localeNcov = () => {
  let response = {
    attachment: {
      type: "template",
      payload: {
        template_type: "button",
        text: "What do you want to do next?",
        buttons: [
          {
            type: "postback",
            title: "Việt Nam",
            payload: "vietnam",
          },
          {
            type: "postback",
            title: "Thế giới",
            payload: "global",
          },
        ],
      },
    },
  };
  return response;
};
let getDataNcov = () => {
  return new Promise((resolve, reject) => {
    request(
      {
        uri: `https://covid19.mathdro.id/api?fbclid=IwAR1CVGW7kBdyQUhA_PAfcit3sQUg_yOEhc3zPVl1pc5cy3go4XeeP-23CFY`,
        method: "GET",
      },
      (err, res, body) => {
        if (!err) {
          body = JSON.parse(body);
          let confirmed = body.confirmed.value;
          let recovered = body.recovered.value;
          let deaths = body.deaths.value;
          let data = `Số ca nhiễm: ${confirmed}
Số ca phục hồi: ${recovered}     
Số ca tử vong: ${deaths}`;
          resolve(data);
        } else {
          console.error("Unable to send message:" + err);
          reject(err);
        }
      }
    );
  });
};
let handleGetDataNcov = (sender_psid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await getDataNcov();
      let response = { text: data };
      callSendAPI(sender_psid, response);
      resolve("done");
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  handleGetDataNcov: handleGetDataNcov,
  localeNcov: localeNcov,
};
