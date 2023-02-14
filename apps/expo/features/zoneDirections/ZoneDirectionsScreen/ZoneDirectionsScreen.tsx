import {
  ActivityIndicator,
  AddButton,
  Box,
  Screen,
  Text,
  TextButton,
} from "@andescalada/ui";
import transportationModeAssets from "@andescalada/utils/transportationModesAssets";
import { trpc } from "@andescalada/utils/trpc";
import {
  ZoneDirectionsRoutes,
  ZoneDirectionsScreenProps,
} from "@features/zoneDirections/Navigation/types";
import usePermissions from "@hooks/usePermissions";
import { FC, useState } from "react";
import { Alert, FlatList } from "react-native";

type Props = ZoneDirectionsScreenProps<ZoneDirectionsRoutes.ZoneDirections>;

const ZoneDirectionsScreen: FC<Props> = ({
  navigation,
  route: {
    params: { zoneId, zoneName },
  },
}) => {
  const { permission } = usePermissions({ zoneId });
  const utils = trpc.useContext();
  const { data, isLoading } = trpc.zones.directionsById.useQuery({ zoneId });

  const [deletedDirectionId, setDeletedDirectionId] = useState("");

  const deleteDirection = trpc.zones.deleteDirection.useMutation({
    onSuccess: () => {
      utils.zones.directionsById.invalidate({ zoneId });
    },
  });

  if (isLoading) {
    return (
      <Box flex={1} justifyContent="center" alignItems="center">
        <ActivityIndicator size="large" />
      </Box>
    );
  }

  return (
    <Screen safeAreaDisabled padding="m">
      <FlatList
        data={data?.ZoneDirections}
        ListHeaderComponent={() => (
          <Box>
            <Box>
              <Text variant="h1">{zoneName}</Text>
            </Box>
            {permission.has("Create") && (
              <Box
                justifyContent="space-between"
                alignItems="center"
                flexDirection="row"
              >
                <Text variant="p1B">Agregar direcciones</Text>
                <AddButton
                  onPress={() =>
                    navigation.navigate(ZoneDirectionsRoutes.AddDirections, {
                      zoneId,
                      zoneName,
                    })
                  }
                />
              </Box>
            )}
          </Box>
        )}
        renderItem={({ item }) => (
          <Box
            justifyContent="center"
            flex={1}
            borderRadius={30}
            paddingVertical="m"
          >
            <Box flexDirection="row">
              <Box
                borderRadius={30}
                backgroundColor="grayscale.600"
                paddingHorizontal={"m"}
                alignSelf="flex-start"
              >
                <Text variant="p1R">
                  {transportationModeAssets[item.transportationMode].label}
                </Text>
              </Box>
              {permission.has("Update") && (
                <TextButton
                  variant="info"
                  marginHorizontal="m"
                  onPress={() =>
                    navigation.navigate(ZoneDirectionsRoutes.AddDirections, {
                      zoneId,
                      zoneName,
                      description: item.description?.originalText,
                      transportationMode: item.transportationMode,
                    })
                  }
                >
                  Editar
                </TextButton>
              )}
              {permission.has("Delete") && (
                <TextButton
                  variant="error"
                  isLoading={
                    deleteDirection.isLoading && item.id === deletedDirectionId
                  }
                  onPress={() =>
                    Alert.alert("Eliminar dirección", "¿Estás seguro?", [
                      {
                        text: "Cancelar",
                        style: "cancel",
                      },
                      {
                        text: "Eliminar",
                        style: "destructive",
                        onPress: () => {
                          setDeletedDirectionId(item.id);
                          deleteDirection.mutate({
                            zoneDirectionId: item.id,
                            zoneId,
                          });
                        },
                      },
                    ])
                  }
                >
                  Borrar
                </TextButton>
              )}
            </Box>
            <Box
              padding="m"
              backgroundColor="backgroundContrast"
              borderRadius={15}
              marginVertical="s"
            >
              <Text color="textContrast" variant="p2R">
                {item.description?.originalText}
              </Text>
            </Box>
          </Box>
        )}
        ListEmptyComponent={() => (
          <Box marginTop="xxxl" alignItems="center">
            <Text variant="p1R">Sin direcciones</Text>
            {permission.has("Create") && (
              <TextButton
                variant="info"
                onPress={() =>
                  navigation.navigate(ZoneDirectionsRoutes.AddDirections, {
                    zoneId,
                    zoneName,
                  })
                }
              >
                Agregar direcciones
              </TextButton>
            )}
          </Box>
        )}
      />
    </Screen>
  );
};

export default ZoneDirectionsScreen;
