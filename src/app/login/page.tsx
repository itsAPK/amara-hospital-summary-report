/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [loading,setLoading] = useState(false)

  const onSubmit = async (values: {username : string, password : string}) => {
    setLoading(true)
    const result = await signIn("credentials", {
       ...values,
      redirect: false,
    });
    console.log(result);
    if (result?.ok) {
      router.push("/admin");
    } else {
     toast.error("Invalid username or password");
    }
    setLoading(false)
  };
  return (
    <div
      className={cn("flex h-screen flex-col items-center justify-center gap-6")}
    >
      <Card className="w-[450px]">
        <CardContent>
          <div className="p-6 md:p-8" >
            <div className="flex flex-col gap-10">
              <div className="flex flex-col items-center text-center">
                <img
                  src="https://xewnjhdnjxlaadjthrex.supabase.co/storage/v1/object/public/amarahospital/amaralogo.png?t=2024-12-25T20%3A41%3A42.879Z"
                  alt="logo"
                  className="mb-10 w-28"
                />
                <h1 className="text-xl font-bold">Welcome back</h1>
                <p className="text-balance text-muted-foreground">
                  Login with your username and password
                </p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="userna,e"
                  type="username"
                  placeholder=""
                  required
                  onChange={(e: any) => setUsername(e.target.value)}
                  value={username}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e: any) => setPassword(e.target.value)}
                />
              </div>
              <Button  className="w-full gap-2" onClick={async () => await onSubmit({ username, password })}>
               {loading ?? <Loader className="w-4 h-4"/>} Login
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
