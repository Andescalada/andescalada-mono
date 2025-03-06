// External modules that need declaration for strict TypeScript
declare module "@cloudinary/url-gen" {
  export class Cloudinary {
    constructor(options: {
      cloud: { cloudName: string };
      url: { secure: boolean; analytics: boolean };
    });
    image(publicId?: string): CloudinaryImage;
    video(publicId: string): CloudinaryVideo;
  }

  export interface CloudinaryImage {
    resize(resizeAction: any): CloudinaryImage;
    format(format: string): CloudinaryImage;
    quality(quality: number | string): CloudinaryImage;
    effect(effect: any): CloudinaryImage;
    toURL(): string;
    toString(): string;
  }

  export interface CloudinaryVideo {
    quality(quality: number): CloudinaryVideo;
    format(format: string): CloudinaryVideo;
    toURL(): string;
    toString(): string;
  }
}

declare module "@cloudinary/url-gen/actions/effect" {
  export function blur(strength: number): any;
}

declare module "@cloudinary/url-gen/actions/resize" {
  export const Resize: {
    scale(): {
      width(width: number): {
        height(height: number): any;
      };
    };
    scale(size?: number): any;
  };
}

// Interface for TRPC search types
interface SearchType {
  ZONE: "ZONE";
  SECTOR: "SECTOR";
  WALL: "WALL";
  ROUTE: "ROUTE";
}

// Interface for text input ref
interface TextInputRef {
  focus(): void;
  blur(): void;
  clear(): void;
  isFocused(): boolean;
  value: string;
}
