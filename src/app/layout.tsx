import type { Metadata } from "next";
import { Mali } from "next/font/google";
import "./globals.css";
import { Toaster } from 'sonner';

const mali = Mali({
  weight: ["400", "500", "600", "700"],
  subsets: ["vietnamese", "latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Cảnh Báo: Chị Tôi Già Thêm 1 Tuổi! 🚨",
  description: "Trang web bóc phốt và dìm hàng bá đạo nhất hệ mặt trời dành riêng cho người chị tuyệt vời!",
  keywords: ["Chúc mừng sinh nhật", "Bóc phốt", "Troll", "Happy Birthday", "Dìm hàng"],
  authors: [{ name: "Đứa em có tâm nhất Hệ Mặt Trời" }],
  openGraph: {
    title: "Cảnh Báo: Chị Tôi Già Thêm 1 Tuổi! 🚨",
    description: "Vào đây xem bằng chứng bóc phốt người chị 'tuyệt vời' của tui nha!",
    url: "https://your-domain.com", // You can update this later
    siteName: "Góc Bóc Phốt",
    images: [
      {
        url: "/anh-trang-chu.jpg", // Uses the hero image for thumbnail
        width: 1200,
        height: 630,
        alt: "Ảnh xinh đẹp của chị tui",
      },
    ],
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cảnh Báo: Chị Tôi Già Thêm 1 Tuổi! 🚨",
    description: "Vào đây xem bằng chứng bóc phốt người chị 'tuyệt vời' của tui nha!",
    images: ["/anh-trang-chu.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${mali.variable} font-sans antialiased`}
      >
        {children}
        <Toaster position="bottom-right" richColors />
      </body>
    </html>
  );
}
