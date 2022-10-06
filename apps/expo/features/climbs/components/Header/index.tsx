import { BackButton, Box, EditableTitle, Text } from "@andescalada/ui";
import HeaderOptionsButton from "@features/climbs/components/HeaderOptionsButton";
import { useNavigation } from "@react-navigation/native";
import { ComponentProps, FC } from "react";
import { FormProvider, useFormContext } from "react-hook-form";

interface Props {
  title: string;
  editingTitle: boolean;
  headerOptionsProps: ComponentProps<typeof HeaderOptionsButton>;
}

const Header: FC<Props> = ({ title, editingTitle, headerOptionsProps }) => {
  const navigation = useNavigation();

  return (
    <Box
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      marginBottom="s"
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
          maxWidth: "60%",
          minWidth: "60%",
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
