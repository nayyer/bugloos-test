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
    return from(userRef.set(taskData, {
      merge: true,
    }));



    // return this.http.post(this.rootURL + '/task', {task});
  }

  editTask(task: any) {
    return this.http.put(this.rootURL + '/task', {task});
  }

  deleteTask(taskId: any) {
    
    const  docRef = this.afs.collection("favorites").ref
      docRef.where('createBy', '==', this._authService.userData.uid).get().then(querySnapshot => {
        const batch = this.afs.firestore.batch();
          querySnapshot.forEach((doc: any) => {
            if (doc?.data()?.productId === taskId) {
              batch.delete(doc.ref);
            }
   
          });
        
        return batch.commit();
      })
    return of([])
   
  }
}
