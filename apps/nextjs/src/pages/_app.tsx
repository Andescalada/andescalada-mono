import ThemeProvider from "@andescalada/ui/Theme/ThemeProvider";
import { AppType } from "next/dist/shared/lib/utils";
import Head from "next/head";
import { trpc } from "utils/trpc";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ThemeProvider>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default trpc.withTRPC(MyApp);
