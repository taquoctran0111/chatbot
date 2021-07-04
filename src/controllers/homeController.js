require("dotenv").config();
import request from "request";
import chatbotServices from "../services/chatbotServices";
import ncovController from "../controllers/ncovController";
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

let getHomePage = (req, res) => {
  return res.render("homepage.ejs");
};

let getWebhook = (req, res) => {
  // Your verify token. Should be a random string.
  let VERIFY_TOKEN = process.env.VERIFY_TOKEN;

  // Parse the query params
  let mode = req.query["hub.mode"];
  let token = req.query["hub.verify_token"];
  let challenge = req.query["hub.challenge"];

  if (mode && token) {
    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      console.log("WEBHOOK_VERIFIED");
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }
  }
};
let postWebhook = (req, res) => {
  let body = req.body;
  if (body.object === "page") {
    body.entry.forEach(function (entry) {
      let webhook_event = entry.messaging[0];
      console.log(webhook_event);
      let sender_psid = webhook_event.sender.id;
      console.log("Sender PSID: " + sender_psid);

      if (webhook_event.message) {
        handleUserAction(sender_psid);
        handleMessage(sender_psid, webhook_event.message);
      } else if (webhook_event.postback) {
        handleUserAction(sender_psid);
        handlePostback(sender_psid, webhook_event.postback);
      }
    });
    res.status(200).send("EVENT_RECEIVED");
  } else {
    res.sendStatus(404);
  }
};

function handleMessage(sender_psid, received_message) {
  let response;
  if (received_message.text) {
    response = {
      text: `You sent the message: "${received_message.text}". Now send me an attachment!`,
    };
  } else if (received_message.attachments) {
    let attachment_url = received_message.attachments[0].payload.url;
    response = {
      attachment: {
        type: "template",
        payload: {
          template_type: "generic",
          elements: [
            {
              title: "Is this the right picture?",
              subtitle: "Tap a button to answer.",
              image_url: attachment_url,
              buttons: [
                {
                  type: "postback",
                  title: "Yes!",
                  payload: "yes",
                },
                {
                  type: "postback",
                  title: "No!",
                  payload: "no",
                },
              ],
            },
          ],
        },
      },
    };
  }

  callSendAPI(sender_psid, response);
}

async function handlePostback(sender_psid, received_postback) {
  let response;
  let payload = received_postback.payload;

  switch (payload) {
    case "yes":
      response = { text: "Thanks!" };
      break;
    case "no":
      response = { text: "Oops, try sending another image." };
      break;
    case "GET_STARTED":
      await chatbotServices.handleGetStarted(sender_psid);
      break;
    case "RESTART_BOT":
      await chatbotServices.handleGetStarted(sender_psid);
      break;
    case "COVID19":
      response = ncovController.localeNcov();
      break;
    case "GLOBAL":
      await ncovController.handleGetDataNcovGlobal(sender_psid);
      break;
    case "VIETNAM":
      await ncovController.handleGetDataNcovVietNam(sender_psid);
      break;
    case "WEATHER":
      response = {
        text: "Nhập tên thành phố bạn muốn xem thông tin thời tiết",
      };
      break;
    default:
      response = { text: "I don't understand!" };
      break;
  }
  callSendAPI(sender_psid, response);
}

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
      qs: { access_token: process.env.PAGE_ACCESS_TOKEN },
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
let setupProfile = async (req, res) => {
  let request_body = {
    get_started: { payload: "GET_STARTED" },
    whitelisted_domains: ["https://chatbotbytqt.herokuapp.com/"],
  };

  await request(
    {
      uri: `https://graph.facebook.com/v11.0/me/messenger_profile?access_token=${PAGE_ACCESS_TOKEN}`,
      qs: { access_token: process.env.PAGE_ACCESS_TOKEN },
      method: "POST",
      json: request_body,
    },
    (err, res, body) => {
      if (!err) {
        console.log("setup success!");
      } else {
        console.error("Unable to send message:" + err);
      }
    }
  );
  return res.send("setup success!");
};
let setPersistentMenu = async (req, res) => {
  let request_body = {
    persistent_menu: [
      {
        locale: "default",
        composer_input_disabled: false,
        call_to_actions: [
          {
            type: "postback",
            title: "Restart Chatbot",
            payload: "RESTART_BOT",
          },
          {
            type: "web_url",
            title: "Facebook Developer",
            url: "https://www.facebook.com/tranta0111/",
            webview_height_ratio: "full",
          },
        ],
      },
    ],
  };

  await request(
    {
      uri: `https://graph.facebook.com/v11.0/me/messenger_profile?access_token=${PAGE_ACCESS_TOKEN}`,
      qs: { access_token: process.env.PAGE_ACCESS_TOKEN },
      method: "POST",
      json: request_body,
    },
    (err, res, body) => {
      if (!err) {
        console.log("setup persistent success!");
      } else {
        console.error("Unable to send message:" + err);
      }
    }
  );
  return res.send("setup persistent success!");
};

let handleUserAction = async (sender_psid) => {
  let request_body = {
    recipient: {
      id: sender_psid,
    },
    sender_action: "typing_on",
  };

  await request(
    {
      uri: `https://graph.facebook.com/v2.6/me/messages?access_token=${PAGE_ACCESS_TOKEN}`,
      qs: { access_token: process.env.PAGE_ACCESS_TOKEN },
      method: "POST",
      json: request_body,
    },
    (err, res, body) => {
      if (!err) {
        console.log("setup user action success!");
      } else {
        console.error("Unable to send message:" + err);
      }
    }
  );
};
module.exports = {
  getHomePage: getHomePage,
  getWebhook: getWebhook,
  postWebhook: postWebhook,
  setupProfile: setupProfile,
  setPersistentMenu: setPersistentMenu,
  handleUserAction: handleUserAction,
};
