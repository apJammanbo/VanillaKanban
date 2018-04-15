import { makeElement } from '../util';

class Tag {
    constructor(type) {
        this.type = type;
    }

    render() {
        return makeElement(this.type);
    }
}

export default Tag;