// import "./share.scss";
// import Image from "../../assets/img.png";
// import Map from "../../assets/map.png";
// import Friend from "../../assets/friend.png";
// import { useContext } from "react";
// import { AuthContext } from "../../context/authContext";

// const Share = () => {

//   const {currentUser} = useContext(AuthContext)
//   return (
//     <div className="share">
//       <div className="container">
//         <div className="top">
//           <img
//             src="https://i.pinimg.com/736x/96/d5/48/96d54878ddb9b403c8f6fa379a9f38fa.jpg"
//             alt=""
//           />
//           <input type="text" placeholder={`What's on your mind Dipayan?`} />
//         </div>
//         <hr />
//         <div className="bottom">
//           <div className="left">
//             <input type="file" id="file" style={{display:"none"}} />
//             <label htmlFor="file">
//               <div className="item">
//                 <img src={Image} alt="" />
//                 <span>Add Image</span>
//               </div>
//             </label>
//             <div className="item">
//               <img src={Map} alt="" />
//               <span>Add Place</span>
//             </div>
//             <div className="item">
//               <img src={Friend} alt="" />
//               <span>Tag Friends</span>
//             </div>
//           </div>
//           <div className="right">
//             <button>Share</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Share;

import "./share.scss";
import Image from "../../assets/img.png";
import Map from "../../assets/map.png";
import Friend from "../../assets/friend.png";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/authContext";
import { db, storage } from "../../firebaseConfig";
import { doc, getDoc, addDoc, collection, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const Share = () => {
  const { currentUser } = useContext(AuthContext);
  const [displayName, setDisplayName] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      if (currentUser) {
        const userDoc = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(userDoc);

        if (docSnap.exists()) {
          setDisplayName(docSnap.data().displayName || "User");
        } else {
          console.log("No such document!");
        }
      }
    };

    fetchUserData();
  }, [currentUser]);
  

  const handleUpload = async (e) => {
    e.preventDefault();
    if (desc || file) {
      let imgUrl = "";
      if (file) {
        setIsUploading(true);
        const storageRef = ref(storage, `posts/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
          "state_changed",
          null,
          (error) => {
            console.log(error);
            setIsUploading(false);
          },
          async () => {
            imgUrl = await getDownloadURL(uploadTask.snapshot.ref);
            setIsUploading(false);
            handlePost(imgUrl);
          }
        );
      } else {
        handlePost(imgUrl);
      }
    }
  };

  const handlePost = async (imgUrl) => {
    try {
      await addDoc(collection(db, "posts"), {
        desc,
        img: imgUrl,
        likes: [],
        commentsCount: 0,
        name: displayName,
        profilePic: currentUser.photoURL,
        timestamp: serverTimestamp(),
        userId: currentUser.uid,
      });
      setDesc("");
      setFile(null);
    } catch (err) {
      console.error("Error adding document: ", err);
    }
  };

  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <img
            src={currentUser.photoURL || "https://i.pinimg.com/736x/96/d5/48/96d54878ddb9b403c8f6fa379a9f38fa.jpg"}
            alt=""
          />
          <input
            type="text"
            placeholder={`What's on your mind ${displayName?.split(' ')[0] || "User"}?`}
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <input
              type="file"
              id="file"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
            <label htmlFor="file">
              <div className="item">
                <img src={Image} alt="" />
                <span>Add Image</span>
              </div>
            </label>
            <div className="item">
              <img src={Map} alt="" />
              <span>Add Place</span>
            </div>
            <div className="item">
              <img src={Friend} alt="" />
              <span>Tag Friends</span>
            </div>
          </div>
          <div className="right">
            <button onClick={handleUpload} disabled={isUploading}>
              {isUploading ? "Uploading..." : "Share"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;
