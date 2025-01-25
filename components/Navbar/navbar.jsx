'use client'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb"
  import { ModeToggle } from "../theme-toggle/theme-toggle"
  import { useSelector, useDispatch } from "react-redux";
  import Link from "next/link";
  import { Button } from "../ui/button";
import { useCookies } from "react-cookie";

export function Navbar(){
  
    return(
        <div>
            <Breadcrumb >
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>

            <h1 className="text-3xl text-left">Video App</h1>
        <ModeToggle/>

      
  </BreadcrumbList>
</Breadcrumb>

        </div>
    )
}