'use client'

import { useState, useEffect, useRef } from 'react'
import { Post } from '@/lib/types'
import { PageHeader } from '@/components/layout/PageHeader'
import { PostEditorModal } from '@/components/modals/PostEditorModal'
import {
  createCalendarPostAction,
  updateCalendarPostAction,
  deleteCalendarPostAction,
} from '../actions'
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
import { toast } from 'sonner'

interface CalendarClientPageProps {
  initialData: CalendarPageData
}

export function CalendarClientPage({ initialData }: CalendarClientPageProps) {
  const [posts, setPosts] = useState<Post[]>(initialData.initialPosts)
  const [isLoading, setIsLoading] = useState(false)
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
    async function loadPostsForWeek() {
      setIsLoading(true)
      try {
      const fetchedPosts = await postService.getPosts(startOfWeek, endOfWeek)
      setPosts(fetchedPosts)
      } catch (error) { 
        console.error("Error fetching posts for week:", error)
        toast.error("No se pudieron cargar los posts para esta semana.")
      }
      setIsLoading(false)
      if (isCurrentWeek) {
        scrollToNow()
      }
    }

    if (!isSameWeek(currentDate, new Date(initialData.initialDate), { weekStartsOn: 1})) {
        loadPostsForWeek()
    } else if (isCurrentWeek) {
        scrollToNow()
    }
  }, [currentDate, startOfWeek, endOfWeek, isCurrentWeek, initialData.initialDate, toast])

  const handleTodayClick = () => {
    const now = new Date()
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

  const handleSavePost = async (updates: Partial<Post>) => {
    setIsLoading(true);
    if (isCreating) {
      const result = await createCalendarPostAction(updates);
      if (result.data) {
        setPosts((prev) => [...prev, result.data!].sort((a,b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime()));
        toast.success("Post creado correctamente.");
      } else if (result.error) {
        console.error("Error creating post:", result.error);
        toast.error(result.error);
      }
    } else if (selectedPost) {
      const result = await updateCalendarPostAction(selectedPost.id, updates);
      if (result.data) {
      setPosts((prevPosts) =>
          prevPosts.map((p) => (p.id === result.data!.id ? result.data! : p))
        );
        toast.success("Post actualizado correctamente.");
      } else if (result.error) {
        console.error("Error updating post:", result.error);
        toast.error(result.error);
      } else {
        toast.info("No se realizaron cambios en el post.");
      }
    }
    setIsLoading(false);
    handleCloseModal()
  }

  const handleDeletePost = async (postId: string) => {
    setIsLoading(true);
    const result = await deleteCalendarPostAction(postId);
    if (result.success) {
      setPosts((prevPosts) => prevPosts.filter((p) => p.id !== postId));
      toast.success("Post eliminado correctamente.");
    } else {
      console.error("Error deleting post:", result.error);
      toast.error(result.error || "No se pudo eliminar el post.");
    }
    setIsLoading(false);
    handleCloseModal();
  }

  const handleDragEnd = async (postId: string, newStartTime: Date) => {
    setIsLoading(true);
    const result = await updateCalendarPostAction(postId, { startTime: newStartTime });
    if (result.data) {
      setPosts((prevPosts) =>
        prevPosts.map((p) => (p.id === postId ? result.data! : p))
      );
      toast.success("Post reprogramado correctamente.");
    } else if (result.error) {
      console.error("Error updating post on drag:", result.error);
      toast.error(result.error);
    }
    setIsLoading(false);
  }

  return (
    <>
      <PageHeader
        title="Calendario de Contenido"
        subtitle="Planifica, crea y visualiza tu contenido semanal."
        actions={
          <div className="flex items-center gap-4">
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
        {isLoading && (
            <div className="absolute inset-0 bg-white/50 flex items-center justify-center z-50">
                <p>Procesando...</p>
          </div>
        )}
        {isModalOpen && (
          <PostEditorModal
            isOpen={isModalOpen}
            onOpenChange={handleCloseModal}
            onPostUpdate={handleSavePost}
            onPostDelete={handleDeletePost}
            post={selectedPost}
            isCreating={isCreating}
          />
        )}
            <div
              className="grid grid-cols-[5rem_repeat(7,minmax(0,1fr))] shrink-0 border-b"
              style={{ scrollbarGutter: 'stable' }}
            >
          <div className="border-r bg-background"></div>
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
              <CalendarGrid
                posts={posts}
                onPostClick={handlePostClick}
                onDeletePost={handleDeletePost}
                isCurrentWeek={isCurrentWeek}
                timeIndicatorRef={timeIndicatorRef}
                showOptimalHours={showOptimalHours}
              />
            </div>
      </div>
    </>
  )
} 