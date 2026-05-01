import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  FolderOpen,
  GitBranch,
  Layers3,
  PenLine,
} from "lucide-react";

import { projects } from "@/data/projects";

const homeProjects = [...projects].sort((a, b) => {
  const latestA = a.milestones.at(-1)?.date ?? "0000-00-00";
  const latestB = b.milestones.at(-1)?.date ?? "0000-00-00";
  return latestB.localeCompare(latestA);
});
const weatherProject = projects.find((project) => project.slug === "weather-app-android") ?? projects[0];
const githubProfileUrl = "https://github.com/ByuN0-0";

const categories = [
  ["Business", 2],
  ["Mobile App", 1],
  ["Vue", 1],
  ["Android", 1],
  ["CRM", 1],
  ["Prototype", 2],
  ["API Integration", 2],
  ["Retrospective", 4],
];

const recentPosts = [
  {
    title: "HealthHola: 사업 프로젝트에서 앱과 백엔드를 함께 만들기",
    href: "/projects/healthhola",
    date: "2025.02.17",
  },
  {
    title: "HealthCatcher Web: 브랜드 홈페이지와 사업 소개 채널 만들기",
    href: "/projects/healthcatcher-web",
    date: "2025.01.14",
  },
  {
    title: "CRM Platform: 동적 거래 속성을 가진 CRM 플랫폼 만들기",
    href: "/projects/crm-platform",
    date: "2024.06.17",
  },
  {
    title: "WeatherApp: 첫 Android 프로젝트를 포트폴리오 글로 정리하기",
    href: `/projects/${weatherProject.slug}`,
    date: "2023.06.10",
  },
  {
    title: "OpenWeatherMap API로 현재 날씨와 예보 데이터 연결하기",
    href: `/projects/${weatherProject.slug}#prototype`,
    date: "2023.05.30",
  },
  {
    title: "MainActivity에서 데이터 로더와 View 초기화 클래스로 분리하기",
    href: `/projects/${weatherProject.slug}#structure`,
    date: "2023.06.05",
  },
];

function projectPostTitle(slug: string, title: string) {
  if (slug === "weather-app-android") return `${title}: GPS 기반 Android 날씨 앱`;
  if (slug === "crm-platform") return `${title}: 동적 거래 속성을 가진 CRM 플랫폼`;
  if (slug === "healthhola") return `${title}: 건강 체험단 모바일 앱과 백엔드`;
  if (slug === "healthcatcher-web") return `${title}: 헬스캐처 공식 홈페이지`;
  return title;
}

export default function Home() {
  return (
    <main className="min-h-screen bg-[#08090a] text-[#f7f8f8]">
      <header className="border-b border-white/[0.06] bg-[#08090a]">
        <div className="mx-auto max-w-6xl px-5 py-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <Link href="/" className="text-[32px] font-normal leading-none tracking-[-0.704px]">
                ByuN0-0.log
              </Link>
              <p className="mt-3 text-[15px] leading-[1.6] tracking-[-0.165px] text-[#8a8f98]">
                Git 기록, 프로토타입, 회고를 글처럼 쌓아두는 개발 포트폴리오
              </p>
            </div>
            <nav className="flex gap-5 text-[14px] font-medium text-[#d0d6e0]">
              <a href="#posts" className="hover:text-white">
                글
              </a>
              <a href="#profile" className="hover:text-white">
                프로필
              </a>
              <a
                href={githubProfileUrl}
                target="_blank"
                rel="noreferrer"
                className="hover:text-white"
              >
                GitHub
              </a>
            </nav>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-8 lg:grid-cols-[minmax(0,1fr)_300px]">
        <section id="posts" className="space-y-8">
          {homeProjects.map((project, index) => (
            <article
              key={project.slug}
              className="overflow-hidden rounded-[8px] border border-white/[0.08] bg-white/[0.02]"
            >
              <div className="grid gap-0 md:grid-cols-[minmax(0,1fr)_280px]">
                <div className="p-6 sm:p-8">
                  <div className="mb-4 flex flex-wrap items-center gap-3 text-[13px] text-[#8a8f98]">
                    <span className="inline-flex items-center gap-2">
                      <FolderOpen className="size-4 text-[#7170ff]" />
                      {index === 0 ? "최신 프로젝트" : "이전 프로젝트"}
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <CalendarDays className="size-4" />
                      {project.period}
                    </span>
                  </div>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="block text-[32px] font-normal leading-[1.18] tracking-[-0.704px] hover:text-[#d0d6e0]"
                  >
                    {projectPostTitle(project.slug, project.title)}
                  </Link>
                  <p className="mt-4 max-w-2xl text-[16px] leading-[1.7] text-[#d0d6e0]">
                    {project.summary}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.stacks.slice(0, 5).map((stack) => (
                      <span
                        key={stack}
                        className="rounded-full border border-[#23252a] px-3 py-1 text-[12px] font-medium text-[#d0d6e0]"
                      >
                        {stack}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="mt-8 inline-flex items-center gap-2 text-[14px] font-medium text-[#828fff] hover:text-[#a8b0ff]"
                  >
                    글 읽기
                    <ArrowRight className="size-4" />
                  </Link>
                </div>
                <Link
                  href={`/projects/${project.slug}`}
                  className="relative flex min-h-[260px] items-center justify-center border-t border-white/[0.06] bg-[#0f1011] p-5 md:border-l md:border-t-0"
                >
                  <div className="overflow-hidden rounded-[10px] border border-white/[0.08] bg-black/20">
                    <Image
                      src={project.heroImage}
                      alt={`${project.title} preview`}
                      width={720}
                      height={1280}
                      priority={index === 0}
                      className={
                        project.slug === "healthcatcher-web"
                          ? "h-auto w-full object-contain opacity-90"
                          : "h-[260px] w-auto max-w-full object-contain opacity-90"
                      }
                    />
                  </div>
                </Link>
              </div>
            </article>
          ))}

          <section className="rounded-[8px] border border-white/[0.08] bg-white/[0.02]">
            <div className="border-b border-white/[0.06] px-6 py-4">
              <h2 className="flex items-center gap-2 text-[18px] font-medium">
                <BookOpen className="size-5 text-[#7170ff]" />
                최근 글
              </h2>
            </div>
            <div className="divide-y divide-white/[0.06]">
              {recentPosts.map((post) => (
                <Link
                  key={post.title}
                  href={post.href}
                  className="grid gap-2 px-6 py-5 transition hover:bg-white/[0.03] sm:grid-cols-[120px_minmax(0,1fr)]"
                >
                  <span className="text-[13px] text-[#62666d]">{post.date}</span>
                  <span className="text-[16px] leading-[1.5] text-[#d0d6e0]">
                    {post.title}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        </section>

        <aside id="profile" className="space-y-5 lg:sticky lg:top-6 lg:self-start">
          <section className="rounded-[8px] border border-white/[0.08] bg-white/[0.02] p-5">
            <div className="flex items-center gap-3">
              <div className="grid size-12 place-items-center rounded-[8px] bg-[#5e6ad2] text-[20px] font-semibold">
                B
              </div>
              <div>
                <p className="text-[17px] font-medium">ByuN0-0</p>
                <p className="text-[13px] text-[#8a8f98]">Portfolio Blog</p>
              </div>
            </div>
            <p className="mt-5 text-[14px] leading-[1.7] text-[#d0d6e0]">
              프로젝트를 결과물만 나열하지 않고, 기능을 만든 순서와 기술 선택의
              이유가 보이도록 정리합니다.
            </p>
          </section>

          <section className="rounded-[8px] border border-white/[0.08] bg-white/[0.02] p-5">
            <h2 className="mb-4 flex items-center gap-2 text-[15px] font-medium">
              <Layers3 className="size-4 text-[#7170ff]" />
              카테고리
            </h2>
            <div className="space-y-3">
              {categories.map(([name, count]) => (
                <div key={name} className="flex items-center justify-between text-[14px]">
                  <span className="text-[#d0d6e0]">{name}</span>
                  <span className="text-[#62666d]">{count}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[8px] border border-white/[0.08] bg-white/[0.02] p-5">
            <h2 className="mb-4 flex items-center gap-2 text-[15px] font-medium">
              <PenLine className="size-4 text-[#7170ff]" />
              기록 방식
            </h2>
            <ul className="space-y-3 text-[14px] leading-[1.6] text-[#8a8f98]">
              <li>커밋 로그를 마일스톤으로 정리</li>
              <li>README와 코드 구조에서 기능 근거 추출</li>
              <li>가능한 프로젝트는 프로토타입으로 재현</li>
            </ul>
          </section>

          <a
            href={githubProfileUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between rounded-[8px] border border-white/[0.08] bg-[#5e6ad2] px-5 py-4 text-[14px] font-medium text-white transition hover:bg-[#828fff]"
          >
            GitHub 저장소
            <GitBranch className="size-4" />
          </a>
        </aside>
      </div>
    </main>
  );
}
