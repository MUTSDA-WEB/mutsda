import { getOptimizedImageUrl, uploadImage } from "../service/cloudinary.service";

const uploadToCloud = async (c) => {
    try{
        if (!c.req.file()) {
            return c.json({ message: 'No image uploaded' }, 400);
        }

      // upload original image 
      const result = await uploadImage(c.req.file.buffer, "events");

      const optimzedUrl = getOptimizedImageUrl(result.public_id)

        return c.json({
            message: "Successfully uploaded the image", 
            imageInfo: {
                imageID: result.public_id, 
                originalUrl: result.secure_url, 
                optimzedUrl
            } 
        }, 201)

    }catch(e) {
        console.log(e);
        c.json({error: "Image upload failed"}, 500)
    }
}


export default uploadToCloud