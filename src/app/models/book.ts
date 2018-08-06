import { Author } from "./author";
import { Chapter } from "./chapter";

export class Book {
    id: number;
    title: string;
    author: Author;
    publisher: string;
    edition: string;
    ISBN: number;
    publishingDate: Date;
    chapters: Chapter[];

    constructor(values:Object = {}) {
        Object.assign(this, values);
    }
    
}
