import axios from "axios";
import Errors from "./Errors"
import _ from 'lodash'
import validate from 'validate.js'

// TODO: Marc Flavius - spell check
validate.validators.presence.options = {message: "- Ce champ est requis"};
validate.validators.email.options = {message: "- Le format semble incorrect"};


class Form {
    constructor(data) {
        this.errors = new Errors()
        this.originalData = {}
        this.proxy(data);
        this.currentStepIndex = 0
        this.constraints = {}
    }

    checkDuplicate(data) {
        for (let field in data) {
            if (Object.keys(this.originalData).includes(field)) {
                throw new Error("key " + field + " allready exists on form Object")
            }
        }
    }

    proxy(data) {
        if (_.isEmpty(data)) {
            return;
        }

        this.checkDuplicate(data)

        for (let field in data) {
            if (_.isArray(data[field])) {
                this[field] = data[field][0].value || "";
                Object.assign(this.constraints, {[field]: data[field][0].constraints})
            } else {
                this[field] = data[field] || false
            }
        }

        let originalData = Object.assign(this.originalData, data);
        delete this.originalData;
        this.originalData = originalData
    }

    data() {
        let data = Object.assign({}, this);
        delete data.originalData;
        delete data.errors;
        return data;
    }

    extends(data) {
        this.proxy(data)
    }

    validator(field, value) {
        return validate({[field]: value}, {[field]: this.constraints[field]});
    }

    validate(field, value) {
        let messageBag = this.validator(field, value);
        if (_.isEmpty(messageBag) || undefined) {
            this.errors.clear(field);
            return;
        }
        this.errors.set(field, messageBag);
        return messageBag;
    }


    update(field, value) {
        if (!_.isEmpty(value)) {
            return
        }
        this[field] = value;
    }

    submit(action, endpoint) {
        if (Object.keys(this.errors.data).length <= 0) {
            return axios[action.toLowerCase()](endpoint, {
                ...this.data(),
            })
        }
    }

    get isValide() {
        let data = this.data();

        let bag = Object.keys(data)
            .map(__ => this.validate(__, data[__]))
            .filter(__ => undefined !== __);

        return bag.length > 0 ? bag : true;
    }

    reset() {

    }

}

export default Form
