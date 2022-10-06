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
      try {
        const validUsername = await user.schema
          .pick({ username: true })
          .safeParseAsync({ username: u });
        if (!validUsername.success)
          return {
            isValid: false,
            errorMessage: validUsername.error.message,
          };
        setIsLoading(true);
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
      } catch (err) {
        console.warn(err);
      }
    },
    [utils.user.uniqueUsername],
  );

  return { isLoading, isValid, error: errorMessage, validateUsername };
};

export default useUsernameValidation;
