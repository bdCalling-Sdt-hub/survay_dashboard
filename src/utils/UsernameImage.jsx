import { imageUrl } from "./server";

const UsernameImage = ({ title, imageSrc }) => {
  return (
    <div className="start-center">
      {imageSrc && (
        <img
          src={imageUrl(imageSrc)}
          className="w-10 h-10 object-contain rounded-md"
          alt={title}
        />
      )}
    </div>
  );
};

export default UsernameImage;
