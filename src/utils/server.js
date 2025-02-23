export const url = `http://209.97.150.2:5000`;
export const imageUrl = (image) => {
  return image
    ? image?.startsWith(`http`)
      ? image
      : image?.startsWith('/')
      ? `${url}${image}`
      : `${url}/${image}`
    : `https://placehold.co/400`;
};
