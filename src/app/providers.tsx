"use client";

import StyledComponentsRegistry from "@salah-tours/components/ui/styled.registry";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ClerkProvider } from "@clerk/nextjs";

const queryClient = new QueryClient();

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ClerkProvider>
      <QueryClientProvider client={queryClient}>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </QueryClientProvider>
    </ClerkProvider>
  );
}
