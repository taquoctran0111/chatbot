require("dotenv").config();
import request from "request";
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

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
let getUsername = (sender_psid, response) => {
  return new Promise((resolve, reject) => {
    request(
      {
        uri: `https://graph.facebook.com/${sender_psid}?fields=first_name,last_name,profile_pic&access_token=${PAGE_ACCESS_TOKEN}`,
        method: "GET",
      },
      (err, res, body) => {
        if (!err) {
          body = JSON.parse(body);
          let username = `${body.last_name} ${body.first_name}`;
          resolve(username);
        } else {
          console.error("Unable to send message:" + err);
          reject(err);
        }
      }
    );
  });
  // Send the HTTP request to the Messenger Platform
  //   let username = "";
  //   request(
  //     {
  //       uri: `https://graph.facebook.com/${sender_psid}?fields=first_name,last_name,profile_pic&access_token=${PAGE_ACCESS_TOKEN}`,
  //       qs: { access_token: PAGE_ACCESS_TOKEN },
  //       method: "GET",
  //     },
  //     (err, res, body) => {
  //       if (!err) {
  //         response = JSON.parse(res);
  //         username = `${response.first_name} ${response.last_name}`;
  //       } else {
  //         console.error("Unable to send message:" + err);
  //       }
  //     }
  //   );
  //   return username;
};
let handleGetStarted = (sender_psid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let username = await getUsername(sender_psid);
      let response = { text: `Xin chào ${username}!` };
      await callSendAPI(sender_psid, response);
      resolve("done");
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = { handleGetStarted: handleGetStarted };
