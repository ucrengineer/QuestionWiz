import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, timer } from 'rxjs';
import { AnswerService } from 'src/app/services/answers/answer.service';
import { QuestionService } from 'src/app/services/questions/question.service';

@Component({
  selector: 'app-quiz-form',
  templateUrl: './quiz-form.component.html',
  styleUrls: ['./quiz-form.component.css']
})
export class QuizFormComponent implements OnInit {

  constructor(private questionService:QuestionService,
    private answerService:AnswerService,
    private route:ActivatedRoute,
    private router: Router) { }
  questions : any[] = [] ;
  wrongQuestions : any [] = [];
  rightAnswers : any[] = [];
  filtered_answers : any[];
  answers : any[] = [];
  selectedAnswer : any ;
  index : number = 0;
  points : {} = {};
  totalScore : string = '';
  loading : boolean = true;
  finished : boolean = false;

  ngOnInit(): void {
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


  setAnswer(answerId){
    this.selectedAnswer = this.answers.find(x => x.id === answerId);
    switch(answerId){

      case this.questions[this.index].answerId:{
        this.addPoint()
        this.wrongQuestions = this.wrongQuestions.filter(x => x.id === this.questions[this.index])

        break;
      }
      default: {
        this.subtractPoint()
        this.wrongQuestions[this.index] = this.questions[this.index]
        this.rightAnswers[this.index] = this.answers.find(x => x.id === this.questions[this.index].answerId)
        break;
      }

    }
    this.changeColor(answerId)
    this.wrongQuestions = this.wrongQuestions.filter(x => x);
    this.rightAnswers = this.rightAnswers.filter(x => x )
   // this.totalScore = this.sum()


  }

  changeColor(answerId){
    if(this.filtered_answers.some(x => x.selected == true))
    {
      // reset all buttons
      let id = this.filtered_answers.find(x => x.selected == true).id
      document.getElementsByName(id)[0].className = "p-button p-button-raised p-button-primary "
      this.answers.find(x => x.selected == true).selected = false;
    }
    document.getElementsByName(answerId)[0].className = "p-button p-button-raised p-button-success "
    this.filtered_answers.find(x => x.id == answerId).selected = true;

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
    switch(this.points[this.questions[this.index].answerId])
    {
      case 0:
        {
          this.points[this.questions[this.index].answerId] = 1;
          break;
        }
      case 1:
      {
        break;
      }
      default:
      {
        this.points[this.questions[this.index].answerId] = 1;

      }

    }

  }

  subtractPoint()
  {
    switch(this.points[this.questions[this.index].answerId])
    {
      case 1:
        {
          this.points[this.questions[this.index].answerId] = 0;
          break;
        }
      case 0:
      {
        break;
      }
      default:
      {
        this.points[this.questions[this.index].answerId] = 0;

      }

    }

  }


  next(){
    if(this.index+1 != Object.keys(this.points).length){
      alert('please select a answer')
    }
    else{
      switch(this.index){
        case this.questions.length -1:
          {
            this.filterAnswers();
            this.finished= true;
            console.log(this.wrongQuestions)
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
  previous(){
    switch(this.index){
      case 0:
        {
          this.index = this.questions.length - 1;

          break;
        }
      default:
        {
          this.index--;
          break;
        }
    }
    this.filterAnswers()
  }


  filterAnswers(){
    this.filtered_answers =this.answers.filter(x => x.questionId == this.questions[this.index].id)
  }

  showResults(){
  //   Object.keys(this.points).forEach((x)=> {

  //     if(this.points[x.toString()] === 0)
  //     {
  //       var test = this.questions.find(x => x.answerId = +x)
  //       console.log(test)
  //     }
  //   })


  }

}
