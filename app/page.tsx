"use client";

import Image from "next/image";
import { useState } from "react";
import timelineData from "../data/timeline.json";

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="relative min-h-screen p-8 pb-20 sm:p-20">
      {/* Timeline */}
      <div className="relative border-l-2 border-gray-300">
        {timelineData.map((event) => (
          <div
            key={event.id}
            className={`mb-8 flex items-center ${event.side === "left" ? "flex-row-reverse" : ""
              }`}
          >
            <div className="w-1/2 p-4">
              <Image
                src={event.image}
                alt={`Event ${event.id}`}
                width={300}
                height={200}
                className="cursor-pointer rounded-lg shadow-lg"
                onClick={() => setSelectedImage(event.image)}
              />
            </div>
            <div className="w-1/2 p-4 text-center sm:text-left">
              <p className="text-gray-700">{event.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for image zoom */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <Image
            src={selectedImage}
            alt="Zoomed"
            width={600}
            height={400}
            className="rounded-lg"
          />
        </div>
      )}
    </div>
  );
}
