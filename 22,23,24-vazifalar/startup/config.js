const config = require("config");

module.exports = function () {
  if (!config.get("jwtPrivateKey")) {
    throw new Error("Jiddiy xato: vu");
    /**
     * in Windows
     * set virtualdars_jwtPrivateKey(muhit o'zgaruvchisi nomi)=buMeningMahfiyKalitim
     */
  }
};
