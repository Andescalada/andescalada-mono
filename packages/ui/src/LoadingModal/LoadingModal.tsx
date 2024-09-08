import { FC } from "react";

import ActivityIndicator from "../ActivityIndicator";
import Modal from "../Modal/Modal";
import Text from "../Text/Text";

interface Props {
  isLoading: boolean;
  text?: string;
}

const LoadingModal: FC<Props> = ({ isLoading, text }) => {
  return (
    <Modal visible={isLoading} padding="xxl" onDismiss={() => ""}>
      {text && <Text marginBottom="s">{text}</Text>}
      <ActivityIndicator size="large" />
    </Modal>
  );
};

export default LoadingModal;
