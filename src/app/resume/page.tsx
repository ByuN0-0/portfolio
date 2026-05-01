import Link from "next/link";
import {
  ArrowLeft,
  BriefcaseBusiness,
  ExternalLink,
  GraduationCap,
  Mail,
  Medal,
  Rss,
  UserRound,
} from "lucide-react";

export const metadata = {
  title: "Resume | ByuN0-0.log",
  description: "황비연의 짧은 웹 이력서",
};

const links = [
  { label: "Email", value: "devbyeon@gmail.com", href: "mailto:devbyeon@gmail.com", icon: Mail },
  { label: "GitHub", value: "ByuN0-0", href: "https://github.com/ByuN0-0", icon: ExternalLink },
  {
    label: "LinkedIn",
    value: "biyeon-hwang",
    href: "https://www.linkedin.com/in/biyeon-hwang-854190376/",
    icon: UserRound,
  },
  { label: "Blog", value: "blog.biyeon.net", href: "https://blog.biyeon.net", icon: Rss },
];

const careers = [
  {
    company: "주식회사 블링스",
    period: "2025.03 - 현재",
    role: "백엔드 개발자",
    summary:
      "Piqq, BlynxLab, Rizzz 등 실서비스의 백엔드 API, 관리자 도구, 배치, 결제, 크롤링, 인프라 개선",
  },
  {
    company: "헬스캐처 법인",
    period: "2024.03 - 2025.02",
    role: "개발자",
    summary: "건강 체험단/커뮤니티 서비스의 모바일 앱과 Spring Boot 백엔드 개발",
  },
];

const certificates = [
  {
    date: "2024.06",
    name: "정보처리기사",
    organization: "한국산업인력공단",
  },
  {
    date: "2024.09",
    name: "리눅스마스터 2급",
    organization: "한국데이터베이스진흥센터",
  },
  {
    date: "2024.10",
    name: "SQL 개발자(SQLD)",
    organization: "한국정보통신진흥협회",
  },
];

export default function ResumePage() {
  return (
    <main className="min-h-screen bg-[#fffdf8] text-[#0a0a0a]">
      <header className="border-b border-black/[0.08] bg-[#fffdf8]">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-[15px] font-[480] hover:bg-black hover:text-white"
          >
            <ArrowLeft className="size-4" />
            ByuN0-0.log
          </Link>
          <a
            href="mailto:devbyeon@gmail.com"
            className="rounded-full bg-black px-4 py-2 text-[15px] font-[480] text-white hover:bg-[#2a2a2a]"
          >
            Email
          </a>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <section className="rounded-[24px] bg-[#f5e6ff] p-6 sm:p-10">
          <p className="font-mono text-[12px] uppercase tracking-[0.12em] text-[#242424]">
            Resume
          </p>
          <h1 className="mt-4 text-[44px] font-[340] leading-[1.04] tracking-[-0.96px] sm:text-[72px]">
            황비연
          </h1>
          <p className="mt-3 text-[24px] font-[480] leading-[1.25] tracking-[-0.26px]">
            백엔드 개발자
          </p>
          <p className="mt-5 max-w-3xl text-[19px] font-[330] leading-[1.45] tracking-[-0.14px]">
            백엔드 API, 운영 도구, 배치, 결제, 크롤링, 배포까지 제품 흐름을 연결하는 개발자입니다.
          </p>
        </section>

        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
          <article className="space-y-8">
            <ResumeSection icon={BriefcaseBusiness} title="경력">
              <div className="divide-y divide-black/[0.08]">
                {careers.map((career) => (
                  <div key={career.company} className="py-5 first:pt-0 last:pb-0">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                      <div>
                        <h3 className="text-[26px] font-[540] leading-[1.25] tracking-[-0.26px]">
                          {career.company}
                        </h3>
                        <p className="mt-1 text-[17px] font-[480] leading-[1.35]">
                          {career.role}
                        </p>
                      </div>
                      <p className="font-mono text-[12px] uppercase tracking-[0.08em] text-[#555]">
                        {career.period}
                      </p>
                    </div>
                    <p className="mt-4 text-[17px] font-[330] leading-[1.55] tracking-[-0.14px] text-[#333]">
                      {career.summary}
                    </p>
                  </div>
                ))}
              </div>
            </ResumeSection>

            <ResumeSection icon={GraduationCap} title="학력">
              <div className="grid gap-5 sm:grid-cols-[minmax(0,1fr)_180px]">
                <div>
                  <h3 className="text-[26px] font-[540] leading-[1.25] tracking-[-0.26px]">
                    삼육대학교
                  </h3>
                  <p className="mt-2 text-[17px] font-[480] leading-[1.35]">
                    컴퓨터공학부 소프트웨어학과
                  </p>
                  <p className="mt-3 font-mono text-[12px] uppercase tracking-[0.08em] text-[#555]">
                    2019.03 - 2025.02 · 졸업
                  </p>
                </div>
                <dl className="grid grid-cols-2 gap-3 sm:grid-cols-1">
                  <div className="rounded-[18px] bg-[#e6f5a6] p-4">
                    <dt className="font-mono text-[12px] uppercase tracking-[0.08em] text-[#555]">
                      평균학점
                    </dt>
                    <dd className="mt-2 text-[28px] font-[540] leading-none">4.14</dd>
                  </div>
                  <div className="rounded-[18px] bg-[#e6f5a6] p-4">
                    <dt className="font-mono text-[12px] uppercase tracking-[0.08em] text-[#555]">
                      전공학점
                    </dt>
                    <dd className="mt-2 text-[28px] font-[540] leading-none">4.38</dd>
                  </div>
                </dl>
              </div>
            </ResumeSection>

            <ResumeSection icon={Medal} title="자격증">
              <div className="divide-y divide-black/[0.08]">
                {certificates.map((certificate) => (
                  <div
                    key={certificate.name}
                    className="grid gap-2 py-4 first:pt-0 last:pb-0 sm:grid-cols-[96px_minmax(0,1fr)]"
                  >
                    <p className="font-mono text-[12px] uppercase tracking-[0.08em] text-[#555]">
                      {certificate.date}
                    </p>
                    <div>
                      <h3 className="text-[20px] font-[540] leading-[1.3] tracking-[-0.26px]">
                        {certificate.name}
                      </h3>
                      <p className="mt-1 text-[15px] font-[330] text-[#555]">
                        {certificate.organization}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ResumeSection>
          </article>

          <aside className="space-y-5 lg:self-start">
            <section className="rounded-[24px] bg-[#f1f0eb] p-5">
              <p className="font-mono text-[12px] uppercase tracking-[0.12em] text-[#555]">
                Profile
              </p>
              <h2 className="mt-3 text-[24px] font-[540] leading-[1.25] tracking-[-0.26px]">
                ByuN0-0
              </h2>
              <p className="mt-3 text-[15px] font-[330] leading-[1.45] tracking-[-0.14px] text-[#333]">
                Backend Developer
              </p>
            </section>

            <section className="rounded-[24px] border border-black/[0.1] bg-white p-4">
              <h2 className="mb-3 text-[17px] font-[540]">링크</h2>
              <div className="space-y-2">
                {links.map(({ label, value, href, icon: Icon }) => {
                  const isExternal = href.startsWith("http");

                  return (
                    <a
                      key={label}
                      href={href}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noreferrer" : undefined}
                      className="flex items-center justify-between rounded-full px-3 py-2 text-[14px] font-[480] transition hover:bg-black/[0.06]"
                    >
                      <span className="inline-flex min-w-0 items-center gap-2">
                        <Icon className="size-4 shrink-0" />
                        <span>{label}</span>
                      </span>
                      <span className="truncate pl-3 text-[#555]">{value}</span>
                    </a>
                  );
                })}
              </div>
            </section>

            <Link
              href="/"
              className="flex items-center justify-between rounded-full bg-black px-5 py-4 text-[15px] font-[480] text-white transition hover:bg-[#2a2a2a]"
            >
              포트폴리오 보기
              <ArrowLeft className="size-4 rotate-180" />
            </Link>
          </aside>
        </div>
      </div>
    </main>
  );
}

function ResumeSection({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-[24px] border border-black/[0.1] bg-white p-6">
      <h2 className="mb-6 flex items-center gap-2 text-[28px] font-[340] leading-[1.15] tracking-[-0.96px]">
        <Icon className="size-6" />
        {title}
      </h2>
      {children}
    </section>
  );
}
