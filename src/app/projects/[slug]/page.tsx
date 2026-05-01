import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  GitBranch,
  Layers3,
} from "lucide-react";

import { CrmPrototype } from "@/components/crm/crm-prototype";
import { WeatherPhone } from "@/components/weather/weather-phone";
import { getProjectBySlug, projects } from "@/data/projects";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} | ByuN0-0.log`,
    description: project.summary,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const isWeatherProject = project.slug === "weather-app-android";
  const isCrmProject = project.slug === "crm-platform";
  const postTitle = isWeatherProject
    ? `${project.title}: 첫 Android 프로젝트를 다시 읽기`
    : `${project.title}: 동적 거래 속성을 가진 CRM 플랫폼 만들기`;
  const overviewText = isWeatherProject
    ? `${project.subtitle} 원본 저장소의 README, Gradle 의존성, Java 소스 구조, Git 로그를 기준으로 첫 번째 포트폴리오 글을 구성했습니다. 완성 화면을 보여주는 데서 끝내지 않고, 어떤 기능을 어떤 순서로 붙여 갔는지 읽히도록 정리했습니다.`
    : `${project.subtitle} 원본 저장소의 README, Spring Boot 컨트롤러/서비스, Next.js 화면, Git 로그를 기준으로 두 번째 포트폴리오 글을 구성했습니다. 거래 속성을 동적으로 다루는 구조와 프론트엔드 그리드 연동 과정을 중심으로 정리했습니다.`;
  const stackText = isWeatherProject
    ? "기술 스택은 README와 `app/build.gradle`의 의존성을 기준으로 정리했습니다. Android Java 앱 위에 Retrofit2, Gson, OpenWeatherMap API, Glide, WeatherView를 조합했습니다."
    : "기술 스택은 Spring Boot 백엔드와 Next.js 프론트엔드 구성을 기준으로 정리했습니다. 인증은 Spring Security/JWT, 데이터 모델은 JPA/MySQL, 프론트엔드는 Ant Design과 AG Grid를 사용했습니다.";
  const structureText = isWeatherProject
    ? "초반에는 `MainActivity` 중심으로 기능이 모였지만, 후반 커밋으로 갈수록 API 호출과 화면 초기화 책임이 분리됩니다. 첫 프로젝트답게 투박한 흔적도 있지만, 그만큼 구조화의 필요성을 배운 기록이 남아 있습니다."
    : "이 프로젝트에서 가장 크게 배운 것은 EAV 모델의 활용입니다. 거래 테이블의 컬럼을 고정하지 않고 DealAttribute와 DealValue를 분리해, 워크스페이스마다 다른 거래 속성을 만들 수 있게 했습니다. 프론트엔드에서는 이 동적 속성을 그리드 컬럼으로 렌더링했습니다.";

  return (
    <main className="min-h-screen bg-[#08090a] text-[#f7f8f8]">
      <header className="border-b border-white/[0.06] bg-[#08090a]">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[14px] font-medium text-[#d0d6e0] hover:text-white"
          >
            <ArrowLeft className="size-4" />
            ByuN0-0.log
          </Link>
          <a
            href={project.repositoryUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-[6px] border border-white/[0.08] bg-white/[0.02] px-3 py-2 text-[13px] font-medium text-[#d0d6e0] hover:bg-white/[0.05] hover:text-white"
          >
            <GitBranch className="size-4" />
            GitHub
          </a>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-8 lg:grid-cols-[minmax(0,1fr)_280px]">
        <article className="min-w-0 rounded-[8px] border border-white/[0.08] bg-white/[0.02]">
          <div className="border-b border-white/[0.06] px-6 py-8 sm:px-9 sm:py-10">
            <div className="mb-5 flex flex-wrap gap-3 text-[13px] text-[#8a8f98]">
              <span className="inline-flex items-center gap-2">
                <BookOpen className="size-4 text-[#7170ff]" />
                프로젝트 회고
              </span>
              <span className="inline-flex items-center gap-2">
                <CalendarDays className="size-4" />
                {project.period}
              </span>
              <span className="inline-flex items-center gap-2">
                <Layers3 className="size-4" />
                {project.team}
              </span>
            </div>
            <h1 className="text-[36px] font-normal leading-[1.18] tracking-[-0.704px] sm:text-[48px] sm:tracking-[-1.056px]">
              {postTitle}
            </h1>
            <p className="mt-5 max-w-3xl text-[17px] leading-[1.75] text-[#d0d6e0]">
              {project.summary}
            </p>
          </div>

          <div className="space-y-12 px-6 py-8 sm:px-9 sm:py-10">
            <PostSection id="overview" title="프로젝트 소개">
              <p>{overviewText}</p>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {[
                  ["역할", project.role],
                  ["형태", project.team],
                  ["상태", "완료"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-[8px] border border-white/[0.08] bg-[#0f1011] p-4"
                  >
                    <p className="text-[13px] text-[#62666d]">{label}</p>
                    <p className="mt-2 text-[14px] leading-6 text-[#d0d6e0]">
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </PostSection>

            {isWeatherProject || isCrmProject ? (
              <section id="prototype" className="scroll-mt-20">
                <div className="mb-5">
                  <p className="text-[13px] font-medium uppercase text-[#7170ff]">
                    Prototype
                  </p>
                  <h2 className="mt-2 text-[28px] font-normal tracking-[-0.288px]">
                    프로토타입
                  </h2>
                  <p className="mt-3 text-[16px] leading-[1.75] text-[#8a8f98]">
                    {isWeatherProject
                      ? "Android 프로젝트의 배경 이미지, 반투명 패널, 하단 탭 구조를 가져와 서울 좌표 기준 실제 OpenWeatherMap 데이터로 표시합니다."
                      : "원본 CRM의 회사 사이드바, 거래 그리드, 속성 추가/편집/삭제 흐름을 브라우저 localStorage 저장 방식으로 재현했습니다."}
                  </p>
                </div>
                <div className="-mx-6 border-y border-white/[0.06] bg-[#0f1011] sm:-mx-9">
                  {isWeatherProject ? <WeatherPhone /> : <CrmPrototype />}
                </div>
              </section>
            ) : null}

            <PostSection id="features" title="구현한 기능">
              <div className="grid gap-3">
                {project.features.map((feature) => (
                  <div key={feature} className="flex gap-3 rounded-[8px] bg-[#0f1011] p-4">
                    <CheckCircle2 className="mt-1 size-4 shrink-0 text-[#10b981]" />
                    <p>{feature}</p>
                  </div>
                ))}
              </div>
            </PostSection>

            <PostSection id="stack" title="사용 기술">
              <p>{stackText}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {project.stacks.map((stack) => (
                  <span
                    key={stack}
                    className="rounded-full border border-[#23252a] px-3 py-1 text-[12px] font-medium text-[#d0d6e0]"
                  >
                    {stack}
                  </span>
                ))}
              </div>
            </PostSection>

            <PostSection id="structure" title="구조와 개선">
              <p>{structureText}</p>
              <div className="mt-5 space-y-3">
                {project.architecture.map((item) => (
                  <p key={item} className="rounded-[8px] border border-white/[0.08] bg-[#0f1011] p-4">
                    {item}
                  </p>
                ))}
              </div>
            </PostSection>

            <PostSection id="retrospective" title="배운 점">
              <div className="grid gap-3">
                {project.learnings.map((learning) => (
                  <p key={learning} className="rounded-[8px] bg-[#0f1011] p-4">
                    {learning}
                  </p>
                ))}
              </div>
            </PostSection>
          </div>
        </article>

        <aside className="space-y-5 lg:sticky lg:top-6 lg:self-start">
          <section className="rounded-[8px] border border-white/[0.08] bg-white/[0.02] p-5">
            <p className="text-[13px] text-[#62666d]">Category</p>
            <p className="mt-2 text-[18px] font-medium">Project Post</p>
            <p className="mt-3 text-[14px] leading-[1.7] text-[#8a8f98]">
              기능, 프로토타입, 커밋 흐름을 하나의 글로 읽는 프로젝트 기록입니다.
            </p>
          </section>

          <section className="rounded-[8px] border border-white/[0.08] bg-white/[0.02] p-5">
            <p className="mb-4 text-[15px] font-medium">목차</p>
            <nav className="space-y-3 text-[14px] text-[#d0d6e0]">
              {[
                ["소개", "#overview"],
                ["프로토타입", "#prototype"],
                ["기능", "#features"],
                ["기술", "#stack"],
                ["구조", "#structure"],
                ["회고", "#retrospective"],
              ].map(([label, href]) => (
                <a key={href} href={href} className="block hover:text-white">
                  {label}
                </a>
              ))}
            </nav>
          </section>

          <a
            href={project.repositoryUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between rounded-[8px] border border-white/[0.08] bg-[#5e6ad2] px-5 py-4 text-[14px] font-medium text-white transition hover:bg-[#828fff]"
          >
            저장소 보기
            <GitBranch className="size-4" />
          </a>
        </aside>
      </div>
    </main>
  );
}

function PostSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-20 text-[16px] leading-[1.85] text-[#d0d6e0]">
      <h2 className="mb-4 border-b border-white/[0.06] pb-3 text-[26px] font-normal leading-[1.3] tracking-[-0.288px] text-[#f7f8f8]">
        {title}
      </h2>
      {children}
    </section>
  );
}
