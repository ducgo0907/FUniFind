import { v2 as cloudinary } from 'cloudinary'
import multiparty from 'multiparty'
import { imageRepository } from '../repositories/index.js';

const upload = async (req, res) => {
	const urls = [];
	const form = new multiparty.Form({ maxFieldsSize: "20MB" });
	form.parse(req, async function (err, fields, files) {
		const options = {
			use_filename: true,
			unique_filename: false,
			overwrite: true,
			folder: "/test",
		};
		const { postId } = fields;
		const filesData = fields.file;
		for (let i = 0; i < filesData.length; i++) {
			const imagePath = filesData[i];
			try {
				const result = await cloudinary.uploader.upload(imagePath, options);
				urls.push(result.secure_url);
				// Tao moi anh
				imageRepository.create({ url: result.secure_url, postID: postId })
				if (i === filesData.length - 1 && !!result.secure_url) {
					return res.status(200).json({ data: urls });
				}
			} catch (error) {
				console.error(error);
				return res.status(400);
			}
		}
	});
}

export default {
	upload
}