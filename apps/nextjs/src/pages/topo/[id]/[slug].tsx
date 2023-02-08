import { createContext, prisma } from "@andescalada/api/src/createContext";
import { appRouter } from "@andescalada/api/src/routers/_app";
import { transformer } from "@andescalada/api/src/transformer";
import { SoftDeleteSchema } from "@andescalada/db/zod";
import { routeKindLabel } from "@andescalada/utils/routeKind";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import StoreBadges from "components/StoreBadges";
import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import Link from "next/link";
import TopoViewer from "pages/zona/[id]/TopoViewer";
import gradeLabel from "utils/gradeLabel";
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

    const wall = await ssg.zones.publicWallById.fetch(id);

    if (!wall) {
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
  const walls = await prisma.wall.findMany({
    where: { isDeleted: SoftDeleteSchema.enum.NotDeleted },
    select: {
      id: true,
      slug: true,
    },
  });
  return {
    paths: walls.map((wall) => ({
      params: {
        id: wall.id,
        slug: wall.slug,
      },
    })),
    fallback: "blocking",
  };
};

const TopoPage = ({ id }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { data } = trpc.zones.publicWallById.useQuery(id);
  const topo = data?.topos.find((t) => t.main);

  return (
    <div className="bg-grayscale-black text-white flex flex-col justify-start items-stretch flex-1 min-h-screen max-w-full">
      <div className="p-5">
        <h1>
          <span className="text-brand-primaryA underline">
            <Link
              href={`/zona/${data?.Sector.Zone.id}/${data?.Sector.Zone.slug}`}
            >
              {data?.Sector.Zone.name}
            </Link>
          </span>
          <span className="text-grayscale-600"> / {data?.Sector.name} / </span>
          {data?.name}
        </h1>
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="md:flex-1">{topo && <TopoViewer topo={topo} />}</div>
        <div className="p-5 md:flex-1">
          <h2 className="mb-5">Rutas</h2>
          {data?.routes.map((route) => (
            <div
              key={route.id}
              className="py-2 px-5 flex justify-between items-center max-w-2xl border-4 rounded-lg border-grayscale-800 my-2"
            >
              <div className="flex items-center">
                <div className="border-4 rounded-full px-4 py-2 flex justify-center items-center mr-5">
                  <p>{route.position}</p>
                </div>
                <div>
                  <p>{route.name}</p>
                  <p className="font-thin text-xs text-grayscale-400">
                    {routeKindLabel(route.kind).long}
                  </p>
                </div>
              </div>
              <p>{gradeLabel(route.RouteGrade, route.kind)}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col justify-center items-center bg-grayscale-600 p-4 rounded-md m-5">
        <p className="text-sm">Descarga la nuestra App Movil</p>
        <StoreBadges />
      </div>
    </div>
  );
};

export default TopoPage;
