const db = require("../database-mysql");
const FCM = require("fcm-node");
const SERVER_KEY =
  "AAAA4j8oAgs:APA91bHIEP_9ZhOnedh5ralog6ewH5aZYobuLNAjxz_qcwcyxrpA2-1ReSEQo1glAxTz_kH_a1wWWMv09SZr5KP0T-_Rci6LTGZXqOeOW6S0n2di7KaMqBV5hXvfNCAjviyqebkFQSfa";

const SendFCM = async (req, res, next) => {
  try {
    let fcm = new FCM(SERVER_KEY);
    let message = {
      to: "/topics/my-topic" + req.body.topic,
      notifications: {
        title: req.body.title,
        body: req.body.body,
        sound: "default",
        click_action: "FCM_PLUGIN_ACTIVITY",
        icon: "fcm_push_icon",
      },
    };
    fcm.send(message, (err, response) => {
      if (err) next(err);
      else res.send(response);
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { SendFCM };
