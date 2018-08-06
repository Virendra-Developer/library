export class Chapter {
    title: string;
    startPage: number;
    numberOfPages:  number;

    constructor(values:Object = {}) {
        Object.assign(this, values);
    }
}
