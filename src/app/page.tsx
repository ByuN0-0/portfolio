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
import { getFeaturedStacks } from "@/data/stack-groups";

type HomeCategory = "all" | "company" | "business" | "personal" | "prototype";
type HomeSearchParams = {
  category?: string | string[];
};

function getLatestProjectDate(project: (typeof projects)[number]) {
  return project.milestones.reduce(
    (latest, milestone) => (milestone.date > latest ? milestone.date : latest),
    "0000-00-00",
  );
}

const sortedProjects = [...projects].sort((a, b) => {
  const latestA = getLatestProjectDate(a);
  const latestB = getLatestProjectDate(b);
  return latestB.localeCompare(latestA);
});
const githubProfileUrl = "https://github.com/ByuN0-0";
const profileAvatarUrl = "/profile/avatar.webp";
const featuredProjectSlugs = ["blynx-insight-platform", "moonshot", "manjeom"];
const featuredProjects = featuredProjectSlugs
  .map((slug) => projects.find((project) => project.slug === slug))
  .filter((project): project is (typeof projects)[number] => Boolean(project));

const filterablePrototypeSlugs = ["weather-app-android", "crm-platform"];
const categories: { key: HomeCategory; name: string; count: number; href: string }[] = [
  { key: "all", name: "전체", count: projects.length, href: "/" },
  {
    key: "company",
    name: "회사 프로젝트",
    count: projects.filter((project) => project.category === "company").length,
    href: "/?category=company",
  },
  {
    key: "business",
    name: "사업 프로젝트",
    count: projects.filter((project) => project.category === "business").length,
    href: "/?category=business",
  },
  {
    key: "personal",
    name: "개인 프로젝트",
    count: projects.filter((project) => project.category === "personal").length,
    href: "/?category=personal",
  },
  {
    key: "prototype",
    name: "Prototype",
    count: projects.filter((project) => filterablePrototypeSlugs.includes(project.slug)).length,
    href: "/?category=prototype",
  },
];

const categoryLabel = {
  company: "회사 프로젝트",
  business: "사업 프로젝트",
  personal: "개인 프로젝트",
} as const;

function isHomeCategory(value: string): value is HomeCategory {
  return categories.some((category) => category.key === value);
}

function getSelectedCategory(searchParams?: HomeSearchParams): HomeCategory {
  const rawCategory = Array.isArray(searchParams?.category)
    ? searchParams?.category[0]
    : searchParams?.category;

  return rawCategory && isHomeCategory(rawCategory) ? rawCategory : "all";
}

function filterProjects(category: HomeCategory) {
  if (category === "all") return sortedProjects;
  if (category === "prototype") {
    return sortedProjects.filter((project) => filterablePrototypeSlugs.includes(project.slug));
  }

  return sortedProjects.filter((project) => project.category === category);
}

function projectPostDescription(slug: string) {
  if (slug === "weather-app-android") return "GPS 기반 Android 날씨 앱";
  if (slug === "crm-platform") return "동적 거래 속성을 가진 CRM 플랫폼";
  if (slug === "healthhola") return "건강 체험단 모바일 앱과 백엔드";
  if (slug === "healthcatcher-web") return "헬스캐처 공식 홈페이지";
  if (slug === "manjeom") return "웹 기반 점자 학습 서비스";
  if (slug === "blynx-insight-platform") return "야구 예측 플랫폼 운영 시스템";
  if (slug === "moonshot") return "LLM 챗봇 서비스 운영";
  if (slug === "rizzz") return "종료 전 AI 소셜 플랫폼 품질 개선";
  return "";
}

function projectHomeSummary(slug: string) {
  const summaries: Record<string, string> = {
    "blynx-insight-platform":
      "야구 팬이 경기 결과와 선수 기록을 예측하고 리워드를 받는 스포츠 예측 플랫폼. 웹, 앱, 관리자 도구, 결제와 정산까지 연결된 실서비스.",
    moonshot:
      "웹사이트와 문서를 바탕으로 즉시 응답하는 AI 에이전트 플랫폼. 서비스 종료 이후에는 blynxlab.com을 회사 페이지 대용 홈페이지로 유지.",
    rizzz:
      "AI 캐릭터와 대화하며 관계를 쌓는 소셜 채팅 서비스. 2025년 11월 종료 전까지 채팅 백엔드, 관리자 도구, 데이터 수집 인프라를 개선.",
    healthhola:
      "건강 체험단 모집과 커뮤니티를 연결하려던 모바일 앱. 설문, 포인트, 쿠폰, 신고와 차단까지 포함한 건강 서비스 운영 흐름.",
    "healthcatcher-web":
      "헬스캐처 사업을 소개하던 공식 홈페이지. 브랜드 소개, 사업 영역, 팀 소개, 제휴 문의와 정책 문서를 한 곳에 모은 웹사이트.",
    manjeom:
      "한글 점자, 숫자, 로마자, 수학 기호를 표와 문제로 익히는 점자 학습 웹서비스. 6점 입력, 선택형/입력형 연습, 점자 변환기를 함께 제공.",
    "crm-platform":
      "회사와 거래 정보를 워크스페이스 단위로 관리하는 웹 CRM. 거래 속성을 자유롭게 추가할 수 있는 동적 필드 구조가 핵심.",
    "weather-app-android":
      "현재 날씨, 시간대별 예보, 5일 예보와 대기질 정보를 보여주는 Android 날씨 앱. 날씨와 시간대에 따라 바뀌는 화면 분위기.",
  };

  return summaries[slug] ?? "";
}

export default async function Home({
  searchParams,
}: {
  searchParams?: Promise<HomeSearchParams>;
}) {
  const selectedCategory = getSelectedCategory(await searchParams);
  const homeProjects = filterProjects(selectedCategory);
  const showFeaturedProjects = selectedCategory === "all";
  const recentPosts = homeProjects.slice(0, 6).map((project) => ({
    title: project.title,
    description: projectPostDescription(project.slug),
    href: `/projects/${project.slug}`,
    date: getLatestProjectDate(project).replaceAll("-", "."),
  }));

  return (
    <main className="min-h-screen bg-[#fffdf8] text-[#0a0a0a]">
      <header className="border-b border-black/[0.08] bg-[#fffdf8]">
        <div className="mx-auto max-w-7xl px-5 py-6 sm:px-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <Link href="/" className="text-[36px] font-[340] leading-none tracking-[-0.96px]">
                ByuN0-0.log
              </Link>
              <p className="mt-3 max-w-xl text-[18px] font-[330] leading-[1.45] tracking-[-0.14px] text-[#111]">
                서비스 운영과 제품 구현 경험을 글처럼 쌓아두는 개발 포트폴리오
              </p>
            </div>
            <nav className="flex flex-wrap gap-2 text-[15px] font-[480] text-[#0a0a0a]">
              <a href="#posts" className="rounded-full px-4 py-2 hover:bg-black hover:text-white">
                글
              </a>
              <a href="#profile" className="rounded-full px-4 py-2 hover:bg-black hover:text-white">
                프로필
              </a>
              <a
                href={githubProfileUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-black px-4 py-2 text-white hover:bg-[#2a2a2a]"
              >
                GitHub
              </a>
            </nav>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 sm:px-8 lg:grid-cols-[minmax(0,1fr)_300px]">
        <section id="posts" className="space-y-8">
          {showFeaturedProjects ? (
            <section className="overflow-hidden rounded-[24px] bg-[#e6f5a6] text-[#0a0a0a]">
              <div className="p-6">
                <p className="font-mono text-[12px] font-normal uppercase tracking-[0.12em]">
                  Featured
                </p>
                <h2 className="mt-4 max-w-3xl text-[42px] font-[340] leading-[1.04] tracking-[-0.96px] sm:text-[56px]">
                  대표 프로젝트
                </h2>
                <p className="mt-4 max-w-2xl text-[18px] font-[330] leading-[1.45] tracking-[-0.14px]">
                  실서비스 운영, AI 제품 개발, 개인 서비스 구현 경험이 가장 잘 드러나는 작업입니다.
                </p>
              </div>
              <div className="grid gap-px bg-black/[0.12] lg:grid-cols-3">
                {featuredProjects.map((project, index) => (
                  <Link
                    key={project.slug}
                    href={`/projects/${project.slug}`}
                    className="group block bg-[#e6f5a6] p-6 transition hover:bg-[#deee98]"
                  >
                    <div className="relative mb-5 aspect-[16/10] overflow-hidden rounded-[16px] bg-white">
                      <Image
                        src={project.heroImage}
                        alt={`${project.title} featured preview`}
                        fill
                        sizes="(max-width: 1024px) 100vw, 260px"
                        priority={index === 0}
                        className="object-contain p-3 transition group-hover:scale-[1.02]"
                      />
                    </div>
                    <div className="mb-3 flex flex-wrap items-center gap-2 text-[12px] text-[#202020]">
                      <span className="inline-flex items-center gap-1.5">
                        <FolderOpen className="size-3.5" />
                        {categoryLabel[project.category]}
                      </span>
                      <span>{project.period}</span>
                    </div>
                    <h3>
                      <span className="block text-[28px] font-[540] leading-[1.08] tracking-[-0.52px]">
                        {project.title}
                      </span>
                      <span className="mt-2 block text-[16px] font-[480] leading-[1.35] tracking-[-0.14px] text-[#0a0a0a]">
                        {projectPostDescription(project.slug)}
                      </span>
                    </h3>
                    <p className="mt-3 overflow-hidden text-[14px] font-[330] leading-[1.5] tracking-[-0.14px] text-[#333] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3]">
                      {projectHomeSummary(project.slug)}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}

          {homeProjects.map((project, index) => (
            <article
              key={project.slug}
              className="overflow-hidden rounded-[24px] border border-black/[0.1] bg-white"
            >
              <div className="grid gap-0 md:grid-cols-[minmax(0,1fr)_280px]">
                <div className="p-6 sm:p-8">
                  <div className="mb-4 flex flex-wrap items-center gap-3 font-mono text-[12px] uppercase tracking-[0.08em] text-[#242424]">
                    <span className="inline-flex items-center gap-2">
                      <FolderOpen className="size-4" />
                      {categoryLabel[project.category]}
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <CalendarDays className="size-4" />
                      {project.period}
                    </span>
                  </div>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="block hover:underline"
                  >
                    <span className="block text-[38px] font-[340] leading-[1.05] tracking-[-0.96px]">
                      {project.title}
                    </span>
                    <span className="mt-2 block text-[22px] font-[480] leading-[1.25] tracking-[-0.26px] text-[#0a0a0a]">
                      {projectPostDescription(project.slug)}
                    </span>
                  </Link>
                  <p className="mt-4 max-w-2xl overflow-hidden text-[17px] font-[330] leading-[1.5] tracking-[-0.14px] text-[#333] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3]">
                    {projectHomeSummary(project.slug)}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {getFeaturedStacks(project.slug, project.stacks).map((stack) => (
                      <span
                        key={stack}
                        className="rounded-full border border-black/[0.14] px-3 py-1.5 text-[12px] font-[480] text-[#0a0a0a]"
                      >
                        {stack}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="mt-8 inline-flex items-center gap-2 rounded-full bg-black px-5 py-2.5 text-[15px] font-[480] text-white hover:bg-[#2a2a2a]"
                  >
                    글 읽기
                    <ArrowRight className="size-4" />
                  </Link>
                </div>
                <Link
                  href={`/projects/${project.slug}`}
                  className="relative flex min-h-[260px] items-center justify-center border-t border-black/[0.08] bg-[#f1f0eb] p-5 md:border-l md:border-t-0"
                >
                  <div className="overflow-hidden rounded-[8px] bg-white">
                    <Image
                      src={project.heroImage}
                      alt={`${project.title} preview`}
                      width={720}
                      height={1280}
                      priority={index === 0}
                      className={
                        project.slug === "healthcatcher-web"
                          ? "h-auto w-full object-contain"
                          : "h-[260px] w-auto max-w-full object-contain"
                      }
                    />
                  </div>
                </Link>
              </div>
            </article>
          ))}

          <section className="rounded-[24px] bg-[#f5e6ff]">
            <div className="border-b border-black/[0.1] px-6 py-5">
              <h2 className="flex items-center gap-2 text-[24px] font-[540] tracking-[-0.26px]">
                <BookOpen className="size-5" />
                최근 글
              </h2>
            </div>
            <div className="divide-y divide-black/[0.08]">
              {recentPosts.map((post) => (
                <Link
                  key={post.title}
                  href={post.href}
                  className="grid gap-2 px-6 py-5 transition hover:bg-black/[0.04] sm:grid-cols-[120px_minmax(0,1fr)]"
                >
                  <span className="font-mono text-[12px] tracking-[0.08em] text-[#242424]">{post.date}</span>
                  <span className="text-[#0a0a0a]">
                    <span className="block text-[18px] font-[540] leading-[1.25] tracking-[-0.26px]">
                      {post.title}
                    </span>
                    <span className="mt-1 block text-[15px] font-[480] leading-[1.35] tracking-[-0.14px] text-[#333]">
                      {post.description}
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </section>
        </section>

        <aside id="profile" className="space-y-5 lg:sticky lg:top-6 lg:self-start">
          <section className="rounded-[24px] bg-[#f1f0eb] p-5 text-[#0a0a0a]">
            <div className="flex items-center gap-3">
              <Image
                src={profileAvatarUrl}
                alt="ByuN0-0 profile"
                width={48}
                height={48}
                className="size-12 rounded-full border border-black/[0.1] object-cover"
              />
              <div>
                <p className="text-[18px] font-[540]">ByuN0-0</p>
                <p className="font-mono text-[12px] uppercase tracking-[0.08em] text-[#555]">
                  Portfolio Blog
                </p>
              </div>
            </div>
            <p className="mt-5 text-[16px] font-[330] leading-[1.45] tracking-[-0.14px] text-[#111]">
              백엔드 API, 관리자 도구, 배치, 결제, 크롤링, 배포까지 서비스
              운영에 필요한 기능을 연결해 온 개발자입니다.
            </p>
          </section>

          <section className="rounded-[24px] border border-black/[0.1] bg-white p-5">
            <h2 className="mb-4 flex items-center gap-2 text-[18px] font-[540]">
              <Layers3 className="size-4" />
              카테고리
            </h2>
            <div className="space-y-3">
              {categories.map((category) => (
                <Link
                  key={category.key}
                  href={category.href}
                  className={`flex items-center justify-between rounded-full px-3 py-2 text-[14px] font-[480] transition ${
                    selectedCategory === category.key
                      ? "bg-black text-white"
                      : "text-[#0a0a0a] hover:bg-black/[0.06]"
                  }`}
                >
                  <span>{category.name}</span>
                  <span
                    className={
                      selectedCategory === category.key ? "text-white" : "text-[#555]"
                    }
                  >
                    {category.count}
                  </span>
                </Link>
              ))}
            </div>
          </section>

          <section className="rounded-[24px] bg-[#ffe0d4] p-5">
            <h2 className="mb-4 flex items-center gap-2 text-[18px] font-[540]">
              <PenLine className="size-4" />
              주요 경험
            </h2>
            <ul className="space-y-3 text-[15px] font-[330] leading-[1.45] tracking-[-0.14px] text-[#0a0a0a]">
              <li>NestJS/Spring Boot 기반 API와 운영 도구 구현</li>
              <li>배치, 결제, 크롤링, 검색, 캐시 성능 개선</li>
              <li>제품 화면부터 인프라 배포까지 이어지는 문제 해결</li>
            </ul>
          </section>

          <a
            href={githubProfileUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between rounded-full bg-black px-5 py-4 text-[15px] font-[480] text-white transition hover:bg-[#2a2a2a]"
          >
            GitHub 저장소
            <GitBranch className="size-4" />
          </a>
        </aside>
      </div>
    </main>
  );
}
