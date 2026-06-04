require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./models/productModel");
const User = require("./models/userModel");
const bcrypt = require("bcrypt");

//Importera data från de olika ligorna
const allsvenskanData = require("./data/allsvenskan");
const serieAData = require("./data/seriea");
const laLigaData = require("./data/laliga");
const premierLeagueData = require("./data/premierleague");
const usersData = require("./data/users");

// Anslut till MongoDB
mongoose.connect(process.env.CONNECTION_STRING);

const importData = async () => {
  try {
    // Rensa befintliga produkter
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = [];

    for (const user of usersData) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(user.password, salt);

      createdUsers.push({
        name: user.name,
        email: user.email,
        password: hashedPassword,
        isAdmin: user.isAdmin,
      });
    }

    await User.insertMany(createdUsers);
    console.log("✅ Användare är seedade!");
    // Slå ihop alla produkter från smaliga ligorna till en array

    const allProducts = [
      ...allsvenskanData,
      ...serieAData,
      ...laLigaData,
      ...premierLeagueData,
    ];

    await Product.insertMany(allProducts);

    console.log("✅ Datan är seedad och klar!");
    process.exit(); // Stäng skriptet
  } catch (error) {
    console.error(`❌ Fel vid seedning: ${error.message}`);
    process.exit(1); // Stäng skriptet med en felkod
  }
};

importData();
