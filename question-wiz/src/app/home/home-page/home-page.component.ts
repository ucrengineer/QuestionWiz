import { Component, OnInit } from '@angular/core';
import { category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/categories/category.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(private categoryService: CategoryService) { }
  categories : category[] = [];
  ngOnInit(): void {
    this.categoryService.get().subscribe(x => this.categories = x);

    const token = localStorage.getItem("email");
    alert(token)
  }

}
