"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
window.axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  // Do something with response error
  return Promise.reject(error.response);
});
var _default = window.axios;
exports["default"] = _default;
//# sourceMappingURL=axiosSetup.js.map