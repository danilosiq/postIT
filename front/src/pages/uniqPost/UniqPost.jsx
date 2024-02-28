import React, { useState } from "react";
import "./UniqPost.css";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getPhotoById,
  commentPhoto,
  likePhoto,
  resetMessage,
} from "../../slices/photoSlices";
import { uploads } from "../../utils/config";
import { TbSend } from "react-icons/tb";
import { getUserDetails } from "../../slices/userSlices";
import {
  BsFillPencilFill,
  BsFillHandThumbsUpFill,
  BsHandThumbsUp,
  BsFillPersonFill,
} from "react-icons/bs";
import Message from "../../components/Message";

const UniqPost = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const [like, setLike] = useState(<BsHandThumbsUp />);
  const {
    photos,
    message: PHOTOmessage,
    error: PHOTOerror,
    loading: PHOTOloading,
  } = useSelector((state) => state.photo);

  const {
    user,
    message: USERmessage,
    error: USERerror,
    loading: USERloaging,
  } = useSelector((state) => state.user);

  const { user: original } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!photos || photos._id !== id) {
      dispatch(getPhotoById(id));
    }
  }, [dispatch, id, photos]);

  useEffect(() => {
    if (photos && photos.userId) {
      dispatch(getUserDetails(photos.userId));

      const likedByUser = photos.likes.includes(original._id);
      if (likedByUser == true) {
        setLike(<BsFillHandThumbsUpFill />);
      }
    }
  }, [dispatch, photos]);

  const handleComment = async (e) => {
    e.preventDefault();

    if (comment === "") {
      return;
    }

    const photoData = {
      comment: comment,
      id: photos._id,
    };

    await dispatch(commentPhoto(photoData));

    setComment("");
  };

  const handleLike = (e) => {
    e.preventDefault();
    dispatch(likePhoto(photos._id));

    setLike(<BsFillHandThumbsUpFill />);
  };

  return (
    <>
      {USERloaging && <p>Carregando</p>}
      <div className="uniq">
        <div className="leftCamp">
          <div className="card">
            <div
              className="profile"
              onClick={() => navigate(`/uniqprofile/${user._id}`)}
            >
              <img src={`${uploads}/users/${user.userImage}`} alt="" />
              <h1>{user.name}</h1>
            </div>
            <div className="space">
              <div className="title">
                <h1>{photos.title}</h1>
              </div>
              <div className="comments">
                <h3>Comentarios:</h3>

                {photos.comments &&
                  photos.comments.map((comment) => (
                    <div
                      key={comment.id}
                      className="comment"
                      onClick={() => navigate(`/uniqprofile/${comment.userID}`)}
                    >
                      <div>
                        <p>
                          <BsFillPersonFill />
                          {comment.username}
                        </p>
                        <hr />
                        <textarea
                          name=""
                          id=""
                          disabled
                          value={comment.comment}
                        ></textarea>
                      </div>
                    </div>
                  ))}
              </div>

              <div className="inputComment">
                <form onSubmit={handleComment}>
                  <textarea
                    name=""
                    id=""
                    value={comment || ""}
                    placeholder="Deixe seu comentario..."
                    onChange={(e) => setComment(e.target.value)}
                  ></textarea>
                  <button>
                    <TbSend />
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="bottomSpace">
            <button onClick={handleLike} className="buttonLike">
              {" "}
              {like}
            </button>

            {original._id === photos.userId && (
              <button
                onClick={() => navigate(`/editPost/${photos._id}`)}
                className="changeBTT"
              >
                <BsFillPencilFill />
              </button>
            )}
          </div>
          {PHOTOerror && <Message type="error" msg={PHOTOerror} />}
        </div>

        <div className="rightCamp">
          {photos && photos.image && (
            <img src={`${uploads}/photos/${photos.image}`} alt="" />
          )}
        </div>
      </div>

      <div className="uniq_phone_format">
        

        <div className="leftCamp">
          {photos && photos.image && (
            <img src={`${uploads}/photos/${photos.image}`} alt="" />
          )}
        </div>

        <div className="rightCamp">
          <div className="card">
            <div
              className="profile"
              onClick={() => navigate(`/uniqprofile/${user._id}`)}
            >
              <img src={`${uploads}/users/${user.userImage}`} alt="" />
              <h1>{user.name}</h1>
            </div>
            <div className="space">
              <div className="title">
                <h1>{photos.title}</h1>
              </div>
              <div className="comments">
                <h3>Comentarios:</h3>

                {photos.comments &&
                  photos.comments.map((comment) => (
                    <div
                      key={comment.id}
                      className="comment"
                      onClick={() => navigate(`/uniqprofile/${comment.userID}`)}
                    >
                      <div>
                        <p>
                          <BsFillPersonFill />
                          {comment.username}
                        </p>
                        <hr />
                        <textarea
                          name=""
                          id=""
                          disabled
                          value={comment.comment}
                        ></textarea>
                      </div>
                    </div>
                  ))}
              </div>

              <div className="inputComment">
                <form onSubmit={handleComment}>
                  <textarea
                    name=""
                    id=""
                    value={comment || ""}
                    placeholder="Deixe seu comentario..."
                    onChange={(e) => setComment(e.target.value)}
                  ></textarea>
                  <button>
                    <TbSend />
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="bottomSpace">
            <button onClick={handleLike} className="buttonLike">
              {" "}
              {like}
            </button>

            {original._id === photos.userId && (
              <button
                onClick={() => navigate(`/editPost/${photos._id}`)}
                className="changeBTT"
              >
                <BsFillPencilFill />
              </button>
            )}
          </div>
          {PHOTOerror && <Message type="error" msg={PHOTOerror} />}
        </div>
      </div>
    </>
  );
};

export default UniqPost;
