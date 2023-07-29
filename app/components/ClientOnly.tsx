'use client';

import React, { useState, useEffect } from 'react';
import { ThemeProvider } from "next-themes";

interface ClientOnlyProps {
  children: React.ReactNode;
}

const ClientOnly: React.FC<ClientOnlyProps> = ({ 
  children
}) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
      setHasMounted(true);
  }, [])

  if (!hasMounted) return null;

  return (
    <ThemeProvider attribute='class'>
      {children}
    </ThemeProvider>
  );
};

export default ClientOnly;
