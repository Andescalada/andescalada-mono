import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function IndexPage() {
  return (
    <div className="bg-gradient-to-r from-primaryA to-primaryB flex flex-1 min-w-full min-h-screen justify-center items-center">
      <div>
        <h1 className="text-white font-display pb-8 ">Andescalada</h1>
        <input
          placeholder="Buscar zona, sector, ruta o pared..."
          className="w-full p-2 rounded-lg"
        />
      </div>
      <ReactQueryDevtools />
    </div>
  );
}
