/* eslint-disable arrow-body-style */
const imageToBase64 = async (image) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = (event) => {
      const base64String = event.target.result.split(',')[1];
      resolve(base64String);
    };

    reader.readAsDataURL(image);

    setTimeout(() => {
      reject('Something went wrong coverting you image to base64');
    }, 5000);
  });
};

export { imageToBase64 };
