require("dotenv").config();
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
let getUsername = (sender_psid, response) => {
  return new Promise((resolve, reject) => {
    request(
      {
        uri: `https://graph.facebook.com/${sender_psid}?fields=name,profile_pic&access_token=${PAGE_ACCESS_TOKEN}`,
        method: "GET",
      },
      (err, res, body) => {
        if (!err) {
          body = JSON.parse(body);
          let username = `${body.name}`;
          resolve(username);
        } else {
          console.error("Unable to send message:" + err);
          reject(err);
        }
      }
    );
  });
};
let handleGetStarted = (sender_psid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let username = await getUsername(sender_psid);
      let response1 = { text: `Xin chào ${username}!` };
      let response2 = sendGetStarted();
      await callSendAPI(sender_psid, response1);
      await callSendAPI(sender_psid, response2);
      resolve("done");
    } catch (e) {
      reject(e);
    }
  });
};
let sendGetStarted = () => {
  let response = {
    attachment: {
      type: "template",
      payload: {
        template_type: "generic",
        elements: [
          {
            title: "Các chức năng của chatbot",
            subtitle: "Chạm vào nút để trả lời",
            image_url: IMAGE_GETSTARTED,
            buttons: [
              {
                type: "postback",
                title: "Covid 19",
                payload: "COVID19",
              },
              {
                type: "postback",
                title: "Nhiệt độ",
                payload: "temperature",
              },
            ],
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
      let response = await getDataNcov();
      console.log("DATA", response);
      await callSendAPI(sender_psid, response);
      resolve("done");
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  handleGetStarted: handleGetStarted,
  handleGetDataNcov: handleGetDataNcov,
};
