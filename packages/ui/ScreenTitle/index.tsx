import { Box, Text, TextInput } from '@andescalada/ui';
import { FC, ReactNode, ComponentProps } from 'react';

interface Props extends ComponentProps<typeof TextInput> {
  title: string;
  leftButton?: string | ReactNode;
  rightButton?: string | ReactNode;
}

const ScreenTitle: FC<Props> = ({
  title,
  leftButton,
  rightButton,
  ...props
}) => {
  return (
    <Box
      flexDirection={'row'}
      alignItems="center"
      justifyContent={'space-between'}
    >
      <TextInput
        variant={props.editable ? 'filled' : 'disableAsText'}
        textVariant="h3"
        lineHeight={20}
        multiline
        textAlignVertical="top"
        defaultValue={title}
        containerProps={{
          justifyContent: 'center',
          flex: 1,
        }}
        {...props}
      />
      <Button
        title="Agregar"
        onPress={() =>
          navigation.navigate(ClimbsNavigationRoutes.AddZone, {
            zoneId: route.params.zoneId,
          })
        }
      />
    </Box>
  );
};

export default ScreenTitle;