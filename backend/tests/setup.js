const dotenv = require("dotenv");
const path = require("path");

if (process.env.NODE_ENV === "test") {
  dotenv.config({ path: path.resolve(__dirname, "../.env.test") });
} else {
  dotenv.config();
}
