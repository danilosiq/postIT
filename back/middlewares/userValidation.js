const { body } = require("express-validator");

const userCreateValidation = () => {
  return [
    body("name")
      .isString()
      .withMessage("o nome é obrigatório!")
      .isLength({ min: 3 })
      .withMessage("o nome precisa ter pelo menos 3 caracteres"),
    body("email")
      .isString()
      .withMessage("email é obrigatório!")
      .isEmail()
      .withMessage("Email invalido!"),
    body("password")
      .isString()
      .withMessage("Senha obrigatória")
      .isLength({ min: 5 })
      .withMessage("a senha precisa ter no minimo 5 caracteres"),
    body("COpassword")
      .isString()
      .withMessage("Confirmação de Senha é obirgatória")
      .custom((value, { req }) => {
        if (value != req.body.password) {
          throw new Error("As senhas não são iguais.");
        }
        return true;
      }),
  ];
};

const loginValidation = () => {
  return [
    body("email")
      .isString()
      .withMessage("email é obrigatório!")
      .isEmail()
      .withMessage("Email invalido!"),
    body("password").isString().withMessage("Senha obrigatória"),
  ];
};

const userUpdateValidation = () => {
  return [
    body("name")
      .optional()
      .isLength({ min: 3 })
      .withMessage("o nome precisa ter pelo menos 3 caracteres!"),
    body("password")
      .optional()
      .isLength({ min: 5 })
      .withMessage("a senha precisa ter no minimo 5 caracteres"),

  ];
};

module.exports = { userCreateValidation, loginValidation, userUpdateValidation };
