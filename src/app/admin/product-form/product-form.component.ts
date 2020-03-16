import { CategoryService } from './../../category.service';
import { Component, OnInit } from '@angular/core';
import { Category } from './category';
import { Product } from 'src/app/product.model';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories$: Observable<any[]>;
  categories;


  constructor(private categoryService : CategoryService) {

  }

  getCategories(){
   this.categories$ = this.categoryService.getCategories().snapshotChanges();
  }

   
  ngOnInit(): void {
   
    
      
  }

}
