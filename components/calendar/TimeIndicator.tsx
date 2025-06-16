'use client';

import { getISODay } from 'date-fns';
import React, { useState, useEffect, forwardRef } from 'react';

export const TimeIndicator = forwardRef<HTMLDivElement>((props, ref) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Actualiza cada minuto

    return () => clearInterval(timer);
  }, []);

  const topPosition = (currentTime.getHours() * 60 + currentTime.getMinutes()) / (24 * 60) * 100;

  return (
    <div
      ref={ref}
      className="absolute z-20 w-full flex items-center pointer-events-none"
      style={{
        top: `${topPosition}%`,
        gridColumn: `${getISODay(currentTime) + 1} / span 1`,
        transform: 'translateY(-50%)',
      }}
    >
      <div className="w-2.5 h-2.5 rounded-full bg-red-500 -ml-[5px] z-10"></div>
      <div className="w-full h-[2px] bg-red-500"></div>
    </div>
  );
});

TimeIndicator.displayName = 'TimeIndicator'; 