package org.nodonexus.Backend_nodoNexus.infrastructure.external;

import org.imgscalr.Scalr;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

@Service
public class ImageService {

	private static final Logger logger = LoggerFactory.getLogger(ImageService.class);
	private static final String UPLOAD_DIR = "Uploads/";
	private static final int TARGET_WIDTH = 200;
	private static final float QUALITY = 0.7f;
	private static final long MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
	private static final List<String> ALLOWED_EXTENSIONS = Arrays.asList("jpg", "jpeg", "png");

	public String saveAndCompressImage(MultipartFile file) throws IOException {
		// Validar archivo
		validateFile(file);

		// Crear directorio si no existe
		Path uploadPath = Paths.get(UPLOAD_DIR);
		if (!Files.exists(uploadPath)) {
			Files.createDirectories(uploadPath);
		}

		// Generar nombre único para la imagen
		String originalFilename = file.getOriginalFilename();
		String extension = getFileExtension(originalFilename);
		String fileName = UUID.randomUUID().toString() + "." + extension;
		Path filePath = uploadPath.resolve(fileName);

		// Leer imagen original
		BufferedImage originalImage = ImageIO.read(file.getInputStream());
		if (originalImage == null) {
			throw new IOException("El archivo no es una imagen válida");
		}

		// Comprimir la imagen
		BufferedImage compressedImage = Scalr.resize(
				originalImage,
				Scalr.Method.QUALITY,
				Scalr.Mode.FIT_TO_WIDTH,
				TARGET_WIDTH,
				Scalr.OP_ANTIALIAS);

		// Guardar la imagen comprimida
		File outputFile = filePath.toFile();
		ImageIO.write(compressedImage, extension, outputFile);

		return UPLOAD_DIR + fileName;
	}

	public void deleteImage(String imagePath) {
		if (imagePath != null && !imagePath.isEmpty()) {
			try {
				// Extraer el nombre del archivo (sin el prefijo Uploads/)
				String fileName = imagePath.startsWith(UPLOAD_DIR)
						? imagePath.substring(UPLOAD_DIR.length())
						: imagePath;
				Path filePath = Paths.get(UPLOAD_DIR, fileName);

				if (Files.exists(filePath)) {
					Files.delete(filePath);
					logger.info("Imagen eliminada: {}", filePath);
				} else {
					logger.warn("La imagen no existe: {}", filePath);
				}
			} catch (IOException e) {
				logger.error("Error al eliminar la imagen: {}", imagePath, e);
			}
		} else {
			logger.debug("No se proporcionó una ruta de imagen para eliminar");
		}
	}

	private void validateFile(MultipartFile file) throws IOException {
		if (file == null || file.isEmpty()) {
			throw new IOException("El archivo está vacío o no fue proporcionado");
		}

		if (file.getSize() > MAX_FILE_SIZE) {
			throw new IOException("El archivo excede el tamaño máximo permitido (5MB)");
		}

		String originalFilename = file.getOriginalFilename();
		if (originalFilename == null || !hasValidExtension(originalFilename)) {
			throw new IOException("Formato de archivo no permitido. Usa JPG o PNG");
		}
	}

	private boolean hasValidExtension(String filename) {
		String extension = getFileExtension(filename);
		return ALLOWED_EXTENSIONS.contains(extension.toLowerCase());
	}

	private String getFileExtension(String filename) {
		if (filename == null || !filename.contains(".")) {
			return "jpg";
		}
		return filename.substring(filename.lastIndexOf(".") + 1).toLowerCase();
	}
}