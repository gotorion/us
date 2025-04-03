"use client";

import Image from "next/image";
import { useState } from "react";
import timelineData from "../data/timeline.json";

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="page-container">
      {/* Timeline */}
      <div className="timeline-container">
        {timelineData.map((event) => (
          <div
            key={event.id}
            className={`timeline-event ${event.side === "left" ? "reverse" : ""}`}
          >
            <div className="event-image-container">
              <Image
                src={event.image}
                alt={`Event ${event.id}`}
                width={300}
                height={200}
                className="event-image"
                onClick={() => setSelectedImage(event.image)}
              />
            </div>
            <div className="event-description">
              <p>{event.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for image zoom */}
      {selectedImage && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedImage(null)}
        >
          <Image
            src={selectedImage}
            alt="Zoomed"
            width={600}
            height={400}
            className="modal-image"
          />
        </div>
      )}
    </div>
  );
}
