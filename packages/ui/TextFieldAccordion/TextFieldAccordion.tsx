import { ComponentProps, useState } from "react";
import { FadeIn, FadeOut, Layout } from "react-native-reanimated";

import A from "../Animated/Animated";
import Box from "../Box/Box";
import Ionicons from "../Ionicons/Ionicons";
import Pressable from "../Pressable/Pressable";
import Text from "../Text/Text";
import TextInput from "../TextInput/TextInput";

interface TextFieldAccordionProps
  extends Omit<ComponentProps<typeof A.Box>, "key"> {
  label: string;
  cancelButtonLabel?: string;
  maxCharacters?: number;
  value: string;
  onChangeText: (comment: string) => void;
  show?: boolean;
}

const TextFieldAccordion = ({
  label,
  cancelButtonLabel = "Cancelar",
  maxCharacters = 280,
  value: comment,
  onChangeText: setComment,
  show = true,
  ...props
}: TextFieldAccordionProps) => {
  const [isAddComment, setIsAddComment] = useState(false);
  if (show)
    return (
      <A.Box entering={FadeIn} exiting={FadeOut} {...props}>
        <Box
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          marginBottom={isAddComment ? "m" : "none"}
        >
          <Text variant="p1B">{label}</Text>
          <Pressable
            backgroundColor="semantic.info"
            borderRadius={30}
            padding="xs"
            onPress={() => setIsAddComment((prev) => !prev)}
          >
            {isAddComment ? (
              <Text padding="s">{cancelButtonLabel}</Text>
            ) : (
              <Ionicons name={"add-sharp"} size={30} color="grayscale.white" />
            )}
          </Pressable>
        </Box>
        {isAddComment && (
          <A.Box entering={FadeIn} exiting={FadeOut} layout={Layout.delay(250)}>
            <TextInput
              containerProps={{ height: 250, padding: "s" }}
              multiline
              textAlignVertical="top"
              value={comment}
              onChangeText={setComment}
            />
            <Box alignSelf="flex-end">
              <Text
                color={
                  comment.length > maxCharacters ? "semantic.error" : "text"
                }
              >
                {`${comment.length}/${maxCharacters}`}
              </Text>
            </Box>
          </A.Box>
        )}
      </A.Box>
    );
  return <Box />;
};

export default TextFieldAccordion;
