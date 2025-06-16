'use client';

import React from "react";

interface BrandPromiseHeroProps {
  main: string;
  slogan: string;
}

export const BrandPromiseHero = ({ main, slogan }: BrandPromiseHeroProps) => {
  return (
    <div className="text-center">
      <h2 className="text-4xl font-bold tracking-tight sm:text-5xl" style={{ color: 'var(--brand-primary)' }}>
        {main}
      </h2>
      <p className="mt-6 text-xl leading-8 text-muted-foreground">
        {slogan}
      </p>
    </div>
  );
}; 