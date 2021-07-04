require("dotenv").config();
import { response } from "express";
import request from "request";
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const MAKET = "https://st.quantrimang.com/photos/image/2017/11/07/ma-ket-1.jpg";
const BAOBINH =
  "https://st.quantrimang.com/photos/image/2017/11/07/bao-binh-1.jpg";
const SONGNGU =
  "https://st.quantrimang.com/photos/image/2017/11/07/song-ngu-1.jpg";
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
let zodiacList = () => {
  let response = {
    attachment: {
      type: "template",
      payload: {
        template_type: "generic",
        elements: [
          {
            title: "Cung Ma Kết",
            subtitle: "Từ ngày 22/12 - 19/1",
            image_url: MAKET,
            buttons: [
              {
                type: "postback",
                title: "Xem thông tin",
                payload: "ZODIACINFO",
              },
            ],
          },
          {
            title: "Cung Bảo Bình",
            image_url: BAOBINH,
            buttons: [
              {
                type: "postback",
                title: "Xem thông tin",
                payload: "ZODIACINFO",
              },
            ],
          },
          {
            title: "Cung Song Ngư",
            image_url: SONGNGU,
            buttons: [
              {
                type: "postback",
                title: "Xem thông tin",
                payload: "ZODIACINFO",
              },
            ],
          },
        ],
      },
    },
  };
  return response;
};

module.exports = {
  zodiacList: zodiacList,
};
