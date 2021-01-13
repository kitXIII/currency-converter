import { REQUEST_STATUSES } from 'constants/index';

class Status {
    constructor(statusName) {
        this.name = statusName;
    }

    toString() {
        return this.name;
    }

    valueOf() {
        return this.name;
    }

    get isInit() {
        return this.name === REQUEST_STATUSES.INIT;
    }

    get isSuccess() {
        return this.name === REQUEST_STATUSES.SUCCESS;
    }

    get isPending() {
        return this.name === REQUEST_STATUSES.PENDING;
    }

    get isFailure() {
        return this.name === REQUEST_STATUSES.FAILURE;
    }
}

// Request
const selectStatusHelper = (selector) => (state) => {
    const status = selector(state);
    return new Status(status);
};

export default selectStatusHelper;
