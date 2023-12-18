import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

interface QueryProviderProps {
  children: React.ReactNode;
}

const queryClient = new QueryClient();

export const QueryProvider: React.FC<QueryProviderProps> = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);
