const Photo = require("../models/Photo");
const mongoose = require("mongoose");
const User = require("../models/User");

//insert foto
const insertPhoto = async (req, res) => {
  const { title } = req.body;
  const image = req.file.filename;

  const reqUser = req.user;
  const user = await User.findById(reqUser._id);

  //new Photo
  const newPhoto = await Photo.create({
    image,
    title,
    userId: user._id,
    username: user.name,
  });

  //if photo created
  if (!newPhoto) {
    res.status(422).json({ errors: ["ERRO na imagem!"] });
  }

  res.status(201).json(newPhoto);
};

//delete photo
const deletePhoto = async (req, res) => {
  const { id } = req.params;
  const reqUser = req.user;
  const img = await Photo.findById(id);

  //check if exist
  if (!img) {
    res.status(404).json({ errors: ["imagem nao existe"] });
    return;
  }
  //check if the foto belongs user
  if (img.userId === reqUser._id) {
    res.status(422).json({ errors: ["Ocorreu um erro"] });
    return;
  }

  await Photo.findByIdAndDelete(img._id);
  res.status(200).json({ id: img.id, message: "foto exluida com sucesso!" });
};

//get all de imgaes
const getALLPhotos = async (req, res) => {
  const photos = await Photo.find({})
    .sort([["createdAt", -1]])
    .exec();
  res.status(200).json(photos);
};

//get profile photos
const profilePhotos = async (req, res) => {
  const { id } = req.params;

  const photos = await Photo.find({ userId: id })
    .sort([["createdAt", -1]])
    .exec();
  res.status(200).json(photos);
};

//get image from ID
const getPhotoById = async (req, res) => {
  const { id } = req.params;

  try {
    const photo = await Photo.findById(id);
    res.status(200).json(photo);
    if (!photo) {
      res.status(404).json({ errors: ["Imagem nao encontrada"] });
      return;
    }
  } catch (error) {
    res.status(404).json({ errors: ["Imagem nao encontrada"] });
    return;
  }
};

//update a photo
const updatePhoto = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const reqUser = req.user;
  const photo = await Photo.findById(id);

  //check if photo exist
  if (!photo) {
    res.status(404).json({ errors: ["Imagem nao encontrada"] });
    return;
  }

  if (title) {
    photo.title = title;
  }

  await photo.save();
  res.status(200).json(photo);
};

//like funcionality
const likePhoto = async (req, res) => {
  const { id } = req.params;
  const reqUser = req.user;
  const photo = await Photo.findById(id);

  if (!photo) {
    res.status(404).json({ errors: ["Imagem nao encontrada"] });
    return;
  }

  //check if user already liked
  if (photo.likes.includes(reqUser.id)) {
    res.status(422).json({ errors: ["O usuario ja curtiu essa photo"] });
    return;
  }

  //add user in Likes array
  photo.likes.push(reqUser.id);
  await photo.save();
  res
    .status(200)
    .json({ photoId: id, userId: reqUser._id, message: "Foto curtida" });
};

//add comment in photo
const commentPhoto = async (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;
  const reqUser = req.user;

  const photo = await Photo.findById(id);

  //check if photo exist
  if (!photo) {
    res.status(404).json({ errors: ["Imagem nao encontrada"] });
    return;
  }

  const commentArr = {
    comment,
    userImage:reqUser.userImage,
    userID: reqUser._id,
    username: reqUser.name,
  };

  photo.comments.push(commentArr);
  await photo.save();
  res.status(200).json(commentArr);
};

//serach foto
const searchPhotos = async (req, res) => {
  const { q } = req.query;
  const photos = await Photo.find({ title: new RegExp(q, "i") }).exec();
  res.status(200).json(photos);

};

module.exports = {
  insertPhoto,
  deletePhoto,
  getALLPhotos,
  profilePhotos,
  getPhotoById,
  updatePhoto,
  likePhoto,
  commentPhoto,
  searchPhotos,
};
