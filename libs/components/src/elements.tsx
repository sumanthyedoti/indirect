import React, { FC } from "react";

interface H1Props {
  children: React.ReactNode;
}

export const H1: FC<H1Props> = ({ children }) => {
  return <h1 className="mb-2 text-6xl">{children}</h1>;
};

export const H2: FC<H1Props> = ({ children }) => {
  return <h1 className="mb-2 text-4xl">{children}</h1>;
};

export const H3: FC<H1Props> = ({ children }) => {
  return <h1 className="mb-2 text-2xl">{children}</h1>;
};

export const H4: FC<H1Props> = ({ children }) => {
  return <h1 className="mb-2 text-xl">{children}</h1>;
};
