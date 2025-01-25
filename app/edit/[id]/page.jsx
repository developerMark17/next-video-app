'use client'
import axios from "axios";
import { useFormik } from "formik";
import { redirect, useParams } from "next/navigation";
import { useEffect, useState } from "react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export default function EditVideo(){
  let params = useParams()
    const[videos,  setVideos]= useState([{ 
       VideoId: 0,
        Title: "",
        Url: "",
        Likes: 0,
        Dislikes: 0,
        Views: 0,
        CategoryId: 0,}]);

        const[categories,setCategories] = useState([{CategoryId: 0,CategoryName:''}]);

        function LoadCategories(){
            axios.get(`http://127.0.0.1:4000/categories`)
            .then((response)=>{
                response.data.unshift({CategoryId: 0, CategoryName:"Select Category"});
                setCategories(response.data);
            })
        }

        function GetVideos(){
            axios.get(`http://127.0.0.1:4000/video/${params.id}`)
            .then(response=>{
                setVideos(response.data);
            })
        }
        useEffect(()=>{
          if(params?.id){

            LoadCategories();
            GetVideos();
          }
        },[params?.id])

        const formik = useFormik({
            initialValues:{
                VideoId: videos[0].VideoId,
                Title: videos[0].Title,
                Url: videos[0].Url,
                Likes: videos[0].Likes,
                Dislikes: videos[0].Dislikes,
                Views: videos[0].Views,
                CategoryId: videos[0].CategoryId
            },
            onSubmit:(video)=>{
                axios.put(`http://127.0.0.1:4000/edit-video/${video.VideoId}`,video)
                .then(()=>{
                        alert("Video Updated");
                        redirect("/admin-dash");
                })
            },
            enableReinitialize:true
        })

    return(
        <div className="max-w-2xl mx-auto p-6 shadow-md rounded-lg">
            <h1 className="text-2xl font-bold mb-6 text-center">Edit Video</h1>
            <form className="my-8" onSubmit={formik.handleSubmit}>
        <div
          className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="VideoId">Video ID</Label>
            <Input id="videoid" placeholder="Video ID" type="text" name='VideoId' value={formik.values.VideoId} onChange={formik.handleChange} />
          </LabelInputContainer>

        </div>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="Title">Title</Label>
          <Input id="title" placeholder="Title" type="text" name='Title'  value={formik.values.Title} onChange={formik.handleChange} />
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="Url">Url</Label>
          <Input id="url" placeholder="Url" type="text" name='Url' value={formik.values.Url} onChange={formik.handleChange} />
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="Likes">Likes</Label>
          <Input id="likes" placeholder="Likes" type="number" name='Likes' value={formik.values.Likes} onChange={formik.handleChange} />
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="Dislikes">Dislikes</Label>
          <Input id="dislikes" placeholder="Dislikes" type="number" name='Dislikes' value={formik.values.Dislikes} onChange={formik.handleChange} />
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="Views">Views</Label>
          <Input id="views" placeholder="Views" type="number" name='Views' value={formik.values.Views} onChange={formik.handleChange} />
        </LabelInputContainer>

        <Select name="CategoryId" onChange={formik.handleChange} value={formik.values.CategoryId}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {
            categories.map(category=>{
                return <SelectItem key={category.CategoryId} value={category.CategoryId}>{category.CategoryName}</SelectItem>
            })
          }
        </SelectGroup>
      </SelectContent>
    </Select>
       

        <button
          className="bg-gradient-to-br relative group/btn from-blue-500 to-purple-600 block w-full text-white rounded-md h-10 font-medium shadow-md hover:shadow-lg transition-shadow duration-300"
          type="submit">
          Edit Video &rarr;
          <BottomGradient />
        </button>

        <div
          className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
      </form>

        </div>
    )
}

const BottomGradient = () => {
    return (<>
      <span
        className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span
        className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>);
  };
  

const LabelInputContainer = ({
  children,
  className
}) => {
  return (
    (<div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>)
  );
};