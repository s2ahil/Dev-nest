"use client"
import Image from "next/image";

import { ContentCard } from "@/components/HomeContent";
import Link from "next/link";

// home page
export default function Home() {
  return (
    <main className=" bg-[#F5F5F5]">
      <div className="flex flex-col  items-center gap-5">


       

        <div className="flex flex-col gap-5 max-w-[50rem] md:w-[50rem] h-full">
   
   <div className="font-bold text-black m-2 text-xl text-center">Your Feed</div>

          <ContentCard></ContentCard>

        </div>
      </div>
    </main>
  );
}
