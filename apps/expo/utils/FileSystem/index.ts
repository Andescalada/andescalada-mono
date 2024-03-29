import { encodeBase64 } from "@utils/base64";
import * as FileSystem from "expo-file-system";
import * as Sentry from "sentry-expo";

const IMAGE_DIR = "imageDir/";

const cachedImageDir = FileSystem.cacheDirectory + IMAGE_DIR;
const documentImageDir = FileSystem.documentDirectory + IMAGE_DIR;

const cacheImageFileUri = (uniqueId: string) =>
  cachedImageDir + `${encodeBase64(uniqueId)}`;
const imageFileUri = (uniqueId: string) =>
  documentImageDir + `${encodeBase64(uniqueId)}`;

const storeImage = async (
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

  const fileInfo = await safeGetInfo(fileUri);

  if (directory === "permanent" && !fileInfo.exists) {
    await FileSystem.downloadAsync(url, fileUri);
  }

  if (fileInfo.exists) {
    return fileUri;
  }

  const cacheFileUri = cacheImageFileUri(uniqueId);

  const cacheFileInfo = await safeGetInfo(cacheFileUri);
  if (!cacheFileInfo.exists) {
    await FileSystem.downloadAsync(url, cacheFileUri);
  }

  return cacheFileUri;
};

const safeGetInfo = async (fileUri: string) => {
  try {
    const res = await FileSystem.getInfoAsync(fileUri);
    return res;
  } catch (err) {
    Sentry.Native.captureException(err);
    return { exists: false };
  }
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

export const deleteImage = async (uniqueId: string) => {
  const fileUri = imageFileUri(uniqueId);
  const fileInfo = await FileSystem.getInfoAsync(fileUri);
  if (fileInfo.exists) {
    await FileSystem.deleteAsync(fileUri);
    return uniqueId;
  }
};

const storeImageFromBase64 = async ({
  name,
  imageBase64,
}: {
  name: string;
  imageBase64: string;
}) => {
  const cacheFileUri = cacheImageFileUri(name);
  await FileSystem.writeAsStringAsync(cacheFileUri, imageBase64, {
    encoding: FileSystem.EncodingType.Base64,
  });
  return cacheFileUri;
};

export default { storeImage, deleteImage, storeImageFromBase64 };
