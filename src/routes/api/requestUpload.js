import { response, errorResponse } from '../../server/mongo.js';

const aws = require('aws-sdk');

aws.config.region = 'us-west-2';
// aws.config.aws_access_key_id = process.env.AWS_CONTENT_ACCESS_KEY_ID;
// aws.config.aws_secret_access_key = process.env.AWS_CONTENT_ACCESS_KEY;

const S3_BUCKET = process.env.S3_CONTENT_BUCKET;

export async function get(req, res, next) {
	const s3 = new aws.S3();
	console.log('requestUpload s3');
	console.log('aws.config.aws_access_key_id ', aws.config.aws_access_key_id);
	console.log('S3_BUCKET ', S3_BUCKET);

	aws.config.aws_access_key_id = process.env.AWS_CONTENT_ACCESS_KEY_ID;
	aws.config.aws_secret_access_key = process.env.AWS_CONTENT_ACCESS_KEY;

	const fileName = req.query['file-name'];
	const fileType = req.query['file-type'];

	const folderIndentifier = 'content/';
	const folder = 'projects/';

	// 'Missing credentials in config, if using AWS_CONFIG_FILE, set AWS_SDK_LOAD_CONFIG=1',
	const s3Params = {
	  Bucket: S3_BUCKET,
	  Key: folder + fileName,
	  Expires: 60,
	  ContentType: fileType,
	  ACL: 'public-read'
	};

	s3.getSignedUrl('putObject', s3Params, (err, data) => {
		console.log('requestUpload result');

		if (err) {
			console.log('putObject error', err);
			errorResponse(res, {}, {errorMsg: 'putObject error'});
		}

		const returnData = {
			signedRequest: data,
			url: folderIndentifier + folder + fileName, // `${fileName}`
			// url: `https://${S3_BUCKET}.${aws.config.region}.s3.amazonaws.com/${fileName}`
		};
		response(res, returnData); // {success: true});
	});
}