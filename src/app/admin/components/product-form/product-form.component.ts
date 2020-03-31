import { ProductService } from 'shared/services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryService } from 'shared/services/category.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CustomValidators } from 'ngx-custom-validators';
import { take } from 'rxjs/operators';




@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories$;  
  produto;
  productForm : FormGroup;
  id;

  

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
    if (this.id) {this.productService.update(this.id,product); console.log('update acionado')}
    else {this.productService.create(product);}
    this.router.navigate(['/admin/products']);
    
  }

  delete(){
    if (!confirm('Are you sure want to delete this product?')) return;
       this.productService.delete(this.id);
       this.router.navigate(['/admin/products']);
    
  }


  getCategories(){
    this.categories$ = this.categoryService.getAll();
    //console.log(this.categories$);
       
  }

  
  
  constructor(private router : Router,
              private activatedRoute : ActivatedRoute,
              private categoryService : CategoryService,
              private fb : FormBuilder,
              private productService : ProductService) {

  }

   
  ngOnInit(): void {

    this.getCategories();

    this.productForm = this.fb.group(
      {
        title: ['',Validators.required],
        price: ['',[Validators.required, CustomValidators.min(0)]],
        category: ['',Validators.required],
        imageUrl: ['',[Validators.required, CustomValidators.url]]
      }
    )
    
     
    this.activatedRoute.params.subscribe(
      (rota)=>{
        if (rota.id){
        this.id = rota.id;
        this.productService.getProduct(rota.id).pipe(take(1)).subscribe((p) => 
          { this.produto = p;
            this.productForm.patchValue(this.produto);})
             
      } 
    
      } )
     
          } //Fim do ngOninit
        
        } // Fim do componente