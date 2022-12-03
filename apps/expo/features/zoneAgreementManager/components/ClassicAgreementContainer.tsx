import {
  A,
  Box,
  Button,
  ButtonGroup,
  KeyboardAvoidingBox,
  KeyboardDismiss,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  useButtonGroup,
} from "@andescalada/ui";
import { Ionicons } from "@expo/vector-icons";
import { ComponentProps, FC, ReactNode, useRef, useState } from "react";
import { ScrollView as ScrollViewRef } from "react-native";
import { FadeIn, FadeOut, Layout } from "react-native-reanimated";

interface Props
  extends ComponentProps<typeof ButtonGroup>,
    ComponentProps<typeof Box> {
  children: ReactNode;
  onSubmit: (id: string) => void;
  submitLabel?: string;
  title: string;
}

const UNDEFINED_AGREEMENT = "UNDEFINED_AGREEMENT";

const ClassicAgreementContainer: FC<Props> = ({
  children,
  value,
  onChange,
  onSubmit,
  submitLabel,
  allowUndefined,
  title,
  ...props
}) => {
  const [level, setLevel] = useState<number | undefined>();

  const scrollRef = useRef<ScrollViewRef>(null);

  const [comment, setComment] = useState("");
  return (
    <KeyboardAvoidingBox>
      <KeyboardDismiss>
        <ScrollView
          ref={scrollRef}
          onContentSizeChange={() =>
            scrollRef.current?.scrollToEnd({ animated: true })
          }
          flex={1}
          padding="m"
          {...props}
          showsVerticalScrollIndicator={false}
        >
          <Text variant="h2" marginBottom="s">
            {title}
          </Text>
          <ButtonGroup
            value={value}
            allowUndefined={allowUndefined}
            onChange={onChange}
          >
            {children}
            <UndefinedAgreementButton />
            <AgreementGrade level={level} setLevel={setLevel} />
            <AgreementComment
              comment={comment}
              setComment={setComment}
              show={!!level}
            />
            <SubmitButton
              onSubmit={onSubmit}
              submitLabel={submitLabel}
              show={
                value !== undefined &&
                (level !== undefined || value === UNDEFINED_AGREEMENT) &&
                comment.length <= 280
              }
            />
          </ButtonGroup>
        </ScrollView>
      </KeyboardDismiss>
    </KeyboardAvoidingBox>
  );
};

export default ClassicAgreementContainer;

const UndefinedAgreementButton = () => {
  const { value, onChange, allowUndefined } = useButtonGroup();

  const isSelected = value === UNDEFINED_AGREEMENT;
  return (
    <Button
      variant={isSelected ? "info" : "contrast"}
      title="Saltar"
      marginBottom="l"
      onPress={() => {
        if (isSelected && allowUndefined) {
          onChange(undefined);
          return;
        }
        onChange(UNDEFINED_AGREEMENT);
      }}
    />
  );
};

interface SubmitButtonProps {
  onSubmit: (id: string) => void;
  submitLabel?: string;

  show: boolean;
}

const SubmitButton = ({
  onSubmit,
  submitLabel = "Continuar",
  show,
}: SubmitButtonProps) => {
  const { value } = useButtonGroup();

  if (show)
    return (
      <A.Box entering={FadeIn} exiting={FadeOut} marginBottom="xl">
        <Button
          variant="success"
          title={submitLabel}
          onPress={() => onSubmit(value as string)}
        />
      </A.Box>
    );
  return <Box />;
};

interface AgreementGradeProps {
  level: number | undefined;
  setLevel: (level: number | undefined) => void;
}

const AgreementGrade = ({ level, setLevel }: AgreementGradeProps) => {
  const { value } = useButtonGroup();

  if (value && value !== UNDEFINED_AGREEMENT)
    return (
      <A.Box entering={FadeIn} exiting={FadeOut} marginBottom="m">
        <Text variant="p1B" marginBottom="xs">
          Grado de relevancia:
        </Text>
        <ButtonGroup
          value={level}
          onChange={(v) => setLevel(v as number)}
          allowUndefined
        >
          <Box flexWrap="wrap" flexDirection="row">
            <ButtonGroup.Item
              value={2}
              label="Crítico"
              selectedBackgroundColor={"semantic.error"}
              backgroundColor={
                level === undefined ? "semantic.error" : "grayscale.500"
              }
            />
            <ButtonGroup.Item
              value={1}
              label="Importante"
              selectedBackgroundColor={"semantic.warning"}
              backgroundColor={
                level === undefined ? "semantic.warning" : "grayscale.500"
              }
              textColor={
                level === undefined ? "grayscale.black" : "grayscale.white"
              }
              selectedTextColor="grayscale.black"
            />
            <ButtonGroup.Item
              value={0}
              label="Recomendado"
              selectedBackgroundColor={"semantic.info"}
              backgroundColor={
                level === undefined ? "semantic.info" : "grayscale.500"
              }
            />
            <ButtonGroup.Item
              value={-1}
              label="No aplica"
              selectedBackgroundColor={"grayscale.800"}
              backgroundColor={
                level === undefined ? "grayscale.800" : "grayscale.500"
              }
            />
          </Box>
        </ButtonGroup>
      </A.Box>
    );

  return <Box />;
};

interface AgreementCommentProps {
  comment: string;
  setComment: (comment: string) => void;
  show: boolean;
}

const AgreementComment = ({
  comment,
  setComment,
  show,
}: AgreementCommentProps) => {
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
          <Text variant="p1B">Agregar comentario</Text>
          <Pressable
            backgroundColor="semantic.info"
            borderRadius={30}
            padding="xs"
            onPress={() => setIsAddComment((prev) => !prev)}
          >
            {isAddComment ? (
              <Text padding="s">Cancelar</Text>
            ) : (
              <Ionicons name={"add-sharp"} size={30} color="white" />
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
              <Text color={comment.length > 280 ? "semantic.error" : "text"}>
                {comment.length}/280
              </Text>
            </Box>
          </A.Box>
        )}
      </A.Box>
    );
  return <Box />;
};
