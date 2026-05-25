const mongoose = require("mongoose");

//CONNECTION TILL MONGODB

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.CONNECTION_STRING);
    console.log(
      "✅ Ansluten till MongoDB via Mongoose!",
      conn.connection.host,
      conn.connection.name,
    );
  } catch (err) {
    console.error("❌ Kunde inte ansluta:", err);
    process.exit(1);
  }
};

module.exports = connectDB;
