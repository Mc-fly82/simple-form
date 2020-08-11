import axios from "./axiosSetup";
import Errors from "./Errors"
import _ from 'lodash'
import validate from 'validate.js'

// TODO: Marc Flavius - spell check
validate.validators.presence.options = {message: "- Ce champ est requis"};
validate.validators.email.options = {message: "- Le format semble incorrect"};


class Form {
    constructor(data) {
        this.errors = new Errors()
        window.errors = this.errors
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
            this[field] = data[field]
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
            console.log("action",action, "endpoint", endpoint)
            return axios[action.toLowerCase()](endpoint, {
                ...this.data(),
            })
    }

    hasNoErrors() {
        return Object.keys(this.errors.data).length === 0;
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

    onSuccess() {
        console.log("onSuccess")
        this.errors.clear();
        this.data = {}
    }

    onFail(res) {
        console.log("onFail");
        console.log(res)

        let errors = res?.data;
        if (!!errors) {
            this.errors.record(errors);
        } else {
            this.errors.clear();
        }
    }

}

export default Form
