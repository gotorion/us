"use client";

import Image from "next/image";
import { useState } from "react";
import timelineData from "../data/timeline.json";

export default function Home() {
  const [selectedEvent, setSelectedEvent] = useState<{
    image: string;
    description: string;
  } | null>(null);
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });

  const handleImageClick = (event: { image: string, description: string }, e: React.MouseEvent) => {
    setSelectedEvent(event);
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
                onClick={(e) => handleImageClick({
                  image: event.image,
                  description: event.description
                }, e)}
              />
            </div>
            {/* 移除时间线上的描述 */}
          </div>
        ))}
      </div>

      {/* Floating image zoom with description */}
      {selectedEvent && (
        <div
          className="floating-modal-overlay"
          onClick={() => setSelectedEvent(null)}
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
                setSelectedEvent(null);
              }}
            >
              ×
            </button>
            <Image
              src={selectedEvent.image}
              alt="Zoomed"
              width={800}
              height={600}
              className="floating-modal-image"
            />
            <div className="floating-modal-description">
              <p>{selectedEvent.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
