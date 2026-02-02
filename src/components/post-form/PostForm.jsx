import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select, RTE } from "../index";
import appWriteService from "../../appwrite/configuration";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PostForm = ({ post }) => {
  const navigate = useNavigate();

  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const userData = useSelector((state) => state.auth?.userData);

  const submit = async (data) => {
    console.log("SUBMIT CLICKED", data);

    if (!userData) {
      alert("Please login again");
      return;
    }
    try {
      //------------------------UPDATE POST------------------------
      if (post) {
        let fileId = post.featuredImage;

        if (data.image?.[0]) {
          const file = await appWriteService.uploadFile(data.image[0]);

          if (file?.$id) {
            await appWriteService.deleteFile(post.featuredImage);
            fileId = file.$id;
          }
        }

        const dbPost = await appWriteService.updatePost(post.$id, {
          title: data.title,
          slug: data.slug,
          content: data.content,
          status: data.status,
          featuredImage: fileId,
        });

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
      //------------------------CREATE POST------------------------
      else {
        if (!data.image?.[0]) {
          alert("Please select a featured image");
          return;
        }

        const file = await appWriteService.uploadFile(data.image[0]);

        if (!file?.$id) {
          alert("Failed to upload featured image");
          return;
        }

        const dbPost = await appWriteService.createPost({
          title: data.title,
          slug: data.slug,
          content: data.content,
          status: data.status,
          featuredImage: file.$id,
          userId: userData.$id,
        });

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    } catch (error) {
      console.error("Post submit failed:", error);
      alert("Something went wrong while saving the post");
    }
  };

  const slugTransform = useCallback((value) => {
    return value
      ?.trim()
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), {
          shouldValidate: true,
        });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="Title"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />

        <Input
          label="Slug"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
        />

        <RTE
          label="Content"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>

      <div className="w-1/3 px-2">
        <Input
          label="Featured Image"
          type="file"
          className="mb-4"
          accept="image/*"
          {...register("image", { required: !post })}
        />

        {post && (
          <img
            src={appWriteService.getFilePreview(post.featuredImage)}
            alt={post.title}
            className="mb-4 rounded-lg"
          />
        )}

        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />

        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full hover:opacity-90"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
};

export default PostForm;
