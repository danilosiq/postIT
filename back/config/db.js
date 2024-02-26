const mongoose = require("mongoose");


const conn = async () => {
  try {
    const dbConn = await mongoose.connect(
      // Aqui você precisa utilizar as variáveis de ambiente para o nome de usuário e senha
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
