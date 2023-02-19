const { errorNotification } = require("./notification/notification");

const convertImageToBase64 = (img, cb) => {
  let reader = new FileReader();
  reader.readAsDataURL(img);
  reader.onload = function () {
    cb(reader.result, true);
  };
  reader.onerror = function (error) {
    errorNotification(
      "error",
      "Error occured while parsing your image Try again"
    );
    cb(reader.result, false);
  };
};

export default convertImageToBase64;
