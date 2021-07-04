require("dotenv").config();
import { response } from "express";
import request from "request";
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const MAKET = "https://st.quantrimang.com/photos/image/2017/11/07/ma-ket-1.jpg";
const BAOBINH =
  "https://st.quantrimang.com/photos/image/2017/11/07/bao-binh-1.jpg";
const SONGNGU =
  "https://st.quantrimang.com/photos/image/2017/11/07/song-ngu-1.jpg";
const BACHDUONG =
  "https://st.quantrimang.com/photos/image/2017/11/07/cung-hoang-dao-1.jpg";
const KIMNGUU =
  "https://st.quantrimang.com/photos/image/2017/11/07/cung-hoang-dao-6.jpg";
const SONGTU =
  "https://st.quantrimang.com/photos/image/2017/11/07/song-tu-1.jpg";
const CUGIAI =
  "https://st.quantrimang.com/photos/image/2017/11/07/cu-giai-1.jpg";
const SUTU = "https://st.quantrimang.com/photos/image/2017/11/07/su-tu-1.jpg";
const XUNU = "https://st.quantrimang.com/photos/image/2017/11/07/xu-nu-2.jpg";
const THIENBINH =
  "https://st.quantrimang.com/photos/image/2017/11/07/thien-binh-1.jpg";
const BOCAP = "https://st.quantrimang.com/photos/image/2017/11/07/bo-cap-1.jpg";
const NHANMA =
  "https://st.quantrimang.com/photos/image/2017/11/07/nhan-ma-1.jpg";

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
let zodiacList = (sender_psid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response1 = {
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
                subtitle: "Từ ngày 20/1 - 18/2",
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
                subtitle: "Từ ngày 19/2 - 20/3",
                image_url: SONGNGU,
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
                subtitle: "Từ ngày 21/3 - 19/4",
                image_url: BACHDUONG,
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
                subtitle: "Từ ngày 20/4 - 20/5",
                image_url: KIMNGUU,
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
                subtitle: "Từ ngày 21/5 - 21/6",
                image_url: SONGTU,
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
      let response2 = {
        attachment: {
          type: "template",
          payload: {
            template_type: "generic",
            elements: [
              {
                title: "Cung Ma Kết",
                subtitle: "Từ ngày 22/6 - 22/7",
                image_url: CUGIAI,
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
                subtitle: "Từ ngày 23/7 - 23/8",
                image_url: SUTU,
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
                subtitle: "Từ ngày 24/8 - 22/9",
                image_url: XUNU,
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
                subtitle: "Từ ngày 23/9 - 22/10",
                image_url: THIENBINH,
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
                subtitle: "Từ ngày 23/10 - 21/11",
                image_url: BOCAP,
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
                subtitle: "Từ ngày 22/11 - 21/12",
                image_url: NHANMA,
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
      await callSendAPI(sender_psid, response1);
      await callSendAPI(sender_psid, response2);
      resolve("done");
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  zodiacList: zodiacList,
};
