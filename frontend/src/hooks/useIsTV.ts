"use client";
import { useEffect, useState } from "react";
import { isAndroidTv } from "@/lib/device";

export function useIsTV(): boolean {
  const [tv, setTv] = useState(false);
  useEffect(() => { setTv(isAndroidTv()); }, []);
  return tv;
}
