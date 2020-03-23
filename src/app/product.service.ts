import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private firestore: AngularFirestore,
              private db : AngularFireDatabase) { }


  create(product){
    return this.db.list('products').push(product);
  }

  getAll() {
    return this.db.list('/products').snapshotChanges();}

  getProduct(productId){
    return this.db.object('/products/'+ productId).valueChanges();

  }

  update(productId, product){
    return this.db.list('products').update(productId,product)
    .catch ((error : any) => {console.log('Erro no update:'+ error)})
  }

  delete(productId){
    return this.db.object('/products/'+ productId).remove();

  }

 /* getProducts() {
  return this.firestore.collection('products').snapshotChanges();
}
 */
/*
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

} */

}