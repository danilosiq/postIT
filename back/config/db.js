const mongoose = require("mongoose");


const conn = async () => {
  try {
    const dbConn = await mongoose.connect(
      process.env.DB_CONNECT_URL
    );

    console.log("Banco Conectado!");
    return dbConn;
  } catch (error) {
    console.log(error);
  }
};
conn();

module.exports = conn;
