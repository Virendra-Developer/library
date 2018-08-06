export class Author {
    id: number ;
    givenName: string;
    surName: string;
    dateOfBirth: Date;
    bio: string;

    constructor(values:Object = {}) {
        Object.assign(this, values);
    }
}
