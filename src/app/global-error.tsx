'use client';

export default function GlobalError({ reset }: { reset: () => void }) {
  return (
    <html>
      <head>
        <meta name="robots" content="noindex,nofollow" />
        <meta name="googlebot" content="noindex,nofollow" />
        <title>Temporary error</title>
      </head>
      <body className="h-vh w-full justify-center items-center flex">
        <h2 className="text-2xl font-bold">Something went wrong!</h2>
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
  );
}
