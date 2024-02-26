const { body } = require("express-validator");

const photoInsertValidation = () => {
  return [
    body("title")
      .not()
      .equals("undefined")
      .withMessage("Titulo Obrigatório ")
      .isString()
      .withMessage("Titulo Obrigatório "),
    body("image").custom((value, { req }) => {
      if(!req.file){
        throw new Error("a imagem é obirgatoria")
      }
      return true
    }),
  ];
};

module.exports ={
    photoInsertValidation
}
