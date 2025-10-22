import { formatDate, getNextAndPrevSevenDates } from "@/lib/utils";
import { ScheduledAnimes } from "@/types/anime";
import { useMemo, useRef, useState } from "react";

interface ScheduleProps {
  date: string;
  scheduledAnimes: ScheduledAnimes[];
}

export default function Schedule() {
  const { prevDates, nextDates } = getNextAndPrevSevenDates();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [currentTime, setCurrentTime] = useState<string>("");

  const currentDate = new Date();
  const today = formatDate(currentDate);
  const dates = useMemo(
    () => [...prevDates.reverse(), today, ...nextDates],
    [nextDates, today, prevDates],
  );
  return <div></div>;
}
