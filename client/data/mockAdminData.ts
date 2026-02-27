/**
 * Mock Data cho Admin Dashboard - Hệ thống Quản lý Người Mất tích
 * File này chứa dữ liệu mẫu để test các chức năng admin
 */

import { PostAdmin, Account } from '@/test/interface';

// ============ MOCK ACCOUNTS ============
export const mockAccounts: Account[] = [
  {
    _id: "acc_001",
    name: "Nguyễn Văn An",
    role: "user",
    status: "active",
    created_at: "2024-01-15T08:30:00Z",
    updated_at: "2025-02-01T14:20:00Z"
  },
  {
    _id: "acc_002",
    name: "Trần Thị Bình",
    role: "user",
    status: "active",
    created_at: "2024-03-22T10:15:00Z",
    updated_at: "2025-01-28T09:45:00Z"
  },
  {
    _id: "acc_003",
    name: "Lê Hoàng Minh",
    role: "admin",
    status: "active",
    created_at: "2023-11-05T07:00:00Z",
    updated_at: "2025-02-03T08:00:00Z"
  },
  {
    _id: "acc_004",
    name: "Phạm Thu Hà",
    role: "user",
    status: "disabled",
    created_at: "2024-06-10T11:20:00Z",
    updated_at: "2024-12-20T16:30:00Z"
  },
  {
    _id: "acc_005",
    name: "Hoàng Đức Thắng",
    role: "user",
    status: "active",
    created_at: "2024-08-18T09:00:00Z",
    updated_at: "2025-02-02T13:15:00Z"
  },
  {
    _id: "acc_006",
    name: "Vũ Thị Lan",
    role: "moderator",
    status: "active",
    created_at: "2024-02-14T14:30:00Z",
    updated_at: "2025-01-30T10:00:00Z"
  },
];

// ============ MOCK MISSING PERSON POSTS ============
export const mockMissingPosts: PostAdmin[] = [
  {
    post_id: "post_001",
    status: "pending",
    name: "Nguyễn Minh Tuấn",
    author_name: "Nguyễn Văn An",
    account: mockAccounts[0],
    description: "Mất tích khi đi học về, mặc áo trắng và quần jeans xanh. Có nốt ruồi ở má trái. Rất nhút nhát và ít nói.",
    missing_since: "2025-01-25T15:30:00Z",
    gender: "male",
    dob: "2010-05-15",
    relationship: "con trai",
    address: "123 Đường Láng, Đống Đa, Hà Nội",
    contact_info: "phone: +84 912 345 678, email: nguyenvanan@gmail.com",
    create_at: "2025-01-26T08:00:00Z",
    update_at: "2025-01-26T08:00:00Z",
    images: [
      {
        _id: "img_001_1",
        created_at: "2025-01-26T08:05:00Z",
        is_avatar: true,
        url: "https://i.pravatar.cc/400?img=12"
      },
      {
        _id: "img_001_2",
        created_at: "2025-01-26T08:10:00Z",
        is_avatar: false,
        url: "https://i.pravatar.cc/400?img=13"
      }
    ]
  },
  {
    post_id: "post_002",
    status: "finding",
    name: "Trần Thị Mai",
    author_name: "Trần Thị Bình",
    account: mockAccounts[1],
    description: "Mất tích sau khi đi chợ sáng sớm. Cao khoảng 1m55, tóc dài ngang vai, mặc áo dài hoa. Có thể bị mất trí nhớ tạm thời.",
    missing_since: "2025-01-20T06:00:00Z",
    gender: "female",
    dob: "1975-08-22",
    relationship: "mẹ",
    address: "45 Phố Huế, Hai Bà Trưng, Hà Nội",
    contact_info: "phone: +84 987 654 321, email: tranbinhnguyen@gmail.com",
    create_at: "2025-01-20T10:30:00Z",
    update_at: "2025-01-28T14:20:00Z",
    images: [
      {
        _id: "img_002_1",
        created_at: "2025-01-20T10:35:00Z",
        is_avatar: true,
        url: "https://i.pravatar.cc/400?img=45"
      }
    ]
  },
  {
    post_id: "post_003",
    status: "found",
    name: "Phạm Văn Sơn",
    author_name: "Phạm Thu Hà",
    account: mockAccounts[3],
    description: "Đã tìm thấy an toàn tại Bệnh viện Bạch Mai. Trước đó mất tích khi đi dạo công viên.",
    missing_since: "2024-12-10T14:00:00Z",
    gender: "male",
    dob: "1960-03-10",
    relationship: "cha",
    address: "78 Trần Duy Hưng, Cầu Giấy, Hà Nội",
    contact_info: "phone: +84 923 456 789, email: phamthuha@gmail.com",
    create_at: "2024-12-11T07:00:00Z",
    update_at: "2024-12-18T16:45:00Z",
    images: [
      {
        _id: "img_003_1",
        created_at: "2024-12-11T07:10:00Z",
        is_avatar: true,
        url: "https://i.pravatar.cc/400?img=60"
      },
      {
        _id: "img_003_2",
        created_at: "2024-12-11T07:15:00Z",
        is_avatar: false,
        url: "https://i.pravatar.cc/400?img=61"
      }
    ]
  },
  {
    post_id: "post_004",
    status: "finding",
    name: "Lê Thị Hương",
    author_name: "Hoàng Đức Thắng",
    account: mockAccounts[4],
    description: "Mất tích khi đi du lịch Sapa. Mặc áo khoác đỏ, quần jean đen, mang theo ba lô màu xanh. Có sẹo nhỏ ở trán.",
    missing_since: "2025-01-30T10:00:00Z",
    gender: "female",
    dob: "1998-11-30",
    relationship: "bạn gái",
    address: "234 Kim Mã, Ba Đình, Hà Nội",
    contact_info: "phone: +84 934 567 890, email: hoangducthang@gmail.com",
    create_at: "2025-01-31T08:30:00Z",
    update_at: "2025-02-02T11:15:00Z",
    images: [
      {
        _id: "img_004_1",
        created_at: "2025-01-31T08:35:00Z",
        is_avatar: true,
        url: "https://i.pravatar.cc/400?img=47"
      },
      {
        _id: "img_004_2",
        created_at: "2025-01-31T08:40:00Z",
        is_avatar: false,
        url: "https://i.pravatar.cc/400?img=48"
      },
      {
        _id: "img_004_3",
        created_at: "2025-01-31T08:45:00Z",
        is_avatar: false,
        url: "https://i.pravatar.cc/400?img=49"
      }
    ]
  },
  {
    post_id: "post_005",
    status: "pending",
    name: "Vũ Đức Anh",
    author_name: "Vũ Thị Lan",
    account: mockAccounts[5],
    description: "Mất tích sau giờ tan trường. Học sinh lớp 8, mặc đồng phục trường, đeo kính cận. Thường hay chơi game và đi internet.",
    missing_since: "2025-02-01T16:30:00Z",
    gender: "male",
    dob: "2009-07-08",
    relationship: "em trai",
    address: "567 Giải Phóng, Hoàng Mai, Hà Nội",
    contact_info: "phone: +84 945 678 901, email: vuthilan@gmail.com",
    create_at: "2025-02-01T18:00:00Z",
    update_at: "2025-02-01T18:00:00Z",
    images: [
      {
        _id: "img_005_1",
        created_at: "2025-02-01T18:05:00Z",
        is_avatar: true,
        url: "https://i.pravatar.cc/400?img=15"
      }
    ]
  },
  {
    post_id: "post_006",
    status: "finding",
    name: "Đỗ Thị Thu",
    author_name: "Nguyễn Văn An",
    account: mockAccounts[0],
    description: "Người cao tuổi, có dấu hiệu sa sút trí tuệ. Mặc áo len xám, tóc bạc. Có thể đi lang thang không nhớ đường về.",
    missing_since: "2025-01-28T07:00:00Z",
    gender: "female",
    dob: "1955-12-20",
    relationship: "bà ngoại",
    address: "890 Nguyễn Trãi, Thanh Xuân, Hà Nội",
    contact_info: "phone: +84 912 345 678, email: nguyenvanan@gmail.com",
    create_at: "2025-01-28T09:30:00Z",
    update_at: "2025-02-01T15:20:00Z",
    images: [
      {
        _id: "img_006_1",
        created_at: "2025-01-28T09:35:00Z",
        is_avatar: true,
        url: "https://i.pravatar.cc/400?img=44"
      }
    ]
  },
  {
    post_id: "post_007",
    status: "disable",
    name: "Ngô Văn Hải",
    author_name: "Phạm Thu Hà",
    account: mockAccounts[3],
    description: "Bài đăng bị vô hiệu hóa do cung cấp thông tin sai lệch.",
    missing_since: "2024-11-05T12:00:00Z",
    gender: "male",
    dob: "1988-04-15",
    relationship: "anh trai",
    address: "321 Tây Sơn, Đống Đa, Hà Nội",
    contact_info: "phone: +84 923 456 789, email: phamthuha@gmail.com",
    create_at: "2024-11-06T08:00:00Z",
    update_at: "2024-11-10T14:30:00Z",
    images: []
  },
  {
    post_id: "post_008",
    status: "found",
    name: "Bùi Thị Ngọc",
    author_name: "Trần Thị Bình",
    account: mockAccounts[1],
    description: "Đã tìm thấy an toàn tại nhà người thân ở Hải Phòng. Mất tích do xung đột gia đình.",
    missing_since: "2024-10-15T18:00:00Z",
    gender: "female",
    dob: "2005-09-25",
    relationship: "con gái",
    address: "456 Láng Hạ, Ba Đình, Hà Nội",
    contact_info: "phone: +84 987 654 321, email: tranbinhnguyen@gmail.com",
    create_at: "2024-10-16T06:00:00Z",
    update_at: "2024-10-22T10:15:00Z",
    images: [
      {
        _id: "img_008_1",
        created_at: "2024-10-16T06:10:00Z",
        is_avatar: true,
        url: "https://i.pravatar.cc/400?img=43"
      }
    ]
  },
  {
    post_id: "post_009",
    status: "pending",
    name: "Đinh Văn Tùng",
    author_name: "Hoàng Đức Thắng",
    account: mockAccounts[4],
    description: "Mất tích sau khi đi làm về. Mặc đồ công nhân xây dựng, mang theo túi xách đen. Có hình xăm rồng ở cánh tay trái.",
    missing_since: "2025-02-02T19:00:00Z",
    gender: "male",
    dob: "1982-06-18",
    relationship: "bạn",
    address: "123 Phạm Hùng, Nam Từ Liêm, Hà Nội",
    contact_info: "phone: +84 934 567 890, email: hoangducthang@gmail.com",
    create_at: "2025-02-03T07:30:00Z",
    update_at: "2025-02-03T07:30:00Z",
    images: [
      {
        _id: "img_009_1",
        created_at: "2025-02-03T07:35:00Z",
        is_avatar: true,
        url: "https://i.pravatar.cc/400?img=33"
      },
      {
        _id: "img_009_2",
        created_at: "2025-02-03T07:40:00Z",
        is_avatar: false,
        url: "https://i.pravatar.cc/400?img=34"
      }
    ]
  },
  {
    post_id: "post_010",
    status: "finding",
    name: "Phan Thị Linh",
    author_name: "Vũ Thị Lan",
    account: mockAccounts[5],
    description: "Sinh viên năm 3, mất tích sau khi tham gia hoạt động ngoại khóa. Mặc áo thun trắng và quần short jean. Có thể đang ở khu vực Hồ Tây.",
    missing_since: "2025-01-29T14:00:00Z",
    gender: "female",
    dob: "2003-02-14",
    relationship: "bạn học",
    address: "789 Xuân Thủy, Cầu Giấy, Hà Nội",
    contact_info: "phone: +84 945 678 901, email: vuthilan@gmail.com",
    create_at: "2025-01-30T08:00:00Z",
    update_at: "2025-02-02T16:45:00Z",
    images: [
      {
        _id: "img_010_1",
        created_at: "2025-01-30T08:10:00Z",
        is_avatar: true,
        url: "https://i.pravatar.cc/400?img=46"
      }
    ]
  },
];

// ============ STATISTICS DATA ============
export const mockStatistics = {
  totalAccounts: mockAccounts.length,
  activeAccounts: mockAccounts.filter(acc => acc.status === 'active').length,
  totalPosts: mockMissingPosts.length,
  pendingPosts: mockMissingPosts.filter(post => post.status === 'pending').length,
  findingPosts: mockMissingPosts.filter(post => post.status === 'finding').length,
  foundPosts: mockMissingPosts.filter(post => post.status === 'found').length,
  disabledPosts: mockMissingPosts.filter(post => post.status === 'disable').length,
  totalSearches: 347, // Mock số lượt tìm kiếm
  successRate: ((mockMissingPosts.filter(post => post.status === 'found').length / mockMissingPosts.length) * 100).toFixed(1)
};

// ============ HELPER FUNCTIONS ============

/**
 * Lấy danh sách posts theo status
 */
export function getPostsByStatus(status: 'pending' | 'finding' | 'found' | 'disable') {
  return mockMissingPosts.filter(post => post.status === status);
}

/**
 * Lấy danh sách posts theo account
 */
export function getPostsByAccount(accountId: string) {
  return mockMissingPosts.filter(post => post.account._id === accountId);
}

/**
 * Lấy posts được tạo trong khoảng thời gian
 */
export function getPostsByDateRange(startDate: Date, endDate: Date) {
  return mockMissingPosts.filter(post => {
    const createdDate = new Date(post.create_at);
    return createdDate >= startDate && createdDate <= endDate;
  });
}

/**
 * Lấy thống kê theo giới tính
 */
export function getStatsByGender() {
  return {
    male: mockMissingPosts.filter(post => post.gender === 'male').length,
    female: mockMissingPosts.filter(post => post.gender === 'female').length,
    other: mockMissingPosts.filter(post => post.gender === 'other').length,
  };
}

/**
 * Lấy thống kê theo độ tuổi
 */
export function getStatsByAgeGroup() {
  const currentYear = new Date().getFullYear();
  const ageGroups = {
    children: 0,    // 0-12
    teenagers: 0,   // 13-17
    youngAdults: 0, // 18-30
    adults: 0,      // 31-60
    seniors: 0      // 60+
  };

  mockMissingPosts.forEach(post => {
    const age = currentYear - new Date(post.dob).getFullYear();
    if (age <= 12) ageGroups.children++;
    else if (age <= 17) ageGroups.teenagers++;
    else if (age <= 30) ageGroups.youngAdults++;
    else if (age <= 60) ageGroups.adults++;
    else ageGroups.seniors++;
  });

  return ageGroups;
}

const mockAdminData = {
  accounts: mockAccounts,
  posts: mockMissingPosts,
  statistics: mockStatistics,
  getPostsByStatus,
  getPostsByAccount,
  getPostsByDateRange,
  getStatsByGender,
  getStatsByAgeGroup
};

export default mockAdminData;
