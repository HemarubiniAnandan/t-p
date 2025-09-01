// hash.js
const bcrypt = require("bcrypt");

async function run() {
  const password = "password123";  // put your plain password here
  const saltRounds = 10;            // cost factor

  const hash = await bcrypt.hash(password, saltRounds);
  console.log("Generated bcrypt hash:", hash);
}

run();
