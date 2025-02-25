import deffImage from '../assets/def.png';
export const url = import.meta.env.VITE_PUBLIC_API_URL;

export const imageUrl = (image) => {
  return image
    ? image?.startsWith(`http`)
      ? image
      : image?.startsWith('/')
      ? `${url}${image}`
      : `${url}/${image}`
    : deffImage;
};
