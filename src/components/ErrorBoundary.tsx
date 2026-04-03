import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

// Placeholder for ErrorBoundary (Functional components cannot be ErrorBoundaries)
export const ErrorBoundary: React.FC<Props> = ({ children }) => {
  return <>{children}</>;
};
