export const MAX_FILE_SIZE_BYTES = 4.5 * 1024 * 1024; // 4.5MB Vercel serverless body limit
export const MAX_FILE_SIZE_MB = 4.5;

/**
 * Validates whether a file is within the maximum size limit for serverless functions.
 */
export function validateFileSize(
  file: File,
  maxSizeBytes: number = MAX_FILE_SIZE_BYTES,
): string | null {
  if (file.size > maxSizeBytes) {
    return `File size (${(file.size / (1024 * 1024)).toFixed(1)}MB) exceeds the ${MAX_FILE_SIZE_MB}MB limit. Please upload a smaller file.`;
  }
  return null;
}

/**
 * Compresses an image file in the browser using HTML Canvas.
 * If the file is not an image or already under 800KB, it returns the original file.
 * Resizes images exceeding maxDimension and compresses to JPEG/WebP with specified quality.
 */
export async function compressImageFile(
  file: File,
  maxDimension: number = 1600,
  quality: number = 0.85,
): Promise<File> {
  // If not a standard image type or already under 800KB, return as-is
  if (!file.type.startsWith("image/") || file.size < 800 * 1024) {
    return file;
  }

  // Skip SVG or GIF animations to prevent corrupting them
  if (file.type === "image/svg+xml" || file.type === "image/gif") {
    return file;
  }

  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;

      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Calculate aspect ratio preserving dimensions
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(file);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);

        // Keep output format matching input, defaulting to image/jpeg for photos
        const outputType = file.type === "image/png" ? "image/png" : "image/jpeg";

        canvas.toBlob(
          (blob) => {
            if (!blob || blob.size >= file.size) {
              // If compressed blob isn't smaller, keep original
              resolve(file);
              return;
            }

            const compressedFile = new File([blob], file.name, {
              type: outputType,
              lastModified: Date.now(),
            });

            resolve(compressedFile);
          },
          outputType,
          quality,
        );
      };

      img.onerror = () => resolve(file);
    };

    reader.onerror = () => resolve(file);
  });
}
