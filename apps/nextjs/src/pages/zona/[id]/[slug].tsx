import { createContext, prisma } from "@andescalada/api/src/createContext";
import { appRouter } from "@andescalada/api/src/routers/_app";
import { transformer } from "@andescalada/api/src/transformer";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
// import { CldImage as Image } from "next-cloudinary";
import Image from "next/image";
import { trpc } from "utils/trpc";

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

    const zone = await ssg.zones.byId.fetch(id);

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
  const { data } = trpc.zones.byId.useQuery(id);

  return (
    <div>
      <h1>{data?.name}</h1>
      <div>
        {data?.sectors.map((sector) => (
          <>
            <h2 key={sector.id}>{sector.name}</h2>
            <div>
              {sector.walls.map((wall) => (
                <>
                  <h3 key={wall.id}>{wall.name}</h3>
                  <div>
                    {wall.routes.map((route) => (
                      <>
                        <h4 key={route.id}>{route.name}</h4>
                      </>
                    ))}
                  </div>
                </>
              ))}
            </div>
          </>
        ))}
      </div>
      {data?.sectors.map((sector) =>
        sector.walls.map((wall) =>
          wall.topos.map((topo) => (
            <div key={topo.id} className="relative">
              <a href={topo.image.url}>{topo.image.url}</a>
              {/* <p>{topo}</p> */}
              <Image
                src={topo.image.url}
                alt="Topo"
                width={topo.image.width}
                height={topo.image.height}
                className="absolute"
              />
              <svg
                viewBox={`0 0 ${topo.image.width} ${topo.image.height}`}
                className="absolute"
              >
                {topo.RoutePath.map((routePath) => (
                  <polyline
                    points={routePath.path}
                    key={routePath.id}
                    className="stroke-red-600 fill-none stroke-[10] hover:stroke-green-600"
                    onClick={() => {
                      window.alert(routePath.Route.name);
                    }}
                  />
                ))}
              </svg>
            </div>
          )),
        ),
      )}
    </div>
  );
};

export default ZonePage;
