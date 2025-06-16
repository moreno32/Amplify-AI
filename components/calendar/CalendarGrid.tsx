'use client';

import { Post } from '@/lib/types';
import { useMemo } from 'react';
import { getISODay, format } from 'date-fns';
import { PostCard } from '@/components/calendar/PostCard';
import { TimeIndicator } from './TimeIndicator';
import React from 'react';

interface CalendarGridProps {
  posts: Post[];
  onPostClick: (post: Post) => void;
  onDeletePost: (postId: string) => void;
  isCurrentWeek: boolean;
  timeIndicatorRef: React.RefObject<HTMLDivElement | null>;
  showOptimalHours: boolean;
}

const hours = Array.from({ length: 24 }, (_, i) => i);
const hourRowHeight = '3.5rem';

export const CalendarGrid = ({ posts, onPostClick, onDeletePost, isCurrentWeek, timeIndicatorRef, showOptimalHours }: CalendarGridProps) => {

  const optimalHours = useMemo(() => {
    // Simulación de IA: Genera un conjunto de horas "óptimas" aleatorias
    // para cada día. En una app real, esto vendría de un análisis.
    const hours = new Map<string, number>(); // key: "day-hour", value: intensity (0-1)
    for (let day = 1; day <= 7; day++) {
      const peakHour = 10 + Math.floor(Math.random() * 8); // Peak between 10 AM and 5 PM
      for (let hour = 0; hour < 24; hour++) {
        const distance = Math.abs(hour - peakHour);
        const intensity = Math.max(0, 1 - distance / 7); // Intensity falls off over 7 hours
        if (intensity > 0.2) {
            hours.set(`${day}-${hour}`, intensity);
        }
      }
    }
    return hours;
  }, []);

  const allPostsWithLayout = useMemo(() => {
    return posts.map(post => {
      const startHour = post.startTime.getHours();
      const startMinute = post.startTime.getMinutes();
      
      const gridRowStart = (startHour * 2) + (startMinute / 30) + 1;
      const durationInIntervals = Math.ceil(post.duration / 30);

      return {
        ...post,
        gridRow: `${gridRowStart} / span ${durationInIntervals}`,
        gridColumn: getISODay(post.startTime) + 1,
      };
    });
  }, [posts]);

  return (
    <div className="relative grid grid-cols-[5rem_repeat(7,minmax(0,1fr))]" style={{ gridTemplateRows: `repeat(48, ${hourRowHeight})` }}>
        {isCurrentWeek && <TimeIndicator ref={timeIndicatorRef} />}

        {/* Heatmap Layer */}
        {showOptimalHours && Array.from({ length: 7 }).map((_, dayIndex) => 
            Array.from({ length: 24 }).map((_, hourIndex) => {
                const intensity = optimalHours.get(`${dayIndex + 1}-${hourIndex}`);
                if (!intensity) return null;
                
                return (
                    <div
                        key={`heatmap-${dayIndex}-${hourIndex}`}
                        className="absolute bg-indigo-500 rounded-lg pointer-events-none -mx-[1px]"
                        style={{
                            gridColumnStart: dayIndex + 2,
                            gridRowStart: hourIndex * 2 + 1,
                            gridRowEnd: 'span 2',
                            opacity: intensity * 0.5,
                        }}
                    />
                )
            })
        )}

        {/* Grid Lines */}
        {Array.from({ length: 8 }).map((_, i) => (
            <div key={`v-line-${i}`} className="row-start-1 row-span-full border-r border-border" style={{ gridColumnStart: i + 1 }}></div>
        ))}
        {Array.from({ length: 48 }).map((_, i) => (
            <div key={`h-line-${i}`} className="col-start-1 col-span-full border-b border-border" style={{ gridRowStart: i + 1 }}></div>
        ))}
        
        {/* Hour Labels */}
        {hours.map(hour => {
            if (hour === 0) return null; 
            const date = new Date();
            date.setHours(hour, 0);
            return (
                <div 
                    key={`hour-${hour}`} 
                    className="relative col-start-1 text-right pr-2" 
                    style={{ gridRowStart: hour * 2 + 1 }}
                >
                    <span className="text-xs text-muted-foreground absolute -top-[0.6em] right-2 bg-background px-1">
                        {format(date, 'h:mm a')}
                    </span>
                </div>
            )
        })}
        
        {/* Posts */}
        {allPostsWithLayout.map((post) => (
            <div
            key={post.id}
            className="relative p-1 z-10"
            style={{ 
                gridColumn: post.gridColumn,
                gridRow: post.gridRow
            }}
            >
            <PostCard post={post} onClick={onPostClick} onDelete={onDeletePost} />
            </div>
        ))}
    </div>
  );
}; 