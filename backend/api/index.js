require("dotenv").config();
const express = require("express");
const cors = require("cors");
const supabase = require("../supabaseClient");

/* const {Sequelize} = require("sequelize");
 */ /* const sequelize = new Sequelize(dbConfig);
 */
const testRoute = require("../routes/testRoute");
const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());

/* sequelize
  .authenticate()
  .then(() => console.log("✅ Connecting to SQLite DB"))
  .catch((err) => console.error("❌ Error trying to conect to the DB", err)); */

app.get("/api/test", async (req, res) => {
  const {data, error} = await supabase.from("test").select("message").limit(1);

  if (error) {
    console.error("❌ Supabase error:", error);
    return res.status(500).json({error: "Error fetching data"});
  }

  res.json({message: data?.[0]?.message || "Sin datos"});
});

if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

app.get("/", (req, res) => {
  res.send("🚀 Backend working with Supabase!");
});

module.exports = app;
