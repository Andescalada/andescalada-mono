import { InfoAccessSchema } from "@andescalada/db/zod";
import { ActivityIndicator, Box, Button, Screen, Text } from "@andescalada/ui";

interface Props {
  isLoading: boolean;
  isError: boolean;
  hasAccess: boolean;
  infoAccess: keyof typeof InfoAccessSchema.Enum | undefined;
}

const NoSectors = ({ isLoading, hasAccess, infoAccess, isError }: Props) => {
  const title =
    infoAccess === InfoAccessSchema.Enum.Private
      ? "Acceso Privado"
      : "Acceso Comunitario";
  const description =
    infoAccess === InfoAccessSchema.Enum.Private
      ? "Solo los y las administradoras de la zona pueden darte acceso."
      : "Cualquier persona que ya tenga acceso a estos topos puede entregarte acceso.";
  if (isLoading)
    return (
      <Screen justifyContent="center" alignItems="center">
        <ActivityIndicator size={"large"} />
      </Screen>
    );

  if (!hasAccess && !isError)
    return (
      <Box flex={1} justifyContent={"flex-start"}>
        <Box flex={1 / 3} justifyContent="center">
          <Text variant="h2" marginBottom="l">
            {title}
          </Text>
          <Text variant="p1R" marginBottom="m">
            No tienes permiso para ver esta zona
          </Text>
          <Text marginBottom="s">{description}</Text>
        </Box>
        <Button variant="info" title="Solicitar acceso" alignSelf="center" />
      </Box>
    );

  return (
    <Box flex={1} justifyContent="center" alignItems="center">
      <Text variant={"h3"}>Sin sectores</Text>
    </Box>
  );
};

export default NoSectors;
