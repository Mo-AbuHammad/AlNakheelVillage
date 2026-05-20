"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(hover: none)").matches) return;

    let rx = 0, ry = 0, cx = 0, cy = 0;
    let animId: number;

    const moveDot = (e: MouseEvent) => {
      cx = e.clientX;
      cy = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.left = cx + "px";
        dotRef.current.style.top = cy + "px";
      }
    };

    const loop = () => {
      rx += (cx - rx) * 0.12;
      ry += (cy - ry) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = rx + "px";
        ringRef.current.style.top = ry + "px";
      }
      animId = requestAnimationFrame(loop);
    };
    loop();

    document.addEventListener("mousemove", moveDot);

    const addHover = () => document.body.classList.add("hover-link");
    const removeHover = () => document.body.classList.remove("hover-link");

    const observe = () => {
      document.querySelectorAll("a, button").forEach((el) => {
        el.addEventListener("mouseenter", addHover);
        el.addEventListener("mouseleave", removeHover);
      });
    };
    observe();

    const mo = new MutationObserver(observe);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("mousemove", moveDot);
      cancelAnimationFrame(animId);
      mo.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}
