import { HTMLAttributes } from "react";

const GradientTitle = ({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) => {
  return (
    <h1
      className={
        "font-semibold text-transparent text-center bg-clip-text bg-gradient-to-r from-brand-primaryA to-brand-primaryB " +
        className
      }
      {...props}
    >
      {children}
    </h1>
  );
};

export default GradientTitle;
