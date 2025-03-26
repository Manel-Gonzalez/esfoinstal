require("dotenv").config();
const express = require("express");
const cors = require("cors");
const {Sequelize} = require("sequelize");
const dbConfig = require("./config/config.js")["development"];
const sequelize = new Sequelize(dbConfig);

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());

sequelize
  .authenticate()
  .then(() => console.log("✅ Connecting to SQLite DB"))
  .catch((err) => console.error("❌ Error trying to conect to the DB", err));

app.get("/", (req, res) => {
  res.send("🚀 Backend working with SQLite & Express");
});

const testRoute = require("./routes/testRoute");
app.use("/api/test", testRoute);

if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

module.exports = app;
