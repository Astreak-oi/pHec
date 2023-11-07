import { ImageResponse } from "next/og";
// App router includes @vercel/og.
// No need to install it.

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          textAlign: "center",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          flexWrap: "nowrap",
          backgroundColor: "white",
          backgroundImage:
            "radial-gradient(circle at 25px 25px, lightgray 2%, transparent 0%), radial-gradient(circle at 75px 75px, lightgray 2%, transparent 0%)",
          backgroundSize: "100px 100px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 133.88 133.88">
            <circle
              className="cls-1"
              cx="66.94"
              cy="66.94"
              r="66.94"
              fill="#000715"
            />
            <line
              className="cls-2"
              x1="92.94"
              y1="31.94"
              x2="92.94"
              y2="97.94"
              stroke="#e6e7e8"
              strokeWidth="4"
            />
            <line
              className="cls-3"
              x1="76.27"
              y1="40.94"
              x2="76.27"
              y2="97.94"
              stroke="#d1d3d4"
              strokeWidth="4"
            />
            <line
              className="cls-4"
              x1="59.61"
              y1="62.94"
              x2="59.61"
              y2="97.94"
              stroke="#a7a9ac"
              strokeWidth="4"
            />
            <line
              className="cls-3"
              x1="42.94"
              y1="47.94"
              x2="42.94"
              y2="97.94"
              stroke="#d1d3d4"
              strokeWidth="4"
            />
          </svg>

        </div>
        <div
          style={{
            display: "flex",
            fontSize: 40,
            fontStyle: "normal",
            color: "black",
            marginTop: 30,
            lineHeight: 1.8,
            whiteSpace: "pre-wrap",
          }}
        >
          <b>Phec by Astreak</b>
        </div>
      </div>
    ),

    {
      width: 1200,
      height: 630,
    }
  );
}
