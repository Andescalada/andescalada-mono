import { createContext, prisma } from "@andescalada/api/src/createContext";
import { appRouter } from "@andescalada/api/src/routers/_app";
import { transformer } from "@andescalada/api/src/transformer";
import { InfoAccessSchema } from "@andescalada/db/zod";
import infoAccessAssets from "@andescalada/utils/infoAccessAssets";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import TopoViewer from "pages/zona/[id]/TopoViewer";
import { useMemo } from "react";
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

  const iA = useMemo(
    () => infoAccessAssets[data?.infoAccess || InfoAccessSchema.enum.Public],
    [data?.infoAccess],
  );

  return (
    <div className="bg-grayscale-black min-h-screen min-w-full p-5">
      <div className="flex">
        <h1>{data?.name}</h1>
        <div className="flex ml-5">
          <div
            className={`flex justify-center items-center px-4 bg-[theme(colors.${iA.backgroundColor})] self-stretch rounded-full`}
          >
            <h4 className="text-center">{`Guía ${iA.label}`}</h4>
          </div>
        </div>
      </div>
      <div>
        <h2 className="my-4">Sectores</h2>
        <div className="md:max-w-xl">
          {data?.sectors?.map((sector) => (
            <div key={sector.id} className="my-4">
              <div className="border-2 p-4 rounded-md border-brand-primaryA">
                <p>{sector.name}</p>
              </div>
              <div>
                {sector.walls.map((wall) => (
                  <>
                    <div
                      key={wall.id}
                      className="border-l border-r border-b last:border-b last:rounded-b-md mx-2 p-2 text-sm font-light"
                    >
                      <p>{wall.name}</p>
                    </div>
                  </>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="hidden">
        {data?.sectors.map((sector) =>
          sector.walls.map((wall) =>
            wall.topos.map((topo) => <TopoViewer key={topo.id} topo={topo} />),
          ),
        )}
      </div>
    </div>
  );
};

export default ZonePage;
