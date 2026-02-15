import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const DeepDetailModal = ({
  isOpen,
  onClose,
  originRect,
  title,
  subtitle,
  children,
  actions,
}) => {
  const overlayRef = useRef(null);
  const panelRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const overlay = overlayRef.current;
    const panel = panelRef.current;

    if (!overlay || !panel) return;

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const finalWidth = clamp(viewportWidth * 0.9, 320, 1040);
    const finalHeight = clamp(viewportHeight * 0.92, 420, 860);
    const finalLeft = (viewportWidth - finalWidth) / 2;
    const finalTop = (viewportHeight - finalHeight) / 2;

    const start = originRect || {
      top: finalTop,
      left: finalLeft,
      width: finalWidth,
      height: finalHeight,
    };

    gsap.set(overlay, { opacity: 0 });
    gsap.set(panel, {
      position: 'fixed',
      top: start.top,
      left: start.left,
      width: start.width,
      height: start.height,
      borderRadius: 18,
      transformOrigin: 'center',
    });

    gsap.to(overlay, { opacity: 1, duration: 0.2, ease: 'power1.out' });
    gsap.to(panel, {
      top: finalTop,
      left: finalLeft,
      width: finalWidth,
      height: finalHeight,
      duration: 0.45,
      ease: 'power3.out',
    });
  }, [isOpen, originRect]);

  const handleClose = () => {
    const overlay = overlayRef.current;
    const panel = panelRef.current;

    if (!overlay || !panel || !originRect) {
      onClose();
      return;
    }

    gsap.to(overlay, { opacity: 0, duration: 0.2, ease: 'power1.in' });
    gsap.to(panel, {
      top: originRect.top,
      left: originRect.left,
      width: originRect.width,
      height: originRect.height,
      duration: 0.35,
      ease: 'power3.in',
      onComplete: onClose,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={handleClose}
      />
      <div
        ref={panelRef}
        className="relative z-10 flex h-full flex-col overflow-hidden border border-yellow-500/40 bg-black text-white shadow-[0_40px_120px_-30px_rgba(234,179,8,0.4)]"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-yellow-500/20 bg-gradient-to-r from-black via-purple-900/20 to-black px-8 py-5">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-yellow-400 font-bold">Deep Detail</p>
            <h3 className="text-3xl font-extrabold text-yellow-400 mt-1">{title}</h3>
            {subtitle ? <p className="text-sm text-purple-200 mt-1 font-medium">{subtitle}</p> : null}
          </div>
          <button
            onClick={handleClose}
            className="h-12 w-12 rounded-full border border-yellow-500/30 text-2xl text-yellow-400 transition hover:border-yellow-500 hover:text-yellow-300 font-bold"
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-8 py-6">
          <div className="space-y-6 text-base text-gray-200 leading-relaxed">{children}</div>
        </div>

        {actions?.length ? (
          <div className="flex flex-wrap gap-4 border-t border-yellow-500/20 bg-black px-8 py-5">
            {actions.map((action) => (
              <a
                key={action.label}
                href={action.href}
                target="_blank"
                rel="noreferrer"
                className={
                  action.variant === 'ghost'
                    ? 'rounded-full border-2 border-purple-400/40 px-6 py-3 text-sm font-bold uppercase tracking-widest text-purple-200 transition hover:border-purple-400 hover:text-white'
                    : 'rounded-full bg-yellow-500 px-6 py-3 text-sm font-extrabold uppercase tracking-widest text-black transition hover:bg-yellow-400 shadow-lg hover:shadow-xl'
                }
              >
                {action.label}
              </a>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default DeepDetailModal;
