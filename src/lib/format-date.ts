import { TDateISO } from "./types";

//TODO: now only yyyy mm dd available, add more format.
export default function formatDate(date: TDateISO): string {
  const dateObj = new Date(date);
  const year = dateObj.getFullYear();
  const month = String(Number(dateObj.getMonth()) + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");

  return `${year} ${month} ${day}`;
}
