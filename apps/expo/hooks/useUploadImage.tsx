import { CLOUDINARY_UPLOAD_PRESET, CLOUDINARY_URL } from '@env';
import axios from 'axios';
import { useCallback, useState } from 'react';
import type { SelectedImage } from '@hooks/usePickImage';
import { Alert } from 'react-native';

const useUploadImage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [uri, setUri] = useState<string>();

  const uploadImage = useCallback(async (data: SelectedImage['base64Img']) => {
    try {
      setIsLoading(true);
      setIsSuccess(false);
      setUri(undefined);

      const res = await axios.post<{ url: string }>(
        CLOUDINARY_URL,

        { file: data, upload_preset: CLOUDINARY_UPLOAD_PRESET },
        {
          headers: {
            'content-type': 'application/json',
          },
        },
      );
      setUri(res.data.url);
      setIsSuccess(true);
      return res.data.url;
    } catch (err) {
      Alert.alert('Hubo un error al subir la imagen');
      throw new Error(err as string);
    }
    setIsLoading(false);
  }, []);
  return { isLoading, uri, uploadImage, isSuccess };
};

export default useUploadImage;
