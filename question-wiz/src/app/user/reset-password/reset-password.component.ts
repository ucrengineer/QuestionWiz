import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/users/user.service';
import {FormGroup, FormControl, Validators, AbstractControl, ValidatorFn, ValidationErrors} from '@angular/forms';
import { confirmValidator } from 'src/app/helpers/form-validators';
import { CountriesService } from 'src/app/services/countries/countries.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['../../user/userFormStyle.css']
})
export class ResetPasswordComponent implements OnInit {

  selectedCountry: any;

  countries: any[] = [];

  filteredCountries: any[];

  show : string = 'block'
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required,Validators.email]),
    userName: new FormControl('',Validators.required),
    password: new FormControl('', [Validators.required,]),
    // confirmedPass: new FormControl('',[Validators.required,Validators.pattern('')]),
   // country : new FormControl('',Validators.required)




  })



  public loginError:String;
  constructor(private countryService: CountriesService,private userService:UserService, private router : Router) { }

  ngOnInit() {
    // this.countryService.get().subscribe(x => {
    //   this.countries = x}

    //   )
  }
  filterCountry(event) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.countries.length; i++) {
      let country = this.countries[i];
      if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }

    this.filteredCountries = filtered;
  }
  onSubmit(){
    if(this.loginForm.valid){

    //   this.userService.put(this.loginForm.value).subscribe(
    //     (data) => {},
    //     (error:any) => {this.loginError = error.client_side},
    //   () => this.router.navigate(['/login']));

    }
  }


}
