"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
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

  // 创建浮动装饰元素
  const [decorElements, setDecorElements] = useState<JSX.Element[]>([]);

  useEffect(() => {
    // 创建随机位置的装饰元素
    const elements: JSX.Element[] = [];
    const symbols = ['❤', '✿', '♡', '❀', '✻', '✹', '✺', '❋', '❦', '♥'];
    const classes = ['heart', 'flower', 'star'];

    // 生成20个随机装饰元素
    for (let i = 0; i < 20; i++) {
      const symbol = symbols[Math.floor(Math.random() * symbols.length)];
      const className = classes[Math.floor(Math.random() * classes.length)];
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      const delay = Math.random() * 5;
      const duration = 6 + Math.random() * 4;

      elements.push(
        <div
          key={`decor-${i}`}
          className={`floating-element ${className}`}
          style={{
            left: `${left}%`,
            top: `${top}%`,
            animationDelay: `${delay}s`,
            animationDuration: `${duration}s`
          }}
        >
          {symbol}
        </div>
      );
    }

    setDecorElements(elements);
  }, []);

  // 按日期对事件进行排序，最新的在前面
  const sortedTimelineData = [...timelineData].sort((a, b) => {
    // 如果有date字段就用date排序，否则用id排序
    if (a.date && b.date) {
      // 尝试将日期转换为时间戳进行比较
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);

      // 如果日期格式有效，则按时间倒序排列
      if (!isNaN(dateA.getTime()) && !isNaN(dateB.getTime())) {
        return dateB.getTime() - dateA.getTime(); // 倒序，最新的在前
      }
    }

    // 作为后备，用id进行排序（假设id越大表示越新）
    return b.id - a.id;
  });

  return (
    <div className="page-container">
      {/* Banner */}
      <div className="site-banner">
        <h1 className="banner-text">lijunhui & wupanpan</h1>
      </div>

      {/* Timeline */}
      <div className="timeline-container">
        {/* 装饰元素区域 */}
        <div className="timeline-decoration decoration-left">
          {decorElements.slice(0, 10)}
        </div>
        <div className="timeline-decoration decoration-right">
          {decorElements.slice(10, 20)}
        </div>

        {sortedTimelineData.map((event) => (
          <div
            key={event.id}
            className="timeline-event"
          >
            {/* 添加日期显示 */}
            {event.date && <div className="event-date">{event.date}</div>}

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
