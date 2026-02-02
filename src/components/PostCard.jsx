import React from "react";
import appwriteService from "../appwrite/configuration";
import { Link } from "react-router-dom";

const PostCard = ({ post }) => {

  if (!post) {
    return null;
  }
  
  const imageUrl = post.featuredImage
    ? appwriteService.getFilePreview(post.featuredImage)
    : null;

  return (
    <Link to={`/post/${post.$id}`}>
      <div className="w-full p-4 bg-gray-100 rounded-xl">
        <div className="justify-center w-full mb-4">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={post.title}
              className="rounded-xl"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.src = "/placeholder.png";
              }}
            />
          ) : (
            <div className="w-full h-48 bg-gray-300 rounded-xl animate-pulse">
              No Image
            </div>
          )}
        </div>
        <h2 className="text-xl font-bold">{post.title}</h2>
      </div>
    </Link>
  );
};

export default PostCard;
