import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/users/user.service';
import {FormGroup, FormControl, Validators, AbstractControl, ValidatorFn, ValidationErrors} from '@angular/forms';
import { confirmValidator } from 'src/app/helpers/form-validators';
import { CountriesService } from 'src/app/services/countries/countries.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['../../user/userFormStyle.css']
})
export class RegistrationComponent implements OnInit {

  selectedCountry: any;

  countries: any[] = [];

  filteredCountries: any[];

  show : string = 'block'
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required,Validators.email]),
    userName: new FormControl('',Validators.required),
    password: new FormControl('', [Validators.required,]),
    confirmedPass: new FormControl('',[Validators.required,Validators.pattern('')]),
    country : new FormControl('',Validators.required)




  })



  public loginError:String;
  constructor(private countryService: CountriesService,private userService:UserService) { }

  ngOnInit() {
    this.countryService.get().subscribe(x => {
      this.countries = x}

      )
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
      this.userService.put(this.loginForm.value).subscribe()
    //   this.userService.login(this.loginForm.value)
    //   .subscribe((data) => {
    // console.log(data);
    //     if(data.status === 200 && !data.body.ErrorCode){
    //       this.router.navigate(['/homepage']);
    //     }else{
    //       this.loginError = data.body.message;
    //     }
    //   },
    //   error => this.loginError = error
    //   )
    }
  }


}
