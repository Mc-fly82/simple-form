
class Errors {
    constructor() {
        this.data = {}
    }


    has(field) {
        if(field) {
        return this.data.hasOwnProperty(field);
        }
        return Object.keys(this.data).length <= 0
    }


    get(field) {
        if (this.data[field]) {
            return this.data[field][0]
        }
    }

    set(field, messageBag) {
        delete this.data[field];
        this.data[field] = messageBag
        console.log("set: ",this.data)
    }

    record(data) {
        this.data = data
    }

    clear(field) {
        if (field) {
            delete this.data[field];
            return
        }

        this.data = {};
    }
}

export default Errors
