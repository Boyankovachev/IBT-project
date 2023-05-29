export class Answer{
    public answerId: number;
    public questionId: number;
    public answerText: string;
    public votes: number;

    constructor(init?: Partial<Answer>){
        Object.assign(this, init);
    }
}