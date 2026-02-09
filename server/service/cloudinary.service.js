// service to upload a picture to cloudinary 
import cloudinary from '../config/cloudinary.js';

export const uploadImage = async (fileBuffer, folder = 'uploads') => {
    try {
        const result = await new Promise((resolve, reject) => {
            cloudinary.uploader
                .upload_stream(
                    {
                        folder,
                        resource_type: 'image',
                    },
                    (error, result) => {
                        if (error) return reject(error);
                        resolve(result);
                    }
                )
                .end(fileBuffer);
        });
        return result;
    } catch (error) {
        throw error;
    }
};

export const getOptimizedImageUrl = (publicId, options = {}) => {
  return cloudinary.url(publicId, {
    fetch_format: 'auto',
    quality: 'auto',
    crop: 'auto',
    gravity: 'auto',
    width: options.width || 500,
    height: options.height || 500,
  });
};
