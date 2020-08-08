"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axiosSetup = _interopRequireDefault(require("./axiosSetup"));

var _Errors = _interopRequireDefault(require("./Errors"));

var _lodash = _interopRequireDefault(require("lodash"));

var _validate3 = _interopRequireDefault(require("validate.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// TODO: Marc Flavius - spell check
_validate3["default"].validators.presence.options = {
  message: "- Ce champ est requis"
};
_validate3["default"].validators.email.options = {
  message: "- Le format semble incorrect"
};

var Form = /*#__PURE__*/function () {
  function Form(data) {
    _classCallCheck(this, Form);

    this.errors = new _Errors["default"]();
    window.errors = this.errors;
    this.originalData = {};
    this.proxy(data);
    this.currentStepIndex = 0;
    this.constraints = {};
  }

  _createClass(Form, [{
    key: "checkDuplicate",
    value: function checkDuplicate(data) {
      for (var field in data) {
        if (Object.keys(this.originalData).includes(field)) {
          throw new Error("key " + field + " allready exists on form Object");
        }
      }
    }
  }, {
    key: "proxy",
    value: function proxy(data) {
      if (_lodash["default"].isEmpty(data)) {
        return;
      }

      this.checkDuplicate(data);

      for (var field in data) {
        this[field] = data[field];
      }

      var originalData = Object.assign(this.originalData, data);
      delete this.originalData;
      this.originalData = originalData;
    }
  }, {
    key: "data",
    value: function data() {
      var data = Object.assign({}, this);
      delete data.originalData;
      delete data.errors;
      return data;
    }
  }, {
    key: "extends",
    value: function _extends(data) {
      this.proxy(data);
    }
  }, {
    key: "validator",
    value: function validator(field, value) {
      return (0, _validate3["default"])(_defineProperty({}, field, value), _defineProperty({}, field, this.constraints[field]));
    }
  }, {
    key: "validate",
    value: function validate(field, value) {
      var messageBag = this.validator(field, value);

      if (_lodash["default"].isEmpty(messageBag) || undefined) {
        this.errors.clear(field);
        return;
      }

      this.errors.set(field, messageBag);
      return messageBag;
    }
  }, {
    key: "update",
    value: function update(field, value) {
      if (!_lodash["default"].isEmpty(value)) {
        return;
      }

      this[field] = value;
    }
  }, {
    key: "submit",
    value: function submit(action, endpoint) {
      console.log('submited');
      return _axiosSetup["default"][action.toLowerCase()](endpoint, _objectSpread({}, this.data()));
    }
  }, {
    key: "hasNoErrors",
    value: function hasNoErrors() {
      return Object.keys(this.errors.data).length === 0;
    }
  }, {
    key: "reset",
    value: function reset() {}
  }, {
    key: "onSuccess",
    value: function onSuccess() {
      console.log("onSuccess");
      this.errors.clear();
      this.data = {};
    }
  }, {
    key: "onFail",
    value: function onFail(res) {
      var _res$data, _res$data2;

      console.log("onFail");
      console.log(res === null || res === void 0 ? void 0 : (_res$data = res.data) === null || _res$data === void 0 ? void 0 : _res$data.errors);
      var errors = res === null || res === void 0 ? void 0 : (_res$data2 = res.data) === null || _res$data2 === void 0 ? void 0 : _res$data2.errors;

      if (!!errors) {
        this.errors.record(errors);
      } else {
        this.errors.clear();
      }
    }
  }, {
    key: "isValide",
    get: function get() {
      var _this = this;

      var data = this.data();
      var bag = Object.keys(data).map(function (__) {
        return _this.validate(__, data[__]);
      }).filter(function (__) {
        return undefined !== __;
      });
      return bag.length > 0 ? bag : true;
    }
  }]);

  return Form;
}();

var _default = Form;
exports["default"] = _default;
//# sourceMappingURL=Form.js.map