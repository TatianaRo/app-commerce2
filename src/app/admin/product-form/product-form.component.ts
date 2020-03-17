import { Router } from '@angular/router';
import { CategoryService } from './../../category.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { ProductService } from 'src/app/product.service';
import { CustomValidators } from 'ngx-custom-validators';




@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories$;  

  productForm = this.fb.group(
    {
      title: ['',Validators.required],
      price: ['',[Validators.required, CustomValidators.min(0)]],
      category: ['',Validators.required],
      imageUrl: ['',[Validators.required, CustomValidators.url]]
    }
  )

  get title(){
    return this.productForm.get('title');
  }

  get price(){
    return this.productForm.get('price');
  }

  get category(){
    return this.productForm.get('category');
  }

  get imageUrl(){
    return this.productForm.get('imageUrl');
  }

  save(product){
    console.log(product);
    this.productService.create(product);
    this.router.navigate(['/admin/products']);
    
  }


  getCategories(){
    this.categories$ = this.categoryService.getCategories();
    console.log(this.categories$);
   
    
  }
  
  constructor(private router : Router,
              private categoryService : CategoryService,
              private fb : FormBuilder,
              private productService : ProductService) {

  }

   
  ngOnInit(): void {

    this.getCategories();
    console.log(this.categories$);
   
        
  }

}
