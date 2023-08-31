import { pathToArray } from "@andescalada/climbs-drawer/utils";
import type { Image as ImageType, RoutePath, Topo } from "@andescalada/db";
import { urlGen } from "@andescalada/utils/cloudinary";
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

const CIRCLE_RADIUS = 50;
const ARROW_SCALE = 0.15;
const STROKE_WIDTH = 10;

const TopoViewer = ({ topo }: Props) => {
  const scale = Math.max(0.5, topo.routeStrokeWidth.toNumber());

  return (
    <div className="relative flex">
      <Image
        src={topo.image.url}
        alt="Topo"
        width={topo.image.width}
        height={topo.image.height}
        placeholder="blur"
        blurDataURL={urlGen.lowQuality({ publicId: topo.image.publicId })?.url}
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
          <g key={routePath.id}>
            <polyline
              points={routePath.path}
              key={routePath.id}
              strokeLinejoin="miter"
              strokeWidth={scale * STROKE_WIDTH}
              className={`stroke-contrast-bright-red fill-none hover:stroke-contrast-bright-green`}
              onClick={() => {
                window.alert(routePath.Route.name);
              }}
            />
            <g
              transform={`translate(${pathToArray(routePath.path)[0][0]} ${
                pathToArray(routePath.path)[0][1]
              })`}
            >
              <circle
                r={CIRCLE_RADIUS * scale}
                cx={0}
                cy={0}
                className="fill-white"
              />
              <text
                x={0}
                y={0}
                dy=".3em"
                textAnchor="middle"
                fontSize={60 * scale}
                className={`font-display font-bold fill-current text-black`}
              >
                {routePath.Route.position}
              </text>
              <circle
                r={CIRCLE_RADIUS * scale}
                className={`stroke-contrast-bright-red hover:stroke-contrast-bright-green fill-none stroke-[6]`}
                cx={0}
                cy={0}
              />
            </g>
            <g
              transform={`translate(${
                pathToArray(routePath.path).slice(-1)[0][0]
              } ${pathToArray(routePath.path).slice(-1)[0][1]})`}
            >
              <circle
                r={CIRCLE_RADIUS * scale}
                cx={0}
                cy={0}
                className="fill-white"
              />
              <path
                d="M -144 0 L 0 144 L 144 0 m -144 144 v -312"
                className={`stroke-contrast-bright-red stroke-[50] fill-none max-h-sm max-w-sm`}
                style={{ transform: `scale(${ARROW_SCALE * scale})` }}
                strokeLinejoin="miter"
                strokeLinecap="round"
              />
              <circle
                r={CIRCLE_RADIUS * scale}
                className={`stroke-contrast-bright-red hover:stroke-contrast-bright-green fill-none stroke-[6]`}
                cx={0}
                cy={0}
              />
            </g>
          </g>
        ))}
      </svg>
    </div>
  );
};

export default TopoViewer;
