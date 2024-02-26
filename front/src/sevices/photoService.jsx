import { api, requestConfig } from "../utils/config";

//publish an user photo
const publish = async (photo, token) => {
  const config = requestConfig("POST", photo, token, true);

  try {
    const res = await fetch(api + "/photos/", config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

//get user photos
const getUserPhotos = async (id, token) => {
  const config = requestConfig("GET", null, token);

  try {
    const res = await fetch(api + "/photos/user/" + id, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

//get photo by ID
const getPhotoById = async (id, token) => {
  const config = requestConfig("GET", null, token);
  try {
    const res = await fetch(api + "/photos/img/" + id, config)
      .then((res) => res.json())
      .catch((err) => err);
    return res;
  } catch (error) {
    console.log(error);
  }
};

//add comment
const commentPhoto = async (data, id, token) => {
  const config = requestConfig("PUT", data, token);

  try {
    const res = await fetch(api + "/photos/comment/" + id, config)
      .then((res) => res.json())
      .catch((err) => err);
    return res;
  } catch (error) {
    console.log(error);
  }
};

//Update photo
const updatePhoto = async (data, id, token) => {
  const config = requestConfig("PUT", data, token);

  try {
    const res = await fetch(api + "/photos/" + id, config)
      .then((res) => res.json())
      .catch((err) => err);
    return res;
  } catch (error) {
    console.log(error);
  }
};

//like a photo
const likePhoto = async (id, token) => {
  const config = requestConfig("PUT", null, token);

  try {
    const res = await fetch(api + "/photos/like/" + id, config)
      .then((res) => res.json())
      .catch((err) => err);
    return res;
  } catch (error) {
    console.log(error);
  }
};

//getAllPhotos
const getAllPhotos = async () => {
  const config = requestConfig("GET");

  try {
    const res = await fetch(api + "/photos/", config)
      .then((res) => res.json())
      .catch((err) => err);
    return res;
  } catch (error) {
    console.log(error);
  }
};

//deletePhoto
const deletePhoto = async (id, token) => {
  const config = requestConfig("DELETE", "", token);

  try {
    const res = await fetch(api + "/photos/" + id, config)
      .then((res) => res.json())
      .catch((err) => err);
    return res;
  } catch (error) {
    console.log(error);
  }
};

//search Photo
const searchPhoto = async (query) => {
  const config = requestConfig("GET");

  try {
    const res = await fetch(api + "/photos/search?q=" + query, config)
      .then((res) => res.json())
      .catch((err) => err);
    return res;
  } catch (error) {
    console.log(error);
  }
};

const photoService = {
  publish,
  getUserPhotos,
  getPhotoById,
  commentPhoto,
  updatePhoto,
  deletePhoto,
  likePhoto,
  getAllPhotos,
  searchPhoto,
};

export default photoService;
