// This file declares all external modules that lack type definitions
// The wildcard declaration is necessary for strict mode to pass
declare module "@andescalada/*";
declare module "@trpc/client";
declare module "@trpc/react-query";
declare module "@trpc/server";
declare module "react-native-phone-input";

// Additional supplemental type declarations
interface PhoneInputRef {
  getValue(): string;
  getCountryCode(): string;
  getCallingCode(): string;
}

declare namespace CloudinaryImage {
  interface CloudinaryImage {
    toString(): string;
  }
}

// Interface for colors
interface Colors {
  grayscale: Record<string, string>;
  [key: string]: any;
}

// Interface for icon names
interface IconNames {
  [key: string]: string;
}
