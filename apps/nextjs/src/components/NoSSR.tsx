import dynamic from "next/dynamic";
import { Fragment, ReactNode } from "react";

const NonSSRWrapper = (props: { children: ReactNode }) => (
  <Fragment>{props.children}</Fragment>
);
export default dynamic(() => Promise.resolve(NonSSRWrapper), {
  ssr: false,
});
