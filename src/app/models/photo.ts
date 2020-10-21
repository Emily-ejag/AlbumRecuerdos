import {Person} from "./person"
import {Album} from "./album"
import {Section} from "./section"

export class Photo {
    id: number;
    description: string;
    name: string;
    load: Date;
    register: Date;
    urlImage: String;
    person: Person = new Person;
    sections: Section[] = [];
}
