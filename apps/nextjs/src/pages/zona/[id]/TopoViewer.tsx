import { pathToArray } from "@andescalada/climbs-drawer/utils";
import { lowQuality } from "@andescalada/utils/cloudinary";
import type { Image as ImageType, RoutePath, Topo } from "@prisma/client";
import Image from "next/image";

type Item = Topo & {
  image: ImageType;
  RoutePath: (RoutePath & {
    Route: {
      id: string;
      name: string;
      position: number;
    };
  })[];
};

interface Props {
  topo: Item;
}

const TopoViewer = ({ topo }: Props) => {
  return (
    <div className="relative flex">
      <Image
        src={topo.image.url}
        alt="Topo"
        width={topo.image.width}
        height={topo.image.height}
        placeholder="blur"
        blurDataURL={lowQuality(topo.image.publicId)?.url}
        className="flex-1"
        priority
        sizes="(min-width: 60em) 24vw,
        (min-width: 28em) 45vw,
        100vw"
      />
      <svg
        viewBox={`0 0 ${topo.image.width} ${topo.image.height}`}
        className="absolute top-0 left-0 right-0 bottom-0 flex-1"
      >
        {topo.RoutePath.map((routePath) => (
          <>
            <polyline
              points={routePath.path}
              key={routePath.id}
              strokeLinejoin="miter"
              className="stroke-contrast-bright-red fill-none stroke-[10] hover:stroke-contrast-bright-green"
              onClick={() => {
                window.alert(routePath.Route.name);
              }}
            />
            <g
              transform={`translate(${pathToArray(routePath.path)[0][0]} ${
                pathToArray(routePath.path)[0][1]
              })`}
            >
              <circle r={50} cx={0} cy={0} className="fill-white" />
              <text
                x={0}
                y={0}
                dy=".3em"
                textAnchor="middle"
                className="font-display font-bold text-6xl fill-current text-black"
              >
                {routePath.Route.position}
              </text>
              <circle
                r={50}
                className="stroke-contrast-bright-red hover:stroke-contrast-bright-green fill-none stroke-[6]"
                cx={0}
                cy={0}
              />
            </g>
            <g
              transform={`translate(${
                pathToArray(routePath.path).slice(-1)[0][0]
              } ${pathToArray(routePath.path).slice(-1)[0][1]})`}
            >
              <circle r={50} cx={0} cy={0} className="fill-white" />
              <path
                d="M -144 0 L 0 144 L 144 0 m -144 144 v -312"
                className="stroke-contrast-bright-red stroke-[50] fill-none max-h-sm max-w-sm scale-[0.15]"
                strokeLinejoin="miter"
                strokeLinecap="round"
              />
              <circle
                r={50}
                className="stroke-contrast-bright-red hover:stroke-contrast-bright-green fill-none stroke-[6]"
                cx={0}
                cy={0}
              />
            </g>
          </>
        ))}
      </svg>
    </div>
  );
};

export default TopoViewer;