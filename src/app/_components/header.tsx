/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";
import AnimatedGradientText from "@/components/animated-gradient-text";
import { Button } from "@/components/ui/button";
import { SunIcon, MoonIcon, LogOutIcon } from "lucide-react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
export function Header() {
  const router = useRouter();
  return (
    <div className="my-3 flex mx-7 h-20 items-center rounded-full border-gray-300 bg-gray-100 px-4 shadow-md dark:bg-gray-800">
      <div className="flex items-center space-x-4">
        <img
          src="https://xewnjhdnjxlaadjthrex.supabase.co/storage/v1/object/public/amarahospital/amaralogo.png?t=2024-12-25T20%3A41%3A42.879Z"
          alt="logo"
          className="w-16"
        />
        <div className="relative w-full">
          <AnimatedGradientText>
            <span
              className={cn(
                `animate-gradient inline bg-gradient-to-r from-[#d400ff] via-[#e52e71] to-[#ff0084] bg-[length:var(--bg-size)_100%] bg-clip-text text-[20px] font-semibold text-transparent`,
              )}
              style={{ fontFamily: '"Montserrat", sans-serif' }}
            >
              AMARA HOSPITAL SUMMARY REPORT
            </span>
          </AnimatedGradientText>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-end space-x-5 text-primary">
        <ThemeToggle />
        <Button
      variant="ghost"
      size="icon"
      className="rounded-full"
      onClick={async () => {
        await signOut({
        redirect : false,
      })
      router.push("/login");
    }
   
    }
    >
      <LogOutIcon
        className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
        aria-hidden="true"/>
      <span className="sr-only">Toggle theme</span>
    </Button>
      </div>
    </div>
  );
}
