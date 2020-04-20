import { response, errorResponse } from '../../server/mongo.js';

const aws = require('aws-sdk');
// const path = require('path');

aws.config.region = 'us-west-2';
// aws.config.accessKeyId = process.env.AWS_CONTENT_ACCESS_KEY_ID;
// aws.config.secretAccessKey = process.env.AWS_CONTENT_ACCESS_KEY;
// aws.config.update({limits: {fileSize: 1000000, files: config.MAX_FILE_COUNT || 6}

const S3_BUCKET = process.env.S3_CONTENT_BUCKET;

const fileType= 'image/jpeg';
const fileExtension = '.jpg';

// export async function get(req, res, next) {
export async function post(req, res, next) {
	const s3 = new aws.S3();

	aws.config.aws_access_key_id = process.env.AWS_CONTENT_ACCESS_KEY_ID;
	aws.config.aws_secret_access_key = process.env.AWS_CONTENT_ACCESS_KEY;

	const options = req.body;

	// const fileName = options.fileName;
	// const fileType = options.fileType;
	const uploadType = options.uploadType;
	const itemId = options.itemId;
	const itemIndex = options.itemIndex;

	// const fileName = req.query['file-name'];
	// const fileType = req.query['file-type'];
	// const uploadType = req.query['upload-type'];
	// const itemId = req.query['item-id'];
	// const itemIndex = req.query['item-index'];

	const folderIndentifier = 'content/';

	let folder = '';

	// validate itemId
	// validate itemIndex

	let newItemFilename = itemId;

	if (uploadType === 'projectHeader') {
		folder = 'projects/';
		newItemFilename += '-header';
	} else if (uploadType === 'projectDetail') {
		folder = 'projects/';
		newItemFilename += '-detail-' + itemIndex;
	} else if (uploadType === 'userProfile') {
		folder = 'users/';
		newItemFilename += '-profile';
	} else if (uploadType === 'userCover') {
		folder = 'users/';
		newItemFilename += '-cover';
	} else {
		errorResponse(res, {}, {errorMsg: 'invalid upload-type'});
	}

	// const extension = path.extname(fileName);

	newItemFilename += fileExtension; // extension;

	// 'Missing credentials in config, if using AWS_CONFIG_FILE, set AWS_SDK_LOAD_CONFIG=1',
	const s3Params = {
	  Bucket: S3_BUCKET,
	  Key: folder + newItemFilename,
	  Expires: 60,
	  ContentType: fileType,
	  ACL: 'public-read'
	};

	const cacheBuster = '?c=' + Math.floor(Math.random() * 9999999);

	s3.getSignedUrl('putObject', s3Params, (err, data) => {
		if (err) {
			console.log('putObject error', err);
			errorResponse(res, {}, {errorMsg: 'putObject error'});
		}

		const returnData = {
			signedRequest: data,
			url: folderIndentifier + folder + newItemFilename + cacheBuster,
			// url: `https://${S3_BUCKET}.${aws.config.region}.s3.amazonaws.com/${fileName}`
		};
		response(res, returnData);
	});
}