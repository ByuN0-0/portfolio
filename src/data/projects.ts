export type ProjectStatus = "prototype" | "active" | "archived" | "completed";

export type ProjectMilestone = {
  date: string;
  title: string;
  description: string;
  commitHash: string;
};

export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  summary: string;
  status: ProjectStatus;
  period: string;
  repositoryUrl: string;
  liveUrl?: string;
  role: string;
  team: string;
  heroImage: string;
  gallery: {
    src: string;
    alt: string;
    caption: string;
  }[];
  stacks: string[];
  features: string[];
  highlights: string[];
  architecture: string[];
  learnings: string[];
  milestones: ProjectMilestone[];
};

export const projects: Project[] = [
  {
    slug: "healthhola",
    title: "HealthHola",
    subtitle: "헬스캐처 사업에서 운영을 목표로 개발한 건강 체험단/커뮤니티 모바일 앱",
    summary:
      "헬스캐처 사업을 진행하며 만든 Expo React Native 앱과 Spring Boot 백엔드입니다. 체험단 모집, 커뮤니티, 설문조사, 포인트, 쿠폰, 신고와 차단 같은 운영 기능을 앱과 API로 연결했습니다.",
    status: "archived",
    period: "2024.06 - 2025.02",
    repositoryUrl: "https://github.com/HealthCatcher/HealthHola-back",
    role: "모바일 앱 화면 구현, Redux 상태 관리, API 연동, Spring Boot 백엔드 기능 개발",
    team: "헬스캐처 사업 프로젝트",
    heroImage: "/projects/healthhola/preview.webp",
    gallery: [],
    stacks: [
      "Expo",
      "React Native",
      "Expo Router",
      "Redux Toolkit",
      "Axios",
      "Spring Boot",
      "Spring Security",
      "JWT",
      "OAuth2",
      "PostgreSQL",
      "Redis",
      "AWS S3",
    ],
    features: [
      "체험단 모집 공고 목록, 상세, 찜 목록, 마이 리스트 구현",
      "커뮤니티 게시글 작성, 수정, 삭제, 좋아요, 댓글, 카테고리 필터 구현",
      "오늘의 설문조사 응답과 포인트 표시 흐름 구현",
      "쿠폰 등록과 사용, 마이페이지, 신고, 회원 탈퇴, 차단 사용자 관리 구현",
      "JWT 재발급, OAuth2 로그인, 이메일 인증, 권한별 API 접근 제어 구현",
      "게시글 이미지 업로드와 문서 파일 관리를 위해 AWS S3 연동",
    ],
    highlights: [
      "사업 종료로 앱은 현재 서비스되지 않지만, 실제 운영을 상정하고 인증, 커뮤니티, 체험단, 포인트와 쿠폰까지 연결했습니다.",
      "Expo Router의 파일 기반 라우팅으로 홈, 체험단, 커뮤니티, 포인트, 마이페이지 흐름을 모바일 탭 구조로 구성했습니다.",
      "Redux Toolkit slice를 도메인별로 나눠 서버 상태와 화면 상태를 관리하고, axios 인터셉터로 access token 재발급을 처리했습니다.",
      "백엔드는 Spring Security, JWT, OAuth2, Redis, PostgreSQL, S3를 조합해 모바일 앱에서 필요한 운영 API를 만들었습니다.",
    ],
    architecture: [
      "Mobile app: Expo Router 기반 탭/드로어 구조와 React Native 화면 컴포넌트",
      "Redux store: auth, user, community, experience, review, report, survey, coupon slice 분리",
      "apiClient: access token 주입과 401 발생 시 refresh token 기반 재발급 처리",
      "Backend controllers: Auth, User, Post, Comment, Notice, Review, Survey, Coupon, Report API",
      "Security layer: Spring Security stateless 세션, JWTFilter, LoginFilter, OAuth2 success handler",
      "Storage/infra: PostgreSQL, Redis refresh token, AWS S3 이미지 업로드",
    ],
    learnings: [
      "사업 프로젝트에서는 기능 구현만큼 운영 정책, 약관 동의, 신고/차단, 쿠폰 실패 처리처럼 서비스 운영의 가장자리가 중요하다는 점을 배웠습니다.",
      "모바일 앱은 화면 수가 늘어날수록 라우팅, 상태 저장, 토큰 갱신, 에러 알림이 함께 정리되어야 사용자 흐름이 끊기지 않는다는 것을 경험했습니다.",
      "백엔드 API는 공개 조회와 인증 필요 요청을 명확히 나누고, 앱의 각 화면에서 필요한 식별자와 응답 형태를 안정적으로 유지해야 했습니다.",
      "2025년 2월 사업 정리로 실제 앱은 남아 있지 않지만, 서비스 런칭을 목표로 제품 전체 흐름을 구현해 본 경험이 남았습니다.",
    ],
    milestones: [
      {
        date: "2024-06-23",
        title: "Spring Boot 백엔드 인증 기반 구현",
        description: "OAuth2와 JWT 로그인, CORS, User 테이블을 추가하며 앱 API의 인증 기반을 만들었습니다.",
        commitHash: "cd370f3",
      },
      {
        date: "2024-11-12",
        title: "HealthHola 모바일 메인과 커뮤니티 화면 구성",
        description: "Expo React Native 앱에서 메인 화면, 체험단, 커뮤니티 화면 구성을 시작했습니다.",
        commitHash: "c2d6775",
      },
      {
        date: "2025-02-05",
        title: "커뮤니티 차단 기능 도입",
        description: "사용자 차단 여부를 응답에 포함해 커뮤니티 운영 안전장치를 보강했습니다.",
        commitHash: "ee1537a",
      },
      {
        date: "2025-02-17",
        title: "사업 정리 전 앱 안정화",
        description: "댓글 차단, 쿠폰 등록, 의존성 호환성 문제를 정리하며 마지막 앱 상태를 맞췄습니다.",
        commitHash: "bcc7df5",
      },
    ],
  },
  {
    slug: "healthcatcher-web",
    title: "HealthCatcher Web",
    subtitle: "헬스캐처 브랜드와 사업 영역을 소개하기 위한 Vue 기반 공식 홈페이지",
    summary:
      "헬스캐처 사업 소개, 서비스 영역, 팀 소개, 커뮤니티 소식, 제휴 문의, 개인정보처리방침을 담은 공식 홈페이지입니다. 2025년 2월 사업 정리 전까지 브랜드 소개 채널로 사용했습니다.",
    status: "archived",
    period: "2024.10 - 2025.02",
    repositoryUrl: "https://github.com/ByuN0-0/healthcatcher-web",
    liveUrl: "https://healthcatcher-web.vercel.app/",
    role: "Vue 랜딩 페이지 구현, 반응형 UI, 라우팅, 콘텐츠 섹션 구성, Vercel 배포",
    team: "헬스캐처 사업 프로젝트",
    heroImage: "/projects/healthcatcher-web/homepage-screenshot.webp",
    gallery: [
      {
        src: "/projects/healthcatcher-web/homepage-screenshot.webp",
        alt: "HealthCatcher homepage hero section",
        caption: "HEALTH CATCHER 브랜드 카피와 CTA를 노출한 홈페이지 메인 화면",
      },
    ],
    stacks: [
      "Vue 3",
      "Vite",
      "Vue Router",
      "Pinia",
      "Tailwind CSS",
      "PostCSS",
      "Vercel",
    ],
    features: [
      "브랜드 메인 히어로와 회사 소개 섹션 구성",
      "건강 앱, 건강 운세, 건강 제품 사업 영역 페이지 구성",
      "팀 소개, 파트너십 목표, 제휴 문의, Q&A 섹션 구현",
      "커뮤니티 소식과 공지성 콘텐츠 섹션 구성",
      "개인정보처리방침과 약관 페이지 추가",
      "모바일 환경 대응을 위한 섹션별 패딩과 내비게이션 조정",
    ],
    highlights: [
      "단순 소개 페이지가 아니라 사업 소개, 앱 소개, 제휴 문의, 정책 문서까지 포함한 브랜드 채널로 구성했습니다.",
      "Vue Router로 Home, About, Business, Community, Contact, Policy 페이지를 나누고 섹션 컴포넌트 단위로 관리했습니다.",
      "Vercel 배포를 전제로 Vite 기반 정적 사이트를 구성하고, 모바일 화면에서 읽히는 패딩과 타이포그래피를 반복 조정했습니다.",
      "사업이 2025년 2월에 정리되면서 앱 서비스는 사라졌지만, 홈페이지는 당시 브랜드와 서비스 방향을 보여주는 기록으로 남겼습니다.",
    ],
    architecture: [
      "Home: Hero, Logo, Services, News, Partnership, NoticeModal 섹션 조합",
      "About: 회사 소개와 팀 소개 컴포넌트 분리",
      "Business: 건강 앱, 건강 운세, 건강 제품 섹션으로 사업 영역 설명",
      "Community: 소식 탭과 게시글 테이블 형태의 콘텐츠 영역 구성",
      "Contact: 제휴 문의와 Q&A 섹션 구성",
      "Policy: 개인정보처리방침 페이지를 별도 라우트로 제공",
    ],
    learnings: [
      "사업 홈페이지는 기술 과시보다 방문자가 브랜드, 서비스, 제휴 가능성을 빠르게 이해하는 정보 구조가 먼저라는 점을 배웠습니다.",
      "팀/사업 소개 콘텐츠는 반복 수정이 잦아 페이지보다 섹션 컴포넌트 단위로 쪼개는 편이 유지보수에 유리했습니다.",
      "모바일에서 히어로 문구와 CTA가 자연스럽게 보이도록 폰트 크기와 줄바꿈을 따로 설계해야 했습니다.",
      "서비스가 종료되어도 홈페이지와 저장소는 당시 문제 정의와 제품 방향성을 설명하는 중요한 포트폴리오 기록이 될 수 있다는 점을 체감했습니다.",
    ],
    milestones: [
      {
        date: "2024-10-27",
        title: "헬스캐처 홈페이지 프로젝트 생성",
        description: "Vue/Vite 기반 프로젝트를 만들고 브랜드 홈페이지 구현을 시작했습니다.",
        commitHash: "9daa670",
      },
      {
        date: "2024-11-01",
        title: "소개와 사업 컴포넌트 분리",
        description: "회사 소개, 사업 영역, 내비게이션을 섹션 컴포넌트로 나누며 구조를 정리했습니다.",
        commitHash: "416ffaa",
      },
      {
        date: "2024-12-23",
        title: "정책 문서와 약관 추가",
        description: "개인정보처리방침과 약관 페이지를 추가해 공식 홈페이지로 필요한 문서를 보강했습니다.",
        commitHash: "136b02a",
      },
      {
        date: "2025-01-14",
        title: "앱 소개 이미지 추가",
        description: "HealthHola 앱 소개 화면을 추가해 사업 홈페이지에서 앱의 방향을 보여주도록 정리했습니다.",
        commitHash: "fc2c84f",
      },
    ],
  },
  {
    slug: "weather-app-android",
    title: "WeatherApp",
    subtitle: "GPS 기반 실시간 날씨, 예보, 대기질 정보를 한 화면에 정리한 Android 앱",
    summary:
      "OpenWeatherMap API와 Android 위치 정보를 연결해 현재 날씨, 시간대별 예보, 5일 예보, 대기 오염 정보를 제공한 첫 번째 모바일 프로젝트입니다.",
    status: "completed",
    period: "2023.04 - 2023.06",
    repositoryUrl: "https://github.com/ByuN0-0/weather-app-android",
    role: "Android 클라이언트 개발, API 연동, UI 구현",
    team: "2인 팀 프로젝트",
    heroImage: "/projects/weather-app-android/main-preview.webp",
    gallery: [
      {
        src: "/projects/weather-app-android/day.webp",
        alt: "WeatherApp daytime weather screen",
        caption: "현재 위치 기반 날씨와 시간대별 예보를 보여주는 메인 화면",
      },
      {
        src: "/projects/weather-app-android/night.webp",
        alt: "WeatherApp night weather screen",
        caption: "일몰 이후 배경 전환과 야간 상태를 반영한 화면",
      },
    ],
    stacks: [
      "Android",
      "Java",
      "Retrofit2",
      "Gson",
      "OpenWeatherMap API",
      "Glide",
      "WeatherView",
      "Material Components",
    ],
    features: [
      "GPS 기반 현재 위치 날씨 조회",
      "현재 기온, 체감온도, 습도, 기압, 풍속, 일출과 일몰 정보 표시",
      "향후 24시간 시간대별 예보와 5일 일기예보 제공",
      "미세먼지 등급과 CO, O3, PM10, PM2.5 수치 표시",
      "비, 눈, 야간 상태에 따라 화면 효과와 배경을 전환",
      "API 키를 AndroidManifest 메타데이터로 분리",
    ],
    highlights: [
      "Retrofit2와 Gson으로 현재 날씨, 예보, 대기질, 위치명 변환 API를 각각 분리해 호출했습니다.",
      "날씨 아이콘과 시간 정보를 조합해 사용자가 현재 상태를 빠르게 이해할 수 있는 모바일 UI를 구성했습니다.",
      "일출과 일몰 시간을 기준으로 배경 opacity를 계산해 시간 흐름이 화면 분위기에 반영되도록 실험했습니다.",
      "API 호출 빈도를 제한하고 매시 정각 갱신 흐름을 추가하며 모바일 앱에서 외부 API 사용량을 의식했습니다.",
    ],
    architecture: [
      "MainActivity: 위치 권한, GPS 좌표, 탭 기반 화면, 날씨 효과를 제어",
      "LoadAllData: OpenWeatherMap API 호출과 응답 매핑을 담당하는 싱글톤 데이터 로더",
      "requestApi: 현재 날씨, 예보, 대기질, 지오코딩 API 인터페이스와 응답 모델 분리",
      "view: 메인 화면과 스크롤 예보 영역 초기화 로직 분리",
      "drawable/anim 리소스: 배경 전환, 날씨 아이콘, 별똥별 애니메이션 등 시각 효과 관리",
    ],
    learnings: [
      "외부 API 응답을 화면 상태로 바꾸는 데이터 매핑 흐름을 처음부터 끝까지 경험했습니다.",
      "위치 권한, 에뮬레이터 좌표 문제, API 실패 상태처럼 모바일 환경의 예외 처리가 중요하다는 점을 배웠습니다.",
      "하나의 Activity에 몰리던 코드를 API와 View 초기화 클래스로 나누며 구조화의 필요성을 체감했습니다.",
      "시각 효과는 기능을 보조해야 하며, 날씨 앱에서는 정보 가독성이 가장 먼저라는 기준을 얻었습니다.",
    ],
    milestones: [
      {
        date: "2023-05-02",
        title: "MVP 실행과 일기예보 구현",
        description: "초기 Android 프로젝트를 실행 가능한 상태로 만들고 일기예보 데이터를 화면에 연결했습니다.",
        commitHash: "56080f9",
      },
      {
        date: "2023-05-03",
        title: "위치, 지오코딩, 대기질 API 연결",
        description: "GPS 좌표를 기반으로 날씨와 미세먼지 정보를 함께 불러오는 흐름을 만들었습니다.",
        commitHash: "6c28308",
      },
      {
        date: "2023-05-05",
        title: "기타 탭과 API 클래스 확장",
        description: "화면 정보를 탭으로 나누고 API 호출 클래스를 확장하며 앱의 정보 구조를 넓혔습니다.",
        commitHash: "8cc60c4",
      },
      {
        date: "2023-05-30",
        title: "API 매핑 정리와 호출 주기 개선",
        description: "길어진 API 매핑 코드를 줄이고 호출 빈도 제한과 정각 갱신 규칙을 추가했습니다.",
        commitHash: "b893880",
      },
      {
        date: "2023-06-03",
        title: "아이콘, API 키, 시간 기준 보정",
        description: "날씨 아이콘을 교체하고 API 키 분리, Unix time 변환을 보정했습니다.",
        commitHash: "5b4e3fa",
      },
      {
        date: "2023-06-05",
        title: "파일 분리와 구조 정리",
        description: "MainActivity 중심의 코드를 데이터 로딩과 화면 초기화 클래스로 나누며 유지보수성을 개선했습니다.",
        commitHash: "30541a7",
      },
    ],
  },
  {
    slug: "crm-platform",
    title: "CRM Platform",
    subtitle: "워크스페이스 기반으로 회사와 거래 정보를 관리하는 웹 CRM 플랫폼",
    summary:
      "Spring Boot 백엔드와 Next.js 프론트엔드를 연결해 회원가입, 로그인, 워크스페이스, 회사, 거래, 동적 거래 속성 관리를 구현한 CRM 플랫폼 프로젝트입니다.",
    status: "completed",
    period: "2024.03 - 2024.06",
    repositoryUrl: "https://github.com/ByuN0-0/crm-platform",
    role: "백엔드 API 설계, Deal EAV 모델링, 프론트엔드 그리드 연동, 배포 설정",
    team: "캡스톤 프로젝트",
    heroImage: "/projects/crm-platform/preview.webp",
    gallery: [
      {
        src: "/projects/crm-platform/preview.webp",
        alt: "CRM platform dashboard preview",
        caption: "워크스페이스, 회사, 거래 그리드를 중심으로 한 CRM 대시보드",
      },
    ],
    stacks: [
      "Spring Boot",
      "Next.js",
      "React",
      "MySQL",
      "Spring Security",
      "JWT",
      "JPA",
      "AG Grid",
      "Ant Design",
      "Docker",
      "GitHub Actions",
    ],
    features: [
      "회원가입과 로그인, JWT 기반 인증 흐름 구현",
      "사용자별 워크스페이스 생성 및 멤버 권한 검증",
      "회사 정보 CRUD와 워크스페이스별 회사 연결",
      "거래 Deal 생성, 조회, 수정, 삭제 API 구현",
      "Deal 속성을 동적으로 추가, 수정, 삭제하는 EAV 모델 설계",
      "AG Grid 기반 거래 목록 편집과 컬럼 이동/수정 UI 연동",
      "Docker와 GitHub Actions 기반 배포 자동화 실험",
    ],
    highlights: [
      "고정 컬럼 CRM이 아니라 워크스페이스마다 거래 속성을 동적으로 구성할 수 있도록 EAV 모델을 활용했고, DealAttribute와 DealValue를 분리했습니다.",
      "프론트엔드는 AG Grid를 사용해 셀 편집, 행 선택, 컬럼 추가/편집/삭제 흐름을 API와 연결했습니다.",
      "Spring Security와 JWT를 붙이며 로그인 이후 워크스페이스 접근 권한을 검증하는 구조를 만들었습니다.",
      "로컬 개발, 배포 IP, CORS, GitHub Actions 설정을 반복 수정하며 실제 배포 환경의 연결 문제를 다뤘습니다.",
    ],
    architecture: [
      "AuthController/LoginFilter/JWTUtil: 로그인과 JWT 발급 및 인증 필터 처리",
      "WorkspaceController/WorkspaceService: 사용자 워크스페이스 조회와 멤버 권한 확인",
      "CompanyController/CompanyService: 회사 정보 CRUD와 워크스페이스 연결 관리",
      "DealController/DealService: 거래 생성, 조회, 셀 값 수정, 삭제 API 담당",
      "DealAttributeEntity/DealValueEntity: 동적 컬럼을 지원하기 위한 EAV 구조",
      "Next.js web: Ant Design Sider와 AG Grid 기반 CRM 화면 구성",
    ],
    learnings: [
      "EAV 모델을 활용해 엔티티의 속성을 행 데이터로 분리하면, CRM처럼 필드가 자주 바뀌는 도메인에서 고정 테이블보다 훨씬 유연하게 확장할 수 있다는 점을 배웠습니다.",
      "셀 하나를 수정하는 UI 동작도 인증, 워크스페이스 권한, 속성 ID, 거래 ID가 함께 맞아야 안정적으로 동작한다는 것을 경험했습니다.",
      "프론트엔드와 백엔드가 동시에 바뀌는 프로젝트에서는 API 응답 형태와 식별자 기준을 일찍 고정하는 것이 중요했습니다.",
      "CORS, IP 변경, 배포 파이프라인처럼 코드 밖의 환경 설정도 제품 완성도에 큰 영향을 준다는 점을 체감했습니다.",
    ],
    milestones: [
      {
        date: "2024-04-05",
        title: "회원가입과 인증 기초 구현",
        description: "Register 로직과 CSRF/CORS 설정을 실험하며 인증 흐름의 기반을 만들었습니다.",
        commitHash: "43afbff",
      },
      {
        date: "2024-04-14",
        title: "워크스페이스 API 추가",
        description: "사용자가 소속될 워크스페이스 개념을 추가하고 API 문서를 갱신했습니다.",
        commitHash: "4862287",
      },
      {
        date: "2024-05-07",
        title: "MySQL 전환과 Deal 생성 로직",
        description: "데이터베이스를 MySQL로 바꾸고 거래 Deal 생성 로직을 추가했습니다.",
        commitHash: "6586612",
      },
      {
        date: "2024-05-21",
        title: "Deal EAV 모델 설계",
        description: "거래 속성과 거래 값을 분리해 동적 컬럼을 지원하는 모델로 확장했습니다.",
        commitHash: "ed0123d",
      },
      {
        date: "2024-06-09",
        title: "프론트엔드 API 매핑",
        description: "Next.js/AG Grid 화면과 백엔드 API를 연결해 거래 목록을 편집할 수 있게 했습니다.",
        commitHash: "5efba37",
      },
      {
        date: "2024-06-16",
        title: "속성 생성/삭제와 정렬 개선",
        description: "Deal 속성 추가, 삭제, 정렬 흐름을 보강하고 배포 환경 설정을 조정했습니다.",
        commitHash: "52e9634",
      },
    ],
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
