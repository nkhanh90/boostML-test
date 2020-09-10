export const baseURL = process.env.REACT_APP_API_URL;
export const basePath = `${process.env.REACT_APP_API_PREFIX}/?key=${process.env.REACT_APP_API_KEY}&`;
export const apiURI = baseURL + basePath;

function getXMLResp(url) {
  var xhr = new XMLHttpRequest();

  return new Promise((resolve, reject) => {
    xhr.open('GET', url);
    xhr.onload = () => {
      if (xhr.status === 200) {
        resolve(xhr.response);
      } else {
        reject(xhr);
      }
    };
    xhr.send();
  });
}

export default url => {
  return getXMLResp(apiURI + url).then(res => JSON.parse(res));
};
