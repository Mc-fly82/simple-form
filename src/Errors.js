
class Errors {
    constructor() {
        this.data = {}
    }


    has(field) {
        return this.data.hasOwnProperty(field);
    }


    get(field) {
        if (this.data[field]) {
            return this.data[field][0]
        }
    }

    set(field, messageBag) {
        delete this.data[field];
        this.data[field] = messageBag[field]
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

    onSuccess() {
        this.data = {}
    }

    onFail(error) {
        alert(JSON.stringify(error))
        this.errors.clear()
        if (error.message) {
            this.errors.record(error.message);
        } else {
            this.errors.record({
                server: ["Une erreur est survenue. Veuillez raffréchire la page."],
            })
        }
    }


}

export default Errors
