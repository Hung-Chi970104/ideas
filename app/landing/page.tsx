"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);



const message = "Hello! How can I help you today?";


export default function ScrollSequence() {
  const [visibleChars, setVisibleChars] = useState(0);
  const [showDots, setShowDots] = useState(true);
  const containerRef = useRef(null);



  useEffect(() => {
    let obj = { chars: 0 };
    gsap.to(obj, {
      chars: message.length,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top center",
        end: "bottom center",
        scrub: true,
        onUpdate: (self) => {
          // Show dots for first 20% of scroll, then reveal text
          if (self.progress < 0.2) {
            setShowDots(true);
            setVisibleChars(0);
          } else {
            setShowDots(false);
            setVisibleChars(Math.floor(obj.chars * ((self.progress - 0.2) / 0.8)));
          }
        },
      },
      duration: 1,
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
      <img
        src="/iphone.svg"
        alt="iPhone"
        style={{ maxWidth: "400px", width: "100%", height: "auto", zIndex: 1 }}
      />
      <div ref={containerRef} style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none", zIndex: 2 }}>
        <div className="chat-bubble">
          {showDots ? (
            <span className="typing-dots">
              <span>.</span><span>.</span><span>.</span>
            </span>
          ) : (
            <>
              {message.slice(0, visibleChars)}
              <span className="blinking-cursor">|</span>
            </>
          )}
        </div>
        <style jsx>{`
          .chat-bubble {
            background: #f5f5f5;
            border-radius: 20px;
            padding: 16px 24px;
            font-size: 1.1rem;
            color: #222;
            min-width: 200px;
            min-height: 48px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.04);
          }
          .typing-dots span {
            animation: blink 1s infinite alternate;
            font-size: 2rem;
            opacity: 0.5;
          }
          .typing-dots span:nth-child(2) { animation-delay: 0.2s; }
          .typing-dots span:nth-child(3) { animation-delay: 0.4s; }
          .blinking-cursor {
            animation: blink 1s steps(1) infinite;
          }
          @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
          }
        `}</style>
      </div>
    </div>
  );
}