import { Box, Button, Header, Screen, ScrollView, Text } from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import fonts from "@assets/fonts";
import {
  PhotoContestRoutes,
  PhotoContestScreenProps,
} from "@features/photoContest/Navigation/types";
import StaticTopoViewer from "@features/routesManager/components/StaticTopoViewer";
import { useAppTheme } from "@hooks/useAppTheme";
import useCloudinaryUrl from "@hooks/useCloudinaryUrl";
import { useFitContent } from "@hooks/useFitContent";
import useIsInstalled from "@hooks/useIsInstalled";
import {
  Canvas,
  Fill,
  Group,
  Image,
  ImageFormat,
  rect,
  rrect,
  SkiaDomView,
  Text as SkiaText,
  useFont,
  useImage,
} from "@shopify/react-native-skia";
import Env from "@utils/env";
import { FC, useRef } from "react";
import { useWindowDimensions } from "react-native";
import Share, { Social } from "react-native-share";

type Props = PhotoContestScreenProps<PhotoContestRoutes.Share>;

const ShareScreen: FC<Props> = ({
  route: {
    params: { wallId },
  },
  navigation,
}) => {
  const userHasShared = trpc.photoContest.userHasShared.useMutation();

  const submission = trpc.photoContest.getUserTopoSubmission.useQuery(
    {
      wallId,
    },
    { staleTime: 0, cacheTime: 0 },
  );

  const imageInServer = useCloudinaryUrl("optimizedImage", {
    publicId: submission.data?.Topo.image.publicId,
  });

  const storyBackground = useCloudinaryUrl("optimizedImage", {
    publicId: "andescalada.org/story-background_ytrjru",
  });

  const logoInServer = useCloudinaryUrl("optimizedImage", {
    publicId: "andescalada.org/iOS_icon",
  });

  const userImage = useCloudinaryUrl("getProfileImage", {
    publicId: submission.data?.User.profilePhoto?.publicId || "",
  });

  const { width: screenWidth } = useWindowDimensions();

  const skiaLogo = useImage(logoInServer?.url);
  const skiaUserImage = useImage(userImage?.url);

  const fitted = useFitContent(
    {
      height: submission.data?.Topo.image?.height
        ? submission.data?.Topo.image.height
        : 0,
      width: submission.data?.Topo.image?.width
        ? submission.data?.Topo.image?.width
        : 0,
    },
    "width",
    screenWidth,
  );

  const fontSize = 20;
  const font = useFont(fonts["Rubik-600"], fontSize);

  const fontSizeLight = 18;
  const fontLight = useFont(fonts["Rubik-400"], fontSizeLight);

  const { inInstalled: hasInstagramInstalled } = useIsInstalled("instagram");

  const theme = useAppTheme();

  const HEIGHT = fitted.height;
  const WIDTH = fitted.width;
  const CONTAINER_HEIGHT = HEIGHT + 150;
  const USER_IMAGE_X = theme.spacing.xl;
  const USER_IMAGE_Y = CONTAINER_HEIGHT - theme.spacing.xxl - 10;
  const USER_IMAGE_SIZE = 40;

  const canvasRef = useRef<SkiaDomView>(null);

  if (submission.data === undefined) return null;

  return (
    <Screen padding="m" bg="brand.primaryA">
      <Header
        title="Compartir"
        showOptions={false}
        onGoBack={navigation.goBack}
      />
      <ScrollView marginTop="s" showsVerticalScrollIndicator={false}>
        <Box gap="l" flex={1}>
          <Box
            borderStyle="dashed"
            justifyContent="center"
            alignItems="center"
            overflow="hidden"
            marginTop="m"
            height={CONTAINER_HEIGHT}
          >
            <Canvas
              ref={canvasRef}
              style={{
                height: CONTAINER_HEIGHT,
                width: WIDTH,
                borderRadius: 16,
              }}
            >
              <Group
                clip={rrect(
                  rect(
                    theme.spacing.l,
                    0,
                    WIDTH - theme.spacing.l * 2,
                    CONTAINER_HEIGHT,
                  ),
                  12,
                  12,
                )}
              >
                <Fill color={theme.colors["grayscale.transparent.50.black"]} />
                <Group
                  clip={rrect(
                    rect(
                      theme.spacing.xxl / 2,
                      theme.spacing.l / 2,
                      WIDTH - theme.spacing.xxl,
                      HEIGHT - theme.spacing.xxl,
                    ),
                    4,
                    4,
                  )}
                >
                  {imageInServer?.url && (
                    <StaticTopoViewer
                      imageUrl={imageInServer?.url}
                      routes={submission.data?.Topo.RoutePath}
                      x={0}
                      y={0}
                      width={WIDTH - theme.spacing.xl}
                      height={HEIGHT - theme.spacing.xl}
                    />
                  )}
                </Group>

                <SkiaText
                  x={theme.spacing.xl}
                  y={fontSize + HEIGHT - theme.spacing.xxl + theme.spacing.l}
                  text={`${submission.data?.Topo.Wall.name}` || ""}
                  font={font}
                  color="white"
                />
                <SkiaText
                  x={theme.spacing.xl}
                  y={
                    fontSize * 2 +
                    HEIGHT -
                    theme.spacing.xxl +
                    theme.spacing.l +
                    10
                  }
                  text={`${submission.data?.Topo.Wall.Sector.name}` || ""}
                  font={fontLight}
                  color="white"
                />
                <SkiaText
                  x={theme.spacing.xl}
                  y={
                    fontSize * 3 +
                    HEIGHT -
                    theme.spacing.xxl +
                    theme.spacing.l +
                    15
                  }
                  text={`${submission.data?.Topo.Wall.Sector.Zone.name}` || ""}
                  font={fontLight}
                  color="white"
                />

                <Image
                  image={skiaLogo}
                  fit="contain"
                  x={WIDTH - 60 - theme.spacing.xl}
                  y={CONTAINER_HEIGHT - theme.spacing.xxl - 20}
                  width={60}
                  height={60}
                />
                <SkiaText
                  font={fontLight}
                  color="white"
                  text={`@${submission.data?.User.username}` || ""}
                  x={theme.spacing.xl + USER_IMAGE_SIZE + theme.spacing.s}
                  y={USER_IMAGE_Y + USER_IMAGE_SIZE - 10}
                />
                <Group
                  clip={rrect(
                    rect(
                      USER_IMAGE_X,
                      USER_IMAGE_Y,
                      USER_IMAGE_SIZE,
                      USER_IMAGE_SIZE,
                    ),
                    USER_IMAGE_SIZE / 2,
                    USER_IMAGE_SIZE / 2,
                  )}
                >
                  <Image
                    image={skiaUserImage}
                    x={USER_IMAGE_X}
                    y={USER_IMAGE_Y}
                    fit="cover"
                    width={USER_IMAGE_SIZE}
                    height={USER_IMAGE_SIZE}
                  />
                </Group>
              </Group>
              <SkiaText
                font={fontLight}
                color={theme.colors["grayscale.transparent.50.white"]}
                text={"1º concurso de documentación"}
                x={theme.spacing.xl}
                y={CONTAINER_HEIGHT - theme.spacing.m}
              />
            </Canvas>
          </Box>
          <Box>
            <Text
              variant="p1R"
              textDecorationLine="underline"
              color="brand.secondaryA"
            >
              Recuerda taggear a <Text variant="p1B">@andescalada</Text> en tu
              story para concursar.
            </Text>
          </Box>
        </Box>
      </ScrollView>
      <Box marginTop="s" marginBottom="m">
        <Button
          variant="transparentSimplified"
          title="Compartir"
          icon="ios-logo-instagram"
          iconProps={{ size: 25 }}
          gap="s"
          height={50}
          onPress={async () => {
            const image = canvasRef.current?.makeImageSnapshot();
            if (!image || !submission?.data?.id) return;
            const imageBase64 = image.encodeToBase64(ImageFormat.PNG, 100);

            if (hasInstagramInstalled && !!imageBase64) {
              await Share.shareSingle({
                appId: Env.FACEBOOK_DEV_APP_ID,
                stickerImage: `data:image/png;base64,${imageBase64}`,
                attributionURL: "https://www.andescalada.org",
                backgroundImage: storyBackground?.url,
                backgroundBottomColor: theme.colors["brand.primaryA"],
                backgroundTopColor: theme.colors["brand.primaryB"],
                social: Share.Social.INSTAGRAM_STORIES as Social,
              });
            } else {
              await Share.open({
                url: `data:image/png;base64,${imageBase64}`,
                title: "Compartir",
                filename: `${submission.data?.Topo.Wall.name}.png`,
                type: "image/png",
              });
            }
            userHasShared.mutate({ submissionId: submission.data?.id });
          }}
        />
      </Box>
    </Screen>
  );
};

export default ShareScreen;
