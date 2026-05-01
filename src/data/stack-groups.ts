export type StackSubgroup = {
  label: string;
  stacks: string[];
};

export type StackSection = {
  label: string;
  groups: StackSubgroup[];
};

const stackSectionsBySlug: Record<string, StackSection[]> = {
  "blynx-insight-platform": [
    {
      label: "프론트엔드",
      groups: [
        { label: "언어", stacks: ["TypeScript"] },
        { label: "프레임워크/라이브러리", stacks: ["React", "Vite"] },
      ],
    },
    {
      label: "백엔드",
      groups: [
        { label: "언어", stacks: ["TypeScript", "Kotlin"] },
        { label: "프레임워크/런타임", stacks: ["NestJS", "Spring Boot", "Spring Batch"] },
      ],
    },
    {
      label: "DB/검색",
      groups: [{ label: "저장소", stacks: ["MongoDB", "MySQL"] }],
    },
    {
      label: "외부 연동/결제",
      groups: [{ label: "서비스", stacks: ["Toss Payments"] }],
    },
    {
      label: "인프라",
      groups: [{ label: "클라우드/배포", stacks: ["AWS", "Terraform", "Docker"] }],
    },
    {
      label: "CI/CD",
      groups: [{ label: "배포 흐름", stacks: ["ECS Blue-Green Deploy", "Docker Build"] }],
    },
  ],
  moonshot: [
    {
      label: "프론트엔드",
      groups: [
        { label: "언어", stacks: ["TypeScript"] },
        { label: "프레임워크/라이브러리", stacks: ["Next.js"] },
      ],
    },
    {
      label: "백엔드",
      groups: [
        { label: "언어", stacks: ["TypeScript"] },
        { label: "프레임워크/런타임", stacks: ["NestJS", "BullMQ"] },
      ],
    },
    {
      label: "DB/검색",
      groups: [{ label: "저장소", stacks: ["MongoDB", "Redis", "OpenSearch"] }],
    },
    {
      label: "AI/API",
      groups: [{ label: "모델 연동", stacks: ["OpenAI API", "Gemini API", "AWS Bedrock"] }],
    },
    {
      label: "인프라",
      groups: [{ label: "클라우드/설정", stacks: ["AWS ECS", "Secrets Manager", "Docker"] }],
    },
    {
      label: "CI/CD",
      groups: [{ label: "배포 흐름", stacks: ["Docker Build", "ECS Deploy"] }],
    },
  ],
  rizzz: [
    {
      label: "프론트엔드",
      groups: [
        { label: "언어", stacks: ["TypeScript"] },
        { label: "프레임워크/라이브러리", stacks: ["React", "Vite"] },
      ],
    },
    {
      label: "백엔드",
      groups: [
        { label: "언어", stacks: ["TypeScript"] },
        { label: "프레임워크/라이브러리", stacks: ["NestJS", "LangChain", "LangGraph"] },
      ],
    },
    {
      label: "DB/검색",
      groups: [{ label: "저장소", stacks: ["MongoDB", "Redis", "OpenSearch"] }],
    },
    {
      label: "AI/API",
      groups: [{ label: "모델 연동", stacks: ["AWS Bedrock"] }],
    },
    {
      label: "인프라",
      groups: [{ label: "서버리스/리소스", stacks: ["AWS Lambda", "Terraform"] }],
    },
    {
      label: "CI/CD",
      groups: [{ label: "스케줄/배포", stacks: ["EventBridge Scheduler", "Terraform"] }],
    },
  ],
  healthhola: [
    {
      label: "프론트엔드",
      groups: [
        { label: "언어", stacks: ["TypeScript"] },
        {
          label: "프레임워크/라이브러리",
          stacks: ["Expo", "React Native", "Expo Router", "Redux Toolkit", "Axios"],
        },
      ],
    },
    {
      label: "백엔드",
      groups: [
        { label: "언어", stacks: ["Java"] },
        { label: "프레임워크/인증", stacks: ["Spring Boot", "Spring Security", "JWT", "OAuth2"] },
      ],
    },
    {
      label: "DB/캐시",
      groups: [{ label: "저장소", stacks: ["PostgreSQL", "Redis"] }],
    },
    {
      label: "인프라",
      groups: [{ label: "파일 저장소", stacks: ["AWS S3"] }],
    },
  ],
  "healthcatcher-web": [
    {
      label: "프론트엔드",
      groups: [
        { label: "언어", stacks: ["JavaScript"] },
        { label: "프레임워크/라이브러리", stacks: ["Vue 3", "Vite", "Vue Router", "Pinia"] },
        { label: "스타일링", stacks: ["Tailwind CSS", "PostCSS"] },
      ],
    },
    {
      label: "인프라",
      groups: [{ label: "배포", stacks: ["Vercel"] }],
    },
  ],
  "crm-platform": [
    {
      label: "프론트엔드",
      groups: [
        { label: "언어", stacks: ["TypeScript"] },
        { label: "프레임워크/라이브러리", stacks: ["Next.js", "React", "AG Grid", "Ant Design"] },
      ],
    },
    {
      label: "백엔드",
      groups: [
        { label: "언어", stacks: ["Java"] },
        { label: "프레임워크/인증", stacks: ["Spring Boot", "Spring Security", "JPA", "JWT"] },
      ],
    },
    {
      label: "DB",
      groups: [{ label: "저장소", stacks: ["MySQL"] }],
    },
    {
      label: "인프라/CI/CD",
      groups: [{ label: "배포", stacks: ["Docker", "GitHub Actions"] }],
    },
  ],
  "weather-app-android": [
    {
      label: "모바일 앱",
      groups: [
        { label: "언어", stacks: ["Java"] },
        {
          label: "프레임워크/라이브러리",
          stacks: ["Android", "Retrofit2", "Gson", "Glide", "WeatherView", "Material Components"],
        },
      ],
    },
    {
      label: "외부 API",
      groups: [{ label: "데이터 연동", stacks: ["OpenWeatherMap API"] }],
    },
  ],
};

function getFallbackSections(stacks: string[]): StackSection[] {
  return [
    {
      label: "기술 스택",
      groups: [{ label: "사용 기술", stacks }],
    },
  ];
}

export function getStackSections(slug: string, stacks: string[]): StackSection[] {
  return stackSectionsBySlug[slug] ?? getFallbackSections(stacks);
}

export function getFeaturedStacks(slug: string, stacks: string[], limit = 5) {
  const seen = new Set<string>();

  return getStackSections(slug, stacks)
    .flatMap((section) => section.groups.flatMap((group) => group.stacks))
    .filter((stack) => {
      if (seen.has(stack)) return false;
      seen.add(stack);
      return true;
    })
    .slice(0, limit);
}
