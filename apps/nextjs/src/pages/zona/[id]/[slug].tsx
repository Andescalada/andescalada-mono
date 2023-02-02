import { useRouter } from "next/router";

const ZonePage = () => {
  const router = useRouter();
  const { id, slug } = router.query;

  return (
    <div>
      <h1>{id}</h1>
      <h1>{slug}</h1>
    </div>
  );
};

export default ZonePage;
