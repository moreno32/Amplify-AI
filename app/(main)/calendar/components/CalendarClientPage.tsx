'use client'

import { useState, useEffect, useRef } from 'react'
import { Post } from '@/lib/types'
import { PageHeader } from '@/components/layout/PageHeader'
import { PostEditorModal } from '@/components/modals/PostEditorModal'
import { postService } from '@/lib/services/postService'
import {
  addDays,
  format,
  isToday,
  startOfISOWeek,
  endOfISOWeek,
  isSameWeek,
  subDays,
} from 'date-fns'
import { es } from 'date-fns/locale'
import { cn } from '@/lib/utils'
import { CalendarGrid } from '@/components/calendar/CalendarGrid'
import { Button } from '@/components/ui/button'
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  CalendarDays,
  List,
  Sparkles,
} from 'lucide-react'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { CalendarPageData } from '@/lib/services/calendarService'

interface CalendarClientPageProps {
  initialData: CalendarPageData
}

export function CalendarClientPage({ initialData }: CalendarClientPageProps) {
  const [posts, setPosts] = useState<Post[]>(initialData.initialPosts)
  const [isLoading, setIsLoading] = useState(false) // No longer loading on init
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [currentDate, setCurrentDate] = useState(new Date(initialData.initialDate))
  const [isCreating, setIsCreating] = useState(false)
  const [showOptimalHours, setShowOptimalHours] = useState(false)

  const timeIndicatorRef = useRef<HTMLDivElement>(null)

  const startOfWeek = startOfISOWeek(currentDate)
  const endOfWeek = endOfISOWeek(currentDate)
  const days = Array.from({ length: 7 }, (_, i) => addDays(startOfWeek, i))
  const isCurrentWeek = isSameWeek(currentDate, new Date(), {
    weekStartsOn: 1 /* Lunes */,
  })

  const scrollToNow = () => {
    setTimeout(() => {
      timeIndicatorRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      })
    }, 100)
  }

  useEffect(() => {
    // Only fetch posts when the week changes, not on initial load
    async function loadPostsForWeek() {
      setIsLoading(true)
      const fetchedPosts = await postService.getPosts(startOfWeek, endOfWeek)
      setPosts(fetchedPosts)
      setIsLoading(false)
      if (isCurrentWeek) {
        scrollToNow()
      }
    }

    // We compare against the initial date to avoid re-fetching on the first render
    if (!isSameWeek(currentDate, new Date(initialData.initialDate), { weekStartsOn: 1})) {
        loadPostsForWeek()
    } else if (isCurrentWeek) {
        scrollToNow()
    }
  }, [currentDate, startOfWeek, endOfWeek, isCurrentWeek, initialData.initialDate])

  const handleTodayClick = () => {
    const now = new Date()
    // Si ya estamos en la semana actual, solo hacemos scroll. Si no, cambiamos de semana y el useEffect se encargará.
    if (isSameWeek(currentDate, now, { weekStartsOn: 1 })) {
      scrollToNow()
    } else {
      setCurrentDate(now)
    }
  }

  const handleCreatePostClick = () => {
    setIsCreating(true)
    setSelectedPost(null)
    setIsModalOpen(true)
  }

  const handlePostClick = (post: Post) => {
    setIsCreating(false)
    setSelectedPost(post)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedPost(null)
    setIsCreating(false)
  }

  const handleSavePost = (updates: Partial<Post>) => {
    if (isCreating) {
      postService.createPost(updates).then((newPost) => {
        if (newPost) {
          setPosts((prev) => [...prev, newPost])
        }
      })
    } else if (selectedPost) {
      const updatedPost = { ...selectedPost, ...updates }
      postService.updatePost(updatedPost.id, updates)
      setPosts((prevPosts) =>
        prevPosts.map((p) => (p.id === updatedPost.id ? updatedPost : p))
      )
    }

    handleCloseModal()
  }

  const handleDeletePost = async (postId: string) => {
    const success = await postService.deletePost(postId)
    if (success) {
      setPosts((prevPosts) => prevPosts.filter((p) => p.id !== postId))
    }
  }

  const handleDragEnd = async (postId: string, newStartTime: Date) => {
    const updatedPost = await postService.updatePost(postId, {
      startTime: newStartTime,
    })
    if (updatedPost) {
      setPosts((prevPosts) =>
        prevPosts.map((p) => (p.id === postId ? updatedPost : p))
      )
    }
  }

  return (
    <>
      <PageHeader
        title="Calendario de Contenido"
        subtitle="Planifica, crea y visualiza tu contenido semanal."
        actions={
          <div className="flex items-center gap-4">
            {/* Left side */}
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={handleTodayClick}>
                Hoy
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentDate(subDays(currentDate, 7))}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentDate(addDays(currentDate, 7))}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <span className="text-lg font-semibold w-40 text-center capitalize">
                {format(currentDate, 'MMMM yyyy', { locale: es })}
              </span>
            </div>

            <div className="flex-grow" />

            {/* Right side */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="optimal-hours"
                  checked={showOptimalHours}
                  onCheckedChange={setShowOptimalHours}
                />
                <Label
                  htmlFor="optimal-hours"
                  className="flex items-center gap-1 text-sm"
                >
                  <Sparkles className="h-4 w-4 text-yellow-400" />
                  Horas Óptimas
                </Label>
              </div>
              <div className="h-8 w-px bg-border" />
              <Select defaultValue="week">
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Vista" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">Semana</SelectItem>
                  <SelectItem value="month" disabled>
                    Mes
                  </SelectItem>
                </SelectContent>
              </Select>
              <ToggleGroup
                type="single"
                defaultValue="calendar"
                variant="outline"
              >
                <ToggleGroupItem
                  value="calendar"
                  aria-label="Vista de calendario"
                >
                  <CalendarDays className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="list"
                  aria-label="Vista de lista"
                  disabled
                >
                  <List className="h-4 w-4" />
                </ToggleGroupItem>
              </ToggleGroup>
              <Button onClick={handleCreatePostClick}>
                <Plus className="h-4 w-4 mr-2" />
                Crear Post
              </Button>
            </div>
          </div>
        }
      />
      <div className="mt-4 flex-grow rounded-lg shadow-sm border flex flex-col overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <p>Cargando calendario...</p>
          </div>
        ) : (
          <>
            {/* Day Headers */}
            <div
              className="grid grid-cols-[5rem_repeat(7,minmax(0,1fr))] shrink-0 border-b"
              style={{ scrollbarGutter: 'stable' }}
            >
              <div className="border-r bg-background"></div> {/* Empty corner */}
              {days.map((day) => (
                <div
                  key={day.toString()}
                  className="flex flex-col items-center justify-center h-16 text-center border-r bg-background"
                >
                  <h3
                    className={cn(
                      'text-sm font-semibold uppercase mb-1',
                      isToday(day) && 'text-primary'
                    )}
                  >
                    {format(day, 'E', { locale: es })}
                  </h3>
                  {isToday(day) ? (
                    <div className="bg-primary text-primary-foreground rounded-full h-7 w-7 flex items-center justify-center text-sm font-bold">
                      {format(day, 'd')}
                    </div>
                  ) : (
                    <p className="text-xl font-medium text-muted-foreground">
                      {format(day, 'd')}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <div
              className="flex-grow overflow-auto"
              style={{ scrollbarGutter: 'stable' }}
            >
              {/* Calendar Body */}
              <CalendarGrid
                posts={posts}
                onPostClick={handlePostClick}
                onDeletePost={handleDeletePost}
                isCurrentWeek={isCurrentWeek}
                timeIndicatorRef={timeIndicatorRef}
                showOptimalHours={showOptimalHours}
              />
            </div>
          </>
        )}
      </div>
      {isModalOpen && (
        <PostEditorModal
          post={selectedPost}
          isCreating={isCreating}
          isOpen={isModalOpen}
          onOpenChange={handleCloseModal}
          onPostUpdate={handleSavePost}
          onPostDelete={handleDeletePost}
        />
      )}
    </>
  )
} 