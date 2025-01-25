'use client'
import axios from "axios";
import { useEffect, useState } from "react"
import { redirect} from "next/navigation";
import Link from "next/link";
import { useParams } from "next/navigation";
import * as React from "react"
 
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function DeleteVideo(){
    let params = useParams();

   const[videos,  setVideos]= useState([{ 
       VideoId: 0,
        Title: "",
        Url: "",
        Likes: 0,
        Dislikes: 0,
        Views: 0,
        CategoryId: 0,}]);

        function GetVideos(){
            axios.get(`http://127.0.0.1:4000/video/${params.id}`)
            .then(response=>{
                setVideos(response.data);
            })
        }

    useEffect(()=>{
        GetVideos();
    },[])
    

    function handleDeleteClick(){
        axios.delete(`http://127.0.0.1:4000/delete-video/${params.id}`)
        .then(()=>{
            alert("Video deleted successfully");
            redirect("/admin-dash");
        })
    }

   
    return(
        <div>
       <div>
            <h1 className="text-center mb-8">Delete Video</h1>
        <Card className="w-[350px] m-auto ">
      <CardHeader>
        <CardTitle>{videos[0].Title}</CardTitle>
       
      </CardHeader>
      <CardContent>
      <iframe src={videos[0].Url} frameborder="0"></iframe>
      </CardContent>
      <CardFooter className="flex justify-between">
            <Link href='/admin-dash'>
        <Button variant="outline" >
            Cancel
            </Button>
            </Link>
        <Button onClick={handleDeleteClick}>Delete</Button>
      </CardFooter>
    </Card>
       
        </div>
       

        </div>
    )
}
