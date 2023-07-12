import { Button, Screen, Text } from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import fonts from "@assets/fonts";
import {
  PhotoContestRoutes,
  PhotoContestScreenProps,
} from "@features/photoContest/Navigation/types";
import useCloudinaryUrl from "@hooks/useCloudinaryUrl";
import {
  Canvas,
  Image,
  SkiaDomView,
  Text as SkiaText,
  useFont,
  useImage,
} from "@shopify/react-native-skia";
import Env from "@utils/env";
import { FC, useEffect, useRef, useState } from "react";
import { Linking, Platform, useWindowDimensions } from "react-native";
import Share, { Social } from "react-native-share";

type Props = PhotoContestScreenProps<PhotoContestRoutes.Share>;

const ShareScreen: FC<Props> = ({
  route: {
    params: { wallId },
  },
}) => {
  const submission = trpc.photoContest.getUserTopoSubmission.useQuery({
    wallId,
  });

  const imageInServer = useCloudinaryUrl("optimizedImage", {
    publicId: submission.data?.Topo.image.publicId,
  });

  const logoInServer = useCloudinaryUrl("optimizedImage", {
    publicId: "andescalada.org/iOS_icon",
  });
  const { width } = useWindowDimensions();
  const skiaImage = useImage(imageInServer?.url);
  const skiaLogo = useImage(logoInServer?.url);

  const fontSize = 32;
  const font = useFont(fonts["Rubik-600"], fontSize);

  const [hasInstagramInstalled, setHasInstagramInstalled] = useState(false);

  useEffect(() => {
    if (Platform.OS === "ios") {
      Linking.canOpenURL("instagram://").then((val) =>
        setHasInstagramInstalled(val),
      );
    } else {
      Share.isPackageInstalled("com.instagram.android").then(
        ({ isInstalled }) => {
          setHasInstagramInstalled(isInstalled);
        },
      );
    }
  }, []);

  const canvasRef = useRef<SkiaDomView>(null);

  if (submission.data === undefined) return null;

  return (
    <Screen>
      <Text>Share</Text>
      <Canvas
        ref={canvasRef}
        style={{
          height: 300,
          width,
          backgroundColor: "gray",
          borderRadius: 16,
        }}
      >
        <Image
          image={skiaImage}
          fit="cover"
          x={0}
          y={0}
          width={width}
          height={300}
        />
        <Image
          image={skiaLogo}
          fit="contain"
          x={width / 2 - 40}
          y={200}
          width={width}
          height={60}
        />
        <SkiaText
          x={10}
          y={fontSize}
          text={submission.data?.Topo.Wall.name || ""}
          font={font}
          color="white"
        />
      </Canvas>
      <Button
        variant="infoSmall"
        title="Compartir"
        onPress={async () => {
          const image = canvasRef.current?.makeImageSnapshot();
          if (!image || !submission?.data?.id) return;
          const imageBase64 = image.encodeToBase64();

          if (hasInstagramInstalled && !!imageBase64) {
            await Share.shareSingle({
              appId: Env.FACEBOOK_DEV_APP_ID,
              url: `data:image/png;base64,${imageBase64}`,
              type: "image/*",
              filename: `${submission.data?.Topo.Wall.name}.png`,
              title: "Compartir",
              backgroundImage: `data:image/png;base64,${imageBase64}`,
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
        }}
      />
    </Screen>
  );
};

export default ShareScreen;
