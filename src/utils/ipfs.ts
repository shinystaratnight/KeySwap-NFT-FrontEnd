// const ipfsClient = require('ipfs-api');
// const ipfs = new ipfsClient({
//   host: 'ipfs.infura.io',
//   port: 5001,
//   protocol: 'https'
// });

// export const getIpfsHash = async (data) => {
//   const result = await ipfs.files.add(data);
//   const hash = result[0].hash;
//   return hash;
// };

// export function readFileAsync(file) {
//   return new Promise((resolve, reject) => {
//     let reader = new FileReader();

//     reader.onload = () => {
//       resolve(Buffer.from(reader.result));
//     };

//     reader.onerror = reject;

//     reader.readAsArrayBuffer(file);
//   })
// }


import pinataSDK from '@pinata/sdk';
const pinata = pinataSDK('aeb925dbe49b0476ecb1', 'bae84620cbb59cc3986b7577a13d22dba464c28e29a9a60466c8667d319600c9');

export const getIpfsHash = async (data) => {
  const result = await pinata.pinJSONToIPFS(data, null);
  const hash = result.IpfsHash;
  return hash;
};

export const getIpfsHashFromFile = async (file) => {
  return new Promise((resolve, reject) => {
    var headers = new Headers();
    headers.append("pinata_api_key", "9adbfe736bca63307f7f");
    headers.append("pinata_secret_api_key", "35552b1ed32360bdb48707a6a63e2ff0bafbe322e3ebefa4a03dc545a6b3d1ff");
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
