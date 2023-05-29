import { Answer } from "./answer.model";

export class Question{
    public questionId: number;
    public surveyId: number;
    public questionText: string;
    public answers: Answer[];

    constructor(init?: Partial<Question>){
        Object.assign(this, init);
    }
}