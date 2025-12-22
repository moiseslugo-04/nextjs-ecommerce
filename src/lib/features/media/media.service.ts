import media from './media.config'
import type { UploadApiResponse } from 'cloudinary'
export async function uploadImage(file: File) {
  if (!file) return undefined
  const buffer = Buffer.from(await file.arrayBuffer())
  const result = await new Promise<UploadApiResponse>((resolve, reject) => {
    media.uploader
      .upload_stream(
        {
          folder: 'avatars',
          resource_type: 'image',
        },
        (error, result) => {
          if (error) reject(error)
          else resolve(result as UploadApiResponse)
        }
      )
      .end(buffer)
  })
  return {
    url: result.secure_url,
    publicId: result.public_id,
  }
}
