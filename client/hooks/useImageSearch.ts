'use client'
import { useState, useCallback } from 'react'
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

interface UseImageSearchReturn {
  searchByImage: (file: File) => Promise<MissingPost[]>;
  isSearching: boolean;
  searchError: string | null;
}

// ============================================
// MOCK DATA FOR IMAGE SEARCH RESULTS
// ============================================
const MOCK_SEARCH_RESULTS: MissingPost[] = [
  {
    id_: '101',
    name: 'Jennifer Kim',
    description: 'Matched 85% similarity. Last seen wearing similar clothing.',
    missing_since: '2024-09-01',
    gender: 'Female',
    dob: '2009-05-12',
    relationship: 'Daughter',
    address: 'Boston, MA',
    contact_infor: '(617) 555-0123',
    images: [
      { _id: '101', created_at: '2024-09-01', is_avatar: true, url: 'https://i.pravatar.cc/300?img=47' }
    ],
  },
  {
    id_: '102',
    name: 'Ryan Thompson',
    description: 'Matched 78% similarity. Similar facial features detected.',
    missing_since: '2024-07-20',
    gender: 'Male',
    dob: '2004-11-30',
    relationship: 'Son',
    address: 'Austin, TX',
    contact_infor: '(512) 555-0456',
    images: [
      { _id: '102', created_at: '2024-07-20', is_avatar: true, url: 'https://i.pravatar.cc/300?img=51' }
    ],
  },
  {
    id_: '103',
    name: 'Sophia Lee',
    description: 'Matched 92% similarity. High confidence match.',
    missing_since: '2024-08-10',
    gender: 'Female',
    dob: '2006-03-25',
    relationship: 'Sister',
    address: 'Miami, FL',
    contact_infor: '(305) 555-0789',
    images: [
      { _id: '103', created_at: '2024-08-10', is_avatar: true, url: 'https://i.pravatar.cc/300?img=20' }
    ],
  },
];

export const useImageSearch = (): UseImageSearchReturn => {
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  const searchByImage = useCallback(async (file: File): Promise<MissingPost[]> => {
    setIsSearching(true);
    setSearchError(null);

    console.log('🖼️ Mock image search with file:', file.name);

    // ============================================
    // MOCK: Simulate image search with delay
    // ============================================
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate processing time
    
    setIsSearching(false);
    toast.success('Image search completed successfully (Mock data)');
    return MOCK_SEARCH_RESULTS;

    // ============================================
    // COMMENTED OUT - API CALL (Uncomment when server is ready)
    // ============================================
    // const formData = new FormData();
    // formData.append('file', file);

    // try {
    //   const response = await fetch(
    //     `${process.env.NEXT_PUBLIC_FLASK_API_URL}/posts/search`,
    //     {
    //       method: 'POST',
    //       body: formData,
    //     }
    //   );

    //   if (!response.ok) {
    //     throw new Error('Image search failed');
    //   }

    //   const data = await response.json();
    //   const mappedPosts = data.posts.map(mapApiPostToMissingPost);
    //   toast.success('Image search completed successfully.');
    //   return mappedPosts;
    // } catch (error) {
    //   const errorMessage = error instanceof Error ? error.message : 'Failed to perform image search';
    //   setSearchError(errorMessage);
    //   toast.error(errorMessage);
    //   return [];
    // } finally {
    //   setIsSearching(false);
    // }
  }, []);

  return { searchByImage, isSearching, searchError };
};
