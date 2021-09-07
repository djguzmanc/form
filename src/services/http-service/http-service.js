import axios from 'axios';

const http = axios.create({
  baseURL: 'http://localhost:3001',
  responseType: 'json',
});

http.interceptors.response.use(res => {
  let urlData = `%c ${res.config.method.toUpperCase()} %c ${res.status} %c ${res.config.url}`
  console.log(
    urlData,
    'background: #e47c10; color: #fff',
    `background: #237719; color: #fff`,
    'background: #1c5486; color: #fff',
  );
  console.log('%c FULL RESPONSE ', 'background: #af3a3a; color: #fff', res);
  return res;
}, err => {
  console.log(err);
  return Promise.reject(err);
});

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  post: http.post,
  put: http.put,
  delete: http.delete,
  get: http.get,
  patch: http.patch,
  request: http.request,
};
