import ThemeProvider from "@andescalada/ui/Theme/ThemeProvider";
import fonts from "assets/fonts";
import { useFonts } from "expo-font";
import { AppType } from "next/dist/shared/lib/utils";
import Head from "next/head";
import { trpc } from "utils/trpc";

const MyApp: AppType = ({ Component, pageProps }) => {
  const [fontsLoaded] = useFonts(fonts);

  if (!fontsLoaded) return null;

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
