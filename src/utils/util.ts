export const convertFileToBlobURL = (file: File) => {
    const blob = new Blob([file]);

    // Create a Blob URL from the Blob object
    const blobUrl = URL.createObjectURL(blob);

    // const img = document.createElement('img');
    // img.src = blobUrl;
    // document.body.appendChild(img);

    // URL.revokeObjectURL(blobUrl);
    return blobUrl;
};