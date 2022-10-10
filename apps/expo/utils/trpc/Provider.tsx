import { transformer } from "@andescalada/api/src/transformer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { trpc } from "@utils/trpc";
import Constants from "expo-constants";
import { FC, ReactNode, useState } from "react";

const { manifest } = Constants;

export interface AccessToken {
  exp: number;
}

interface Props {
  accessToken: string;
  firstTimeLogin?: true;
  children: ReactNode;
}

const url = __DEV__
  ? `http://${manifest?.debuggerHost?.split(":").shift()}:3000`
  : "https://andescalada-mono.vercel.app";

const TRPCProvider: FC<Props> = ({ accessToken, children }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: { queries: { retry: false, staleTime: 1000 * 60 * 2 } },
      }),
  );
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: `${url}/api/trpc`,

          async headers() {
            return {
              Authorization: `Bearer ${accessToken}`,
            };
          },
        }),
      ],
      transformer,
    }),
  );
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
};

export default TRPCProvider;
