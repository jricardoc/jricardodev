import { useEffect, useRef } from "react";
import gsap from "gsap";

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export function AnimatedText({
  text,
  className = "",
  delay = 0,
}: AnimatedTextProps) {
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    const chars = textRef.current.querySelectorAll(".char");

    gsap.fromTo(
      chars,
      {
        opacity: 0,
        y: 50,
        rotateX: -90,
      },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.8,
        stagger: 0.03,
        delay: delay,
        ease: "power3.out",
      }
    );
  }, [delay]);

  return (
    <span
      ref={textRef}
      className={className}
      style={{ display: "inline-block" }}
    >
      {text.split("").map((char, index) => (
        <span
          key={index}
          className="char"
          style={{
            display: "inline-block",
            transformStyle: "preserve-3d",
            whiteSpace: char === " " ? "pre" : "normal",
          }}
        >
          {char}
        </span>
      ))}
    </span>
  );
}
