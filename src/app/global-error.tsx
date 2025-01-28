'use client';

export default function GlobalError({ reset }: { reset: () => void }) {
  return (
    <html>
      <body className="h-vh w-full justify-center items-center flex">
        <h2 className="text-2xl font-bold">Something went wrong!</h2>
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
  );
}
