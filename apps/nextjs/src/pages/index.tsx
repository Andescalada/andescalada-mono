import { createContext } from "@andescalada/api/src/createContext";
import { appRouter } from "@andescalada/api/src/routers/_app";
import { transformer } from "@andescalada/api/src/transformer";
import useZodForm from "@andescalada/hooks/useZodForm";
import { createServerSideHelpers } from "@trpc/react-query/server";
import MobileVideoFrame from "components/MobileVideoFrame";
import StoreBadges from "components/StoreBadges";
import Head from "next/head";
import Link from "next/link";
import Challenges from "pages/challenges";
import Why from "pages/why";
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
      <Head>
        <title>Andescalada App</title>
        <meta
          name="description"
          content="Andescalada, la app de la Fundación Andescalada para gestionar la información y a la comunidad escaladora."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.andescalada.org/" />
        <meta property="og:title" content="Andescalada" />
        <meta property="og:site_name" content="Andescalada" />
        <meta
          property="og:description"
          content="App de la Fundación Andescalada para gestionar la información y a la comunidad escaladora."
        />
        <meta
          property="og:image"
          itemProp="image"
          content={`https://www.andescalada.org/api/og`}
        />
        <meta property="og:image:width" content="400"></meta>
        <meta property="og:image:height" content="400"></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="text-white bg-gradient-to-r from-brand-primaryA to-brand-primaryB flex flex-1 flex-col min-w-screen">
        <div className=" flex flex-1 flex-col justify-center items-center">
          <div className=" w-full  flex flex-col items-center">
            <div className=" my-32 text-center px-10">
              <h1 className="font-bold">Documenta con nosotr🪨s</h1>
              <h2 className="font-extralight mt-5 text-md md:text-lg">
                Crea y comparte topos de escalada de manera fácil y responsable.
              </h2>
            </div>
            <div className="flex flex-2 flex-col w-full px-5 md:px-20 items-center">
              <h3 className="text-center">
                ⌛️ Topos publicados recientemente
              </h3>
              <div className=" flex w-full flex-wrap items-stretch justify-center">
                {recentlyAdded.data?.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-lg my-4 border-2 border-grayscale-500 mx-2"
                  >
                    <h4>
                      <Link href={`/zona/${item.id}/${item.slug}`}>
                        {item.name}
                      </Link>
                    </h4>
                  </div>
                ))}
              </div>
            </div>
            {false && (
              <form onSubmit={onSubmit} className="relative w-full">
                <input
                  placeholder="Buscar zona, sector, ruta o pared..."
                  className="w-full p-2 rounded-xl"
                  {...register("search")}
                />
                <button type="submit" className="absolute right-0 ">
                  <IoSearchCircleSharp
                    size={40}
                    className="fill-grayscale-600"
                  />
                </button>
              </form>
            )}
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
                <h2>
                  <Link href={`/zona/${item.id}/${item.slug}`}>
                    {item.name}
                  </Link>
                </h2>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-10  flex flex-col justify-center items-center transition-opacity delay-200 mb-20">
          <p className="font-extralight">Descarga nuestra App Movil</p>
          <StoreBadges />
        </div>
      </div>
      <div className="flex min-h-[500px] md:min-h-[700px] bg-grayscale-black p-5 items-center justify-center flex-col md:flex-row ">
        <div className="m-4 flex-1">
          <h2 className="text-white text-center ">
            Dibuja las rutas desde tu teléfono
          </h2>
          <p className="text-gray-400 font-thin text-center">
            Elige una foto de la pared y dibuja las rutas con tu dedo.
          </p>
        </div>
        <div className="flex-1">
          <MobileVideoFrame publicId="andescalada.org/draw-simple-route" />
        </div>
      </div>
      <div className="flex min-h-[500px] md:min-h-[700px] bg-brand-primaryA p-5 items-center justify-center flex-col md:flex-row-reverse ">
        <div className="m-4 flex-1">
          <h2 className="text-white text-center ">
            Tú decides la privacidad de la guía de escalada
          </h2>
          <p className="text-gray-400 font-thin text-center">
            Puedes elegir entre pública, comunitaria o privada.
          </p>
        </div>
        <div className="flex-1 md:flex md:justify-end">
          <MobileVideoFrame publicId="andescalada.org/zone-privacy-options_msgaua" />
        </div>
      </div>
      <Why />
      <Challenges />
    </div>
  );
}

export async function getStaticProps() {
  const ssg = createServerSideHelpers({
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
