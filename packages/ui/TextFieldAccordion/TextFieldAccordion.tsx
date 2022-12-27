import { useState } from "react";
import { FadeIn, FadeOut, Layout } from "react-native-reanimated";

import A from "../Animated/Animated";
import Box from "../Box/Box";
import Ionicons from "../Ionicons/Ionicons";
import Pressable from "../Pressable/Pressable";
import Text from "../Text/Text";
import TextInput from "../TextInput/TextInput";

interface TextFieldAccordionProps {
  label: string;
  cancelButtonLabel?: string;
  maxCharacters?: number;
  comment: string;
  setComment: (comment: string) => void;
  show: boolean;
}

const TextFieldAccordion = ({
  label,
  cancelButtonLabel = "Cancelar",
  maxCharacters = 280,
  comment,
  setComment,
  show,
}: TextFieldAccordionProps) => {
  const [isAddComment, setIsAddComment] = useState(false);
  if (show)
    return (
      <A.Box entering={FadeIn} exiting={FadeOut} marginBottom="m">
        <Box
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          marginBottom="m"
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
