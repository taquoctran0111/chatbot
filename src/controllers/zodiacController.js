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

const INFOBACHDUONG =
  "Vốn là người luôn hết mình vì bạn bè và gia đình nên Bạch Dương được rất nhiều người yêu quý. Song họ nổi tiếng là nóng nảy và thẳng thắn nên đôi khi làm cho người khác cảm thấy sốc, bất ngờ. Nhiều lúc chính sự thẳng thắn và nóng nảy này làm cho Bạch Dương vướng phải nhiều rắc rối, tranh cãi.\nBên cạnh đó, Bạch Dương có khả năng tập trung vào công việc khá cao và tham vọng lớn nên họ tương đối thành công. Không những làm việc chăm chỉ mà Bạch Dương còn chơi hết mình và luôn tạo cảm giác vui vẻ cho mọi người.";
const INFOKIMNGUU =
  "Cung hoàng đạo này luôn đối của tốt với mọi người xung quanh. Họ sẵn sàng giúp đỡ khi bạn khó khăn mà không tính toán hay đòi hỏi bất kì điều gì.  Hết mình vì bạn bè, luôn chân thành là những điều dễ thấy ở Kim Ngưu.\nHọ là người sống khá nội tâm, đôi khi lại trở nên điên loạn, bất cần và đùa bất chấp. Tuy nhiên nét tính cách nổi bật của Kim Ngưu chính là ương bướng, cứng đầu. Họ luôn bảo vệ những điều họ cho là đúng mặc kệ người khác khuyên răn.Chính nét tính cách này khiến cho Ngưu không ít lần vướng phải khó khăn trong cuộc sống.";
const INFOSONGTU =
  "Là người có đầu óc và tư duy tốt nên Song Tử dễ dàng ứng phó với mọi tình huống. Họ luôn cách giải quyết công việc một cách chu đáo, hợp lý nhất. Bên cạnh đó, Song Tử còn có khả năng ăn nói lưu loát và khéo léo nên họ được nhiều người yêu quý và tạo nhiều niềm vui cho mọi người.\nCung hoàng đạo này có tính cách, cảm xúc thay đổi bất thường khiến mọi người khó mà biết trước được. Đôi khi họ còn làm việc theo hứng mặc kệ công việc có gấp rút thế nào mà họ không thích thì sẵn sàng không làm.";
const INFOCUGIAI =
  "Cự Giải là người luôn yêu thương người khác và mang lại những cảm giác ấm áp cho họ. Họ luôn là người bạn đáng tin cậy, là người bạn tri kỷ mà ai cũng muốn có.  Đồng thời, Cự Giải luôn tin vào giác quan của bản thân, tin tưởng vào những gì họ cho là đúng.\nThế nhưng Cự Giải lại luôn bị cảm giác thiếu an toàn làm ảnh hưởng khiến họ luôn thấy bất an về mọi thứ. Đôi khi việc Cự Giải quan tâm người khác lại làm cho họ thấy phiền và làm tổn thương tới Cự Giải.";
const INFOSUTU =
  "Họ luôn là người phóng khoáng, đầy sáng tạo. Sư Tử luôn vui hết mức, chơi hết mình, và sẵn sàng xả thân nếu bạn cần sự giúp đỡ. Bên cạnh đó họ luôn muốn thử sức với những điều mới lạ và mong muốn được khám phá nhiều hơn.\nTuy nhiên chính vì luôn tự tin quá mức khiến cho Sư Tử dễ có thể chủ quan làm cho công việc gặp khó khăn. Đôi khi việc cái tôi của Sư Tử quá lớn cũng làm cho công việc bị cản trở, ảnh hưởng.";
const INFOXUNU =
  "Thông minh, sắc sảo, giàu ý chí tiến thủ- Xử Nữ luôn biết cách giải quyết mọi chuyện sao cho êm đẹp, hoàn mỹ nhất. Bên cạnh đó Xử Nữ cũng có khả năng kiểm soát tốt nên luôn đem lại cho mọi người sự yên tâm, thoải mái.\nXử Nữ luôn phấn đấu vì một cái nhìn hoàn thiện, không ngừng phấn đấu về mọi mặt để đạt được kết quả cao nhất, hoàn mỹ nhất. Tuy nhiên đôi khi chính sự đòi hỏi toàn vẹn ấy lại khiến Xử Nữ cảm thấy bế tắc và làm cho mình thấy mệt mỏi, khó khăn.";
const INFOTHIENBINH =
  "Thiên Bình có nét đẹp trời phú nên họ lúc nào cũng đào hoa, người theo nườm nượp. Bên cạnh đó Thiên Bình luôn vui vẻ, hòa đồng nên rất được lòng mọi người. Họ luôn bảo vệ những điều họ cho là đúng, sống chân thành và biết suy nghĩ cho người khác.\nLưỡng lự là nét tính cách dễ thấy ở Thiên Bình. Họ thường băn khoăn không biết nên làm gì, đôi khi là đứng núi này trông núi nọ nên công việc thường gặp đôi chút khó khăn nhưng chỉ cần quyết định xong họ sẽ gắng hết sức mà hoàn thành nó.";
const INFOBOCAP =
  "Bọ Cạp luôn là người bí ẩn nhất trong 12 chòm sao. Họ thường che giấu cảm xúc của mình khiến người bên ngoài nhiều lúc sẽ không biết được Bọ Cạp có gặp phải khó khăn hay lo lắng chuyện gì không. Là người đơn giản không thích sự phô trương nên họ muốn được sống giản dị và làm chủ mọi vấn đề.\nSự bí ẩn nhiều khi khiến Bọ Cạp cảm thấy cô đơn và trống vắng. Họ sẽ không chia sẻ tâm sự với ai mà tự mình trải qua mọi thứ khiến mọi chuyện trở nên không mấy suôn sẻ với họ.";
const INFONHANMA =
  "Họ là người sống chân thành và không so đo, tính toán với ai. Luôn sống hết mình vì bạn bè để tâm hồn được sảng khoái khiến Nhân Mã luôn vui vẻ và được mọi người yêu mến.\nHọ là yêu thích tự do và khám phá nên nếu phải ở lâu một chỗ hoặc phải làm một công việc quá nhàm chán họ sẽ không chịu được mà phải xả stress ngay lập tức. Tuy nhiên đôi khi vì nét tính cách này khiến cho Nhân Mã chậm trễ trong công việc.";
const INFOMAKET =
  "Ma Kết dường như luôn nghiêm túc với mọi thứ cả trong công việc, gia đình hay chuyện tình cảm. Họ không muốn mình bị lừa dối ngay cả những thứ nhỏ nhặt nhất. Bên cạnh đó họ luôn chân thành và lãng mạn với bạn, thích bày tỏ cảm xúc của mình thông qua hành động thay vì lời nói.\nVới những người đã thân thiết Ma Kết có thể sẽ thoải mái và vui vẻ hơn. Thế nhưng Ma Kết khá ít nói và không giỏi ăn nói nên nhiều khi khiến người khác hiểu lầm hay cảm thấy không có thiện cảm.";
const INFOBAOBINH =
  "Là con người hoàn toàn tin tưởng vào khoa học và phân tích, thích khám phá nên họ luôn đam mê với việc tìm tòi và phát hiện mọi thứ. Ngoài ra, họ cũng là người yêu thương gia đình và biết quan tâm đến bạn bè nên được nhiều người quý mến.\nBảo Bình thường tỏ ra lạnh lùng và là người khó làm thân, nhiều lúc lại không biết biểu đạt cảm xúc đúng cách khiến cho mọi người nghĩ họ chảnh, mệt mỏi.";
const INFOSONGNGU =
  "Vốn có tính cách tốt bụng và trong sáng nên Song Ngư được lòng nhiều người. Họ sẽ làm cho bầu không khí trở nên vui vẻ mỗi khi ở đó.\nTuy nhiên Song Ngư lại mơ mộng quá mức và đôi khi sống xa rời thực tế. Bên cạnh đó chòm sao này dễ có thể bị người khác từ chối vì quá tốt bụng. Vì vậy họ cũng cần phải học cách từ chối trong vài trường hợp.";
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
                    payload: "ZODIACINFO1",
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
                    payload: "ZODIACINFO2",
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
                    payload: "ZODIACINFO3",
                  },
                ],
              },
              {
                title: "Cung Bạch Dương",
                subtitle: "Từ ngày 21/3 - 19/4",
                image_url: BACHDUONG,
                buttons: [
                  {
                    type: "postback",
                    title: "Xem thông tin",
                    payload: "ZODIACINFO4",
                  },
                ],
              },
              {
                title: "Cung Kim Ngưu",
                subtitle: "Từ ngày 20/4 - 20/5",
                image_url: KIMNGUU,
                buttons: [
                  {
                    type: "postback",
                    title: "Xem thông tin",
                    payload: "ZODIACINFO5",
                  },
                ],
              },
              {
                title: "Cung Song Tử",
                subtitle: "Từ ngày 21/5 - 21/6",
                image_url: SONGTU,
                buttons: [
                  {
                    type: "postback",
                    title: "Xem thông tin",
                    payload: "ZODIACINFO6",
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
                title: "Cung Cự Giải",
                subtitle: "Từ ngày 22/6 - 22/7",
                image_url: CUGIAI,
                buttons: [
                  {
                    type: "postback",
                    title: "Xem thông tin",
                    payload: "ZODIACINFO7",
                  },
                ],
              },
              {
                title: "Cung Sư Tử",
                subtitle: "Từ ngày 23/7 - 23/8",
                image_url: SUTU,
                buttons: [
                  {
                    type: "postback",
                    title: "Xem thông tin",
                    payload: "ZODIACINFO8",
                  },
                ],
              },
              {
                title: "Cung Xử Nữ",
                subtitle: "Từ ngày 24/8 - 22/9",
                image_url: XUNU,
                buttons: [
                  {
                    type: "postback",
                    title: "Xem thông tin",
                    payload: "ZODIACINFO9",
                  },
                ],
              },
              {
                title: "Cung Thiên Bình",
                subtitle: "Từ ngày 23/9 - 22/10",
                image_url: THIENBINH,
                buttons: [
                  {
                    type: "postback",
                    title: "Xem thông tin",
                    payload: "ZODIACINFO10",
                  },
                ],
              },
              {
                title: "Cung Bọ Cạp",
                subtitle: "Từ ngày 23/10 - 21/11",
                image_url: BOCAP,
                buttons: [
                  {
                    type: "postback",
                    title: "Xem thông tin",
                    payload: "ZODIACINFO11",
                  },
                ],
              },
              {
                title: "Cung Nhân Mã",
                subtitle: "Từ ngày 22/11 - 21/12",
                image_url: NHANMA,
                buttons: [
                  {
                    type: "postback",
                    title: "Xem thông tin",
                    payload: "ZODIACINFO12",
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
async function handlePostbackZodiac(sender_psid, received_postback) {
  let response;
  let payload = received_postback.payload;

  switch (payload) {
    case "ZODIAC":
      response = zodiacController.zodiacList(sender_psid);
      break;
    case "ZODIACINFO1":
      response = { text: INFOMAKET };
      break;
    case "ZODIACINFO2":
      response = { text: INFOBAOBINH };
      break;
    case "ZODIACINFO3":
      response = { text: INFOSONGNGU };
      break;
    case "ZODIACINFO4":
      response = { text: INFOBACHDUONG };
      break;
    case "ZODIACINFO5":
      response = { text: INFOKIMNGUU };
      break;
    case "ZODIACINFO6":
      response = { text: INFOSONGTU };
      break;
    case "ZODIACINFO7":
      response = { text: INFOCUGIAI };
      break;
    case "ZODIACINFO8":
      response = { text: INFOSUTU };
      break;
    case "ZODIACINFO9":
      response = { text: INFOXUNU };
      break;
    case "ZODIACINFO10":
      response = { text: INFOTHIENBINH };
      break;
    case "ZODIACINFO11":
      response = { text: INFOBOCAP };
      break;
    case "ZODIACINFO12":
      response = { text: INFONHANMA };
      break;
    default:
      response = { text: "I don't understand!" };
      break;
  }
  callSendAPI(sender_psid, response);
}
module.exports = {
  zodiacList: zodiacList,
  handlePostbackZodiac: handlePostbackZodiac,
};
