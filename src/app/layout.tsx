import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://biyeon.net"),
  title: {
    default: "ByuN0-0.log",
    template: "%s | ByuN0-0.log",
  },
  description:
    "백엔드 API, 운영 도구, 배치, 결제, 크롤링, 배포 경험을 정리한 개발 포트폴리오",
  applicationName: "ByuN0-0.log",
  authors: [{ name: "황비연", url: "https://github.com/ByuN0-0" }],
  creator: "황비연",
  publisher: "ByuN0-0",
  keywords: [
    "ByuN0-0",
    "황비연",
    "백엔드 개발자",
    "개발 포트폴리오",
    "Next.js",
    "NestJS",
    "Spring Boot",
  ],
  openGraph: {
    title: "ByuN0-0.log",
    description:
      "서비스 개발과 운영 경험을 프로젝트별로 정리한 백엔드 개발 포트폴리오",
    url: "/",
    siteName: "ByuN0-0.log",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "ByuN0-0.log 개발 포트폴리오",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ByuN0-0.log",
    description:
      "서비스 개발과 운영 경험을 프로젝트별로 정리한 백엔드 개발 포트폴리오",
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
