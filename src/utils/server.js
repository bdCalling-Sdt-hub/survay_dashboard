export const url = `http://10.0.60.137:4000`;
export const imageUrl = (image) => {
  return image
    ? image?.startsWith(`http`)
      ? image
      : image?.startsWith("/")
      ? `${url}${image}`
      : `${url}/${image}`
    : `https://placehold.co/400`;
};

export const stripHtmlTags = (html) => {
  return html.replace(/<\/?[^>]+(>|$)/g, "");
};
