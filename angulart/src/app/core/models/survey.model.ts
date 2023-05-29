import { Question } from "./question.model";

export class Survey{
    public id: number;
    public name: string;
    public questions: Question[];

    constructor(init?: Partial<Survey>){
        Object.assign(this, init);
    }
}