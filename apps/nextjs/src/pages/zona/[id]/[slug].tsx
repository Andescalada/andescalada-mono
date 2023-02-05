import { createContext, prisma } from "@andescalada/api/src/createContext";
import { appRouter } from "@andescalada/api/src/routers/_app";
import { transformer } from "@andescalada/api/src/transformer";
import { scalePath, scalePathArray } from "@andescalada/climbs-drawer/utils";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import Image from "next/image";
import { trpc } from "utils/trpc";

const SCALE = 1;

export async function getStaticProps(
  context: GetStaticPropsContext<{ id: string; slug: string }>,
) {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: await createContext(),
    transformer,
  });
  try {
    const id = context.params?.id as string;

    const zone = await ssg.zones.publicById.fetch(id);

    if (!zone) {
      return {
        notFound: true,
      };
    }
    return {
      props: {
        trpcState: ssg.dehydrate(),
        id,
      },
      revalidate: 1,
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const zones = await prisma.zone.findMany({
    select: {
      id: true,
      slug: true,
    },
  });
  return {
    paths: zones.map((zone) => ({
      params: {
        id: zone.id,
        slug: zone.slug,
      },
    })),
    fallback: "blocking",
  };
};

const ZonePage = ({ id }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { data } = trpc.zones.publicById.useQuery(id);

  return (
    <div className="bg-black min-h-screen min-w-full p-5">
      <h1>{data?.name}</h1>
      <h2>{data?.infoAccess}</h2>
      <div>
        {data?.sectors?.map((sector) => (
          <>
            <h2 key={sector.id}>{sector.name}</h2>
          </>
        ))}
      </div>
      <div className="">
        {data?.sectors.map((sector) =>
          sector.walls.map((wall) =>
            wall.topos.map((topo) => (
              <div key={topo.id} className="scale-50 relative">
                <Image
                  src={topo.image.url}
                  alt="Topo"
                  width={topo.image.width * SCALE}
                  height={topo.image.height * SCALE}
                  className="absolute top-0 left-0 right-0 bottom-0"
                />
                <svg
                  viewBox={`0 0 ${topo.image.width * SCALE} ${
                    topo.image.height * SCALE
                  }`}
                  className="absolute top-0 left-0 right-0 bottom-0"
                >
                  {topo.RoutePath.map((routePath) => (
                    <>
                      <polyline
                        points={scalePath(routePath.path, SCALE)}
                        key={routePath.id}
                        strokeLinejoin="miter"
                        className="stroke-contrast-bright-red fill-none stroke-[10] hover:stroke-contrast-bright-green"
                        onClick={() => {
                          window.alert(routePath.Route.name);
                        }}
                      />
                      <g
                        transform={`translate(${
                          scalePathArray(routePath.path, SCALE)[0][0]
                        } ${scalePathArray(routePath.path, SCALE)[0][1]})`}
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
                          scalePathArray(routePath.path, SCALE).slice(-1)[0][0]
                        } ${
                          scalePathArray(routePath.path, SCALE).slice(-1)[0][1]
                        })`}
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
            )),
          ),
        )}
      </div>
    </div>
  );
};

export default ZonePage;
