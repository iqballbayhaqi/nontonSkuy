"use client";
import { useEffect } from "react";
import { addToHistory, type StoredMovie } from "@/lib/storage";

export default function HistoryRecorder({ movie }: { movie: StoredMovie }) {
  useEffect(() => {
    addToHistory(movie);
  }, [movie.slug]); // eslint-disable-line react-hooks/exhaustive-deps
  return null;
}
