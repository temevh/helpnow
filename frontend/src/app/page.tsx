"use client";
import dynamic from "next/dynamic";
import { useMemo } from "react";

export default function Home() {
  const Map = useMemo(
    () =>
      dynamic(() => import("@/components/Map"), {
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
        </div>
      </div>
    </div>
  );
}
