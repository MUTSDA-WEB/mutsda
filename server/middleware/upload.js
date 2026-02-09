import multer from 'multer'

const storage = multer.memoryStorage(); // records all file stored in RAM
const upload = multer({storage})
export default upload 