const express = require("express");
const router = express.Router();

//controller
const {
  insertPhoto,
  deletePhoto,
  getALLPhotos,
  profilePhotos,
  getPhotoById,
  updatePhoto,
  likePhoto,
  commentPhoto,
  searchPhotos
} = require("../controllers/PhotoController");

//middlewares
const { photoInsertValidation } = require("../middlewares/photoValidation");
const authGuard = require("../middlewares/authGuard");
const validate = require("../middlewares/handleValidation");
const { imageUpload } = require("../middlewares/imageUpload");

//routes
router.post(
  "/",
  authGuard,
  imageUpload.single("image"),
  photoInsertValidation(),
  validate,
  insertPhoto
);

router.delete("/:id", authGuard, deletePhoto);

router.get("/", getALLPhotos);

router.get("/user/:id", authGuard, profilePhotos);
router.get("/search",  searchPhotos);

router.get("/img/:id", authGuard, getPhotoById);
router.put("/:id", authGuard, validate, updatePhoto);
router.put("/like/:id", authGuard, likePhoto);
router.put("/comment/:id", authGuard, commentPhoto);

module.exports = router;
