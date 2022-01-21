import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, timer } from 'rxjs';
import { AnswerService } from 'src/app/services/answers/answer.service';
import { QuestionService } from 'src/app/services/questions/question.service';
import { QuizService } from 'src/app/services/quizzes/quiz-service.service';

@Component({
  selector: 'app-quiz-form',
  templateUrl: './quiz-form.component.html',
  styleUrls: ['./quiz-form.component.css']
})
export class QuizFormComponent implements OnInit {

  constructor(private questionService:QuestionService,
    private quizService : QuizService,
    private answerService:AnswerService,
    private route:ActivatedRoute,
    private router: Router) { }
  quiz:any;
  questions : any[] = [] ;
  wrongQuestions : any [] = [];
  rightAnswers : any[] = [];
  filtered_answers : any[];
  answers : any[] = [];
  selectedAnswer : any ;
  index : number = 0;
  points : {} = {};
  loading : boolean = true;
  finished : boolean = false;

  ngOnInit(): void {

   // this.quizService.get().subscribe(x =>this.quiz );
    this.questionService.get().subscribe(x => {

      this.questions = x.filter(x => x.category == this.route.snapshot.params['id'])
    })
    this.answerService.get().subscribe(x => {
      this.answers = x;
      if(this.answers.length > 0 && this.questions.length > 0){
        this.filterAnswers();
        this.loading = false;
      }
    })


  }


  setAnswer(){
    let answerId = this.filtered_answers.find(x => x.selected == true).id;
    switch(answerId){

      case this.questions[this.index].answerId:{
        this.addPoint()
        break;
      }
      default: {
        this.subtractPoint()
        this.wrongQuestions.push(this.questions[this.index])
        this.rightAnswers.push(this.answers.find(x => x.id === this.questions[this.index].answerId))

        break;
      }

    }


  }

  changeColor(answerId){
    var choosenAnswer = this.filtered_answers.find(x => x.id == answerId);
    this.filtered_answers.forEach(x => x.selected = false);
    choosenAnswer.selected = true;

  }

  sum() {
    var sum = 0;
    for( var el in this.points) {
      if( this.points.hasOwnProperty( el ) ) {
        sum += parseFloat( this.points[el] );
      }
    }
    return sum;
  }

  addPoint()
  {
    this.points[this.questions[this.index].answerId] = 1
  }

  subtractPoint()
  {
    this.points[this.questions[this.index].answerId] = 0;
  }


  next(){
    if(!this.filtered_answers.some(x => x.selected == true)){
      alert('please select a answer')
    }
    else{
      this.setAnswer()
      switch(this.index){
        case this.questions.length -1:
          {
            this.filterAnswers();
            this.finished= true;
            // show submit button to load quiz result page

            break;
          }
        case this.questions.length:
        {
          break;

        }
        default:
          {
            this.index++;
            this.filterAnswers();
            break;
          }
      }

    }
  }



  filterAnswers(){
    this.filtered_answers =this.answers.filter(x => x.questionId == this.questions[this.index].id)
  }



}
