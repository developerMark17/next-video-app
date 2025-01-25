'use client'
import axios from "axios"
import { useFormik } from "formik"
import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

import { redirect } from "next/navigation";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export default function AddVideos() {
    const [categories, setCategories] = useState([{ CategoryId: 0, CategoryName: '' }])

    const formik = useFormik({
        initialValues: {
            VideoId: 0,
            Title: "",
            Url: '',
            Likes: 0,
            Dislikes: 0,
            Views: 0,
            CategoryId: 0
        },
        onSubmit: (video) => {
            axios.post(`http://127.0.0.1:4000/add-video`, video)
                .then(() => {
                    console.log(video)
                    alert("Video Added successfully")
                    redirect('/admin-dash')
                })
        }
    })

    function LoadCategories() {
        axios.get(`http://127.0.0.1:4000/categories`)
            .then((response) => {
                response.data.unshift({ CategoryId: 0 });
                setCategories(response.data)
            })
    }
    useEffect(() => {
        LoadCategories();
    }, [])
    return (
        <div className=" p-8 rounded-lg shadow-lg max-w-lg mx-auto">
            <h1 className="text-2xl font-bold text-center mb-6">Add Videos</h1>
            <div className="flex justify-center">
                <form className="my-8 w-full" onSubmit={formik.handleSubmit}>
                    <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                        <LabelInputContainer>
                            <Label htmlFor="VideoId">Video ID</Label>
                            <Input id="videoid" placeholder="Video ID" type="text" name='VideoId' onChange={formik.handleChange} className="border border-gray-300 rounded-md p-2" />
                        </LabelInputContainer>
                    </div>

                    <LabelInputContainer className="mb-4">
                        <Label htmlFor="Title">Title</Label>
                        <Input id="title" placeholder="Title" type="text" name='Title' onChange={formik.handleChange} className="border border-gray-300 rounded-md p-2" />
                    </LabelInputContainer>

                    <LabelInputContainer className="mb-4">
                        <Label htmlFor="Url">Url</Label>
                        <Input id="url" placeholder="Url" type="text" name='Url' onChange={formik.handleChange} className="border border-gray-300 rounded-md p-2" />
                    </LabelInputContainer>

                    <LabelInputContainer className="mb-4">
                        <Label htmlFor="Likes">Likes</Label>
                        <Input id="likes" placeholder="Likes" type="text" name='Likes' onChange={formik.handleChange} className="border border-gray-300 rounded-md p-2" />
                    </LabelInputContainer>

                    <LabelInputContainer className="mb-4">
                        <Label htmlFor="Dislikes">Dislikes</Label>
                        <Input id="dislikes" placeholder="Dislikes" type="text" name='Dislikes' onChange={formik.handleChange} className="border border-gray-300 rounded-md p-2" />
                    </LabelInputContainer>

                    <LabelInputContainer className="mb-4">
                        <Label htmlFor="Views">Views</Label>
                        <Input id="views" placeholder="Views" type="text" name='Views' onChange={formik.handleChange} className="border border-gray-300 rounded-md p-2" />
                    </LabelInputContainer>

                    <Select name="CategoryId" onChange={formik.handleChange} className="mb-4">
                        <SelectTrigger className="w-full mt-7 border border-gray-300 rounded-md p-2">
                            <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {
                                    categories.map(category => {
                                        return <SelectItem key={category.CategoryId} value={category.CategoryId}>{category.CategoryName}</SelectItem>
                                    })
                                }
                            </SelectGroup>
                        </SelectContent>
                    </Select>

                    <button
                        className="bg-gradient-to-br relative mt-10 group/btn from-blue-500 to-blue-700 block w-full text-white rounded-md h-10 font-medium shadow-md hover:shadow-lg transition-shadow duration-300"
                        type="submit">
                        Add Video &rarr;
                        <BottomGradient />
                    </button>

                    <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
                </form>
            </div>
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