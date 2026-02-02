import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/configuration";
import { Container, PostCard } from "../components";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    appwriteService.getPosts().then((res) => {
      setPosts(res?.documents || []);
      setLoading(false);
    });
  }, []);

   if (loading) {
    return (
      <Container>
        <p className="py-10 text-center text-gray-500">
          Loading posts...
        </p>
      </Container>
    );
  }


 
  if (posts.length === 0) {
    return (
      <Container>
        <p className="py-10 text-center text-gray-500">
          No posts available
        </p>
      </Container>
    );
  }
  
  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.filter(Boolean).map((post) => (
            <div key={post.$id} className="w-1/4 p-2">
              <PostCard post={post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}; 

export default Home;
