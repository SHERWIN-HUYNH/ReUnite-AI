/**
 * Activity Log Types & Mock Data
 * Hệ thống theo dõi lịch sử thay đổi của bài đăng
 */

export type ActivityType = 
  | 'created'
  | 'updated'
  | 'status_changed'
  | 'approved'
  | 'rejected'
  | 'disabled'
  | 'deleted'
  | 'image_added'
  | 'image_removed'
  | 'comment_added';

export interface ActivityLog {
  id: string;
  post_id: string;
  activity_type: ActivityType;
  performed_by: {
    id: string;
    name: string;
    role: 'admin' | 'moderator' | 'user';
  };
  timestamp: string;
  details?: {
    old_value?: string | number | boolean | null;
    new_value?: string | number | boolean | null;
    reason?: string;
    comment?: string;
  };
}

// Mock Activity Logs
export const mockActivityLogs: ActivityLog[] = [
  {
    id: 'log_001',
    post_id: 'post_001',
    activity_type: 'created',
    performed_by: {
      id: 'acc_001',
      name: 'Nguyễn Văn An',
      role: 'user'
    },
    timestamp: '2025-01-26T08:00:00Z',
    details: {}
  },
  {
    id: 'log_002',
    post_id: 'post_001',
    activity_type: 'image_added',
    performed_by: {
      id: 'acc_001',
      name: 'Nguyễn Văn An',
      role: 'user'
    },
    timestamp: '2025-01-26T08:05:00Z',
    details: {
      new_value: 'Added 2 images'
    }
  },
  {
    id: 'log_003',
    post_id: 'post_002',
    activity_type: 'created',
    performed_by: {
      id: 'acc_002',
      name: 'Trần Thị Bình',
      role: 'user'
    },
    timestamp: '2025-01-20T10:30:00Z',
    details: {}
  },
  {
    id: 'log_004',
    post_id: 'post_002',
    activity_type: 'approved',
    performed_by: {
      id: 'acc_003',
      name: 'Lê Hoàng Minh',
      role: 'admin'
    },
    timestamp: '2025-01-20T14:00:00Z',
    details: {
      old_value: 'pending',
      new_value: 'finding'
    }
  },
  {
    id: 'log_005',
    post_id: 'post_002',
    activity_type: 'status_changed',
    performed_by: {
      id: 'acc_003',
      name: 'Lê Hoàng Minh',
      role: 'admin'
    },
    timestamp: '2025-01-28T14:20:00Z',
    details: {
      old_value: 'pending',
      new_value: 'finding',
      comment: 'Bài đăng đã được xác minh thông tin'
    }
  },
  {
    id: 'log_006',
    post_id: 'post_003',
    activity_type: 'created',
    performed_by: {
      id: 'acc_004',
      name: 'Phạm Thu Hà',
      role: 'user'
    },
    timestamp: '2024-12-11T07:00:00Z',
    details: {}
  },
  {
    id: 'log_007',
    post_id: 'post_003',
    activity_type: 'approved',
    performed_by: {
      id: 'acc_003',
      name: 'Lê Hoàng Minh',
      role: 'admin'
    },
    timestamp: '2024-12-11T10:00:00Z',
    details: {
      old_value: 'pending',
      new_value: 'finding'
    }
  },
  {
    id: 'log_008',
    post_id: 'post_003',
    activity_type: 'status_changed',
    performed_by: {
      id: 'acc_006',
      name: 'Vũ Thị Lan',
      role: 'moderator'
    },
    timestamp: '2024-12-18T16:45:00Z',
    details: {
      old_value: 'finding',
      new_value: 'found',
      comment: 'Đã tìm thấy an toàn tại Bệnh viện Bạch Mai'
    }
  },
  {
    id: 'log_009',
    post_id: 'post_007',
    activity_type: 'created',
    performed_by: {
      id: 'acc_004',
      name: 'Phạm Thu Hà',
      role: 'user'
    },
    timestamp: '2024-11-06T08:00:00Z',
    details: {}
  },
  {
    id: 'log_010',
    post_id: 'post_007',
    activity_type: 'rejected',
    performed_by: {
      id: 'acc_003',
      name: 'Lê Hoàng Minh',
      role: 'admin'
    },
    timestamp: '2024-11-07T09:30:00Z',
    details: {
      old_value: 'pending',
      new_value: 'disable',
      reason: 'Thông tin không chính xác, thiếu chi tiết quan trọng'
    }
  },
  {
    id: 'log_011',
    post_id: 'post_004',
    activity_type: 'updated',
    performed_by: {
      id: 'acc_005',
      name: 'Hoàng Đức Thắng',
      role: 'user'
    },
    timestamp: '2025-02-01T10:00:00Z',
    details: {
      comment: 'Cập nhật thông tin liên lạc và thêm ảnh mới'
    }
  },
  {
    id: 'log_012',
    post_id: 'post_004',
    activity_type: 'comment_added',
    performed_by: {
      id: 'acc_003',
      name: 'Lê Hoàng Minh',
      role: 'admin'
    },
    timestamp: '2025-02-02T11:15:00Z',
    details: {
      comment: 'Đã liên hệ với cơ quan chức năng tại Sapa'
    }
  }
];

// Helper functions
export function getActivityLogsByPostId(postId: string): ActivityLog[] {
  return mockActivityLogs
    .filter(log => log.post_id === postId)
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
}

export function getRecentActivities(limit: number = 10): ActivityLog[] {
  return [...mockActivityLogs]
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, limit);
}

export function getActivitiesByUser(userId: string): ActivityLog[] {
  return mockActivityLogs
    .filter(log => log.performed_by.id === userId)
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
}

export function getActivitiesByType(type: ActivityType): ActivityLog[] {
  return mockActivityLogs
    .filter(log => log.activity_type === type)
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
}

export default mockActivityLogs;
