import {Person} from "./person"
import {Section} from "./section"

export class Match {
    id: number;
    score: number;
    start: Date;
    end: Date;
    time: number;
    person: Person = new Person;
    section: Section = new Section;
}
