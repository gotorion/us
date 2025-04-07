"use client";

import Image from "next/image";
import { useState } from "react";
import timelineData from "../data/timeline.json";

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });

  const handleImageClick = (image: string, e: React.MouseEvent) => {
    setSelectedImage(image);
    setClickPosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <div className="page-container">
      {/* Timeline */}
      <div className="timeline-container">
        {timelineData.map((event) => (
          <div
            key={event.id}
            className="timeline-event"
          >
            <div className="event-image-container">
              <Image
                src={event.image}
                alt={`Event ${event.id}`}
                width={300}
                height={200}
                className="event-image"
                onClick={(e) => handleImageClick(event.image, e)}
              />
            </div>
            <div className="event-description">
              <p>{event.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Floating image zoom */}
      {selectedImage && (
        <div
          className="floating-modal-overlay"
          onClick={() => setSelectedImage(null)}
          style={{
            '--click-x': `${clickPosition.x}px`,
            '--click-y': `${clickPosition.y}px`
          } as React.CSSProperties}
        >
          <div className="floating-modal-content">
            <button
              className="floating-close-button"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
            >
              ×
            </button>
            <Image
              src={selectedImage}
              alt="Zoomed"
              width={800}
              height={600}
              className="floating-modal-image"
            />
          </div>
        </div>
      )}
    </div>
  );
}
