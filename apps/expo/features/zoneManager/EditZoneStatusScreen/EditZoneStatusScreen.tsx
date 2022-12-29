import {
  ActivityIndicator,
  Box,
  Button,
  Ionicons,
  Pressable,
  Screen,
  ScrollView,
  Text,
  TextFieldAccordion,
} from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import {
  ZoneManagerRoutes,
  ZoneManagerScreenProps,
} from "@features/zoneManager/Navigation/types";
import zoneStatus from "@utils/zoneStatus";
import { FC, useState } from "react";
import { z } from "zod";

type Props = ZoneManagerScreenProps<ZoneManagerRoutes.EditZoneStatus>;

const EditZoneStatus: FC<Props> = ({
  route: {
    params: { zoneId, zoneName },
  },
}) => {
  const { data, isLoading } = trpc.zones.statusById.useQuery({ zoneId });

  const utils = trpc.useContext();

  const editStatus = trpc.zones.requestRevision.useMutation({
    onSuccess: () => {
      utils.zones.statusById.invalidate({ zoneId });
    },
  });

  const [showMore, setShowMore] = useState(false);
  const [message, setMessage] = useState("");

  if (isLoading)
    return (
      <Screen safeAreaDisabled padding="m">
        <Text variant="h1" marginBottom="m">
          {zoneName}
        </Text>
        <Box flex={1} justifyContent="center" alignItems="center">
          <ActivityIndicator size="large" />
        </Box>
      </Screen>
    );

  return (
    <Screen safeAreaDisabled padding="m">
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text variant="h1" marginBottom="m">
          {zoneName}
        </Text>
        {data && (
          <>
            <Text variant="h4" marginBottom="s">
              La zona se encuentra:
            </Text>
            <Box
              marginBottom="s"
              padding="s"
              backgroundColor={zoneStatus(data.currentStatus).backgroundColor}
              borderRadius={16}
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              paddingVertical="m"
            >
              <Text color={zoneStatus(data.currentStatus).color}>
                {zoneStatus(data.currentStatus).label}
              </Text>
            </Box>

            {zoneStatus(data.currentStatus).nextStepTitle && (
              <>
                <TextFieldAccordion
                  label="Agregar mensaje"
                  value={message}
                  onChangeText={setMessage}
                  marginVertical="s"
                />
                <Button
                  marginTop="m"
                  title={zoneStatus(data.currentStatus).nextStepTitle || ""}
                  variant="info"
                  onPress={() => {
                    const isValid = z
                      .string()
                      .max(280)
                      .safeParse(message).success;
                    if (!isValid) return;
                    editStatus.mutate({ zoneId, message });
                  }}
                />
              </>
            )}
            <Pressable
              marginTop="s"
              flexDirection="row"
              alignItems="center"
              onPress={() => setShowMore((prev) => !prev)}
              justifyContent="center"
            >
              <Ionicons name="information-circle-sharp" size={20} />
              <Text variant="h4" marginLeft="s" textDecorationLine="underline">
                Sobre el siguiente paso
              </Text>
            </Pressable>
            {showMore && (
              <Text variant="p2R" textAlign="center">
                {zoneStatus(data.currentStatus).about}
              </Text>
            )}
          </>
        )}
      </ScrollView>
    </Screen>
  );
};

export default EditZoneStatus;
