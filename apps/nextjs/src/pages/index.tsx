import { createContext } from "@andescalada/api/src/createContext";
import { appRouter } from "@andescalada/api/src/routers/_app";
import { transformer } from "@andescalada/api/src/transformer";
import useZodForm from "@andescalada/hooks/useZodForm";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import Link from "next/link";
import { trpc } from "utils/trpc";
import { z } from "zod";

export default function IndexPage() {
  const { register, handleSubmit } = useZodForm({
    schema: z.object({ search: z.string().min(2) }),
  });

  const recentlyAdded = trpc.zones.recentlyAdded.useQuery();

  const { mutate, data } = trpc.search.all.useMutation();

  const onSubmit = handleSubmit(async (data) => {
    mutate(data.search);
  });

  return (
    <div>
      <div className="bg-gradient-to-r from-primaryA to-primaryB flex flex-1 flex-col min-w-screen min-h-screen">
        <div className=" flex flex-1 justify-center items-center">
          <div>
            <h1 className="text-white font-display pb-8 ">ANDESCALADA</h1>
            <form onSubmit={onSubmit}>
              <input
                placeholder="Buscar zona, sector, ruta o pared..."
                className="w-full p-2 rounded-lg"
                {...register("search")}
              />
            </form>
          </div>
          <div>
            {data?.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-lg my-4 border-2 border-grayscale-500"
              >
                <h2 className="text-white">
                  <Link href={`/zona/${item.id}/${item.slug}`} target="_blank">
                    {item.name}
                  </Link>
                </h2>
              </div>
            ))}
          </div>
        </div>
        <div className="flex w-full justify-center items-center scale-[0.6]">
          <a
            href="https://apps.apple.com/us/app/andescalada/id6443438367?itsct=apps_box_badge&amp;itscg=30200"
            className="mr-10"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/es-mx?size=250x83&amp;releaseDate=1674518400"
              alt="Download on the App Store"
              className="h-[83px]"
            />
          </a>
          <a
            href="https://play.google.com/store/apps/details?id=com.andescalada.app&hl=es&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1"
            target="_blank"
            className="ml-10"
            rel="noreferrer"
          >
            <img
              alt="Disponible en Google Play"
              src="https://play.google.com/intl/en_us/badges/static/images/badges/es-419_badge_web_generic.png"
              className="h-[105px]"
            />
          </a>
        </div>
      </div>
      <div className="bg-black flex flex-1 flex-col min-w-screen  items-center p-20">
        <h2 className="text-white">Zonas recientemente añadidas</h2>
        <div className="mt-10">
          {recentlyAdded.data?.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-lg my-4 border-2 border-grayscale-500"
            >
              <h2 className="text-white">
                <Link href={`/zona/${item.id}/${item.slug}`} target="_blank">
                  {item.name}
                </Link>
              </h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: await createContext(),
    transformer,
  });
  try {
    await ssg.zones.recentlyAdded.prefetch();

    return {
      props: {
        trpcState: ssg.dehydrate(),
      },
      revalidate: 1,
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
}
