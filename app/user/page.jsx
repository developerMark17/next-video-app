'use client'

import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  IconBrandGithub,
  IconBrandGoogle,
} from "@tabler/icons-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function User() {
  const [cookies, setCookies] = useCookies();
  const [alert, setAlert] = useState(null);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/user-dashboard");
    }
  }, [session, router]);

  const formik = useFormik({
    initialValues: {
      UserId: "",
      Password: "",
    },
    onSubmit: (user) => {
      axios.get(`http://127.0.0.1:4000/users`).then((response) => {
        const result = response.data.find((item) => item.UserId === user.UserId);
        if (result) {
          if (user.Password === result.Password) {
            setCookies("userid", user.UserId);
            showAlert({
              title: "Login Successful",
              description: "You have logged in successfully.",
              type: "success",
            });
            router.push(`/user-dashboard?message=Login Successful`);
          } else {
            showAlert({
              title: "Invalid Password",
              description: "The password you entered is incorrect.",
              type: "error",
            });
          }
        } else {
          showAlert({
            title: "User Not Found",
            description: "The user ID does not exist. Please try again.",
            type: "error",
          });
        }
      });
    },
  });

  function showAlert(alertData) {
    setAlert(alertData);
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  }

  return (
    <div className="flex justify-center">
      <form
        className="my-8 border w-96 p-10 border-red-950 rounded-lg"
        onSubmit={formik.handleSubmit}
      >
        {alert && (
          <Alert
            className={cn(
              "p-4 rounded-lg",
              alert.type === "success"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            )}
          >
            {alert.type === "success" ? (
              <CheckCircle className="h-4 w-4" />
            ) : (
              <Terminal className="h-4 w-4" />
            )}
            <AlertTitle>{alert.title}</AlertTitle>
            <AlertDescription>{alert.description}</AlertDescription>
          </Alert>
        )}
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="firstname">User ID</Label>
            <Input
              id="firstname"
              placeholder="Tyler"
              type="text"
              name="UserId"
              onChange={formik.handleChange}
            />
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            placeholder="••••••••"
            type="password"
            name="Password"
            onChange={formik.handleChange}
          />
        </LabelInputContainer>
        <button
          className="mb-2 bg-gradient-to-br relative group/btn from-black to-neutral-600 block w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Sign in &rarr;
          <BottomGradient />
        </button>
        <Link href='/new-user' className="underline ">New User</Link>
        <div className="bg-gradient-to-r from-transparent via-neutral-300 to-transparent my-8 h-[1px] w-full" />
        <div className="flex flex-col space-y-4">
        <button
          onClick={() => signIn("github")}
            className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="submit">
            <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              Github
            </span>
            <BottomGradient />
          </button>
          <button
          onClick={() => signIn("google")}
            className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="submit">
            <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              Google
            </span>
            <BottomGradient />
          </button>
        </div>
      </form>
    </div>
  );
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