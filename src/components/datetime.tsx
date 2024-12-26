import React, { useState, useEffect } from "react";

export const DateTime = () => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 1000);
    return () => {
      clearInterval(timer);
    };
  }, []); // Add an empty dependency array to run effect only on mount/unmount

  // Format date and time
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long", // e.g., "Friday"
    year: "numeric", // e.g., "2024"
    month: "long", // e.g., "November"
    day: "numeric", // e.g., "24"
  }).format(date);

  const formattedTime = new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true, // Use 12-hour format
  }).format(date);

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-lg font-medium">{formattedDate}</p>
      <p className="text-lg font-medium">{formattedTime}</p>
    </div>
  );
};

export default DateTime;
