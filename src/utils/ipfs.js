import pinataSDK from '@pinata/sdk';
const pinata = pinataSDK('42924856eb211fae1d9a', 'f87c7b3002645f71a047cd06be0918b3252fad7e8093607f660e3094a526fb0d');

export const getIpfsHash = async (data) => {
  const result = await pinata.pinJSONToIPFS(data, null);
  const hash = result.IpfsHash;
  return hash;
};

export const getIpfsHashFromFile = async (file) => {
  return new Promise((resolve, reject) => {
    var headers = new Headers();
    headers.append("pinata_api_key", "42924856eb211fae1d9a");
    headers.append("pinata_secret_api_key", "f87c7b3002645f71a047cd06be0918b3252fad7e8093607f660e3094a526fb0d");
    var formdata = new FormData();
    formdata.append("file", file);
    const requestOptions = {
      method: 'POST',
      headers: headers,
      body: formdata
    };
    fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", requestOptions)
      .then(r => r.json())
      .then(r => {
        resolve(r.IpfsHash)
      })
      .catch(error => reject(error))
  })
};
