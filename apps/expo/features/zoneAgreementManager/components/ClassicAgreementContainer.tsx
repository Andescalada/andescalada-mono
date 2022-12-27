import {
  AgreementLevelSchema,
  ClassicAgreementSchema,
} from "@andescalada/db/zod";
import {
  A,
  ActivityIndicator,
  Box,
  Button,
  ButtonGroup,
  Ionicons,
  KeyboardAvoidingBox,
  KeyboardDismiss,
  Pressable,
  Screen,
  ScrollView,
  Text,
  TextInput,
  useButtonGroup,
} from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import { Zone } from "@prisma/client";
import {
  ComponentProps,
  FC,
  ReactNode,
  useCallback,
  useRef,
  useState,
} from "react";
import { ScrollView as ScrollViewRef } from "react-native";
import { FadeIn, FadeOut, Layout } from "react-native-reanimated";

type AgreementLevel = typeof AgreementLevelSchema._type;
interface SubmitArgs {
  id: string | undefined;
  level?: AgreementLevel;
  comment?: string;
}

interface Props
  extends ComponentProps<typeof ButtonGroup>,
    ComponentProps<typeof Box> {
  children: ReactNode;
  onSubmit: (args: SubmitArgs) => void;
  submitLabel?: string;
  title: string;
  classic: typeof ClassicAgreementSchema._type;
  zoneId: Zone["id"];
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
  classic,
  zoneId,
  ...props
}) => {
  const { isLoading } = trpc.agreements.classic.useQuery({
    classic,
  });

  const utils = trpc.useContext();

  const zoneAgreementList = trpc.agreements.addToZoneList.useMutation({
    onSuccess: () => {
      utils.zones.agreementsList.invalidate({ zoneId });
    },
  });

  const scrollRef = useRef<ScrollViewRef>(null);

  const [level, setLevel] = useState<AgreementLevel>();
  const [comment, setComment] = useState("");

  const handleSubmit = ({ id, comment, level }: SubmitArgs) => {
    if (id && level) {
      zoneAgreementList.mutate({
        agreementId: id,
        level,
        zoneId,
        classic,
        ...(comment && { comment }),
      });
    }
    onSubmit({ id, comment, level });
  };

  if (isLoading)
    return (
      <Screen justifyContent="center" alignItems="center">
        <ActivityIndicator size="large" />
      </Screen>
    );
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
              onSubmit={handleSubmit}
              submitLabel={submitLabel}
              level={level}
              comment={comment}
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
  onSubmit: (args: SubmitArgs) => void;
  submitLabel?: string;
  show: boolean;
  level: AgreementLevel | undefined;
  comment: string;
}

const SubmitButton = ({
  onSubmit,
  submitLabel = "Continuar",
  show,
  level,
  comment,
}: SubmitButtonProps) => {
  const { value } = useButtonGroup();

  const handleSubmit = useCallback(() => {
    const id = value === UNDEFINED_AGREEMENT ? undefined : (value as string);
    onSubmit({ id, level, comment });
  }, [comment, level, onSubmit, value]);

  if (show)
    return (
      <A.Box entering={FadeIn} exiting={FadeOut} marginBottom="xl">
        <Button variant="success" title={submitLabel} onPress={handleSubmit} />
      </A.Box>
    );
  return <Box />;
};

interface AgreementGradeProps {
  level: AgreementLevel | undefined;
  setLevel: (level: AgreementLevel | undefined) => void;
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
          onChange={(v) => setLevel(v as AgreementLevel)}
          allowUndefined
        >
          <Box flexWrap="wrap" flexDirection="row">
            <ButtonGroup.Item
              value={AgreementLevelSchema.enum.Critical}
              label="Crítico"
              selectedBackgroundColor={"semantic.error"}
              backgroundColor={
                level === undefined ? "semantic.error" : "grayscale.500"
              }
            />
            <ButtonGroup.Item
              value={AgreementLevelSchema.enum.Important}
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
              value={AgreementLevelSchema.enum.Recommended}
              label="Recomendado"
              selectedBackgroundColor={"semantic.info"}
              backgroundColor={
                level === undefined ? "semantic.info" : "grayscale.500"
              }
            />
            <ButtonGroup.Item
              value={AgreementLevelSchema.enum.NotAplicable}
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
