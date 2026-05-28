const allsvenskanData = require("./data/allsvenskan");
const serieAData = require("./data/seriea");
const laLigaData = require("./data/laliga");
const premierLeagueData = require("./data/premierleague");

const allProducts = [
  ...allsvenskanData,
  ...serieAData,
  ...laLigaData,
  ...premierLeagueData,
];

await Product.Product(allProducts);
