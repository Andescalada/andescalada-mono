import { Zone } from "@andescalada/db";
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
  KeyboardAvoidingBox,
  KeyboardDismiss,
  Screen,
  ScrollView,
  Text,
  TextFieldAccordion,
  useButtonGroup,
} from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import AgreementLevelButtonGroup from "@features/zoneAgreementManager/components/AgreementLevelButtonGroup";
import {
  ComponentProps,
  FC,
  ReactNode,
  useCallback,
  useRef,
  useState,
} from "react";
import { ScrollView as ScrollViewRef } from "react-native";
import { FadeIn, FadeOut } from "react-native-reanimated";

type AgreementLevel = typeof AgreementLevelSchema._type;
interface SubmitArgs {
  id: string | undefined;
  level?: AgreementLevel;
  comment?: string;
}

interface Props extends ComponentProps<typeof Box> {
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
  onSubmit,
  submitLabel,
  title,
  classic,
  zoneId,
  ...props
}) => {
  const [selected, setSelected] = useState<string>();
  const { isLoading } = trpc.agreements.classic.useQuery({
    classic,
  });

  const utils = trpc.useContext();

  const zoneAgreementList = trpc.agreements.addToZoneList.useMutation({
    onSuccess: () => {
      utils.agreements.listByZone.invalidate({ zoneId });
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
            value={selected}
            allowUndefined={false}
            onChange={(v) => setSelected(v as string | undefined)}
          >
            {children}
            <UndefinedAgreementButton />
            <AgreementGradeContainer level={level} setLevel={setLevel} />
            <TextFieldAccordion
              label="Agregar comentario"
              value={comment}
              onChangeText={setComment}
              show={!!level}
              marginBottom="m"
            />
            <SubmitButton
              onSubmit={handleSubmit}
              submitLabel={submitLabel}
              level={level}
              comment={comment}
              show={
                selected !== undefined &&
                (level !== undefined || selected === UNDEFINED_AGREEMENT) &&
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
      padding="m"
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
        <Button
          variant="success"
          padding="m"
          title={submitLabel}
          onPress={handleSubmit}
        />
      </A.Box>
    );
  return <Box />;
};

interface AgreementGradeContainerProps {
  level: AgreementLevel | undefined;
  setLevel: (level: AgreementLevel | undefined) => void;
}

const AgreementGradeContainer = ({
  level,
  setLevel,
}: AgreementGradeContainerProps) => {
  const { value } = useButtonGroup();

  if (value && value !== UNDEFINED_AGREEMENT)
    return (
      <AgreementLevelButtonGroup
        level={level}
        setLevel={setLevel}
        marginBottom="m"
      />
    );

  return <Box />;
};
