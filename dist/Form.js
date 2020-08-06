"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

var _Errors = require("./Errors");

var _Errors2 = _interopRequireDefault(_Errors);

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _validate3 = require("validate.js");

var _validate4 = _interopRequireDefault(_validate3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// TODO: Marc Flavius - spell check
_validate4.default.validators.presence.options = { message: "- Ce champ est requis" };
_validate4.default.validators.email.options = { message: "- Le format semble incorrect" };

var Form = function () {
    function Form(data) {
        _classCallCheck(this, Form);

        this.errors = new _Errors2.default();
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
            if (_lodash2.default.isEmpty(data)) {
                return;
            }

            this.checkDuplicate(data);

            for (var field in data) {
                if (_lodash2.default.isArray(data[field])) {
                    this[field] = data[field][0].value || "";
                    Object.assign(this.constraints, _defineProperty({}, field, data[field][0].constraints));
                } else {
                    this[field] = data[field] || false;
                }
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
            return (0, _validate4.default)(_defineProperty({}, field, value), _defineProperty({}, field, this.constraints[field]));
        }
    }, {
        key: "validate",
        value: function validate(field, value) {
            var messageBag = this.validator(field, value);
            if (_lodash2.default.isEmpty(messageBag) || undefined) {
                this.errors.clear(field);
                return;
            }
            this.errors.set(field, messageBag);
            return messageBag;
        }
    }, {
        key: "update",
        value: function update(field, value) {
            if (!_lodash2.default.isEmpty(value)) {
                return;
            }
            this[field] = value;
        }
    }, {
        key: "submit",
        value: function submit(action, endpoint) {
            if (Object.keys(this.errors.data).length <= 0) {
                return _axios2.default[action.toLowerCase()](endpoint, _extends2({}, this.data()));
            }
        }
    }, {
        key: "reset",
        value: function reset() {}
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

exports.default = Form;
//# sourceMappingURL=Form.js.map