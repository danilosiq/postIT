require("dotenv").config()

const express = require("express");
const path = require("path");
const cors = require("cors");
const { log } = require("console");

const port = process.env.PORT;

const app = express();

//config JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//CORS
app.use(cors());
app.use(cors({credentials:true, origin:process.env.ORIGIN}))


//upload directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//DB connection
require("./config/db.js")

//routes
const router = require("./routes/Router.js")
app.use(router)

app.listen(port, () => {
  console.log("APP rodando na porta " + port);
});
