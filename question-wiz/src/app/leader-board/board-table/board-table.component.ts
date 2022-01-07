import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountriesService } from 'src/app/services/countries/countries.service';
import { UserService } from 'src/app/services/users/user.service';

@Component({
  selector: 'app-board-table',
  templateUrl: './board-table.component.html',
  styleUrls: ['./board-table.component.css','./board-table.component.scss']
})
export class BoardTableComponent implements OnInit {
  selectedCountry: any;

  countries: any[] = [];

  filteredCountries: any[];



  filteredBrands: any[];

  isOpen = true;
  userName: string= null;
  users : any[] = [];
  user: any = {};
  loading : boolean = true;


  constructor(private countryService: CountriesService, private route:ActivatedRoute, private userService : UserService) { }

  ngOnInit(): void {



    this.countryService.get().subscribe(x => {
      this.countries = x}

      )

    this.userService.get().subscribe(x => {
      this.users = x
      this.loading = false;
    })


    this.user.points = history.state['results']

    console.log(this.user.points)

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

  on() {
    document.getElementById("overlay").style.display = "block";
}

  off() {
    if(this.userName == undefined){
      alert('Please fill out your username')
      return;
    }
    if(this.selectedCountry == undefined){
      alert('Please choose your country')
      return;
    }
    document.getElementById("overlay").style.display = "none";

    this.user.id = Math.max.apply(Math, this.users.map(function(o) { return o.y; })) + 1
    this.user.name = this.userName;
    this.user.country = this.selectedCountry.name
    this.user.quizCount = 100;
    this.user.quizCount = 0
    this.userService.put(this.user).subscribe();
    this.users.push(this.user)


}

}
