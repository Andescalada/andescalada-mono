import user from "@andescalada/api/schemas/user";
import { trpc } from "@andescalada/utils/trpc";
import { useCallback, useState } from "react";

const useUsernameValidation = () => {
  const utils = trpc.useContext();

  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const validateUsername = useCallback(
    async (u: string) => {
      setIsLoading(true);

      const validUsername = user.schema
        .pick({ username: true })
        .safeParse({ username: u });
      if (!validUsername)
        return {
          isValid: false,
          errorMessage: "Nombre de usuario inválido",
        };
      const isUsernameUnique = await utils.user.uniqueUsername.fetch({
        username: u,
      });
      setIsValid(isUsernameUnique);
      setIsLoading(false);
      if (!isUsernameUnique) {
        const errorMessage = `Existe un usuario con el nombre ${u}, elige otro...`;
        setErrorMessage(errorMessage);
        return {
          isValid: false,
          errorMessage,
        };
      } else {
        setErrorMessage(undefined);
        return {
          isValid: true,
          errorMessage: undefined,
        };
      }
    },
    [utils.user.uniqueUsername],
  );

  return { isLoading, isValid, error: errorMessage, validateUsername };
};

export default useUsernameValidation;
