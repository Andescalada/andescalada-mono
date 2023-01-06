import { BackButton, Box, EditableTitle } from "@andescalada/ui";
import HeaderOptionsButton from "@features/climbs/components/HeaderOptionsButton";
import {
  ClimbsNavigationNavigationProps,
  ClimbsNavigationRoutes,
} from "@features/climbs/Navigation/types";
import { useNavigation } from "@react-navigation/native";
import { ComponentProps, FC } from "react";

interface Props extends ComponentProps<typeof Box> {
  title: string;
  editingTitle: boolean;
  headerOptionsProps: ComponentProps<typeof HeaderOptionsButton>;
  goBackAlternative?: (...args: unknown[]) => void;
}

const Header: FC<Props> = ({
  title,
  editingTitle,
  headerOptionsProps,
  goBackAlternative,
  ...props
}) => {
  const navigation =
    useNavigation<
      ClimbsNavigationNavigationProps<ClimbsNavigationRoutes.Zone>
    >();

  return (
    <Box
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      marginBottom="s"
      {...props}
    >
      <BackButton
        onPress={() => {
          if (navigation.canGoBack()) {
            navigation.goBack();
          }
          if (goBackAlternative) {
            goBackAlternative();
          }
          navigation.navigate(ClimbsNavigationRoutes.UserZones);
        }}
      />
      <EditableTitle
        title={title}
        name="name"
        lineHeight={25}
        editable={editingTitle}
        textVariant="p1R"
        containerProps={{
          alignSelf: "center",
          paddingHorizontal: "s",
          paddingLeft: "m",
          flex: 1,
        }}
        textAlignVertical="center"
        numberOfLines={1}
        maxLength={50}
        multiline={false}
      />
      <HeaderOptionsButton {...headerOptionsProps} />
    </Box>
  );
};

export default Header;
