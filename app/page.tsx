"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { convertHslToHexInCss } from "@/lib/hslToHex";

export default function Home() {
  const [outputCss, setOutputCss] = useState("");

  const handleInput = (e: any) => {
    const { value } = e.target;
    setOutputCss(convertHslToHexInCss(value));
  };

  return (
    <main className="flex min-h-screen flex-col items-center gap-10 p-24">
      <Textarea className="border-black h-[40vh]" onChange={handleInput} />
      <h1 className="text-xl font-bold">Output:</h1>
      <div>{outputCss}</div>
    </main>
  );
}
