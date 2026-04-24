"use client";

import { useEffect, useRef, useState } from "react";

type VideoCardProps = {
  videoId: string;
  title: string;
  author: string;
  thumbnail: string;
  orientation?: "landscape" | "portrait";
};

export function VideoCard({
  videoId,
  title,
  author,
  thumbnail,
  orientation = "landscape",
}: VideoCardProps) {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const dialogAspect = orientation === "portrait" ? "aspect-[9/16]" : "aspect-video";
  const watchUrl =
    orientation === "portrait"
      ? `https://www.youtube.com/shorts/${videoId}`
      : `https://youtu.be/${videoId}`;

  useEffect(() => {
    const dlg = dialogRef.current;
    if (!dlg) return;
    if (open && !dlg.open) dlg.showModal();
    if (!open && dlg.open) dlg.close();
  }, [open]);

  useEffect(() => {
    const dlg = dialogRef.current;
    if (!dlg) return;
    const onCancel = () => setOpen(false);
    const onClose = () => setOpen(false);
    dlg.addEventListener("cancel", onCancel);
    dlg.addEventListener("close", onClose);
    return () => {
      dlg.removeEventListener("cancel", onCancel);
      dlg.removeEventListener("close", onClose);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  function onBackdropClick(e: React.MouseEvent<HTMLDialogElement>) {
    if (e.target === dialogRef.current) setOpen(false);
  }

  const dialogWidth =
    orientation === "portrait"
      ? "w-[min(92vw,360px)]"
      : "w-[min(92vw,860px)]";

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Play: ${title}`}
        className="group flex flex-col h-full w-full text-left rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden hover:border-[var(--color-accent)] transition-colors cursor-pointer"
      >
        <div className="relative h-44 sm:h-56 bg-[var(--color-accent-soft)] overflow-hidden shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={thumbnail}
            alt=""
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span
              aria-hidden="true"
              className="flex items-center justify-center w-12 h-12 rounded-full bg-black/60 group-hover:bg-[var(--color-accent)] transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </div>
        </div>
        <div className="px-3 py-2.5 flex-1">
          <div className="text-[14px] font-bold leading-snug text-[var(--color-text)] line-clamp-2">
            {title}
          </div>
          <div className="text-[12px] text-[var(--color-text-muted)] mt-0.5">
            {author} · YouTube
          </div>
        </div>
      </button>

      <dialog
        ref={dialogRef}
        onClick={onBackdropClick}
        aria-label={title}
        className={`fixed inset-0 m-auto p-0 rounded-lg bg-[var(--color-surface)] ${dialogWidth} max-h-[92vh] backdrop:bg-black/70 backdrop:backdrop-blur-sm overflow-hidden shadow-2xl`}
      >
        <div className="flex items-center justify-between gap-3 px-4 py-2.5 border-b border-[var(--color-border)]">
          <div className="min-w-0">
            <div className="text-[13px] font-bold text-[var(--color-text)] truncate">
              {title}
            </div>
            <div className="text-[11px] text-[var(--color-text-muted)] truncate">
              {author}
            </div>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close video"
            className="shrink-0 p-1.5 rounded text-[var(--color-text-muted)] hover:bg-[var(--color-accent-soft)] hover:text-[var(--color-accent)]"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <div className={`${dialogAspect} bg-black`}>
          {open ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
              className="w-full h-full block border-0"
            />
          ) : null}
        </div>
        <div className="px-4 py-2 text-right">
          <a
            href={watchUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="text-[12px] text-[var(--color-text-muted)] hover:text-[var(--color-accent)] underline underline-offset-2"
          >
            Open on YouTube ↗
          </a>
        </div>
      </dialog>
    </>
  );
}
