'use client'
import { useState, useEffect, useCallback } from 'react'
import { toast } from 'sonner'
import { MissingPost } from '@/types/interface'

interface ApiPost {
  _id: string;
  name: string;
  description?: string;
  update_at?: string;
  create_at: string;
  gender: string;
  dob?: string;
  relationship?: string;
  address?: string;
  contact_infor?: string;
  images?: string[];
}

const mapApiPostToMissingPost = (post: ApiPost): MissingPost => ({
  id_: post._id,
  name: post.name,
  description: post.description || "",
  missing_since: post.update_at || post.create_at,
  gender: post.gender,
  dob: post.dob,
  relationship: post.relationship || "",
  address: post.address || "",
  contact_infor: post.contact_infor || "",
  images: (post.images || []).map((img) => 
    typeof img === 'string' 
      ? { _id: '', created_at: '', is_avatar: false, url: img }
      : img
  ),
});

interface UsePostsReturn {
  posts: MissingPost[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

// ============================================
// MOCK DATA FOR UI DEVELOPMENT
// ============================================
const MOCK_POSTS: MissingPost[] = [
  {
    id_: '1',
    name: 'Sarah Johnson',
    description: 'Last seen wearing a red t-shirt and blue jeans. She has brown hair, blue eyes, and a small mole on her right cheek.',
    missing_since: '2024-06-15',
    gender: 'Female',
    dob: '2007-03-20',
    relationship: 'Daughter',
    address: 'Seattle, WA',
    contact_infor: '(206) 555-0123',
    images: [
      { _id: '1', created_at: '2024-06-15', is_avatar: true, url: 'https://i.pravatar.cc/300?img=1' }
    ],
  },
  {
    id_: '2',
    name: 'Michael Chen',
    description: 'Last seen at Lincoln Park wearing a black hoodie. He wears glasses and has a distinctive scar on his left hand.',
    missing_since: '2024-05-20',
    gender: 'Male',
    dob: '2005-08-15',
    relationship: 'Son',
    address: 'Portland, OR',
    contact_infor: '(503) 555-0456',
    images: [
      { _id: '2', created_at: '2024-05-20', is_avatar: true, url: 'https://i.pravatar.cc/300?img=12' }
    ],
  },
  {
    id_: '3',
    name: 'Emma Rodriguez',
    description: 'Last seen near downtown shopping area wearing a purple jacket and white sneakers. Long black hair in a ponytail.',
    missing_since: '2024-07-01',
    gender: 'Female',
    dob: '2010-11-03',
    relationship: 'Daughter',
    address: 'San Francisco, CA',
    contact_infor: '(415) 555-0789',
    images: [
      { _id: '3', created_at: '2024-07-01', is_avatar: true, url: 'https://i.pravatar.cc/300?img=5' }
    ],
  },
  {
    id_: '4',
    name: 'David Martinez',
    description: 'Last seen leaving school. Wearing blue school uniform, black backpack. Has short brown hair and brown eyes.',
    missing_since: '2024-04-10',
    gender: 'Male',
    dob: '2008-01-25',
    relationship: 'Son',
    address: 'Los Angeles, CA',
    contact_infor: '(213) 555-0234',
    images: [
      { _id: '4', created_at: '2024-04-10', is_avatar: true, url: 'https://i.pravatar.cc/300?img=15' }
    ],
  },
  {
    id_: '5',
    name: 'Ashley Williams',
    description: 'Last seen at local mall with friends. Blonde hair, green eyes, wearing pink sweater and jeans.',
    missing_since: '2024-08-15',
    gender: 'Female',
    dob: '2006-12-08',
    relationship: 'Daughter',
    address: 'Denver, CO',
    contact_infor: '(303) 555-0567',
    images: [
      { _id: '5', created_at: '2024-08-15', is_avatar: true, url: 'https://i.pravatar.cc/300?img=9' }
    ],
  },
  {
    id_: '6',
    name: 'James Taylor',
    description: 'Last seen near Central Station. Wearing grey jacket, blue jeans. Has tattoo on right arm.',
    missing_since: '2024-03-05',
    gender: 'Male',
    dob: '2000-07-19',
    relationship: 'Brother',
    address: 'Chicago, IL',
    contact_infor: '(312) 555-0890',
    images: [
      { _id: '6', created_at: '2024-03-05', is_avatar: true, url: 'https://i.pravatar.cc/300?img=33' }
    ],
  },
];

export const usePosts = (): UsePostsReturn => {
  const [posts, setPosts] = useState<MissingPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ============================================
  // COMMENTED OUT - API CALL (Uncomment when server is ready)
  // ============================================
  // const fetchPosts = useCallback(async (signal?: AbortSignal) => {
  //   try {
  //     setIsLoading(true);
  //     setError(null);
  //     
  //     const response = await fetch(
  //       `${process.env.NEXT_PUBLIC_FLASK_API_URL}/posts`,
  //       { signal }
  //     );
  //     
  //     if (!response.ok) {
  //       throw new Error('Failed to fetch posts');
  //     }
  //     
  //     const data = await response.json();
  //     const mappedPosts = data.posts.map(mapApiPostToMissingPost);
  //     setPosts(mappedPosts);
  //   } catch (err) {
  //     if (err instanceof Error) {
  //       if (err.name === 'AbortError') {
  //         console.log('Fetch aborted');
  //         return;
  //       }
  //       setError(err.message);
  //       toast.error('Failed to fetch posts');
  //     }
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }, []);

  // ============================================
  // MOCK: Simulate API loading with delay
  // ============================================
  useEffect(() => {
    const timer = setTimeout(() => {
      setPosts(MOCK_POSTS);
      setIsLoading(false);
    }, 800); // Simulate network delay

    return () => clearTimeout(timer);
  }, []);

  // ============================================
  // COMMENTED OUT - Original useEffect with API call
  // ============================================
  // useEffect(() => {
  //   const abortController = new AbortController();
  //   fetchPosts(abortController.signal);

  //   return () => {
  //     abortController.abort();
  //   };
  // }, [fetchPosts]);

  const refetch = useCallback(() => {
    // MOCK: Refetch with mock data
    setIsLoading(true);
    setTimeout(() => {
      setPosts(MOCK_POSTS);
      setIsLoading(false);
      toast.success('Data refreshed');
    }, 500);
    
    // Uncomment when API is ready:
    // fetchPosts();
  }, []);

  return { posts, isLoading, error, refetch };
};
