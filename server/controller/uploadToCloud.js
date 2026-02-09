import { getOptimizedImageUrl, uploadImage } from "../service/cloudinary.service";

const uploadToCloud = async (c) => {
    try {
        // Get file from form data (Hono's way)
        const body = await c.req.parseBody();
        const file = body.image;
        const folder = body.folder || "uploads";

        if (!file || !(file instanceof File)) {
            return c.json({ message: 'No image uploaded' }, 400);
        }

        // Convert File to Buffer for cloudinary
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Upload to cloudinary
        const result = await uploadImage(buffer, folder);

        const optimzedUrl = getOptimizedImageUrl(result.public_id);

        return c.json({
            message: "Successfully uploaded the image", 
            imageInfo: {
                imageID: result.public_id, 
                originalUrl: result.secure_url, 
                optimzedUrl
            } 
        }, 201);
     
    } catch(e) {
        console.log(e);
        return c.json({ error: "Image upload failed" }, 500);
    }
}


export default uploadToCloud