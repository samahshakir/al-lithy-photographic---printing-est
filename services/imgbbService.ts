const IMGBB_API_KEY = import.meta.env.VITE_IMGBB_API_KEY;

export const uploadImage = async (imageFile: File): Promise<string> => {
  const formData = new FormData();
  formData.append('image', imageFile);
  formData.append('key', IMGBB_API_KEY);

  const response = await fetch('https://api.imgbb.com/1/upload', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) throw new Error('Image upload failed');

  const data = await response.json();
  return data.data.url;
};

// Upload multiple images (up to 4)
export const uploadMultipleImages = async (imageFiles: File[]): Promise<string[]> => {
  const uploadPromises = imageFiles.map(file => uploadImage(file));
  return Promise.all(uploadPromises);
};
