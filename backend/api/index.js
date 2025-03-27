require("dotenv").config();
const express = require("express");
const cors = require("cors");
const {Sequelize, DataTypes} = require("sequelize");
const dbConfig = require("../config/config.js")["development"];
console.log("DB CONFIG:", dbConfig);

const testRoute = require("../routes/testRoute");
const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());

sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    dialectOptions: dbConfig.dialectOptions,
    logging: false,
  }
);

const Test = require("../models/test")(sequelize, DataTypes);

sequelize.sync().then(async () => {
  console.log("🗂️ Models synced");

  const existing = await Test.findOne({
    where: {message: "¡Hola desde MariaDB!"},
  });

  if (!existing) {
    await Test.create({message: "¡Hola desde MariaDB!"});
    console.log("✅ Mensaje insertado en MariaDB");
  }
});

app.get("/api/test", async (req, res) => {
  try {
    const result = await Test.findOne();
    res.json({message: result?.message || "Sin datos"});
  } catch (error) {
    console.error("❌ DB Error:", error);
    res.status(500).json({error: "Database error"});
  }
});

if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}

module.exports = app;
