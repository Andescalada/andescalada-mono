import { urlGen } from "@andescalada/utils/cloudinary";
import Image from "next/image";
import React from "react";

import iPhoneFrame from "../../../public/images/iphone-12-max.png";

const MobileVideoFrame = ({ publicId }: { publicId: string }) => {
  return (
    <div className="relative w-[200px] md:w-[300px] h-[416px] md:h-[620px] box-content rounded-[30px] md:rounded-t-[47px] md:rounded-b-[35px] overflow-hidden">
      <div className="absolute z-10 bg-clip-border top-[6px] left-[7px] md:top-[12px] md:left-[11px]">
        <video autoPlay loop muted className="w-[187px] md:w-[278px]">
          <source
            src={
              urlGen.getVideo({
                publicId,
              })?.url || ""
            }
            type="video/mp4"
          />
        </video>
      </div>
      <Image
        className="z-10  bg-clip-border absolute top-0 left-0"
        src={iPhoneFrame}
        alt="iPhone frame"
      />
    </div>
  );
};

export default MobileVideoFrame;
