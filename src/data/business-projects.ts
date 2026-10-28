import type { Project, ProjectMilestone } from "./projects";

const manjeomPrototypeMilestones: ProjectMilestone[] = [
  {
    date: "2025-09-13",
    title: "프로토타입 · 점자표 데이터 확장",
    description: "영어 로마자, 수학 기호, 문장부호 데이터를 추가하고 점자표 화면에 통합했습니다.",
    commitHash: "c295ce9",
  },
  {
    date: "2025-09-13",
    title: "프로토타입 · 연습 문제 데이터 소스 확장",
    description: "선택형, 입력형, 혼합 연습에 수학 기호와 문장부호 데이터를 연결했습니다.",
    commitHash: "c5bac1f",
  },
  {
    date: "2025-09-19",
    title: "프로토타입 · 다중 셀 모음 처리 수정",
    description: "선택형과 입력형 연습에서 모음 처리 기준을 다중 셀 데이터에 맞게 보정했습니다.",
    commitHash: "01c36b0",
  },
  {
    date: "2025-10-06",
    title: "프로토타입 · 점자 변환기 추가",
    description: "한글, 영어, 숫자, 문장부호를 점자로 변환하는 페이지와 변환 로직을 구현했습니다.",
    commitHash: "ba140bf",
  },
  {
    date: "2025-10-06",
    title: "프로토타입 · 한국어 음절 변환 개선",
    description: "복합 모음과 약자 조합을 보강해 한글 점자 변환 정확도를 높였습니다.",
    commitHash: "c8fa045",
  },
  {
    date: "2025-10-06",
    title: "프로토타입 · 관리자 화면과 약자 조합 보강",
    description:
      "문제 입력을 위한 관리자 화면을 추가하고 약자+종성, 초성+약자 조합을 정리했습니다.",
    commitHash: "704f869",
  },
  {
    date: "2025-10-06",
    title: "프로토타입 · 다중 셀 점자 표기 오류 수정",
    description: "셀이 2개 이상인 점자에서 표기가 어긋나던 문제를 수정했습니다.",
    commitHash: "041d807",
  },
];

export const businessProjects: Project[] = [
  {
    slug: "sumgil",
    title: "숨길",
    subtitle: "달린 길과 사진·추억이 쌓이는 러닝 기록 앱",
    summary:
      "숨길은 2026년 10월부터 개발 중인 러닝·기록 앱입니다. GPS 경로와 거리, 사진과 메모를 개인 기록으로 남기고 원하는 내용을 친구와 공유합니다. Flutter 앱과 TypeScript/Hono API를 연결하고, 기기 내 기록 보관과 업로드 재시도, 비공개 저장 및 공개 위치 숨김을 구현하고 있습니다. 정식 출시는 준비 중입니다.",
    status: "developing",
    category: "business",
    period: "2026.10 - 현재",
    role: "서비스 기획, Flutter 앱·API 개발, 기록 동기화와 지도·사진·공유 구현",
    team: "비연 · 1인 개발",
    heroImage: "/projects/sumgil/home.webp",
    heroAlt: "숨길 개발 화면의 러닝 거리와 사진 기록 예시",
    imageNote: "개발 중인 화면이며 예시 러닝 기록이 포함되어 있습니다.",
    gallery: [
      {
        src: "/projects/sumgil/home.webp",
        alt: "숨길 개발 화면에 표시된 달린 거리와 사진·장소 기록 예시",
        caption: "개발 화면 · 러닝 기록과 사진·추억 예시",
        width: 390,
        height: 844,
      },
      {
        src: "/projects/sumgil/share.webp",
        alt: "숨길에서 예시 러닝 경로와 거리를 이미지로 공유하는 미리보기",
        caption: "개발 화면 · 예시 기록의 공유 미리보기",
        width: 390,
        height: 844,
      },
    ],
    stacks: [
      "Dart",
      "Flutter",
      "Riverpod",
      "Drift",
      "TypeScript",
      "Hono",
      "Firestore",
      "Cloud Storage",
      "Naver Map",
      "Vercel",
    ],
    features: [
      "GPS 기반 러닝 경로·거리 기록과 건강 앱 기록 가져오기",
      "사진·메모와 장소별 기록, 월별 추억 카드와 공유 이미지",
      "기기 내 기록·사진 사본·초안 보관, 동기화 및 사진별 재시도",
      "기본 비공개 저장, 친구 공유와 공개 경로의 위치 숨김",
      "GPS 경로 구간에 달린 날짜를 누적하는 지도 성장 기능",
    ],
    highlights: [
      "기록, 지도, 사진과 추억을 중심으로 개발 중인 앱이며 정식 출시를 준비하고 있습니다.",
      "기록 저장과 사진 업로드를 분리해 업로드 실패 시에도 원본 기록과 재시도 작업이 남도록 구성했습니다.",
      "러닝 코칭의 계획·실행·수행 반영 코드도 구현하고 있으며 유료 판매 활성화 전 검증을 진행 중입니다.",
    ],
    architecture: [
      "Flutter·Riverpod: 러닝·지도·기록 화면과 앱 상태 관리",
      "Drift: 운동 기록·초안·사진 사본 및 전송 대기 작업을 로컬 저장",
      "TypeScript·Hono API: 계정·세션 검증과 기록·사진·친구 공유 요청 처리",
      "Firestore·비공개 Cloud Storage: 서버 기록과 사진 접근 권한 관리",
      "네이버 지도: GPS 경로와 장소·성장 표식 표시",
      "전송 대기 작업: 오프라인·부분 업로드 실패를 보존하고 재시도 시 중복 처리 방지",
    ],
    learnings: [
      "운동 기록 저장과 사진 업로드의 성공 여부를 독립적으로 관리해, 통신 실패에도 기록과 원본 사진을 보존하는 구조를 만들었습니다.",
      "사진·메모의 기본 비공개와 공개 경로의 위치 숨김을 함께 다루며 친구 공유 범위를 사용자가 선택하도록 구성했습니다.",
      "코드 구현, 내부 테스트 배포, 실외 GPS 검증과 정식 출시를 서로 다른 단계로 관리합니다. 현재 소개 이미지는 예시 데이터를 사용하는 개발 화면입니다.",
    ],
    milestones: [
      {
        date: "2026-10",
        title: "숨길 개발 시작",
        description: "Flutter 앱과 API를 연결해 러닝 기록·사진·공유 흐름을 개발하고 있습니다.",
      },
      {
        date: "2026-10-27",
        title: "GPS 지도와 경로 성장 기능 구현",
        description:
          "GPS 구간별 날짜 누적과 지도 표식, 공개 범위·위치 숨김을 앱·API에 연결했습니다. 해당 기능은 운영 배포 전입니다.",
      },
    ],
  },
  {
    slug: "mystery",
    title: "추리게임",
    subtitle: "학교를 탐색하며 단서를 모으는 Unity 기반 추리게임",
    summary:
      "2026년 8월부터 개발 중인 추리게임으로, 정식 이름은 아직 정하지 않았습니다. 학교와 기숙사를 탐색하고 NPC와 대화하며 아이템과 단서를 다루는 플레이를 Unity/C#으로 구현하고 있습니다. Steam 로비 기반 다인 연결과 별도의 1인 자유 체험 흐름을 개발하고 있으며, 정식 출시는 준비 중입니다.",
    status: "developing",
    category: "business",
    period: "2026.08 - 현재",
    role: "기획, Unity 클라이언트·게임 로직, 네트워크 연동, 화면 및 빌드 도구 개발",
    team: "비연 · 1인 개발",
    heroImage: "/projects/mystery/corridor.webp",
    heroAlt: "추리게임의 밤 학교 복도 배경 아트",
    imageNote:
      "개발 중인 프로젝트입니다. 복도 이미지는 배경 아트이며, 플레이 화면은 별도의 개발 빌드 캡처입니다.",
    gallery: [
      {
        src: "/projects/mystery/corridor.webp",
        alt: "달빛과 조명이 비치는 학교 복도의 배경 아트",
        caption: "학교 복도 배경 아트 · 실제 플레이 화면과 구분",
        width: 1672,
        height: 941,
      },
      {
        src: "/projects/mystery/play.png",
        alt: "추리게임 개발 빌드의 실제 플레이 화면",
        caption: "2026.10 로컬 개발 빌드 · 실제 1인 플레이 화면",
        width: 1280,
        height: 800,
      },
    ],
    stacks: [
      "C#",
      "Unity",
      "URP 2D",
      "Netcode for GameObjects",
      "Steamworks.NET",
      "Unity Test Framework",
    ],
    features: [
      "학교·기숙사의 방 출입과 층 이동, 주변 환경 및 NPC 상호작용",
      "아이템 획득·사용·버리기·전달과 증거 수첩",
      "Steam 로비 생성·친구 초대·준비 상태 및 네트워크 플레이 연동",
      "Steam 없이 진입하는 1인 자유 체험과 체험 초기화",
      "EditMode·PlayMode 검사와 로컬 실행 빌드 검증 도구",
    ],
    highlights: [
      "정식 이름과 출시 일정이 정해지지 않은 개발 중 프로젝트입니다.",
      "탐색, 상호작용, 아이템과 단서를 연결하는 플레이를 구축하고 있습니다.",
      "다인 연결 기능과 1인 자유 체험의 실행·검증 흐름을 구분해 관리합니다.",
    ],
    architecture: [
      "Unity/C#: 게임 실행 코드와 Editor 도구, 네트워크 코드를 별도 어셈블리로 구성",
      "URP 2D·Tilemap: 픽셀 환경, 충돌과 캐릭터 표시 순서 관리",
      "구역 전환: 학교·기숙사의 층과 야외 구역을 씬 단위로 이동",
      "Netcode for GameObjects·Steamworks.NET: 세션과 참가자 상태, Steam 로비·전송 계층 연동",
      "Unity Test Framework: 게임 규칙과 진입·획득·사용·초기화 흐름 검사",
    ],
    learnings: [
      "씬 전환과 게임 상태, 아이템·증거의 갱신을 함께 다루며 1인 체험과 다인 세션에서 필요한 상태 처리를 분리했습니다.",
      "2026년 10월 로컬 1인 빌드의 진입·이동·NPC 대화·아이템 사용·초기화 검증 기록을 보유하고 있습니다. 해당 기록의 검증 범위는 Steam 다인 연결과 구분합니다.",
      "배경 아트와 실제 실행 캡처를 나누어 게임의 분위기와 구현된 플레이를 각각 소개합니다.",
    ],
    milestones: [
      {
        date: "2026-08",
        title: "추리게임 개발 시작",
        description: "Unity/C# 기반 추리게임 개발을 시작했습니다.",
      },
      {
        date: "2026-10-26",
        title: "로컬 1인 자유 체험 빌드 검증",
        description:
          "Steam 없이 진입해 이동·상호작용·아이템 사용과 초기화 흐름을 확인했습니다. 정식 출시 전 개발 빌드입니다.",
      },
    ],
  },
  {
    slug: "manjeom",
    title: "만점",
    subtitle: "단계별 학습과 6점 직접 입력을 제공하는 점자 학습 앱·웹 서비스",
    summary:
      "만점은 한국 점자를 배우는 성인을 위한 앱·웹 학습 서비스입니다. 2025년 웹 프로토타입을 바탕으로 2026년 8월 본 개발을 시작했고, 2026년 10월 공식 오픈해 운영하고 있습니다. 단계별 학습, 6점 직접 입력, 오답 복습, 점자 도구와 앱·웹 학습 기록 동기화를 연결했습니다.",
    status: "operating",
    category: "business",
    period: "2026.08 - 현재",
    repositoryUrl: "https://github.com/ByuN0-0/manjeom",
    liveUrl: "https://manjeom.biyeon.net",
    role: "서비스 기획, Flutter 앱·웹·백엔드 개발, 학습 콘텐츠 구성, 배포 및 운영",
    team: "비연 · 1인 개발",
    heroImage: "/projects/manjeom/home.webp",
    heroAlt: "만점 앱 홈의 학습 시작과 최근 연습 기록",
    gallery: [
      {
        src: "/projects/manjeom/home.webp",
        alt: "만점 앱 홈의 초성 학습 시작과 최근 연습한 점자",
        caption: "Flutter 앱 홈 · 학습 시작과 최근 연습 기록",
        width: 720,
        height: 1600,
      },
      {
        src: "/projects/manjeom/input.webp",
        alt: "6개의 점으로 초성 ㄱ을 직접 입력하고 해설을 확인하는 만점 학습 화면",
        caption: "6점 직접 입력 · 정오답 피드백과 해설",
        width: 720,
        height: 1600,
      },
    ],
    stacks: [
      "Dart",
      "Flutter",
      "TypeScript",
      "Next.js",
      "React",
      "Firebase Auth",
      "Firestore",
      "Vercel",
    ],
    features: [
      "단계형 학습 로드맵과 레슨, 문자→점자·점자→문자 문제 및 6점 직접 입력",
      "오답 복습과 일정 기간 후 정답 개념 재확인, 학습 기록과 실전 노트",
      "한국 점자표와 한글 점자 변환기, 생활 속 표현 연습",
      "로그인 전 기기 내 진도 저장과 로그인 후 앱·웹 학습 기록 동기화",
      "비소모성 학습 이용권의 구매·복원과 서버 검증",
    ],
    highlights: [
      "2026년 8월 본 개발을 시작해 10월 공식 오픈했으며 현재 서비스를 운영하고 있습니다.",
      "초기 웹 프로토타입에서 Flutter 앱과 웹이 학습 콘텐츠와 진도를 연결하는 서비스로 확장했습니다.",
      "기획부터 앱·웹 개발, 학습 콘텐츠 구성, 백엔드와 운영까지 직접 담당합니다.",
    ],
    architecture: [
      "Flutter 앱: 학습·복습·점자 도구와 구매·복원 흐름 구성",
      "Next.js 웹: 단계별 학습, 점자 도구, 계정·학습 API 제공",
      "공유 콘텐츠 팩: 앱 콘텐츠 원본을 웹으로 동기화해 학습 데이터 기준 통일",
      "학습 동기화: 기기 내 기록과 Firestore의 계정별 진도를 병합",
      "구매 검증: 클라이언트 구매 결과와 서버 검증을 연결하고 이용권 상태 관리",
    ],
    learnings: [
      "점자표·변환기 프로토타입을 단계별 학습과 복습으로 확장했습니다. 화면 연습 기록과 실제 촉각 읽기 숙련을 구분해 안내합니다.",
      "앱과 웹의 콘텐츠 기준을 맞추고, 오프라인 기록이 로그인 이후에도 이어지도록 진도 병합과 동기화 로직을 구성했습니다.",
      "2025년 프로토타입, 2026년 본 개발, 2026년 10월 공식 오픈을 구분하며 새 기능의 구현과 공개 상태도 별도로 관리합니다.",
    ],
    milestones: [
      ...manjeomPrototypeMilestones,
      {
        date: "2026-08",
        title: "정식 서비스 본 개발 시작",
        description: "2025년 웹 프로토타입 이후, 앱·웹 학습 서비스의 본 개발을 시작했습니다.",
      },
      {
        date: "2026-10",
        title: "공식 서비스 오픈",
        description: "만점 서비스를 공식 오픈했으며 현재 운영하고 있습니다.",
      },
    ],
  },
];
