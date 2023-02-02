import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function IndexPage() {
  return (
    <div className="bg-black flex-1 min-w-full min-h-screen justify-center items-center">
      <h1 className="bg-blue-300 font-display text-2xl">
        Api Andescalada v0.0.5-a
      </h1>
      <ReactQueryDevtools />
    </div>
  );
}
