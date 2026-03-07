import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // Đọc JWT token từ Authorization header (client gửi kèm)
  const authHeader = req.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();

  const apiRes = await fetch(`${process.env.API_URL}/posts`, {
    method: "POST",
    headers: {
      Authorization: authHeader,
    },
    body: formData,
  });

  const data = await apiRes.json().catch(() => ({}));

  if (!apiRes.ok) {
    return NextResponse.json(
      { error: data.detail || "Không thể tạo bài đăng" },
      { status: apiRes.status }
    );
  }

  return NextResponse.json(data, { status: apiRes.status });
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status") || "";
  const skip = searchParams.get("skip") || "0";
  const limit = searchParams.get("limit") || "20";

  const params = new URLSearchParams();
  if (status) params.set("status", status);
  params.set("skip", skip);
  params.set("limit", limit);

  const apiRes = await fetch(`${process.env.API_URL}/posts?${params.toString()}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const data = await apiRes.json().catch(() => ({}));
  return NextResponse.json(data, { status: apiRes.status });
}