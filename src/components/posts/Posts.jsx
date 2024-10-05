// import Post from "../post/Post";
// import "./posts.scss";

// const Posts = () => {
//   //TEMPORARY
//   const posts = [
//     {
//       id: 1,
//       name: "Dipayan Das",
//       userId: 1,
//       profilePic:
//         "https://i.pinimg.com/736x/96/d5/48/96d54878ddb9b403c8f6fa379a9f38fa.jpg",
//       desc: "Graceful and Majestic: A Deer Roams Amidst Nature's Serenity",
//       img: "https://images.pexels.com/photos/45175/hirsch-forest-wild-fallow-deer-45175.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//     },
//     {
//       id: 2,
//       name: "Akash Gayen",
//       userId: 2,
//       profilePic:
//         "https://i.etsystatic.com/36312491/r/il/b3ab96/4002774090/il_fullxfull.4002774090_780p.jpg",
//       desc: "Unleashing the Magic of Books: Dive into the enchanting realm of knowledge, where imagination thrives, stories come alive, and the library becomes a portal to infinite worlds waiting to be explored.",
//       img: "https://images.pexels.com/photos/2177482/pexels-photo-2177482.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
//     },
    
//   ];

//   return <div className="posts">
//     {posts.map(post=>(
//       <Post post={post} key={post.id}/>
//     ))}
//   </div>;
// };

// export default Posts;

import Post from "../post/Post";
import "./posts.scss";
import { useEffect, useState } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../../firebaseConfig";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="posts">
      {posts.map((post) => (
        <Post post={post} key={post.id} />
      ))}
    </div>
  );
};

export default Posts;
