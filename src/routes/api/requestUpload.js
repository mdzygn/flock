import { response, errorResponse } from '../../server/mongo.js';

const aws = require('aws-sdk');
const path = require('path');

aws.config.region = 'us-west-2';
// aws.config.accessKeyId = process.env.AWS_CONTENT_ACCESS_KEY_ID;
// aws.config.secretAccessKey = process.env.AWS_CONTENT_ACCESS_KEY;
// aws.config.update({limits: {fileSize: 1000000, files: config.MAX_FILE_COUNT || 6}

const S3_BUCKET = process.env.S3_CONTENT_BUCKET;

// const fileType= 'image/jpeg';

export async function post(req, res, next) {
	const s3 = new aws.S3();

	// aws.config.aws_access_key_id = process.env.AWS_CONTENT_ACCESS_KEY_ID;
	// aws.config.aws_secret_access_key = process.env.AWS_CONTENT_ACCESS_KEY;

	const options = req.body;

	const uploadType = options.uploadType;
	const itemId = options.itemId;
	const itemIndex = options.itemIndex;

	const fileType = options.fileType;

	let fileExtension;
	switch (fileType) {
		case 'image/jpeg':
			fileExtension = '.jpg';
			break;
		case 'image/gif':
			fileExtension = '.gif';
			break;
		case 'image/png':
			fileExtension = '.png';
			break;
		default:
			errorResponse(res, {}, {errorMsg: 'invalid file-type'});
			return;
	}

	// const fileName = req.query['file-name'];
	// const fileType = req.query['file-type'];

	// const uploadType = req.query['upload-type'];
	// const itemId = req.query['item-id'];
	// const itemIndex = req.query['item-index'];

	const folderIndentifier = 'content/';

	let folder = '';

	// TODO: validate itemId
	// TODO: validate itemIndex

	let newItemFilename = itemId;
	let newItemThumbFilename = null;

	let allowedFileType = null;

	if (uploadType === 'projectHeader') {
		allowedFileType = 'image/jpeg';
		folder = 'projects/';
		newItemFilename += '-header';
		// newItemThumbFilename = newItemFilename + '-thumb';
	} else if (uploadType === 'projectDetail') {
		allowedFileType = 'image/jpeg';
		folder = 'projects/';
		newItemFilename += '-detail-' + itemIndex;
	} else if (uploadType === 'userProfile') {
		folder = 'users/';
		newItemFilename += '-profile';
		// newItemThumbFilename = newItemFilename + '-thumb';
	} else if (uploadType === 'userCover') {
		allowedFileType = 'image/jpeg';
		folder = 'users/';
		newItemFilename += '-cover';
	} else if (uploadType === 'post') {
		folder = 'posts/';
	} else if (uploadType === 'message') {
		folder = 'messages/';
	} else {
		errorResponse(res, {}, {errorMsg: 'invalid upload-type'});
		return;
	}

	if (allowedFileType && fileType !== allowedFileType) {
		errorResponse(res, {}, {errorMsg: 'invalid file-type'});
		return;
	}

	// const extension = path.extname(fileName);
	const extension = fileExtension;

	newItemThumbFilename = newItemFilename + '-thumb';
	newItemFilename += extension;

	const s3Params = {
		Bucket: S3_BUCKET,
		Key: folder + newItemFilename,
		Expires: 60,
		ContentType: fileType,
		ACL: 'public-read'
	};
	let s3ThumbParams;

	if (newItemThumbFilename) {
		newItemThumbFilename += extension; // extension;

		s3ThumbParams = {
			Bucket: S3_BUCKET,
			Key: folder + newItemThumbFilename,
			Expires: 60,
			ContentType: fileType,
			ACL: 'public-read'
		};
	}

	const cacheBuster = '?c=' + Math.floor(Math.random() * 9999999);

	s3.getSignedUrl('putObject', s3Params, (err, data) => {
		if (err) {
			console.log('putObject error', err);
			errorResponse(res, {}, {errorMsg: 'image putObject error'});
			return;
		}

		const returnData = {
			signedRequest: data,
			url: folderIndentifier + folder + newItemFilename + cacheBuster,
			// url: `https://${S3_BUCKET}.${aws.config.region}.s3.amazonaws.com/${fileName}`
		};
		if (newItemThumbFilename) {
			s3.getSignedUrl('putObject', s3ThumbParams, (err, data) => {
				if (err) {
					console.log('putObject error', err);
					errorResponse(res, {}, {errorMsg: 'image thumb putObject error'});
					return;
				}

				returnData.thumbSignedRequest = data,
				returnData.thumbUrl = folderIndentifier + folder + newItemThumbFilename + cacheBuster;

				response(res, returnData);
			});
		} else {
			response(res, returnData);
		}
	});

	// sharp(file)
	//     .rotate()
	//     .resize(config.UPLOAD_MAX_WIDTH, config.UPLOAD_MAX_HEIGHT, {
	//         fit: 'contain'
	//     })
	//     .toBuffer()
	//     .then(async (buffer) => {
	//         await tick();
	//         getSignedRequest(buffer);
	//     });
}