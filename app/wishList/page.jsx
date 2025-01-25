'use client'
import { useSelector } from "react-redux";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function WishList() {
    const wishlist = useSelector((state) => state.store.videos); // Access saved videos

    return (
        <div className="p-10">
            <h1>Wishlist</h1>
            {wishlist.length === 0 ? (
                <p>No videos added to the wishlist yet!</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {wishlist.map((video) => (
                        <Card className="w-[350px]" key={video.VideoId}>
                            <CardHeader>
                                <CardTitle>{video.Title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <iframe src={video.Url} frameBorder="0"></iframe>
                            </CardContent>
                            <CardFooter>
                                <div className="flex gap-2">
                                    <p>{video.Likes} Likes</p>
                                    <p>{video.Dislikes} Dislikes</p>
                                    <p>{video.Views} Views</p>
                                </div>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
