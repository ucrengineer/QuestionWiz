import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  active = true;
  constructor() { }

  ngOnInit(): void {
  }

  setActive(){
    this.active = !this.active;
  }

}
