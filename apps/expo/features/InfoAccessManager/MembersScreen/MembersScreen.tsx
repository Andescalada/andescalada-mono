import { InfoAccessSchema } from "@andescalada/db/zod";
import { Screen, Text } from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import AccessRequestList from "@features/InfoAccessManager/MembersScreen/AccessRequestList";
import AdminsList from "@features/InfoAccessManager/MembersScreen/AdminsList";
import MembersList from "@features/InfoAccessManager/MembersScreen/MembersList";
import {
  InfoAccessManagerRoutes,
  InfoAccessManagerScreenProps,
} from "@features/InfoAccessManager/Navigation/types";
import usePermissions from "@hooks/usePermissions";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { FC } from "react";

const Tab = createMaterialTopTabNavigator();

type Props =
  InfoAccessManagerScreenProps<InfoAccessManagerRoutes.MembersScreen>;

const MembersScreen: FC<Props> = ({
  route: {
    params: { zoneId, zoneName },
  },
}) => {
  const { permission } = usePermissions({ zoneId });
  const data = trpc.useContext().zones.allSectors.getData({ zoneId });
  return (
    <Screen safeAreaDisabled>
      <Tab.Navigator
        screenOptions={{
          tabBarScrollEnabled: true,
          tabBarLabel: ({ children }) => (
            <Text numberOfLines={1}>{children}</Text>
          ),
        }}
      >
        {data?.infoAccess !== InfoAccessSchema.enum.Public && (
          <Tab.Screen name="Miembros">
            {() => <MembersList zoneId={zoneId} />}
          </Tab.Screen>
        )}
        <Tab.Screen name="Administradores">
          {() => <AdminsList zoneId={zoneId} zoneName={zoneName} />}
        </Tab.Screen>
        {permission?.has("GrantAccess") &&
          data?.infoAccess !== InfoAccessSchema.enum.Public && (
            <Tab.Screen name="Solicitudes">
              {() => <AccessRequestList zoneId={zoneId} />}
            </Tab.Screen>
          )}
      </Tab.Navigator>
    </Screen>
  );
};

export default MembersScreen;
