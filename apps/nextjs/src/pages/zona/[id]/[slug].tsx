import { createContext, prisma } from "@andescalada/api/src/createContext";
import { appRouter } from "@andescalada/api/src/routers/_app";
import { transformer } from "@andescalada/api/src/transformer";
import {
  AgreementLevelSchema,
  InfoAccessSchema,
  SoftDeleteSchema,
  StatusSchema,
} from "@andescalada/db/zod";
import { Icon, IconNames } from "@andescalada/icons/WebIcons";
import agreementLevelAssets from "@andescalada/utils/agreementLevel";
import infoAccessAssets from "@andescalada/utils/infoAccessAssets";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import StoreBadges from "components/StoreBadges";
import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import Head from "next/head";
import Link from "next/link";
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
    where: { isDeleted: SoftDeleteSchema.enum.NotDeleted },
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

  if (data?.currentStatus !== StatusSchema.enum.Published) {
    return (
      <div className="bg-grayscale-black text-white min-h-screen min-w-full p-5 flex flex-col flex-1">
        <div className="flex">
          <h1>{data?.name}</h1>
        </div>
        <div className="flex flex-col mt-5">
          <Icon name="eyes-color" size={50} />
          <h2>Zona no publicada</h2>
        </div>
        <div>
          <p>
            Esta zona de escalada no se encuentra publicada para que otros
            usuarios puedan acceder.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-grayscale-black text-white min-h-screen min-w-full p-5 flex justify-between flex-col flex-1">
      <Head>
        <title>{data?.name}</title>
        <meta
          property="og:image"
          itemProp="image"
          content={`https://www.andescalada.org/api/og/zone?title=${data.name}`}
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`https://www.andescalada.org/zona/${data.id}/${data.slug}`}
        />
        <meta property="og:title" content={data?.name} />
        <meta property="og:site_name" content="Andescalada" />
        <meta
          property="og:description"
          content={
            data.description?.originalText ? data.description?.originalText : ""
          }
        />
        <meta
          name="description"
          content="Andescalada, la app de la Fundación Andescalada para gestionar la información y a la comunidad escaladora."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
      <div className="flex flex-col md:flex-row flex-1 items-stretch">
        {data?.agreements && data?.agreements?.length > 0 && (
          <div className="flex-1 md:flex-2 md:px-8">
            <h2 className="my-4">Acuerdos</h2>
            <div>
              {data?.agreements?.map((agreement) => (
                <div
                  key={agreement.id}
                  className="bg-white p-2 my-4 rounded-md flex relative"
                >
                  <Icon
                    name={`${agreement.Agreement.icon}-color` as IconNames}
                  />
                  <p className="text-black ml-4">
                    {agreement.Agreement.title.originalText}
                  </p>
                  {agreement.level !==
                    AgreementLevelSchema.enum.NotAplicable && (
                    <div
                      className={`px-2 h-6 rounded-full absolute -bottom-2 right-2 flex justify-center items-center bg-[theme(colors.${
                        agreementLevelAssets(agreement.level).backgroundColor
                      })]`}
                    >
                      <p
                        className={`text-sm text-[theme(colors.${
                          agreementLevelAssets(agreement.level).color
                        })]`}
                      >
                        {agreementLevelAssets(agreement.level).label}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        {data?.sectors?.length === 0 && (
          <div className="flex-1 md:flex-2 md:px-8">
            <h3 className="my-4">{iA.requestTitle}</h3>
            <p className="mb-6">{iA.requestDescription}</p>
            <div className="flex flex-col justify-center items-center bg-grayscale-600 p-4 rounded-md">
              <p className="text-sm">Descarga la app para solicitar acceso.</p>
              <StoreBadges />
            </div>
          </div>
        )}
        {data?.sectors && data?.sectors?.length && (
          <div className="flex-1 md:flex-2 md:px-8">
            <h2 className="my-4">Sectores</h2>
            <div>
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
                          <p>
                            <Link href={`/topo/${wall.id}/${wall.slug}`}>
                              {wall.name}
                            </Link>
                          </p>
                        </div>
                      </>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-col justify-center items-center bg-grayscale-600 p-4 rounded-md">
        <p className="text-sm">Descarga nuestra App Movil</p>
        <StoreBadges />
      </div>
    </div>
  );
};

export default ZonePage;
