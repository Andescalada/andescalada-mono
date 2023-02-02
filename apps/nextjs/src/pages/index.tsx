import useZodForm from "@andescalada/hooks/useZodForm";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
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
      </div>
      <ReactQueryDevtools />
    </div>
  );
}
