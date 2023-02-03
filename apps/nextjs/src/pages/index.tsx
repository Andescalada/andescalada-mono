import { createContext } from "@andescalada/api/src/createContext";
import { appRouter } from "@andescalada/api/src/routers/_app";
import { transformer } from "@andescalada/api/src/transformer";
import useZodForm from "@andescalada/hooks/useZodForm";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import Image from "next/image";
import Link from "next/link";
import { IoSearchCircleSharp } from "react-icons/io5";
import { trpc } from "utils/trpc";
import { z } from "zod";

export default function IndexPage() {
  const { register, handleSubmit } = useZodForm({
    schema: z.object({ search: z.string().min(2) }),
  });

  const recentlyAdded = trpc.zones.recentlyAdded.useQuery();

  const { mutate, data, isLoading, isSuccess } = trpc.search.all.useMutation();

  const onSubmit = handleSubmit(async (data) => {
    mutate(data.search);
  });

  return (
    <div>
      <div className="bg-gradient-to-r from-primaryA to-primaryB flex flex-1 flex-col min-w-screen min-h-screen">
        <div className=" flex flex-1 flex-col justify-center items-center">
          <div className="w-5/6 md:w-1/2 flex flex-col items-center">
            <Image
              src="https://andescalada.org/img/logo_blanco.svg"
              width={350}
              height={350}
              alt="andescalada logo"
              className="mb-20"
            />
            <form onSubmit={onSubmit} className="relative w-full">
              <input
                placeholder="Buscar zona, sector, ruta o pared..."
                className="w-full p-2 rounded-xl"
                {...register("search")}
              />
              <button type="submit" className="absolute right-0 ">
                <IoSearchCircleSharp size={40} className="fill-grayscale-600" />
              </button>
            </form>
          </div>
          <div className="flex flex-3 items-center justify-center">
            {isLoading && (
              <div className="mt-14">
                <Spinner />
              </div>
            )}
            {data?.length === 0 && isSuccess && (
              <div className="mt-14">
                <p>Sin resultados</p>
              </div>
            )}
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

const Spinner = () => (
  <div role="status">
    <svg
      aria-hidden="true"
      className="inline w-10 h-10 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-info"
      viewBox="0 0 100 101"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
        fill="currentColor"
      />
      <path
        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
        fill="currentFill"
      />
    </svg>
    <span className="sr-only">Loading...</span>
  </div>
);
