import user from "@andescalada/api/schemas/user";
import { trpc } from "@andescalada/utils/trpc";
import { atom, useAtom } from "jotai";
import { useCallback, useState } from "react";

export const SCHEMA_ERROR = "schemaError";

export const validUsername = atom(false);

const useUsernameValidation = () => {
  const utils = trpc.useContext();

  const [isLoading, setIsLoading] = useState(false);
  const [_, setIsValidUsername] = useAtom(validUsername);
  const [isValid, setIsValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const validateUsername = useCallback(
    async (u: string) => {
      try {
        setIsValid(false);
        const validUsername = await user.schema
          .pick({ username: true })
          .safeParseAsync({ username: u });
        if (!validUsername.success)
          return {
            isValid: false,
            errorMessage: SCHEMA_ERROR,
          };
        setIsLoading(true);
        const isUsernameUnique = await utils.user.uniqueUsername.fetch({
          username: u,
        });
        setIsValid(isUsernameUnique);
        setIsValidUsername(isUsernameUnique);
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
