import { Box, Button, Header, Image, Pressable, Screen } from "@andescalada/ui";
import {
  PhotoContestRoutes,
  PhotoContestScreenProps,
} from "@features/photoContest/Navigation/types";
import { useAppTheme } from "@hooks/useAppTheme";
import useCloudinaryUrl from "@hooks/useCloudinaryUrl";
import useIsInstalled from "@hooks/useIsInstalled";
import { useImage } from "@shopify/react-native-skia";
import Env from "@utils/env";
import { isAndroid } from "@utils/platform";
import { FC, useMemo } from "react";
import Share, { Social } from "react-native-share";

type Props = PhotoContestScreenProps<PhotoContestRoutes.ShareContest>;

const ShareContestScreen: FC<Props> = ({ navigation }) => {
  const image = useCloudinaryUrl("optimizedImage", {
    publicId: "andescalada.org/Post_Perspectiva_1_tugsov",
  });
  const loadImage = useImage(image?.url);
  const base64 = useMemo(() => loadImage?.encodeToBase64(), [loadImage]);

  const theme = useAppTheme();

  const { inInstalled: hasInstagramInstalled } = useIsInstalled("instagram");
  const { inInstalled: hasWhatsappInstalled } = useIsInstalled("whatsapp");

  return (
    <Screen padding="m">
      <Header
        title="Compartir"
        showOptions={false}
        onGoBack={navigation.goBack}
      />
      <Box flex={1} justifyContent="flex-start" alignItems="center">
        <Pressable
          onPress={async () => {
            if (!hasWhatsappInstalled) return;
            await Share.shareSingle({
              appId: Env.FACEBOOK_DEV_APP_ID,
              message: "Mira el concurso de documentación de Andescalada",
              url: `data:image/png;base64,${base64}`,
              type: "image/png",
              social: Share.Social.WHATSAPP as Social,
            });
          }}
        >
          <Image
            source={image?.url}
            width={300}
            height={500}
            contentFit="contain"
          />
        </Pressable>
        <Box flexDirection="row" gap="s">
          <Button
            variant="transparentSimplified"
            title="Compartir"
            icon={isAndroid ? "share-social" : "share"}
            iconProps={{ size: 25 }}
            gap="s"
            paddingHorizontal="s"
            height={50}
            onPress={async () => {
              await Share.open({
                title: "Compartir",
                message: `Mira el concurso de documentación de Andescalada`,
                url: `https://www.andescalada.org/open-app`,
              }).catch(() => {
                return;
              });
            }}
          />
          {hasInstagramInstalled && (
            <Button
              variant="transparentSimplified"
              title="Historia"
              paddingHorizontal="s"
              icon="ios-logo-instagram"
              iconProps={{ size: 25 }}
              gap="s"
              height={50}
              onPress={async () => {
                await Share.shareSingle({
                  appId: Env.FACEBOOK_DEV_APP_ID,
                  stickerImage: image?.url,
                  attributionURL: "https://www.andescalada.org",
                  backgroundBottomColor: theme.colors["grayscale.black"],
                  backgroundTopColor: theme.colors["grayscale.black"],
                  social: Share.Social.INSTAGRAM_STORIES as Social,
                }).catch(() => {
                  return;
                });
              }}
            />
          )}
        </Box>
      </Box>
    </Screen>
  );
};

export default ShareContestScreen;
