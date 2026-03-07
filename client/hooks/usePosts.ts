'use client'
import { useState, useEffect, useCallback } from 'react'
import { toast } from 'sonner'
import { MissingPost } from '@/types/interface'

// Response shape từ FastAPI GET /posts/
interface ApiPost {
  id: string
  account_id: string
  name: string
  gender: string
  dob?: string | null
  missing_since?: string | null
  description?: string | null
  relationship?: string | null
  address?: string | null
  contact_info: string
  status: string
  image_urls: string[]
  created_at: string
  updated_at: string
}

// Map API response → MissingPost (format dùng bởi ListPeople & PersonCard)
const mapApiPost = (post: ApiPost): MissingPost => ({
  id_: post.id,
  name: post.name,
  gender: post.gender,
  dob: post.dob ?? undefined,
  missing_since: post.missing_since ?? post.created_at,
  description: post.description ?? '',
  relationship: post.relationship ?? '',
  address: post.address ?? '',
  contact_infor: post.contact_info,
  images: post.image_urls.map((url, i) => ({
    _id: `${post.id}_${i}`,
    created_at: post.created_at,
    is_avatar: i === 0,
    url,
  })),
})

interface UsePostsReturn {
  posts: MissingPost[]
  total: number
  isLoading: boolean
  error: string | null
  page: number
  totalPages: number
  setPage: (p: number) => void
  refetch: () => void
}

const LIMIT = 6

export const usePosts = (): UsePostsReturn => {
  const [posts, setPosts] = useState<MissingPost[]>([])
  const [total, setTotal] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)

  const totalPages = Math.max(1, Math.ceil(total / LIMIT))

  const fetchPosts = useCallback(async (pageNum: number, signal?: AbortSignal) => {
    try {
      setIsLoading(true)
      setError(null)

      const skip = (pageNum - 1) * LIMIT
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/posts/?skip=${skip}&limit=${LIMIT}`,
        { signal }
      )

      if (!res.ok) throw new Error(`Server error: ${res.status}`)

      const data = await res.json()
      const mapped = (data.posts as ApiPost[]).map(mapApiPost)
      setPosts(mapped)
      setTotal(data.total ?? mapped.length)
    } catch (err) {
      if (err instanceof Error) {
        if (err.name === 'AbortError') return
        setError(err.message)
        toast.error('Không thể tải danh sách bài đăng')
      }
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    const controller = new AbortController()
    fetchPosts(page, controller.signal)
    return () => controller.abort()
  }, [fetchPosts, page])

  const refetch = useCallback(() => {
    fetchPosts(page)
  }, [fetchPosts, page])

  return { posts, total, isLoading, error, page, totalPages, setPage, refetch }
}
