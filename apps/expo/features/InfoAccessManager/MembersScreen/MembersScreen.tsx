import { Box, Screen, Text } from "@andescalada/ui";
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
    params: { zoneId },
  },
}) => {
  const { permission } = usePermissions({ zoneId });
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
        <Tab.Screen name="Miembros">
          {() => <MembersList zoneId={zoneId} />}
        </Tab.Screen>
        <Tab.Screen name="Administradores">
          {() => <AdminsList zoneId={zoneId} />}
        </Tab.Screen>
        {permission?.has("GrantAccess") && (
          <Tab.Screen
            name="Solicitudes"
            component={() => (
              <Box flex={1} backgroundColor="brand.secondaryB" />
            )}
          />
        )}
      </Tab.Navigator>
    </Screen>
  );
};

export default MembersScreen;
