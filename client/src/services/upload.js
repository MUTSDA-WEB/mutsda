import Ax from "../helpers/axios";

/**
 * Upload an image to the server (which uploads to Cloudinary)
 * @param {File} file - The image file to upload
 * @param {string} folder - The folder to upload to (e.g., "events", "avatars")
 * @returns {Promise<{imageID: string, originalUrl: string, optimzedUrl: string}>}
 */
export async function uploadImage(file, folder = "events") {
   const formData = new FormData();
   formData.append("image", file);
   formData.append("folder", folder);

   const response = await Ax.post("/image/upload", formData, {
      headers: {
         "Content-Type": "multipart/form-data",
      },
   });

   return response.data.imageInfo;
}

/**
 * Upload avatar image for user profile
 * @param {File} file - The avatar image file
 * @returns {Promise<{imageID: string, originalUrl: string, optimzedUrl: string}>}
 */
export async function uploadAvatar(file) {
   return uploadImage(file, "avatars");
}

/**
 * Upload event image
 * @param {File} file - The event image file
 * @returns {Promise<{imageID: string, originalUrl: string, optimzedUrl: string}>}
 */
export async function uploadEventImage(file) {
   return uploadImage(file, "events");
}

export default { uploadImage, uploadAvatar, uploadEventImage };
