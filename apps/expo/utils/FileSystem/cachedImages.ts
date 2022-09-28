import * as FileSystem from "expo-file-system";

const cachedImageDir = FileSystem.cacheDirectory + "imageDir/";
const imageFileUri = (uniqueId: string) => cachedImageDir + `${uniqueId}`;

export const cachedImage = async ({
  uniqueId,
  url,
}: {
  uniqueId: string;
  url: string;
}) => {
  await ensureDirExists();

  const fileUri = imageFileUri(uniqueId);
  const fileInfo = await FileSystem.getInfoAsync(fileUri);
  if (!fileInfo.exists) {
    await FileSystem.downloadAsync(url, fileUri);
  }

  return fileUri;
};

const ensureDirExists = async () => {
  const dirInfo = await FileSystem.getInfoAsync(cachedImageDir);

  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(cachedImageDir, {
      intermediates: true,
    });
  }
};
