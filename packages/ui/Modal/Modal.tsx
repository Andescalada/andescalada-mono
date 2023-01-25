import {
  ComponentProps,
  createContext,
  FC,
  ReactNode,
  useContext,
} from "react";
import { Modal as RNModal } from "react-native";

import Box from "../Box/Box";
import Ionicons from "../Ionicons/Ionicons";
import Pressable from "../Pressable/Pressable";

interface Props extends ComponentProps<typeof Box> {
  visible: boolean;
  onDismiss: () => void;
  containerProps?: ComponentProps<typeof Box>;
  backdropProps?: ComponentProps<typeof Pressable>;
  modalProps?: ComponentProps<typeof RNModal>;
  children: ReactNode;
}

interface Composition {
  Close: FC;
}

const ModalContext = createContext<{ onDismiss: () => void } | undefined>(
  undefined,
);

const Modal: FC<Props> & Composition = ({
  children,
  visible,
  onDismiss,
  containerProps,
  modalProps,
  backdropProps,
  ...props
}) => {
  return (
    <ModalContext.Provider value={{ onDismiss }}>
      <RNModal
        transparent
        visible={visible}
        onRequestClose={onDismiss}
        animationType="fade"
        {...modalProps}
      >
        <Box
          flex={1}
          justifyContent="center"
          alignItems="center"
          {...containerProps}
        >
          <Pressable
            top={0}
            bottom={0}
            left={0}
            right={0}
            width="100%"
            height="100%"
            position="absolute"
            backgroundColor="grayscale.transparent.80.black"
            zIndex={100}
            onPress={onDismiss}
            {...backdropProps}
          />

          <Box
            zIndex={200}
            backgroundColor="background"
            borderWidth={3}
            borderColor="listItemBackground"
            borderRadius={16}
            {...props}
          >
            {children}
          </Box>
        </Box>
      </RNModal>
    </ModalContext.Provider>
  );
};

interface CloseButtonProps extends ComponentProps<typeof Pressable> {
  iconProps?: ComponentProps<typeof Ionicons>;
}

const CloseButton: FC<CloseButtonProps> = ({ iconProps, ...props }) => {
  const { onDismiss } = useContext(ModalContext) || {};
  return (
    <Pressable
      position="absolute"
      right={0}
      top={0}
      zIndex={300}
      padding="m"
      {...props}
      onPress={onDismiss}
    >
      <Ionicons name="close" size={24} {...iconProps} />
    </Pressable>
  );
};

Modal.Close = CloseButton;

export default Modal;
