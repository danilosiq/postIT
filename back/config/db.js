const mongoose = require("mongoose");
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

const conn = async () => {
  try {
    const dbConn = await mongoose.connect(
      // Aqui você precisa utilizar as variáveis de ambiente para o nome de usuário e senha
      `mongodb://danilo:feL02RCVf1SR8sNH@ac-t7kir5r-shard-00-00.mapxdi9.mongodb.net:27017,ac-t7kir5r-shard-00-01.mapxdi9.mongodb.net:27017,ac-t7kir5r-shard-00-02.mapxdi9.mongodb.net:27017/?ssl=true&replicaSet=atlas-jalk8v-shard-0&authSource=admin&retryWrites=true&w=majority`
    );

    console.log("Banco Conectado!");
    return dbConn;
  } catch (error) {
    console.log(error);
  }
};
conn();

module.exports = conn;
