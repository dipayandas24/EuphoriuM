import { useContext } from "react";
import "./comments.scss";
import { AuthContext } from "../../context/authContext";

const Comments = () => {
  const { currentUser } = useContext(AuthContext);
  //Temporary
  const comments = [
    {
      id: 1,
      desc: "Stunning wildlife capture! The composition and timing are perfect, showcasing the beauty and grace of the subject. You've truly captured the essence of nature in this remarkable photo. Well done!",
      name: "Dipayan Das",
      userId: 1,
      profilePicture:
        "https://i.pinimg.com/736x/96/d5/48/96d54878ddb9b403c8f6fa379a9f38fa.jpg",
    },
    {
      id: 2,
      desc: "Love this library photo! It exudes an atmosphere of tranquility and knowledge. The rows of books and cozy reading nooks beckon one to immerse themselves in a world of endless possibilities. A true haven for book lovers. Thank you for sharing this delightful glimpse into the wonders of literature!",
      name: "Sayan Paul",
      userId: 2,
      profilePicture:
        "https://i.pinimg.com/originals/c8/f1/46/c8f14613fdfd69eaced69d0f1143d47d.jpg",
    },
  ];
  return (
    <div className="comments">
      <div className="write">
        <img src="https://i.pinimg.com/736x/96/d5/48/96d54878ddb9b403c8f6fa379a9f38fa.jpg" alt="" />
        <input type="text" placeholder="write a comment" />
        <button>Send</button>
      </div>
      {comments.map((comment) => (
        <div className="comment">
          <img src={comment.profilePicture} alt="" />
          <div className="info">
            <span>{comment.name}</span>
            <p>{comment.desc}</p>
          </div>
          <span className="date">1 hour ago</span>
        </div>
      ))}
    </div>
  );
};

export default Comments;
