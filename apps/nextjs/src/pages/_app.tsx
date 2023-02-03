import "../globals.css";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AppType } from "next/dist/shared/lib/utils";
import RootLayout from "pages/layout";
import { trpc } from "utils/trpc";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <RootLayout>
      <Component {...pageProps} />
      <ReactQueryDevtools />
    </RootLayout>
  );
};

export default trpc.withTRPC(MyApp);
