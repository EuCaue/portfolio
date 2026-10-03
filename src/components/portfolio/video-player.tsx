"use client";

import { Maximize, Minimize, Pause, Play, Volume2, VolumeX } from "lucide-react";
import { type KeyboardEvent, useCallback, useEffect, useRef, useState } from "react";
import { useLanguage } from "@/contexts/language-context";
import type { Video } from "@/data/projects";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { formatTime, nextRate } from "@/lib/media-time";
import { cn } from "@/lib/utils";

type Props = { video: Video; title: string };

const IDLE_MS = 2200;

// A small custom player on top of the native <video>: play, seek, time, speed, mute and fullscreen,
// all reachable from the keyboard. Controls fade out while a video plays and the pointer is still.
export function VideoPlayer({ video, title }: Props) {
  const { t } = useLanguage();
  const reduce = usePrefersReducedMotion();
  const root = useRef<HTMLElement>(null);
  const el = useRef<HTMLVideoElement>(null);
  const idle = useRef<ReturnType<typeof setTimeout>>(undefined);

  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const [muted, setMuted] = useState(true);
  const [rate, setRate] = useState(1);
  const [full, setFull] = useState(false);
  const [showControls, setShowControls] = useState(true);

  const wake = useCallback(() => {
    setShowControls(true);
    clearTimeout(idle.current);
    idle.current = setTimeout(() => {
      if (!el.current?.paused) setShowControls(false);
    }, IDLE_MS);
  }, []);

  useEffect(() => {
    const v = el.current;
    if (!v) return;
    if (!reduce) v.play().catch(() => {});
    const onFull = () => setFull(document.fullscreenElement === root.current);
    document.addEventListener("fullscreenchange", onFull);
    return () => {
      document.removeEventListener("fullscreenchange", onFull);
      clearTimeout(idle.current);
    };
  }, [reduce]);

  const toggle = () => {
    const v = el.current;
    if (!v) return;
    if (v.paused) v.play().catch(() => {});
    else v.pause();
  };
  const seek = (to: number) => {
    if (el.current) el.current.currentTime = Math.min(Math.max(to, 0), duration || 0);
  };
  const toggleMute = () => {
    if (!el.current) return;
    el.current.muted = !el.current.muted;
    setMuted(el.current.muted);
  };
  const cycleRate = () => {
    if (!el.current) return;
    const r = nextRate(rate);
    el.current.playbackRate = r;
    setRate(r);
  };
  const toggleFull = () => {
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    else root.current?.requestFullscreen().catch(() => {});
  };

  const onKey = (e: KeyboardEvent<HTMLElement>) => {
    const actions: Record<string, () => void> = {
      " ": toggle,
      k: toggle,
      m: toggleMute,
      f: toggleFull,
      ArrowLeft: () => seek(time - 5),
      ArrowRight: () => seek(time + 5),
    };
    const action = actions[e.key];
    if (action && !(e.target as HTMLElement).closest("button")) {
      e.preventDefault();
      action();
      wake();
    }
  };

  const progress = duration ? (time / duration) * 100 : 0;
  const visible = showControls || !playing;
  const btn =
    "inline-flex h-8 w-8 items-center justify-center rounded-md text-white/90 transition-colors hover:bg-white/15 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white";

  return (
    // Shortcuts work while any control inside the player has focus (key events bubble up here).
    <section
      ref={root}
      aria-label={`${t("player.label")}: ${title}`}
      onKeyDown={onKey}
      onPointerMove={wake}
      onPointerLeave={() => playing && setShowControls(false)}
      onFocus={wake}
      className={cn(
        "group/player relative flex h-full w-full items-center justify-center overflow-hidden bg-black ",
        !visible && "cursor-none",
      )}
    >
      <video
        ref={el}
        aria-label={title}
        poster={video.poster}
        muted
        loop
        playsInline
        preload="metadata"
        onClick={toggle}
        onPlay={() => {
          setPlaying(true);
          wake();
        }}
        onPause={() => {
          setPlaying(false);
          setShowControls(true);
        }}
        onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onProgress={(e) => {
          const v = e.currentTarget;
          if (v.buffered.length && v.duration)
            setBuffered((v.buffered.end(v.buffered.length - 1) / v.duration) * 100);
        }}
        className="h-full w-full object-contain"
      >
        {video.sources.map(({ type, url }) => (
          <source key={url} src={url} type={`video/${type}`} />
        ))}
      </video>

      {!playing && (
        <button
          type="button"
          onClick={toggle}
          aria-label={t("player.play")}
          className="absolute inset-0 m-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/95 text-zinc-950 shadow-lg transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black motion-reduce:transition-none"
        >
          <Play className="ml-1 h-6 w-6 fill-current" aria-hidden="true" />
        </button>
      )}

      <div
        className={cn(
          "absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-3 pb-2 pt-10 transition-opacity duration-300 group-focus-within/player:opacity-100 motion-reduce:transition-none",
          visible ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <div className="relative h-4">
          <div className="pointer-events-none absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 overflow-hidden rounded-full bg-white/25">
            <div
              className="absolute inset-y-0 left-0 bg-white/40"
              style={{ width: `${buffered}%` }}
            />
            <div className="absolute inset-y-0 left-0 bg-white" style={{ width: `${progress}%` }} />
          </div>
          <input
            type="range"
            min={0}
            max={duration || 0}
            step={0.1}
            value={time}
            onChange={(e) => seek(Number(e.target.value))}
            aria-label={t("player.seek")}
            aria-valuetext={`${formatTime(time)} / ${formatTime(duration)}`}
            className="player-range absolute inset-0 h-4 w-full cursor-pointer appearance-none bg-transparent"
          />
        </div>
        <div className="mt-1 flex items-center gap-1">
          <button
            type="button"
            onClick={toggle}
            aria-label={playing ? t("player.pause") : t("player.play")}
            className={btn}
          >
            {playing ? (
              <Pause className="h-4 w-4 fill-current" aria-hidden="true" />
            ) : (
              <Play className="h-4 w-4 fill-current" aria-hidden="true" />
            )}
          </button>
          <span className="ml-1 font-mono text-xs tabular-nums text-white/90">
            {formatTime(time)} <span className="text-white/50">/ {formatTime(duration)}</span>
          </span>
          <span className="ml-auto" />
          <button
            type="button"
            onClick={cycleRate}
            aria-label={`${t("player.speed")}: ${rate}x`}
            className={cn(btn, "w-auto px-2 font-mono text-xs tabular-nums")}
          >
            {rate}x
          </button>
          <button
            type="button"
            onClick={toggleMute}
            aria-label={muted ? t("player.unmute") : t("player.mute")}
            className={btn}
          >
            {muted ? (
              <VolumeX className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Volume2 className="h-4 w-4" aria-hidden="true" />
            )}
          </button>
          <button
            type="button"
            onClick={toggleFull}
            aria-label={full ? t("player.exitFullscreen") : t("player.fullscreen")}
            className={btn}
          >
            {full ? (
              <Minimize className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Maximize className="h-4 w-4" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
