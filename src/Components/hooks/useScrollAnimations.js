// ===================== ADVANCED GSAP HOOKS =====================
// Optional: Use this for more advanced animation control

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Custom Hook: Scroll Trigger Line Drawing
 * Animates a line element as you scroll
 */
export const useScrollDrawLine = (lineRef) => {
  useEffect(() => {
    const line = lineRef.current;
    if (!line) return;

    gsap.to(line, {
      strokeDashoffset: 0,
      scrollTrigger: {
        trigger: line.closest('[data-scroll-container]'),
        start: 'top center',
        end: 'bottom center',
        scrub: 1,
        markers: false,
      },
      duration: 2,
      ease: 'none',
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);
};

/**
 * Custom Hook: 3D Card Reveal
 * Reveals cards with 3D flip and scale animations
 */
export const use3DCardReveal = (cardsRef) => {
  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean);

    cards.forEach((card, index) => {
      const isLeft = index % 2 === 0;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: 'top center+=100px',
          end: 'top center-=100px',
          scrub: 0.5,
        },
      });

      tl.fromTo(
        card,
        {
          opacity: 0,
          x: isLeft ? -100 : 100,
          rotationY: isLeft ? -45 : 45,
          scale: 0.8,
        },
        {
          opacity: 1,
          x: 0,
          rotationY: 0,
          scale: 1,
          duration: 1,
          ease: 'back.out',
        },
        0
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);
};

/**
 * Custom Hook: Pulsing Node Animation
 * Creates pulsing effect on timeline nodes
 */
export const usePulsingNode = (nodeRef) => {
  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;

    const pulseTimeline = gsap.timeline();

    pulseTimeline.to(
      node,
      {
        scale: 1.3,
        boxShadow: '0 0 30px rgba(234, 179, 8, 1)',
        duration: 0.6,
        repeat: -1,
        yoyo: true,
      },
      0
    );

    return () => {
      pulseTimeline.kill();
    };
  }, []);
};

/**
 * Custom Hook: Parallax Text Effect
 * Creates parallax effect on text as you scroll
 */
export const useParallaxText = (textRef) => {
  useEffect(() => {
    const text = textRef.current;
    if (!text) return;

    gsap.to(text, {
      y: -100,
      opacity: 0.5,
      scrollTrigger: {
        trigger: text,
        start: 'top center',
        end: 'center center',
        scrub: 1,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);
};

/**
 * Custom Hook: Counter Animation
 * Animates numbers on scroll
 */
export const useCounterAnimation = (numberRef, targetValue, duration = 2) => {
  useEffect(() => {
    const number = numberRef.current;
    if (!number) return;

    gsap.to(
      { value: 0 },
      {
        value: targetValue,
        scrollTrigger: {
          trigger: number,
          start: 'top center',
          once: true,
        },
        duration,
        onUpdate: (tween) => {
          number.textContent = Math.round(tween.progress() * targetValue * 100) / 100;
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [targetValue]);
};

/**
 * Custom Hook: Magnetic Button Effect
 * Creates a magnetic cursor effect on buttons
 */
export const useMagneticButton = (buttonRef) => {
  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = button.getBoundingClientRect();

      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);

      gsap.to(button, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.3,
      });
    };

    const handleMouseLeave = () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.3,
      });
    };

    button.addEventListener('mousemove', handleMouseMove);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      button.removeEventListener('mousemove', handleMouseMove);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);
};

/**
 * Custom Hook: Stagger Animation
 * Stagger multiple elements in sequence
 */
export const useStaggerAnimation = (elementsRef, staggerDelay = 0.1) => {
  useEffect(() => {
    const elements = elementsRef.current.filter(Boolean);

    gsap.to(elements, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: staggerDelay,
      scrollTrigger: {
        trigger: elements[0]?.parentElement,
        start: 'top center',
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [staggerDelay]);
};

/**
 * Custom Hook: Text Highlight on Scroll
 * Highlights text words as you scroll through
 */
export const useTextHighlight = (textRef, colorClass = 'text-yellow-500') => {
  useEffect(() => {
    const text = textRef.current;
    if (!text) return;

    const words = text.innerText.split(' ');
    text.innerHTML = words
      .map((word, i) => `<span data-index="${i}">${word}</span>`)
      .join(' ');

    const spans = text.querySelectorAll('span');

    spans.forEach((span, i) => {
      gsap.to(span, {
        className: `+=${colorClass}`,
        scrollTrigger: {
          trigger: text,
          start: 'top center',
          end: 'bottom center',
          scrub: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            const highlightProgress = progress * spans.length;

            spans.forEach((s, idx) => {
              if (idx <= highlightProgress) {
                s.classList.add('text-yellow-500');
              } else {
                s.classList.remove('text-yellow-500');
              }
            });
          },
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [colorClass]);
};

/**
 * Custom Hook: Scroll Progress Bar
 * Animates progress bar based on scroll
 */
export const useScrollProgressBar = (progressBarRef, containerRef) => {
  useEffect(() => {
    const progressBar = progressBarRef.current;
    const container = containerRef.current;

    if (!progressBar || !container) return;

    gsap.to(progressBar, {
      width: '100%',
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);
};

/**
 * Example Usage in Component:
 *
 * import { useScrollDrawLine, use3DCardReveal, usePulsingNode } from './hooks';
 *
 * export default function Component() {
 *   const lineRef = useRef(null);
 *   const cardsRef = useRef([]);
 *   const nodesRef = useRef([]);
 *
 *   useScrollDrawLine(lineRef);
 *   use3DCardReveal(cardsRef);
 *   usePulsingNode(nodesRef[0]);
 *
 *   return (
 *     <div>
 *       <svg ref={lineRef}>{/* SVG content */}</svg>
 *       {/* More JSX */}
 *     </div>
 *   );
 * }
 */
