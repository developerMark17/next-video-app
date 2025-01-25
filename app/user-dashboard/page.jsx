"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import {
  IconThumbDown,
  IconThumbUp,
  IconEye,
  IconBasketHeart,
} from "@tabler/icons-react";
import { useCookies } from "react-cookie";
import { redirect, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { store } from "../store/store";
import { addToSaveList } from "../slicer/video-slicer";

import { useSession, signIn, signOut } from "next-auth/react";
import { likesToSave } from "../slicer/likes-slicer";
import { dislikes, dislikesToSave } from "../slicer/dislike-slicer";
import { ToastContainer, toast } from 'react-toastify';
export default function UserDashboard() {
  const [videos, setVideos] = useState([]);
  const { data: session } = useSession();
  const [cookie, setCookies, removeCookies] = useCookies();
  const router = useRouter();
  const dispatch = useDispatch();
  const videosCount = useSelector((state) => state.store.videosCount);
const likesCount = useSelector((state) => state.store.likes);
const[likedVideos, setLikedVideos] = useState([]);
const dislikesCount = useSelector((state) => state.store.dislikes);
const[dislikesVideos, setDislikesVideos] = useState([]);

  // Load videos from backend
  function LoadVideos() {
    const userid = session?.user?.id || cookie["userid"];
    axios
      .get(`http://127.0.0.1:4000/videos`, {
        headers: { userid },
      })
      .then((response) => {
        setVideos(response.data);
        // Avoid duplicate toast notifications
        if (!toast.isActive('login-toast')) {
          toast.success('Logged in Successfully', {
            theme: 'dark',
            toastId: 'login-toast',
          });
        }
      })
      .catch((error) => {
        console.error("Error loading videos:", error);
      });
  }

  useEffect(() => {
    LoadVideos();
  }, []);

  // Handle logout
  function Logout() {
    toast.error('Logging Out', {
      theme: 'dark',
      toastId: 'logout-toast',
    });
  
    // Delay the sign-out and redirection to allow the toast to be displayed
    setTimeout(() => {
      removeCookies("userid");
      signOut({ callbackUrl: "/" });
      router.push("/");
    }, 3000); // Adjust this delay (in milliseconds) as needed for the toast duration
  }
  // Handle save
  function handleSave(video) {
    dispatch(addToSaveList(video));
    if (!toast.isActive(`save-${video.VideoId}`)) {
      toast.success('Added to Wishlist', {
        theme: 'dark',
        toastId: `save-${video.VideoId}`, // Unique toast ID per video
      });
    }
  }

  function likesSave(video) {
    if (likedVideos.includes(video.VideoId)) return;
    dispatch(likesToSave(video));
    setVideos((prevVideos) =>
      prevVideos.map((v) =>
        v.VideoId === video.VideoId ? { ...v, Likes: v.Likes + 1 } : v
      )
    );
    setLikedVideos((prevLiked) => [...prevLiked, video.VideoId]);

    if (!toast.isActive(`like-${video.VideoId}`)) {
      toast.success('Liked successfully!', {
        theme: 'dark',
        toastId: `like-${video.VideoId}`, // Unique toast ID per like
      });
    }
  }

  function dislikes(video) {
    if (dislikesVideos.includes(video.VideoId)) return;
    dispatch(dislikesToSave(video));
    setVideos((prevVideos) =>
      prevVideos.map((v) =>
        v.VideoId === video.VideoId ? { ...v, Dislikes: v.Dislikes - 1 } : v
      )
    );
    setDislikesVideos((prevDislikes) => [...prevDislikes, video.VideoId]);

    if (!toast.isActive(`dislike-${video.VideoId}`)) {
      toast.success('Disliked successfully!', {
        theme: 'dark',
        toastId: `dislike-${video.VideoId}`, // Unique toast ID per dislike
      });
    }
  }

  // Gracefully handle cases where both session and userid cookie are missing
  // if (!session && !cookie["userid"]) {
  //   return <p>Please sign in to access your dashboard.</p>;
  // }

  return (
    <div className="p-10">
      <div className="m-auto">
<ToastContainer   />

      <h1>User Dashboard</h1>
      <h2>
        <span className="font-bold text-2xl">{cookie["userid"]}</span>
        <p>{session?.user?.name}</p>
      </h2>
      </div>

      <div className="flex justify-between">
        <Button onClick={() => Logout()} className="mb-5">
          Logout
        </Button>
        <Link href="/wishList" className={buttonVariants({ variant: "link" })}>
          Wishlist
        </Link>
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        {videos.map((video) => (
          <Card className="w-[350px]" key={video.VideoId}>
            <CardHeader>
              <CardTitle>{video.Title}</CardTitle>
            </CardHeader>
            <CardContent>
              <iframe src={video.Url} frameBorder="0"></iframe>
            </CardContent>
            <CardFooter>
              <div className="flex gap-8">
                
              <button className="hover:scale-110"
  onClick={() => likesSave(video)}
  disabled={likedVideos.includes(video.VideoId)}
>
  <IconThumbUp /> {video.Likes}
  
</button>
<button  className="hover:scale-110"
  onClick={() => dislikes(video)}
  disabled={dislikesVideos.includes(video.VideoId)}
>
  <IconThumbDown /> {video.Dislikes}
</button>
                <IconEye /> {video.Views}
                <button  className="hover:scale-110" onClick={() => handleSave(video)}>
                  <IconBasketHeart />
                </button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
