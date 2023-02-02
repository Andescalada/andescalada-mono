import useZodForm from "@andescalada/hooks/useZodForm";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Link from "next/link";
import { trpc } from "utils/trpc";
import { z } from "zod";

export default function IndexPage() {
  const { register, handleSubmit } = useZodForm({
    schema: z.object({ search: z.string().min(2) }),
  });

  const { mutate, data, isLoading } = trpc.search.all.useMutation();

  const onSubmit = handleSubmit(async (data) => {
    mutate(data.search);
  });
  console.log({ data, isLoading });
  return (
    <div className="bg-gradient-to-r from-primaryA to-primaryB flex flex-1 min-w-full min-h-screen justify-center items-center">
      <div>
        <h1 className="text-white font-display pb-8 ">Andescalada</h1>
        <form onSubmit={onSubmit}>
          <input
            placeholder="Buscar zona, sector, ruta o pared..."
            className="w-full p-2 rounded-lg"
            {...register("search")}
          />
        </form>
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
      <ReactQueryDevtools />
    </div>
  );
}
