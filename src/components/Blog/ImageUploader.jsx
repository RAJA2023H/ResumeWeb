import React from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase';

const uploadImage = async (file) => {
  const storageRef = ref(storage, `blog-images/${Date.now()}_${file.name}`);
  try {
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error('Image upload failed', error);
    return null;
  }
};

export default function ImageUploader({ onImageUpload }) {
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = await uploadImage(file);
      if (imageUrl) {
        onImageUpload(imageUrl);
      }
    }
  };

  return (
    <input 
      type="file" 
      accept="image/*" 
      onChange={handleFileChange}
    />
  );
}