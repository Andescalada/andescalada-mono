// 404.js
import Link from "next/link";

export default function FourOhFour() {
  return (
    <div className="flex  flex-col flex-1 min-w-full min-h-screen justify-center items-center">
      <h1>404</h1>
      <h2>Estamos bien perdidos</h2>
      <Link href="/">Volver al inicio</Link>
    </div>
  );
}
