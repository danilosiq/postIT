import { api, requestConfig } from "../utils/config";

//get user datils
const profile = async (data, token) => {
  const config = requestConfig("GET", data, token);

  try {
    const res = await fetch(api + "/users/profile", config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log("ERRO: ");
  }
};

//update an user
const updateUser = async (data, token) => {
  const config = requestConfig("PUT", data, token, true);
  try {
    const res = await fetch(api + "/users/", config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

//get user by ID
const getUserDetails = async (id) => {
  const config = requestConfig("GET");

  try {
    const res = await fetch(api + "/users/" + id, config)
      .then((res) => res.json())
      .catch((err) => err);
    return res;
  } catch (error) {}
};

const userService = {
  profile,
  updateUser,
  getUserDetails
};
export default userService;
