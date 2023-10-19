import React from 'react';

export default function Hero({
  children,
  id
}: {
  children: React.ReactNode;
  id: string;
}) {
  return (
    <div
      className="hero min-h-screen bg-base-200 snap-center"
      id={id}
    >
      <div className="hero-content text-center">{children}</div>
    </div>
  );
}
