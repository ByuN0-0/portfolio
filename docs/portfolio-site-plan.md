# 포트폴리오 사이트 기획서

## 1. 프로젝트 개요

### 1.1 목적

개발자의 예전 Git 기록을 기반으로 기술 스택, 구현 기능, 프로토타입, 문제 해결 과정, 프로젝트 성장 흐름을 시각적으로 정리하는 개인 포트폴리오 사이트를 제작한다.

단순한 자기소개형 포트폴리오가 아니라, 실제 커밋과 개발 기록을 근거로 사용자의 개발 경험을 증명하는 사이트를 목표로 한다.

### 1.2 핵심 컨셉

- Git 히스토리를 기반으로 한 개발 여정 아카이브
- 프로젝트별 기술 스택과 기능 구현 기록 정리
- 커밋, 릴리즈, 프로토타입 변화 과정을 읽기 쉽게 시각화
- Vercel에 배포되는 빠르고 반응형인 Next.js 포트폴리오

### 1.3 주요 사용자

- 채용 담당자
- 개발 리드 및 면접관
- 협업 가능성을 확인하려는 개발자
- 사용자의 프로젝트 이력과 기술 역량을 빠르게 파악하려는 방문자

## 2. 서비스 목표

### 2.1 사용자 경험 목표

- 첫 화면에서 어떤 개발자인지 즉시 이해할 수 있어야 한다.
- 프로젝트 목록만 나열하지 않고, 개발자의 사고 과정과 문제 해결 방식을 보여줘야 한다.
- 방문자가 1분 안에 핵심 역량을 파악하고, 5분 안에 대표 프로젝트의 맥락을 이해할 수 있어야 한다.
- 모바일과 데스크톱 모두에서 읽기 편해야 한다.

### 2.2 콘텐츠 목표

- Git 기록에서 기술 스택, 기능, 실험, 개선 내역을 추출한다.
- 프로젝트별로 "무엇을 만들었는가"보다 "왜 만들었고 어떻게 개선했는가"를 강조한다.
- 프로토타입, MVP, 리팩터링, 성능 개선, 배포 경험 등을 별도 콘텐츠로 구성한다.

### 2.3 기술 목표

- Next.js App Router와 `src` 디렉터리 구조를 사용한다.
- Tailwind CSS와 shadcn/ui 기반으로 일관된 디자인 시스템을 구성한다.
- Vercel 배포에 적합한 정적/동적 렌더링 전략을 사용한다.
- 향후 GitHub API 연동, 블로그, 다국어 지원, CMS 연동이 가능하도록 확장성을 남긴다.

## 3. 기술 스택

### 3.1 기본 스택

- Framework: Next.js
- Router: App Router
- Language: TypeScript
- Directory: `src` 기반 구조
- Styling: Tailwind CSS
- UI Components: shadcn/ui
- HTTP Client: axios
- Icons: lucide-react
- Hosting: Vercel

### 3.2 추가 검토 라이브러리

- `next-themes`: 다크 모드 지원
- `clsx`, `tailwind-merge`, `class-variance-authority`: 클래스 조합 및 shadcn/ui 스타일 관리
- `zod`: 외부 데이터 스키마 검증
- `date-fns`: 커밋 날짜, 프로젝트 기간, 타임라인 포맷팅
- `framer-motion`: 섹션 진입, 타임라인, 카드 인터랙션 애니메이션
- `react-markdown` 또는 `mdx`: 프로젝트 회고, 기술 문서, 상세 설명 렌더링
- `recharts` 또는 `visx`: 기술 스택 비중, 커밋 활동량, 프로젝트 타임라인 시각화

### 3.3 외부 연동 후보

- GitHub REST API 또는 GraphQL API
- GitHub raw content
- Vercel Analytics
- Google Analytics 또는 Plausible
- Notion, Contentlayer, MDX 기반 콘텐츠 관리

## 4. 정보 구조

### 4.1 주요 페이지

#### Home

사이트의 첫 진입 화면이다. 개발자 소개, 핵심 역량, 대표 프로젝트, 최근 개발 활동을 요약한다.

포함 요소:

- 히어로 영역
- 핵심 기술 스택 요약
- 대표 프로젝트 카드
- Git 기반 활동 하이라이트
- 연락처 및 외부 링크

#### Projects

전체 프로젝트 목록을 보여준다. 프로젝트별 기술 스택, 상태, 기간, 대표 기능, GitHub 링크를 제공한다.

포함 요소:

- 프로젝트 필터
- 기술 스택별 필터
- 프로젝트 상태 필터
- 카드/리스트 뷰
- 정렬 기능

#### Project Detail

특정 프로젝트의 상세 페이지다. 단순 소개가 아니라 개발 흐름과 기술 판단을 중심으로 구성한다.

포함 요소:

- 프로젝트 개요
- 문제 정의
- 핵심 기능
- 기술 스택
- 아키텍처 요약
- 주요 커밋 또는 마일스톤
- 프로토타입 변화
- 트러블슈팅
- 배운 점
- 관련 링크

#### Timeline

Git 기록과 프로젝트 진행 흐름을 시간순으로 보여준다.

포함 요소:

- 연도/월별 개발 활동
- 프로젝트 시작 및 종료 시점
- 주요 기능 구현 시점
- 리팩터링, 배포, 성능 개선 기록

#### Skills

기술 스택을 단순 로고 나열이 아니라 사용 경험과 프로젝트 근거로 설명한다.

포함 요소:

- Frontend
- Backend
- Database
- DevOps
- Tools
- 각 기술을 사용한 프로젝트 연결

#### About

개발자로서의 방향성, 관심사, 작업 방식, 협업 스타일을 소개한다.

포함 요소:

- 짧은 자기소개
- 개발 철학
- 관심 분야
- 협업 방식
- 연락처

## 5. 핵심 기능

### 5.1 Git 기록 기반 프로젝트 데이터화

예전 Git 기록을 분석해 프로젝트 콘텐츠의 근거 데이터로 사용한다.

수집 후보:

- 저장소 이름
- 저장소 설명
- 사용 언어
- 주요 브랜치
- 커밋 메시지
- 커밋 날짜
- 태그 및 릴리즈
- README 내용
- package.json dependencies
- 주요 디렉터리 구조

### 5.2 기술 스택 자동/반자동 추출

프로젝트별 기술 스택을 아래 기준으로 추출한다.

- `package.json` dependencies/devDependencies
- 설정 파일
- 프레임워크 디렉터리 구조
- README 키워드
- 커밋 메시지 키워드

초기 버전에서는 완전 자동화보다 수동 보정 가능한 JSON 또는 MDX 데이터 구조를 우선한다.

### 5.3 프로젝트 상세 콘텐츠

각 프로젝트는 다음 구조로 정리한다.

- Summary: 한 줄 요약
- Context: 만들게 된 배경
- Features: 구현 기능
- Stack: 사용 기술
- Decisions: 주요 기술 선택 이유
- Problems: 겪은 문제
- Solutions: 해결 방식
- Evidence: 관련 커밋, PR, 릴리즈, 스크린샷
- Retrospective: 배운 점과 개선 여지

### 5.4 타임라인 시각화

개발 활동을 시간순으로 보여주는 기능이다.

표현 방식:

- 월별 그룹
- 프로젝트별 색상 구분
- 커밋 밀도 표시
- 주요 마일스톤 강조
- 상세 페이지로 이동 가능한 링크

### 5.5 검색 및 필터

방문자가 관심 있는 내용을 빠르게 찾을 수 있도록 한다.

필터 기준:

- 기술 스택
- 프로젝트 유형
- 프로젝트 상태
- 연도
- 역할
- 키워드

### 5.6 반응형 UI

모바일, 태블릿, 데스크톱에서 모두 사용하기 쉬운 레이아웃을 제공한다.

중점:

- 모바일에서 타임라인 가독성 확보
- 프로젝트 카드의 정보 밀도 조절
- 상세 페이지의 긴 글 읽기 경험 개선
- 터치 인터랙션 고려

## 6. 데이터 설계

### 6.1 프로젝트 데이터 예시

```ts
type Project = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  status: "prototype" | "active" | "archived" | "completed";
  startedAt: string;
  endedAt?: string;
  role: string;
  stacks: string[];
  features: string[];
  highlights: string[];
  repositoryUrl?: string;
  demoUrl?: string;
  thumbnail?: string;
  milestones: ProjectMilestone[];
};

type ProjectMilestone = {
  date: string;
  title: string;
  description: string;
  commitHash?: string;
  url?: string;
};
```

### 6.2 기술 스택 데이터 예시

```ts
type Skill = {
  name: string;
  category: "frontend" | "backend" | "database" | "devops" | "tool";
  level: "familiar" | "practical" | "confident";
  description: string;
  projectSlugs: string[];
};
```

### 6.3 Git 활동 데이터 예시

```ts
type GitActivity = {
  repository: string;
  commitHash: string;
  message: string;
  committedAt: string;
  projectSlug?: string;
  category?: "feature" | "fix" | "refactor" | "docs" | "test" | "deploy";
};
```

## 7. 디렉터리 구조 제안

```txt
src/
  app/
    layout.tsx
    page.tsx
    projects/
      page.tsx
      [slug]/
        page.tsx
    timeline/
      page.tsx
    skills/
      page.tsx
    about/
      page.tsx
  components/
    common/
    layout/
    projects/
    timeline/
    skills/
    ui/
  data/
    projects.ts
    skills.ts
    git-activities.ts
  lib/
    api/
    github.ts
    utils.ts
  styles/
    globals.css
```

## 8. UI 방향성

### 8.1 디자인 톤

- 과도하게 장식적인 랜딩 페이지보다 개발 기록을 읽기 좋은 작업형 포트폴리오를 지향한다.
- 배경은 차분하게 유지하고, 프로젝트 카드와 타임라인에서 정보 구조를 명확히 드러낸다.
- 기술 스택은 로고 나열보다 실제 사용 맥락 중심으로 보여준다.

### 8.2 주요 컴포넌트

- Header
- Footer
- ProjectCard
- ProjectFilter
- ProjectDetailHeader
- StackBadge
- TimelineItem
- MilestoneList
- SkillMatrix
- GitActivityChart
- ThemeToggle

### 8.3 shadcn/ui 사용 후보

- Button
- Card
- Badge
- Tabs
- Accordion
- Dialog
- Sheet
- Command
- Select
- Separator
- Tooltip

## 9. 콘텐츠 작성 전략

### 9.1 프로젝트 소개 문장 공식

각 프로젝트는 다음 형식을 기본으로 작성한다.

```txt
[문제/목표]를 해결하기 위해 [핵심 기술/방식]으로 구현한 [프로젝트 유형]입니다.
```

예시:

```txt
반복적인 개인 일정 관리를 줄이기 위해 Next.js와 Google Calendar API를 활용해 구현한 일정 대시보드입니다.
```

### 9.2 커밋 메시지 분류 기준

- `feat`: 기능 구현
- `fix`: 버그 수정
- `refactor`: 구조 개선
- `style`: 스타일 변경
- `docs`: 문서
- `test`: 테스트
- `chore`: 설정 및 기타 작업
- `deploy`: 배포 관련 작업

### 9.3 프로젝트 하이라이트 선정 기준

- 문제 해결이 명확한 기능
- 기술적 판단이 드러나는 구현
- 성능, 구조, 사용성 개선
- 초기 프로토타입에서 완성 형태로 발전한 흐름
- 실패나 시행착오를 통해 배운 점

## 10. Git 기록 처리 방식

### 10.1 1차 MVP 방식

초기 버전은 GitHub API 완전 자동화보다 수동 보정이 쉬운 정적 데이터 방식을 사용한다.

절차:

1. 예전 저장소 목록을 정리한다.
2. 각 저장소의 README, package.json, 커밋 로그를 확인한다.
3. 프로젝트별 핵심 정보와 기술 스택을 `src/data`에 정리한다.
4. 사이트는 해당 정적 데이터를 기반으로 렌더링한다.

장점:

- 구현 속도가 빠르다.
- 잘못 분류된 내용을 사람이 보정할 수 있다.
- Vercel 배포가 단순하다.
- 포트폴리오 문장의 품질을 높이기 쉽다.

### 10.2 2차 확장 방식

GitHub API를 연결해 일부 데이터를 자동 갱신한다.

가능 기능:

- 최근 커밋 자동 표시
- 저장소별 언어 비중 표시
- Star, fork, updatedAt 표시
- 릴리즈 및 태그 표시
- GitHub Actions 상태 표시

주의점:

- GitHub API rate limit을 고려해야 한다.
- private repository 노출 범위를 명확히 제어해야 한다.
- 빌드 시점 수집과 런타임 수집 중 어떤 방식을 쓸지 결정해야 한다.

## 11. MVP 범위

### 11.1 포함 기능

- Home 페이지
- Projects 목록 페이지
- Project Detail 페이지
- Skills 페이지
- Timeline 페이지
- About 페이지
- 정적 프로젝트 데이터
- 반응형 레이아웃
- 다크 모드
- Vercel 배포

### 11.2 제외 기능

초기 MVP에서는 아래 기능을 제외하거나 후순위로 둔다.

- 실시간 GitHub API 동기화
- 관리자 페이지
- 댓글 기능
- 로그인
- 복잡한 차트 대시보드
- 다국어 지원

## 12. 개발 로드맵

### Phase 1. 프로젝트 세팅

- Next.js 프로젝트 생성
- TypeScript 설정
- Tailwind CSS 설정
- shadcn/ui 설정
- lucide-react 설정
- 기본 레이아웃 구성
- Vercel 배포 설정

### Phase 2. 데이터 모델링

- 프로젝트 데이터 타입 정의
- 기술 스택 데이터 타입 정의
- Git 활동 데이터 타입 정의
- 샘플 데이터 작성

### Phase 3. 핵심 페이지 구현

- Home
- Projects
- Project Detail
- Skills
- Timeline
- About

### Phase 4. 콘텐츠 정리

- 예전 Git 저장소 목록화
- 프로젝트별 README 분석
- package.json 기반 기술 스택 정리
- 주요 커밋 및 마일스톤 선정
- 프로젝트 상세 설명 작성

### Phase 5. 시각화 및 인터랙션

- 프로젝트 필터
- 타임라인 UI
- 기술 스택 매트릭스
- 활동량 차트
- 페이지 전환 및 섹션 애니메이션

### Phase 6. 배포 및 개선

- Vercel 배포
- 메타데이터 설정
- Open Graph 이미지 설정
- Lighthouse 점검
- 접근성 점검
- 모바일 UI 점검

## 13. SEO 및 메타데이터

### 13.1 기본 SEO

- 사이트 제목
- 페이지별 description
- canonical URL
- Open Graph metadata
- Twitter card metadata
- sitemap
- robots.txt

### 13.2 페이지별 메타데이터 예시

- Home: 개발자 이름, 핵심 역할, 대표 기술
- Projects: 프로젝트 목록과 기술 경험
- Project Detail: 프로젝트명, 핵심 기능, 사용 기술
- Skills: 기술 스택과 사용 경험
- Timeline: 개발 활동 기록
- About: 개발자 소개와 연락처

## 14. 성능 및 접근성

### 14.1 성능

- 이미지 최적화
- 정적 렌더링 우선
- 불필요한 클라이언트 컴포넌트 최소화
- 폰트 로딩 최적화
- 차트와 애니메이션 컴포넌트 지연 로딩

### 14.2 접근성

- 키보드 탐색 지원
- 명확한 포커스 스타일
- 충분한 색 대비
- 아이콘 버튼에 접근 가능한 이름 제공
- 타임라인과 차트에 텍스트 대체 정보 제공

## 15. 배포 전략

### 15.1 Vercel 배포

- GitHub 저장소와 Vercel 프로젝트 연결
- main 브랜치 기준 프로덕션 배포
- PR 또는 브랜치별 Preview Deployment 활용
- 환경 변수가 필요한 경우 Vercel Dashboard에서 관리

### 15.2 환경 변수 후보

```txt
NEXT_PUBLIC_SITE_URL=
GITHUB_TOKEN=
GITHUB_USERNAME=
```

초기 MVP에서는 GitHub API를 사용하지 않을 수 있으므로 `GITHUB_TOKEN`은 선택 사항으로 둔다.

## 16. 향후 확장 아이디어

- GitHub API 기반 자동 업데이트
- MDX 기반 프로젝트 회고 작성
- 한국어/영어 다국어 지원
- 프로젝트별 아키텍처 다이어그램
- 기술 스택별 사용 경험 필터
- 블로그 또는 개발 노트 섹션
- PDF 이력서 다운로드
- 채용 담당자용 요약 모드

## 17. 우선순위

### Must Have

- 포트폴리오 기본 페이지
- 프로젝트 데이터 구조
- 프로젝트 상세 페이지
- 기술 스택 표시
- 반응형 UI
- Vercel 배포

### Should Have

- 타임라인
- 필터
- 다크 모드
- SEO 메타데이터
- Open Graph 이미지

### Could Have

- GitHub API 연동
- 차트 시각화
- MDX 회고
- 다국어 지원
- PDF 이력서 다운로드

## 18. 성공 기준

- 방문자가 첫 화면에서 개발자의 주요 역량을 이해할 수 있다.
- 각 프로젝트가 기술 스택, 기능, 문제 해결 경험을 함께 보여준다.
- 예전 Git 기록이 단순 로그가 아니라 설득력 있는 포트폴리오 콘텐츠로 재구성된다.
- 사이트가 Vercel에서 안정적으로 배포된다.
- 모바일과 데스크톱에서 모두 읽기 쉽고 탐색이 편하다.

