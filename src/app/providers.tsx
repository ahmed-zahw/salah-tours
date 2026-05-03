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
    <ClerkProvider appearance={{
      elements: {
        card: "bg-primary-100",
        footer: "hidden",
        formFieldLabel: 'text-white',
        formButtonPrimary: 'bg-primary-800 text-white'
      }
    }}>
      <QueryClientProvider client={queryClient}>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </QueryClientProvider>
    </ClerkProvider>
  );
}
