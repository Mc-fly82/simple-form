"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Errors = /*#__PURE__*/function () {
  function Errors() {
    _classCallCheck(this, Errors);

    this.data = {};
  }

  _createClass(Errors, [{
    key: "has",
    value: function has(field) {
      if (field) {
        return this.data.hasOwnProperty(field);
      }

      return Object.keys(this.data).length <= 0;
    }
  }, {
    key: "get",
    value: function get(field) {
      if (this.data[field]) {
        return this.data[field][0];
      }
    }
  }, {
    key: "set",
    value: function set(field, messageBag) {
      delete this.data[field];
      this.data[field] = messageBag;
      console.log("set: ", this.data);
    }
  }, {
    key: "record",
    value: function record(data) {
      this.data = data;
    }
  }, {
    key: "clear",
    value: function clear(field) {
      if (field) {
        delete this.data[field];
        return;
      }

      this.data = {};
    }
  }]);

  return Errors;
}();

var _default = Errors;
exports["default"] = _default;
//# sourceMappingURL=Errors.js.map