import * as FileSystem from "expo-file-system";

const cachedImageDir = FileSystem.cacheDirectory + "imageDir/";
const documentImageDir = FileSystem.documentDirectory + "imageDir/";
const cacheImageFileUri = (uniqueId: string) => cachedImageDir + `${uniqueId}`;
const imageFileUri = (uniqueId: string) => documentImageDir + `${uniqueId}`;

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
  } catch {
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

export default { storeImage, deleteImage };
