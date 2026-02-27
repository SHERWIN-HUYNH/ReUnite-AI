'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { mockMissingPosts } from '@/data/mockAdminData';
import { PostAdmin } from '@/test/interface';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { 
  ArrowLeft, 
  User, 
  Calendar, 
  MapPin, 
  Phone, 
  Mail,
  Clock,
  FileText,
  Image as ImageIcon,
  Edit,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';
import Image from 'next/image';

export default function PostDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [post, setPost] = useState<PostAdmin | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>('');

  useEffect(() => {
    const postId = params.postId as string;
    const foundPost = mockMissingPosts.find(p => p.post_id === postId);
    if (foundPost) {
      setPost(foundPost);
      // Set first avatar or first image as selected
      const avatarImage = foundPost.images.find(img => img.is_avatar);
      setSelectedImage(avatarImage?.url || foundPost.images[0]?.url || '');
    }
  }, [params.postId]);

  if (!post) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Không tìm thấy bài đăng</h2>
          <button
            onClick={() => router.back()}
            className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Quay lại
          </button>
        </div>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string; className: string; icon: React.ElementType }> = {
      pending: { 
        label: 'Chờ duyệt', 
        className: 'bg-yellow-100 text-yellow-800 border-yellow-300',
        icon: <Clock className="w-4 h-4" />
      },
      finding: { 
        label: 'Đang tìm', 
        className: 'bg-blue-100 text-blue-800 border-blue-300',
        icon: <AlertCircle className="w-4 h-4" />
      },
      found: { 
        label: 'Đã tìm thấy', 
        className: 'bg-green-100 text-green-800 border-green-300',
        icon: <CheckCircle className="w-4 h-4" />
      },
      disable: { 
        label: 'Vô hiệu', 
        className: 'bg-gray-100 text-gray-800 border-gray-300',
        icon: <XCircle className="w-4 h-4" />
      },
    };
    const status_info = statusMap[status] || statusMap.pending;
    return (
      <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold border-2 ${status_info.className}`}>
        {status_info.icon}
        {status_info.label}
      </span>
    );
  };

  const calculateAge = (dob: string) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Quay lại danh sách</span>
          </button>

          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-slate-700">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {post.name}
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  ID: {post.post_id}
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                {getStatusBadge(post.status)}
                <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                  <Edit className="w-4 h-4" />
                  Chỉnh sửa
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Images */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-slate-700 sticky top-6">
              <div className="flex items-center gap-2 mb-4">
                <ImageIcon className="w-5 h-5 text-indigo-600" />
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Hình ảnh</h2>
              </div>

              {post.images.length > 0 ? (
                <>
                  {/* Main Image */}
                  <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 dark:bg-slate-700 mb-4">
                    <img
                      src={selectedImage}
                      alt={post.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Thumbnail Gallery */}
                  {post.images.length > 1 && (
                    <div className="grid grid-cols-4 gap-2">
                      {post.images.map((img) => (
                        <button
                          key={img._id}
                          onClick={() => setSelectedImage(img.url)}
                          className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                            selectedImage === img.url
                              ? 'border-indigo-600 scale-105'
                              : 'border-gray-200 dark:border-slate-600 hover:border-indigo-400'
                          }`}
                        >
                          <img
                            src={img.url}
                            alt="Thumbnail"
                            className="w-full h-full object-cover"
                          />
                          {img.is_avatar && (
                            <div className="absolute top-1 right-1 bg-indigo-600 text-white text-xs px-1.5 py-0.5 rounded">
                              Chính
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="aspect-square rounded-xl bg-gray-100 dark:bg-slate-700 flex flex-col items-center justify-center text-gray-400">
                  <ImageIcon className="w-16 h-16 mb-2" />
                  <p className="text-sm">Không có hình ảnh</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-slate-700">
              <div className="flex items-center gap-2 mb-6">
                <User className="w-5 h-5 text-indigo-600" />
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Thông tin cá nhân</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Họ và tên</label>
                  <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">{post.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Giới tính</label>
                  <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                    {post.gender === 'male' ? 'Nam' : post.gender === 'female' ? 'Nữ' : 'Khác'}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Ngày sinh</label>
                  <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                    {format(new Date(post.dob), 'dd/MM/yyyy', { locale: vi })}
                    <span className="text-sm text-gray-500 ml-2">({calculateAge(post.dob)} tuổi)</span>
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Mối quan hệ</label>
                  <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white capitalize">{post.relationship}</p>
                </div>
              </div>
            </div>

            {/* Missing Information */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-slate-700">
              <div className="flex items-center gap-2 mb-6">
                <AlertCircle className="w-5 h-5 text-indigo-600" />
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Thông tin mất tích</h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Thời gian mất tích</label>
                    <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                      {format(new Date(post.missing_since), 'dd/MM/yyyy HH:mm', { locale: vi })}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Địa chỉ</label>
                    <p className="mt-1 text-lg text-gray-900 dark:text-white">{post.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Mô tả chi tiết</label>
                    <p className="mt-1 text-gray-900 dark:text-white leading-relaxed">{post.description}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-slate-700">
              <div className="flex items-center gap-2 mb-6">
                <Phone className="w-5 h-5 text-indigo-600" />
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Thông tin liên hệ</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Người đăng bài</label>
                  <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">{post.author_name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Thông tin liên lạc</label>
                  <p className="mt-1 text-gray-900 dark:text-white">{post.contact_info}</p>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-slate-700">
              <div className="flex items-center gap-2 mb-6">
                <Clock className="w-5 h-5 text-indigo-600" />
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Lịch sử</h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {format(new Date(post.create_at), "dd/MM/yyyy 'lúc' HH:mm", { locale: vi })}
                    </p>
                    <p className="text-gray-900 dark:text-white font-medium">Bài đăng được tạo</p>
                  </div>
                </div>
                {post.update_at !== post.create_at && (
                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {format(new Date(post.update_at), "dd/MM/yyyy 'lúc' HH:mm", { locale: vi })}
                      </p>
                      <p className="text-gray-900 dark:text-white font-medium">Cập nhật lần cuối</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
