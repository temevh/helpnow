"use client";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import { Postlist } from "@/components/Postlist/Postlist";

export default function Home() {
  const Map = useMemo(
    () =>
      dynamic(() => import("@/components/Map/Map"), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    []
  );
  return (
    <div className="font-sans min-h-screen p-8">
      <div className="mx-auto">
        <div className="w-full h-[700px]">
          <Map />
          <Postlist />
        </div>
      </div>
    </div>
  );
}
