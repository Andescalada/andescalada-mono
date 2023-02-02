import "../globals.css";

import { AppType } from "next/dist/shared/lib/utils";
import RootLayout from "pages/layout";
import { trpc } from "utils/trpc";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <RootLayout>
      <Component {...pageProps} />
    </RootLayout>
  );
};

export default trpc.withTRPC(MyApp);
