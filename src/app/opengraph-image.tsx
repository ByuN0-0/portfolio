import { ImageResponse } from "next/og";

export const alt = "ByuN0-0.log 개발 포트폴리오";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#fffdf8",
          color: "#0a0a0a",
          display: "flex",
          height: "100%",
          justifyContent: "center",
          padding: 56,
          width: "100%",
        }}
      >
        <div
          style={{
            background: "#e6f5a6",
            borderRadius: 36,
            display: "flex",
            flexDirection: "column",
            height: "100%",
            justifyContent: "space-between",
            padding: 64,
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <span
              style={{
                fontSize: 28,
                letterSpacing: 2,
                textTransform: "uppercase",
              }}
            >
              개발 포트폴리오
            </span>
            <span style={{ fontSize: 28 }}>Backend Developer</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            <h1
              style={{
                fontSize: 112,
                fontWeight: 500,
                letterSpacing: -4,
                lineHeight: 0.94,
                margin: 0,
              }}
            >
              ByuN0-0.log
            </h1>
            <p
              style={{
                fontSize: 38,
                lineHeight: 1.32,
                margin: 0,
                maxWidth: 860,
              }}
            >
              백엔드 API, 운영 도구, 배치, 결제, 크롤링, 배포 경험을 정리한 개발 기록
            </p>
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 28,
              gap: 24,
            }}
          >
            <span>github.com/ByuN0-0</span>
            <span>blog.biyeon.net</span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
