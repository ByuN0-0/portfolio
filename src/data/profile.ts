export type Career = {
  company: string;
  period: string;
  role: string;
  summary: string;
  href?: string;
};

export const profileDescription =
  "앱과 게임을 개발·운영하는 1인 개발자입니다. 백엔드 개발 경험을 바탕으로 기획부터 화면, API, 배포와 운영까지 직접 이어갑니다.";

export const careers: Career[] = [
  {
    company: "비연",
    period: "2026.09 - 현재",
    role: "대표 / 1인 개발자",
    summary:
      "개인사업체 비연에서 만점 서비스를 개발·운영하고, 추리게임과 러닝 기록 앱 숨길을 개발하고 있습니다.",
    href: "https://biyeon.net",
  },
  {
    company: "주식회사 블링스",
    period: "2025.03 - 2026.06",
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
