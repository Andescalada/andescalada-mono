import { useRouter } from "next/router";

const ZonePage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <h1>{id}</h1>
    </div>
  );
};

export default ZonePage;
