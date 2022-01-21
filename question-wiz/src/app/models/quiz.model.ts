import { answer } from "./answer.model";
import { question } from "./question.model";

export interface quiz{

  answers: Array<answer>,
  questions: Array<question>

}
