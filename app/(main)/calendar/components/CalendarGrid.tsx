'use client';

import { Post } from '@/lib/types';
import { useMemo } from 'react';
import { getISODay } from 'date-fns';
import { PostCard } from './PostCard';

interface CalendarGridProps {
  posts: Post[];
  onPostClick: (post: Post) => void;
}

const hours = Array.from({ length: 24 }, (_, i) => i);
const hourRowHeight = '3.5rem'; // 56px, sync with grid-rows-[56px]

export const CalendarGrid = ({ posts, onPostClick }: CalendarGridProps) => {

  const allPostsWithLayout = useMemo(() => {
    return posts.map(post => {
      const startHour = post.startTime.getHours();
      const startMinute = post.startTime.getMinutes();
      
      const gridRowStart = (startHour * 2) + (startMinute / 30) + 1;
      const durationInIntervals = Math.ceil(post.duration / 30);

      return {
        ...post,
        gridRow: `${gridRowStart} / span ${durationInIntervals}`,
        gridColumn: getISODay(post.startTime) + 1, // +1 to offset time column
      };
    });
  }, [posts]);

  return (
    <div className="relative grid grid-cols-[4rem_repeat(7,1fr)]" style={{ gridTemplateRows: `repeat(48, ${hourRowHeight})` }}>
      {/* Hour Labels */}
      <div className="col-start-1 col-end-2 row-start-1 row-end-[49]">
        {hours.map(hour => (
          hour > 0 && (
            <div key={hour} className="relative text-right pr-2" style={{ gridRow: `${(hour * 2) - 1} / span 2`}}>
              <span className="absolute -top-2 right-2 text-xs text-muted-foreground">
                {`${hour.toString().padStart(2, '0')}:00`}
              </span>
            </div>
          )
        ))}
      </div>
      
      {/* Grid Background Lines */}
      {Array.from({ length: 7 }).map((_, i) => (
        <div key={i} className="col-start-auto border-r border-gray-200" style={{gridColumnStart: i + 2}}>
          {Array.from({ length: 48 }).map((_, j) => (
            <div key={j} className="border-b border-gray-200 h-full"></div>
          ))}
        </div>
      ))}
      
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
          <PostCard post={post} onClick={onPostClick} />
        </div>
      ))}
    </div>
  );
}; 