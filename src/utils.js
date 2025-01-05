const imageFiles = import.meta.glob('../assets/**/*.{png,jpg,jpeg,svg}', { eager: true });

export const getImageUrl = (path) => {
  const imageFile = Object.entries(imageFiles).find(([key]) => key.includes(path));
  return imageFile ? imageFile[1].default : '';
};