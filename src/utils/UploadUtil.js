import ImageTools from '../libs/ImageTools';

import api from '../api';

function uploadImage(options) {
    const {
        uploadType,
        itemId,
        itemIndex,

        imageSettings,
        thumbSettings,

        onUploading,
        onImageUpdated,
        onComplete,
        onError,
    } = options;

    const uploadInput = document.createElement('input');
    uploadInput.type = "file";
    uploadInput.accept = "image/*";
    uploadInput.hidden = true;
    uploadInput.addEventListener('change', onUploadFileSelect);
    uploadInput.style = "display: none";
    document.body.appendChild(uploadInput);
    uploadInput.click();

    async function onUploadFileSelect(event) {
        if (event && event.target && event.target.files && event.target.files.length) {
            var file = event.target.files[0];

            // var fileName = file.name;
            // image = fileName;

            // imageSrc = EmptyImage; // force empty image to load first

            onUploading();

            // await tick();
            const imageTools = new ImageTools();
            imageTools.resize(file, imageSettings).then(async (imageFile) => {
                // imageSrc = URL.createObjectURL(imageFile);

                onImageUpdated(imageFile);

                imageTools.resize(file, thumbSettings).then(async (thumbFile) => {
                    getSignedRequest(imageFile, thumbFile);
                });
            });
        }
    }

    function getSignedRequest(imageFile, thumbFile){
        if (!itemId) {
            console.error('no itemId provided for image selector');
            return;
        }

        const options = {
            uploadType,
            itemId,
            itemIndex,
        };

        api.requestUpload(options).then((response) => {
            if (response.signedRequest) {
                uploadFile(imageFile, thumbFile, response);
            } else {
                onError();
            }
        }).catch((error) => {
            onError(error);
        })
    }

    function uploadFile(imageFile, thumbFile, response) {
        const imageSignedRequest = response.signedRequest;
        const imageUrl = response.url;

        const request = new XMLHttpRequest();
        request.open('PUT', imageSignedRequest);
        request.onreadystatechange = () => {
            if (request.readyState === 4){
                if (request.status === 200){
                    onComplete(imageUrl);
                } else {
                    onError();
                }
            }
        };
        request.send(imageFile);

        if (response.thumbSignedRequest && thumbFile) {
            const thumbSignedRequest = response.thumbSignedRequest;

            const thumbRequest = new XMLHttpRequest();
            thumbRequest.open('PUT', thumbSignedRequest);
            thumbRequest.onreadystatechange = () => {
                if (thumbRequest.readyState === 4){
                    if (thumbRequest.status !== 200){
                        console.error('Could not upload thumb');
                    }
                }
            };
            thumbRequest.send(thumbFile);
        }
    }
}

const UploadUtil = {
    uploadImage,
}

export default UploadUtil;