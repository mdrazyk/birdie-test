import { ChakraProvider, theme } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RecipientDashboard } from "./RecipientDashboard/RecipientDashboard.container";

const queryClient = new QueryClient();

export const App = () => (
  <ChakraProvider theme={theme}>
    <QueryClientProvider client={queryClient}>
      <RecipientDashboard />
    </QueryClientProvider>
  </ChakraProvider>
);
