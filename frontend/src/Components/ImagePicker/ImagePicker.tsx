import React, { ChangeEvent } from "react";

interface ImagePickerProps {
  image: string;
  onImageChange: (image: string) => void;
}

const ImagePicker: React.FC<ImagePickerProps> = ({ image, onImageChange }) => {
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="image-picker">
      <input
        type="file"
        accept="image/*"
        id="image-upload"
        onChange={handleImageChange}
      />
      <label htmlFor="image-upload">Upload Image</label>
      {image && <img src={image} alt="Selected" />}
    </div>
  );
};

export default ImagePicker;
