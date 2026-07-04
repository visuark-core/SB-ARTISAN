const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'sb-artisan',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadImages = async (req, res, next) => {
  const { images } = req.body; // Array of base64 data URLs

  if (!images || !Array.isArray(images) || images.length === 0) {
    res.status(400);
    return next(new Error('No images provided. Please provide an array of base64 image strings.'));
  }

  try {
    const uploadPromises = images.map(async (base64Str) => {
      // Cloudinary upload
      const result = await cloudinary.uploader.upload(base64Str, {
        folder: 'sb-artisan-commissions',
        resource_type: 'image'
      });
      return {
        url: result.secure_url,
        public_id: result.public_id
      };
    });

    const uploaded = await Promise.all(uploadPromises);

    res.status(200).json({
      success: true,
      message: `${uploaded.length} images uploaded successfully`,
      data: uploaded
    });
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    res.status(500);
    next(new Error(error.message || 'Failed to upload images to Cloudinary'));
  }
};

module.exports = { uploadImages };
