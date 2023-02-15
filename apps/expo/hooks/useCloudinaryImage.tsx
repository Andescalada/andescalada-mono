import { StorageService } from "@andescalada/api/schemas/image";
import { trpc } from "@andescalada/utils/trpc";
import type { SelectedImage } from "@hooks/usePickImage";
import Env from "@utils/env";
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

const useCloudinaryImage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [uri, setUri] = useState<string>();

  const { data: signatureData } = trpc.images.sign.useQuery(
    { uploadPreset: Env.CLOUDINARY_UPLOAD_PRESET },
    {
      staleTime: 1000 * 60 * 59, // 59 minutes
    },
  );

  const uploadImage = useCallback(
    async (data: SelectedImage["base64Img"]) => {
      try {
        setIsLoading(true);
        setIsSuccess(false);
        setUri(undefined);
        if (!signatureData) throw new Error("No signature data");

        const res = await axios.post<CloudinaryResponse>(
          Env.CLOUDINARY_URL + "/image/upload",
          {
            file: data,
            upload_preset: Env.CLOUDINARY_UPLOAD_PRESET,
            api_key: Env.CLOUDINARY_API_KEY,
            ...signatureData,
          },
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
        console.log(err);
        throw new Error(err as string);
      }
    },
    [signatureData],
  );

  const destroyImage = useCallback(async (publicId: string) => {
    try {
      setIsLoading(true);
      const res = await axios.post<DestroyResponse>(
        Env.CLOUDINARY_URL + "/image/destroy",
        { publicId, ...signatureData },
        {
          headers: {
            "content-type": "application/json",
          },
        },
      );
      setIsLoading(false);
      return res;
    } catch (err) {
      Alert.alert("Hubo un error al borrar la imagen");
      setIsLoading(false);
      throw new Error(err as string);
    }
  }, []);

  return { isLoading, uri, uploadImage, isSuccess, destroyImage };
};

export default useCloudinaryImage;

export interface CloudinaryResponse {
  access_mode: string;
  asset_id: string;
  bytes: number;
  created_at: Date;
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
  folder: string;
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

export interface DestroyResponse {
  result: "ok";
}
