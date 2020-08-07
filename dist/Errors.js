"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Errors = function () {
    function Errors() {
        _classCallCheck(this, Errors);

        this.data = {};
    }

    _createClass(Errors, [{
        key: "has",
        value: function has(field) {
            return this.data.hasOwnProperty(field);
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
            this.data[field] = messageBag[field];
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
    }, {
        key: "onSuccess",
        value: function onSuccess() {
            this.data = {};
        }
    }, {
        key: "onFail",
        value: function onFail(error) {
            alert(JSON.stringify(error));
            this.errors.clear();
            if (error.message) {
                this.errors.record(error.message);
            } else {
                this.errors.record({
                    server: ["Une erreur est survenue. Veuillez raffréchire la page."]
                });
            }
        }
    }]);

    return Errors;
}();

exports.default = Errors;
//# sourceMappingURL=Errors.js.map