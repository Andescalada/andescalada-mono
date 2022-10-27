import * as FileSystem from "expo-file-system";

const cachedImageDir = FileSystem.cacheDirectory + "imageDir/";
const documentImageDir = FileSystem.documentDirectory + "imageDir/";
const cacheImageFileUri = (uniqueId: string) => cachedImageDir + `${uniqueId}`;
const imageFileUri = (uniqueId: string) => documentImageDir + `${uniqueId}`;

export const storeImage = async (
  {
    uniqueId,
    url,
  }: {
    uniqueId: string;
    url: string;
  },
  directory: "permanent" | "cache" = "cache",
) => {
  await ensureDirExists();

  const fileUri = imageFileUri(uniqueId);
  const fileInfo = await FileSystem.getInfoAsync(fileUri);
  if (directory === "permanent" && fileInfo.exists) {
    await FileSystem.downloadAsync(url, fileUri);
  }

  if (fileInfo.exists) return fileUri;

  const cacheFileUri = cacheImageFileUri(uniqueId);
  const cacheFileInfo = await FileSystem.getInfoAsync(cacheFileUri);
  if (!cacheFileInfo.exists) {
    await FileSystem.downloadAsync(url, cacheFileUri);
  }

  return cacheFileUri;
};

const ensureDirExists = async () => {
  const cacheDirInfo = await FileSystem.getInfoAsync(cachedImageDir);
  const dirInfo = await FileSystem.getInfoAsync(documentImageDir);

  if (!cacheDirInfo.exists) {
    await FileSystem.makeDirectoryAsync(cachedImageDir, {
      intermediates: true,
    });
  }
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(documentImageDir, {
      intermediates: true,
    });
  }
};
