import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-quiz-result',
  templateUrl: './quiz-result.component.html',
  styleUrls: ['./quiz-result.component.css']
})
export class QuizResultComponent implements OnInit {
  value : number = 0;
  questions : any[] = [];
  answers : any[] = [];
  max : number= 20;
  user : any = null;
  constructor(private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.value = history.state['results']
    this.questions = history.state['WrongQuestions']
    this.max = history.state['maxScore']
    this.answers = history.state['RightAnswers'];
    console.log(history.state)
  }

}
