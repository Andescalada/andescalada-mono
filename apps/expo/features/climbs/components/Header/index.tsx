import { BackButton, Box, EditableTitle } from "@andescalada/ui";
import HeaderOptionsButton from "@features/climbs/components/HeaderOptionsButton";
import { useNavigation } from "@react-navigation/native";
import { ComponentProps, FC } from "react";

interface Props extends ComponentProps<typeof Box> {
  title: string;
  editingTitle: boolean;
  headerOptionsProps: ComponentProps<typeof HeaderOptionsButton>;
}

const Header: FC<Props> = ({
  title,
  editingTitle,
  headerOptionsProps,
  ...props
}) => {
  const navigation = useNavigation();

  return (
    <Box
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      marginBottom="s"
      {...props}
    >
      <BackButton onPress={navigation.goBack} />
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
