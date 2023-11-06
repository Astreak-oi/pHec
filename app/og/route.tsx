import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
  const image = await fetch('/screenshot.png').then((res) => res.arrayBuffer());

  const base64ImageData = Buffer.from(image).toString('base64');

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          background: '#f6f6f6',
          width: '100%',
          height: '100%',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img width="256" height="256" src={`data:image/png;base64, ${base64ImageData}`} />
      </div>
    ),
    {
      width: 1151,
      height: 647,
    }
  );
}
