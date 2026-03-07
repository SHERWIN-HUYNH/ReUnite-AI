"use client";

import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

// Providers wrapper — mở rộng thêm provider ở đây nếu cần (theme, i18n, ...)
export function Providers({ children }: Props) {
  return <>{children}</>;
}
