import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { user } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/users/user.service';

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
  saved : any = false

  constructor(private router:Router, private userService : UserService) { }

  ngOnInit(): void {
    this.value = history.state['results']
    this.questions = history.state['WrongQuestions']
    this.max = history.state['maxScore']
    this.answers = history.state['RightAnswers'];
  }

  SavePoints(){
    if(this.value!= undefined){
      var user : user  = {
        email : localStorage.getItem("email"),
        userName: null,
        password: null,
        points : +this.value
      }
      this.userService.updatePoints(user).subscribe(
       (data) => {},
       (error:any) => {alert(error.client_side)},
       () => this.saved = true);
    }



  }

}
