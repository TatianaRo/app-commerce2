import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Product } from 'src/app/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private firestore: AngularFirestore) { }


getProducts() {
  return this.firestore.collection('products').snapshotChanges();
}

createProduct(product : Product){
  return this.firestore.collection('products').add(product);
}

updateProduct(product : Product){

  delete product.id;
  return this.firestore.doc('products/' + product.id).update(product);
}

deleteProduct(productId : string){
  this.firestore.doc('products/' + productId).delete();
}

teste(product : Product){

  delete product.id;
  console.log(product);

}

}