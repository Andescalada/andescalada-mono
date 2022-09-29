import { StorageService } from "@andescalada/api/schemas/image";
import { CLOUDINARY_UPLOAD_PRESET, CLOUDINARY_URL } from "@env";
import type { SelectedImage } from "@hooks/usePickImage";
import axios from "axios";
import { useCallback, useState } from "react";
import { Alert } from "react-native";

export const parseImageResponse = (img: CloudinaryResponse) => ({
  assetId: img.asset_id,
  format: img.format,
  height: img.height,
  width: img.width,
  publicId: img.public_id,
  storageService: StorageService.Cloudinary,
  url: img.secure_url,
  version: img.version,
  bytes: img.bytes,
});

const useUploadImage = ({ parsed = true }: { parsed?: boolean } = {}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [uri, setUri] = useState<string>();

  const uploadImage = useCallback(
    async (data: SelectedImage["base64Img"]) => {
      try {
        setIsLoading(true);
        setIsSuccess(false);
        setUri(undefined);

        const res = await axios.post<CloudinaryResponse>(
          CLOUDINARY_URL,

          { file: data, upload_preset: CLOUDINARY_UPLOAD_PRESET },
          {
            headers: {
              "content-type": "application/json",
            },
          },
        );
        setUri(res.data.url);
        setIsSuccess(true);
        setIsLoading(false);
        return parseImageResponse(res.data);
      } catch (err) {
        Alert.alert("Hubo un error al subir la imagen");
        setIsLoading(false);
        throw new Error(err as string);
      }
    },
    [parsed],
  );
  return { isLoading, uri, uploadImage, isSuccess };
};

export default useUploadImage;

export interface CloudinaryResponse {
  access_mode: string;
  asset_id: string;
  bytes: number;
  created_at: "2022-09-15T17:46:30Z";
  eager: [
    {
      bytes: number;
      format: string;
      height: number;
      secure_url: string;
      transformation: string;
      url: string;
      width: number;
    },
  ];
  etag: string;
  folder: "andescalada-app-dev";
  format: string;
  height: number;
  placeholder: false;
  public_id: string;
  resource_type: string;
  secure_url: string;
  signature: string;
  tags: string[];
  type: string;
  url: string;
  version: number;
  version_id: string;
  width: number;
}
