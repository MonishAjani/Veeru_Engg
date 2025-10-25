'use client';

import { useState, useEffect, useRef } from 'react';

// Add a debounce utility to prevent multiple rapid animations
const debounce = (fn: Function, ms = 300) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function(...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};

interface CountUpProps {
  end: number;
  duration?: number;
  suffix?: string;
  className?: string;
}

export default function CountUp({ end, duration = 2000, suffix = '', className = '' }: CountUpProps) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [hasCompleted, setHasCompleted] = useState(false);
  const countRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
          setCount(0); // Reset count when becoming visible
        } else {
          setIsVisible(false);
        }
      },
      { threshold: 0.1 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => {
      if (countRef.current) {
        observer.unobserve(countRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTimestamp: number | null = null;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationRef.current = window.requestAnimationFrame(step);
      } else {
        // Mark animation as completed when it reaches the end
        setHasCompleted(true);
      }
    };

    // Reset hasCompleted state when starting a new animation
    setHasCompleted(false);
    animationRef.current = window.requestAnimationFrame(step);
    
    return () => {
      if (animationRef.current) {
        window.cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };
  }, [isVisible, end, duration]);

  // Only restart the animation if it's been at least 3 seconds since completion
  // and only when the component isn't currently visible (scrolled out of view)
  const handleMouseEnter = debounce(() => {
    if (!isVisible && hasCompleted) {
      setIsVisible(true);
    }
  }, 500);

  return (
    <div
      ref={countRef}
      className={`font-bold ${className}`}
      onMouseEnter={handleMouseEnter}
    >
      {hasCompleted ? end + suffix : count + suffix}
    </div>
  );
}