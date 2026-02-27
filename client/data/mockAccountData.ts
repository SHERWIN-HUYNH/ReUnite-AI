/**
 * Mock Data cho Account Management
 * Dữ liệu chi tiết về tài khoản người dùng
 */

import { Account as AccountInterface } from '@/types/interface';
import { mockMissingPosts } from './mockAdminData';

export interface DetailedAccount extends AccountInterface {
  email?: string;
  phone?: string;
}

// Tạo detailed accounts với thống kê từ posts
export const mockDetailedAccounts: DetailedAccount[] = [
  {
    id: 1,
    ownerName: 'Nguyễn Văn An',
    email: 'nguyenvanan@gmail.com',
    phone: '+84 912 345 678',
    postsCreated: mockMissingPosts.filter(p => p.author_name === 'Nguyễn Văn An').length,
    postsFound: mockMissingPosts.filter(p => p.author_name === 'Nguyễn Văn An' && p.status === 'found').length,
    createdDate: '2024-01-15',
    lastLogin: '2025-02-03',
    status: 'Active',
  },
  {
    id: 2,
    ownerName: 'Trần Thị Bình',
    email: 'tranbinhnguyen@gmail.com',
    phone: '+84 987 654 321',
    postsCreated: mockMissingPosts.filter(p => p.author_name === 'Trần Thị Bình').length,
    postsFound: mockMissingPosts.filter(p => p.author_name === 'Trần Thị Bình' && p.status === 'found').length,
    createdDate: '2024-03-22',
    lastLogin: '2025-02-02',
    status: 'Active',
  },
  {
    id: 3,
    ownerName: 'Lê Hoàng Minh',
    email: 'lehoangminh@gmail.com',
    phone: '+84 901 234 567',
    postsCreated: 0,
    postsFound: 0,
    createdDate: '2023-11-05',
    lastLogin: '2025-02-03',
    status: 'Active',
  },
  {
    id: 4,
    ownerName: 'Phạm Thu Hà',
    email: 'phamthuha@gmail.com',
    phone: '+84 923 456 789',
    postsCreated: mockMissingPosts.filter(p => p.author_name === 'Phạm Thu Hà').length,
    postsFound: mockMissingPosts.filter(p => p.author_name === 'Phạm Thu Hà' && p.status === 'found').length,
    createdDate: '2024-06-10',
    lastLogin: '2024-12-20',
    status: 'Disabled',
  },
  {
    id: 5,
    ownerName: 'Hoàng Đức Thắng',
    email: 'hoangducthang@gmail.com',
    phone: '+84 934 567 890',
    postsCreated: mockMissingPosts.filter(p => p.author_name === 'Hoàng Đức Thắng').length,
    postsFound: mockMissingPosts.filter(p => p.author_name === 'Hoàng Đức Thắng' && p.status === 'found').length,
    createdDate: '2024-08-18',
    lastLogin: '2025-02-02',
    status: 'Active',
  },
  {
    id: 6,
    ownerName: 'Vũ Thị Lan',
    email: 'vuthilan@gmail.com',
    phone: '+84 945 678 901',
    postsCreated: mockMissingPosts.filter(p => p.author_name === 'Vũ Thị Lan').length,
    postsFound: mockMissingPosts.filter(p => p.author_name === 'Vũ Thị Lan' && p.status === 'found').length,
    createdDate: '2024-02-14',
    lastLogin: '2025-01-30',
    status: 'Active',
  },
  {
    id: 7,
    ownerName: 'Đinh Văn Tùng',
    email: 'dinhvantung@gmail.com',
    phone: '+84 956 789 012',
    postsCreated: 3,
    postsFound: 1,
    createdDate: '2024-09-20',
    lastLogin: '2025-01-25',
    status: 'Active',
  },
  {
    id: 8,
    ownerName: 'Bùi Thị Mai',
    email: 'buithimai@gmail.com',
    phone: '+84 967 890 123',
    postsCreated: 7,
    postsFound: 3,
    createdDate: '2024-05-05',
    lastLogin: '2025-01-28',
    status: 'Active',
  },
  {
    id: 9,
    ownerName: 'Ngô Quang Hải',
    email: 'ngoquanghai@gmail.com',
    phone: '+84 978 901 234',
    postsCreated: 1,
    postsFound: 0,
    createdDate: '2024-11-12',
    lastLogin: '2024-12-01',
    status: 'Disabled',
  },
  {
    id: 10,
    ownerName: 'Phan Thị Hương',
    email: 'phanthihuong@gmail.com',
    phone: '+84 989 012 345',
    postsCreated: 5,
    postsFound: 2,
    createdDate: '2024-07-30',
    lastLogin: '2025-02-01',
    status: 'Active',
  },
];

// Helper functions
export function getAccountsByStatus(status: 'Active' | 'Disabled') {
  return mockDetailedAccounts.filter(acc => acc.status === status);
}

export function getTopContributors(limit: number = 5) {
  return [...mockDetailedAccounts]
    .sort((a, b) => b.postsCreated - a.postsCreated)
    .slice(0, limit);
}

export function getAccountStats() {
  return {
    total: mockDetailedAccounts.length,
    active: mockDetailedAccounts.filter(acc => acc.status === 'Active').length,
    disabled: mockDetailedAccounts.filter(acc => acc.status === 'Disabled').length,
    totalPosts: mockDetailedAccounts.reduce((sum, acc) => sum + acc.postsCreated, 0),
    totalFound: mockDetailedAccounts.reduce((sum, acc) => sum + acc.postsFound, 0),
  };
}

export default mockDetailedAccounts;
