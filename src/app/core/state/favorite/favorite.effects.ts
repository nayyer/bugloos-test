import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError, switchMap } from 'rxjs/operators';
import { CoursesService } from '../../../features/courses/courses.service';
import * as favoriteActions from './favorite.actions';

@Injectable()
export class FavoriteEffects {

  constructor(
    private actions$: Actions,
    private coursesService: CoursesService
  ) {}

  getTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(favoriteActions.getTasks),
      switchMap(action =>
        this.coursesService.getTasks().pipe(
          map((response:any) => {
            
            let data: any[] =[];
            response.forEach((doc:any)=>data.push(doc.data()))
            
            //response=response.data();
            console.log("dataaaaa",data)
            return favoriteActions.getTasksSuccess({data})
          }),
          catchError((error: any) => of(favoriteActions.getTasksFailure(error))))
      )
    )
  );

  createTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(favoriteActions.createTask),
      exhaustMap(action =>
        this.coursesService.addTask(action.task).pipe(
          map((response :any) => {
            console.log(response)
            return favoriteActions.createTaskSuccess(response)
          }),
          catchError((error: any) => {console.log(error);return of(favoriteActions.createTaskFailure(error))}))
      )
    )
  );


  deleteTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(favoriteActions.deleteTask),
      switchMap(action => this.coursesService.deleteTask(action.taskid).pipe(
        map((response: any) => {
             console.log("eewwwwwwwwwww",response) 
             return favoriteActions.deleteTaskSuccess(response)
        }),
          catchError((error: any) => of(favoriteActions.deleteTaskFailure(error))))
      )
    )
  );

  editTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(favoriteActions.editTask),
      exhaustMap(action =>
        this.coursesService.editTask(action.task).pipe(
          map(response => favoriteActions.editTaskSuccess(response)),
          catchError((error: any) => of(favoriteActions.editTaskFailure(error))))
      )
    )
  );

}