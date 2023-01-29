import { Injectable } from '@angular/core';
import { ToDo } from '@core/interfaces/ToDo';
import { HttpClient } from '@angular/common/http';
import {from, of} from 'rxjs'
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { AuthService } from 'src/app/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private http: HttpClient,private afs:AngularFirestore,private _authService:AuthService) { }

  rootURL = '/api';

  getTasks() {
  console.log("oooooooo",this._authService.userData.uid)  
      const  docRef = this.afs.collection("favorites").ref
       return from(docRef.where('createBy', '==', this._authService.userData.uid).get())   
  }

  addTask(task: any) {
    let id = Math.random();
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `favorites/${id}`
    );

    const taskData:any = {
      status:task.status || null,
      productId:task.productId,
      createBy:task.createdBy
    };
    console.log(taskData)
    return from(userRef.set(taskData, {
      merge: true,
    }));



    // return this.http.post(this.rootURL + '/task', {task});
  }

  editTask(task: any) {
    return this.http.put(this.rootURL + '/task', {task});
  }

  deleteTask(taskId: any) {
    console.log('deleting task:::', taskId);
    
    const  docRef = this.afs.collection("favorites").ref
      docRef.where('createBy', '==', this._authService.userData.uid).get().then(querySnapshot => {
        const batch = this.afs.firestore.batch();
        console.log(querySnapshot);
          querySnapshot.forEach((doc: any) => {
            console.log(doc.data())
            if (doc?.data()?.productId === taskId) {
              console.log('888888888888888888888')
              batch.delete(doc.ref);
            }
        
          });
        
        return batch.commit();
      })
    return of([])
   
  }
}
