const bcrypt = require("bcrypt");
// 12345 => abcde
async function getSalt() {
  const salt = await bcrypt.genSalt();
  const pass = '12345';
  const passHashed = await bcrypt.hash(pass,salt)
  console.log(salt);
  console.log(passHashed);
}
getSalt()
