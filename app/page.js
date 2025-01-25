import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import './page.css'
export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500  animate-gradient-x">
      <h1 className="text-5xl font-extrabold mb-8 drop-shadow-lg">Welcome to the Video App</h1>
      <div className="flex gap-5">
        <Link href='/user' className={buttonVariants({ variant: "outline" }) + " hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500  transition duration-300 ease-in-out transform hover:scale-110 shadow-lg px-6 py-3 rounded-full text-lg"}>
          User
        </Link>
        <Link href='/videoLibrary' className={buttonVariants({ variant: "outline" }) + " hover:bg-gradient-to-r from-pink-500 to-indigo-500 via-purple-500  transition duration-300 ease-in-out transform hover:scale-110 shadow-lg px-6 py-3 rounded-full text-lg"}>
          Admin
        </Link>
      </div>
    </div>
  );
}