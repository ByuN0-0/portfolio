import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  BookOpen,
  CalendarDays,
  ExternalLink,
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
  const isHealthCatcherWeb = project.slug === "healthcatcher-web";
  const isHealthHola = project.slug === "healthhola";
  const statusLabel =
    project.status === "archived" ? "종료/보관" : project.status === "active" ? "진행/운영" : "완료";
  const categoryLabel = {
    company: "회사 프로젝트",
    business: "사업 프로젝트",
    personal: "개인 프로젝트",
  }[project.category];
  const stackReasons = getStackReasons(project.slug);
  const postTitle = (() => {
    if (isWeatherProject) return `${project.title}: 첫 Android 프로젝트를 다시 읽기`;
    if (isCrmProject) return `${project.title}: 동적 거래 속성을 가진 CRM 플랫폼 만들기`;
    if (isHealthHola) return `${project.title}: 사업 프로젝트에서 앱과 백엔드를 함께 만들기`;
    if (isHealthCatcherWeb) return `${project.title}: 헬스캐처 공식 홈페이지 만들기`;
    return project.title;
  })();
  const overviewText = (() => {
    if (isWeatherProject) {
      return `${project.subtitle} 현재 날씨, 시간대별 예보, 5일 예보, 대기질 정보를 한 화면에서 확인할 수 있도록 구성한 첫 모바일 프로젝트입니다. 위치 권한, 외부 API 응답, 날씨별 시각 효과를 직접 연결하며 Android 앱의 기본 흐름을 익혔습니다.`;
    }
    if (isCrmProject) {
      return `${project.subtitle} 워크스페이스마다 거래 속성이 달라질 수 있는 CRM을 목표로 만들었습니다. Spring Boot API와 Next.js 화면을 연결하고, EAV 모델을 활용해 동적 컬럼과 거래 값을 관리했습니다.`;
    }
    if (isHealthHola) {
      return `${project.subtitle} 2025년 2월 사업 정리로 앱은 현재 운영되지 않지만, 실제 서비스 운영을 목표로 체험단, 커뮤니티, 설문, 포인트, 쿠폰, 신고와 차단 흐름을 구현했습니다.`;
    }
    if (isHealthCatcherWeb) {
      return `${project.subtitle} 사업 소개 채널로서 브랜드 첫 화면, 사업 영역, 팀 소개, 제휴 문의, 정책 문서까지 갖춘 공식 홈페이지입니다.`;
    }
    return project.summary;
  })();
  const stackText = (() => {
    if (isWeatherProject) {
      return "Android Java 앱 위에 Retrofit2, Gson, OpenWeatherMap API, Glide, WeatherView를 조합했습니다.";
    }
    if (isCrmProject) {
      return "Spring Boot 백엔드와 Next.js 프론트엔드를 함께 구성했습니다. 인증은 Spring Security/JWT, 데이터 모델은 JPA/MySQL, 프론트엔드는 Ant Design과 AG Grid를 사용했습니다.";
    }
    if (isHealthHola) {
      return "모바일 앱은 Expo, React Native, Expo Router, Redux Toolkit, Axios로 구성했고, 백엔드는 Spring Boot, Spring Security, JWT/OAuth2, PostgreSQL, Redis, AWS S3를 사용했습니다.";
    }
    if (isHealthCatcherWeb) {
      return "홈페이지는 Vue 3, Vite, Vue Router, Pinia, Tailwind CSS 기반으로 구성했고, Vercel 정적 배포에 맞춰 페이지와 섹션 컴포넌트를 나눴습니다.";
    }
    return "서비스 요구사항에 맞춰 사용한 기술과 선택 이유입니다.";
  })();
  const structureText = (() => {
    if (isWeatherProject) {
      return "초반에는 `MainActivity` 중심으로 기능이 모였지만, 후반 커밋으로 갈수록 API 호출과 화면 초기화 책임이 분리됩니다. 첫 프로젝트답게 투박한 흔적도 있지만, 그만큼 구조화의 필요성을 배운 기록이 남아 있습니다.";
    }
    if (isCrmProject) {
      return "이 프로젝트에서 가장 크게 배운 것은 EAV 모델의 활용입니다. 거래 테이블의 컬럼을 고정하지 않고 DealAttribute와 DealValue를 분리해, 워크스페이스마다 다른 거래 속성을 만들 수 있게 했습니다. 프론트엔드에서는 이 동적 속성을 그리드 컬럼으로 렌더링했습니다.";
    }
    if (isHealthHola) {
      return "앱은 Expo Router 기반 화면과 Redux slice를 도메인별로 나누고, 백엔드는 인증/커뮤니티/체험단/설문/쿠폰/신고 도메인을 컨트롤러와 서비스로 분리했습니다. 실제 운영을 위해 토큰 재발급, 신고, 차단, 파일 업로드 같은 흐름도 함께 다뤘습니다.";
    }
    if (isHealthCatcherWeb) {
      return "홈페이지는 페이지 라우트보다 섹션 컴포넌트가 핵심입니다. Home, About, Business, Community, Contact, Policy 페이지 안에서 브랜드 소개와 사업 콘텐츠를 재사용 가능한 섹션 단위로 나누었습니다.";
    }
    return project.architecture.join(" ");
  })();

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
        <article className="min-w-0">
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
              <dl className="mt-6 grid gap-5 border-y border-white/[0.06] py-5 sm:grid-cols-3">
                {[
                  ["역할", project.role],
                  ["형태", project.team],
                  ["상태", statusLabel],
                ].map(([label, value]) => (
                  <div key={label}>
                    <dt className="text-[13px] text-[#62666d]">{label}</dt>
                    <dd className="mt-2 text-[14px] leading-6 text-[#d0d6e0]">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
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

            {isHealthCatcherWeb ? (
              <section id="visual" className="scroll-mt-20">
                <div className="mb-5">
                  <p className="text-[13px] font-medium uppercase text-[#7170ff]">
                    Main Screen
                  </p>
                  <h2 className="mt-2 text-[28px] font-normal tracking-[-0.288px]">
                    홈페이지 메인 화면
                  </h2>
                  <p className="mt-3 text-[16px] leading-[1.75] text-[#8a8f98]">
                    배포된 헬스캐처 홈페이지의 첫 화면 구성을 포트폴리오 안에서 다시 보여줍니다.
                  </p>
                </div>
                <div className="overflow-hidden rounded-[8px] border border-white/[0.08] bg-[#0f1011]">
                  <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-3">
                    <span className="size-2.5 rounded-full bg-[#ef4444]" />
                    <span className="size-2.5 rounded-full bg-[#f59e0b]" />
                    <span className="size-2.5 rounded-full bg-[#10b981]" />
                    <span className="ml-3 text-[12px] text-[#8a8f98]">
                      healthcatcher-web.vercel.app
                    </span>
                  </div>
                  <div className="relative aspect-[48/25] min-h-[260px] overflow-hidden bg-black">
                    <Image
                      src={project.heroImage}
                      alt={`${project.title} main screen`}
                      fill
                      sizes="(max-width: 768px) 100vw, 760px"
                      className="object-contain"
                    />
                  </div>
                </div>
              </section>
            ) : null}

            {project.category === "company" ? (
              <section id="visual" className="scroll-mt-20">
                <div className="mb-5">
                  <p className="text-[13px] font-medium uppercase text-[#7170ff]">
                    Company Work
                  </p>
                  <h2 className="mt-2 text-[28px] font-normal tracking-[-0.288px]">
                    회사 프로젝트 범위
                  </h2>
                  <p className="mt-3 text-[16px] leading-[1.75] text-[#8a8f98]">
                    실제 담당했던 백엔드, 프론트엔드, 배치, 결제, 인프라 영역을 중심으로 묶었습니다.
                  </p>
                </div>
                <div className="overflow-hidden rounded-[8px] border border-white/[0.08] bg-[#0f1011]">
                  <Image
                    src={project.heroImage}
                    alt={`${project.title} work scope preview`}
                    width={960}
                    height={640}
                    className="h-auto w-full object-contain"
                  />
                </div>
              </section>
            ) : null}

            <PostSection id="features" title="구현한 기능">
              <ul className="list-disc space-y-2 pl-5">
                {project.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </PostSection>

            <PostSection id="stack" title="사용 기술">
              <p>{stackText}</p>
              <div className="mt-6 space-y-5">
                {project.stacks.map((stack) => (
                  <div key={stack}>
                    <h3 className="text-[17px] font-medium leading-[1.5] text-[#f7f8f8]">
                      {stack}
                    </h3>
                    <p className="mt-1 text-[15px] leading-[1.75] text-[#8a8f98]">
                      {stackReasons[stack] ?? "프로젝트 요구사항과 기존 구조에 맞춰 사용했습니다."}
                    </p>
                  </div>
                ))}
              </div>
            </PostSection>

            <PostSection id="structure" title="구조와 개선">
              <p>{structureText}</p>
              <ul className="mt-5 list-disc space-y-2 pl-5">
                {project.architecture.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </PostSection>

            <PostSection id="retrospective" title="배운 점">
              <ul className="list-disc space-y-2 pl-5">
                {project.learnings.map((learning) => (
                  <li key={learning}>{learning}</li>
                ))}
              </ul>
            </PostSection>
          </div>
        </article>

        <aside className="space-y-5 lg:sticky lg:top-6 lg:self-start">
          <section className="rounded-[8px] border border-white/[0.08] bg-white/[0.02] p-5">
            <p className="text-[13px] text-[#62666d]">Category</p>
            <p className="mt-2 text-[18px] font-medium">{categoryLabel}</p>
            <p className="mt-3 text-[14px] leading-[1.7] text-[#8a8f98]">
              실제 서비스에서 맡았던 기능과 운영 경험을 중심으로 정리한 프로젝트입니다.
            </p>
          </section>

          <section className="rounded-[8px] border border-white/[0.08] bg-white/[0.02] p-5">
            <p className="mb-4 text-[15px] font-medium">목차</p>
            <nav className="space-y-3 text-[14px] text-[#d0d6e0]">
              {[
                ["소개", "#overview"],
                [isHealthCatcherWeb ? "메인 화면" : project.category === "company" ? "프로젝트 범위" : "프로토타입", isHealthCatcherWeb || project.category === "company" ? "#visual" : "#prototype"],
                ["기능", "#features"],
                ["기술", "#stack"],
                ["구조", "#structure"],
                ["회고", "#retrospective"],
              ]
                .filter(([, href]) => href !== "#prototype" || isWeatherProject || isCrmProject)
                .map(([label, href]) => (
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

          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between rounded-[8px] border border-white/[0.08] bg-white/[0.02] px-5 py-4 text-[14px] font-medium text-[#d0d6e0] transition hover:bg-white/[0.05] hover:text-white"
            >
              배포 사이트
              <ExternalLink className="size-4" />
            </a>
          ) : null}
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

function getStackReasons(slug: string): Record<string, string> {
  const reasons: Record<string, Record<string, string>> = {
    healthhola: {
      Expo: "빠르게 앱을 빌드하고 Android/iOS 개발 환경을 맞추기 위해 선택했습니다.",
      "React Native": "하나의 코드베이스로 모바일 앱 화면을 구현하면서 네이티브 앱 경험을 만들 수 있어 사용했습니다.",
      "Expo Router": "파일 기반 라우팅으로 홈, 체험단, 커뮤니티, 마이페이지 같은 화면 흐름을 관리하기 위해 사용했습니다.",
      "Redux Toolkit": "인증, 유저, 체험단, 커뮤니티, 설문, 쿠폰처럼 상태 도메인이 많아 slice 단위로 나누기 위해 사용했습니다.",
      Axios: "백엔드 API 호출과 토큰 주입, 재발급 인터셉터를 공통화하기 위해 사용했습니다.",
      "Spring Boot": "모바일 앱에서 필요한 REST API를 빠르게 구성하고 도메인별 서비스 계층을 만들기 위해 선택했습니다.",
      "Spring Security": "로그인 이후 인증이 필요한 API와 공개 조회 API를 명확히 나누기 위해 사용했습니다.",
      JWT: "모바일 앱에서 stateless 인증 흐름을 만들고 access/refresh token 재발급을 처리하기 위해 사용했습니다.",
      OAuth2: "소셜 로그인 확장을 고려해 Google, Kakao, Naver 응답을 처리할 수 있는 구조로 도입했습니다.",
      PostgreSQL: "운영 데이터를 관계형 모델로 안정적으로 저장하기 위해 사용했습니다.",
      Redis: "refresh token과 인증 보조 데이터를 빠르게 조회하고 관리하기 위해 사용했습니다.",
      "AWS S3": "커뮤니티 게시글 이미지 같은 파일 업로드를 서버 파일시스템에 묶지 않기 위해 사용했습니다.",
    },
    "healthcatcher-web": {
      "Vue 3": "작은 팀에서 브랜드 홈페이지를 빠르게 구성하고 섹션 컴포넌트를 단순하게 관리하기 위해 선택했습니다.",
      Vite: "정적 홈페이지 개발 서버와 빌드 속도가 빨라 랜딩 페이지 작업에 적합했습니다.",
      "Vue Router": "소개, 사업, 커뮤니티, 문의, 정책 페이지를 명확한 라우트로 나누기 위해 사용했습니다.",
      Pinia: "Vue 생태계의 가벼운 상태 관리 도구로, 공지 모달이나 전역 상태 확장 가능성을 남기기 위해 포함했습니다.",
      "Tailwind CSS": "반응형 패딩, 타이포그래피, 섹션 레이아웃을 빠르게 조정하기 위해 사용했습니다.",
      PostCSS: "Tailwind 빌드 파이프라인을 구성하기 위한 기본 CSS 처리 도구로 사용했습니다.",
      Vercel: "정적 사이트를 빠르게 배포하고 외부에 공유하기 위해 선택했습니다.",
    },
    "weather-app-android": {
      Android: "첫 모바일 프로젝트로 실제 Android Activity, 권한, 리소스 구조를 경험하기 위해 사용했습니다.",
      Java: "당시 Android 수업/프로젝트 환경에 맞춰 기본 언어로 사용했습니다.",
      Retrofit2: "OpenWeatherMap의 여러 REST API를 인터페이스 단위로 분리해 호출하기 위해 선택했습니다.",
      Gson: "날씨, 예보, 대기질 응답 JSON을 Java 모델로 매핑하기 위해 사용했습니다.",
      "OpenWeatherMap API": "현재 날씨, 예보, 대기질 데이터를 한 서비스에서 받아올 수 있어 선택했습니다.",
      Glide: "날씨 아이콘과 이미지 리소스를 화면에 안정적으로 표시하기 위해 사용했습니다.",
      WeatherView: "비, 눈 같은 날씨 효과를 Android 화면에서 시각적으로 표현하기 위해 사용했습니다.",
      "Material Components": "탭과 버튼 등 기본 UI 요소를 Android 스타일에 맞춰 구성하기 위해 사용했습니다.",
    },
    "crm-platform": {
      "Spring Boot": "인증, 워크스페이스, 회사, 거래 API를 계층적으로 구성하기 위해 선택했습니다.",
      "Next.js": "CRM 프론트엔드를 라우팅과 컴포넌트 단위로 구성하고 백엔드 API와 연결하기 위해 사용했습니다.",
      React: "거래 그리드와 속성 편집 UI처럼 상태 변화가 많은 화면을 컴포넌트로 관리하기 위해 사용했습니다.",
      MySQL: "워크스페이스, 회사, 거래, 동적 속성 데이터를 관계형 구조로 저장하기 위해 사용했습니다.",
      "Spring Security": "로그인 이후 워크스페이스별 접근 권한을 검증하기 위해 사용했습니다.",
      JWT: "프론트엔드와 백엔드가 분리된 환경에서 인증 상태를 전달하기 위해 사용했습니다.",
      JPA: "도메인 엔티티와 Repository 기반 데이터 접근을 빠르게 구성하기 위해 사용했습니다.",
      "AG Grid": "거래 목록을 스프레드시트처럼 편집하고 동적 컬럼을 표현하기 위해 선택했습니다.",
      "Ant Design": "CRM 화면의 사이드바, 폼, 버튼 등 관리 도구 UI를 빠르게 구성하기 위해 사용했습니다.",
      Docker: "로컬과 배포 환경 차이를 줄이고 서버 실행 환경을 묶기 위해 실험했습니다.",
      "GitHub Actions": "빌드와 배포 과정을 자동화하며 운영 환경 연결 문제를 다루기 위해 사용했습니다.",
    },
    "blynx-insight-platform": {
      NestJS: "예측, 사용자, 스토어, 라이브 운영 API처럼 요청/응답이 많은 서버 기능을 모듈 단위로 나누기 위해 사용했습니다.",
      React: "관리자 대시보드와 사용자 웹에서 상태 변화가 많은 운영 화면을 컴포넌트로 구성하기 위해 사용했습니다.",
      Vite: "관리자 대시보드를 빠르게 개발하고 빌드하기 위한 프론트엔드 도구로 사용했습니다.",
      "Spring Boot": "재화와 정산처럼 트랜잭션 안정성이 중요한 서버를 별도 서비스로 구성하기 위해 사용했습니다.",
      "Spring Batch": "대량 베팅 정산, 스냅샷 백필, 환불처럼 재시도와 처리 이력이 중요한 작업에 사용했습니다.",
      Kotlin: "Spring 서버에서 null 안정성과 간결한 도메인 코드를 확보하기 위해 사용했습니다.",
      MongoDB: "예측 그룹과 경기 관련 문서 데이터를 유연하게 저장하기 위해 사용했습니다.",
      MySQL: "재화, 지갑, 거래, 정산처럼 무결성이 중요한 데이터를 관계형으로 관리하기 위해 사용했습니다.",
      "Toss Payments": "스토어 결제와 유료 상품 구매 흐름을 국내 결제 환경에 맞춰 붙이기 위해 사용했습니다.",
      AWS: "ECS, S3, CloudFront, EventBridge, Lambda 등 운영 인프라를 구성하기 위해 사용했습니다.",
      Terraform: "회사 인프라 변경을 코드로 남기고 dev/prod 환경 차이를 통제하기 위해 사용했습니다.",
      Docker: "서비스별 빌드와 배포 환경을 일관되게 만들기 위해 사용했습니다.",
    },
    moonshot: {
      NestJS: "LLM API, 문의 폼, 크롤링 요청, 챗봇 서버를 모듈 단위로 나누기 위해 사용했습니다.",
      "Next.js": "서비스 소개, 로그인, 종료 안내, 메시지 입력 화면을 웹에서 운영하기 위해 사용했습니다.",
      "OpenAI API": "챗봇 응답 스트리밍과 모델별 토큰 사용량 처리를 위해 사용했습니다.",
      "Gemini API": "OpenAI 외 모델 옵션을 함께 지원하고 출력 설정을 비교하기 위해 사용했습니다.",
      "AWS Bedrock": "AWS 환경에서 관리되는 LLM 모델 사용 가능성을 열기 위해 사용했습니다.",
      BullMQ: "크롤링과 챗봇 처리처럼 오래 걸리는 작업을 큐 기반으로 분리하기 위해 사용했습니다.",
      Redis: "BullMQ 큐와 캐시성 상태 관리를 위해 사용했습니다.",
      MongoDB: "문서, 대화, 서비스 설정처럼 구조가 바뀔 수 있는 데이터를 저장하기 위해 사용했습니다.",
      OpenSearch: "크롤링 문서 검색과 메타데이터 기반 조회를 위해 사용했습니다.",
      "AWS ECS": "NestJS/BullMQ 서비스를 컨테이너 단위로 배포하기 위해 사용했습니다.",
      "Secrets Manager": "dev/prod 환경의 민감 설정을 코드 밖에서 관리하기 위해 사용했습니다.",
      Docker: "챗봇 서버와 워커 배포 이미지를 일관되게 만들기 위해 사용했습니다.",
    },
    rizzz: {
      NestJS: "AI 채팅, OAuth, 크롤러, 야구 데이터 API를 도메인별 모듈로 관리하기 위해 사용했습니다.",
      React: "관리자 화면에서 에이전트 설정과 Redis 상태를 다루기 위해 사용했습니다.",
      Vite: "관리자 프론트엔드를 빠르게 개발하고 빌드하기 위해 사용했습니다.",
      TypeScript: "API 응답 구조와 관리자 화면 상태를 타입으로 정리해 운영 중 오류를 줄이기 위해 사용했습니다.",
      MongoDB: "사용자, 대화, 선수 데이터처럼 문서형으로 다루기 쉬운 데이터를 저장하기 위해 사용했습니다.",
      Redis: "채팅 세션, 큐, 캐시성 데이터를 처리하기 위해 사용했습니다.",
      OpenSearch: "장기 메모리와 추천/검색 흐름을 위해 사용했습니다.",
      LangChain: "LLM 기반 대화 처리 흐름을 구성하기 위해 사용했습니다.",
      LangGraph: "여러 단계의 AI 대화 흐름을 그래프 형태로 조합하기 위해 사용했습니다.",
      "AWS Bedrock": "AWS 기반 LLM 모델 호출을 서비스 백엔드에 연결하기 위해 사용했습니다.",
      "AWS Lambda": "KBO/NPB/NamuWiki 크롤러를 서버리스 작업으로 배포하기 위해 사용했습니다.",
      Terraform: "크롤러 Lambda, S3, IAM, CloudWatch, EventBridge 리소스를 코드로 관리하기 위해 사용했습니다.",
    },
  };

  return reasons[slug] ?? {};
}
