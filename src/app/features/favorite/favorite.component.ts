
import { Component} from '@angular/core';
import { Courses } from '@core/interfaces/Courses';
import { AuthService } from 'src/app/auth/auth.service';
import * as favoriteActions from '@core/state/favorite/favorite.actions';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { AppService } from '@core/root/app.service';
import { TokenStorageService } from '@core/services/interceptors/token-storage.service';
import { BaseComponent } from '@core/root/base.component';
import { favoriteSelector } from '@core/state/favorite/favorite.reducer';
import { takeUntil } from 'rxjs';
import { UserInfo } from '@core/interfaces/User';
@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent extends BaseComponent {

  term: string = '';
  favorites: any;
  courses :Courses [] = [
    {
    label:'course1',
    id:1,
    price:200,
    img:'assets/images/common/Oxford-course.jpeg',
    isFavorite : false,
    description:'Lorem ...',
    duration:'1-2'
  },
  {
    label:'course2',
    id:2,
    price:200,
    img:'assets/images/common/Oxford-course.jpeg',
    isFavorite : false,
    description:'Lorem ...',
    duration:'1-2'
  },
  {
    label:'course3',
    id:3,
    price:200,
    img:'assets/images/common/Oxford-course.jpeg',
    isFavorite : false,
    description:'Lorem ...',
    duration:'1-2'
  },
  {
    label:'course4',
    id:4,
    price:200,
    img:'assets/images/common/Oxford-course.jpeg',
    isFavorite : false,
    description:'Lorem ...',
    duration:'1-2'
  },{
    label:'course5',
    id:5,
    price:200,
    img:'assets/images/common/Oxford-course.jpeg',
    isFavorite : false,
    description:'Lorem ...',
    duration:'1-2'
  },{
    label:'course6',
    id:6,
    price:200,
    img:'assets/images/common/Oxford-course.jpeg',
    isFavorite : false,
    description:'Lorem ...',
    duration:'1-2'
  },

  ] 
  favoriteCourses: Courses[] = [];
  get userInfo(): any
  {
    return this._authService.userData;
  }


  constructor(private router: Router, private readonly store: Store, private _authService:AuthService,public _tokenStorageService: TokenStorageService,) {
    super()
    this.store.select(favoriteSelector).pipe(
      takeUntil(this.stop$)
    ).subscribe((data: any) => {
      if (data?.tasks?.length) {
        this.favorites = data.tasks.map((item: { productId: any; }) => item.productId);
        this.favoriteCourses = this.courses.filter(item => {
          return this.favorites.indexOf(item.id) > -1
        })
      } else {
        this.favoriteCourses = [];
      }
    });
  }

ngOnInit(){
  this._authService.getUserInfoFetch().pipe(takeUntil(this.stop$)).subscribe((userinfo:UserInfo={})=> {
    if (this.userInfo){ 
      this.store.dispatch(favoriteActions.getTasks());
    }
  })
  }

  toggleFavorate(item : Courses){
    item.isFavorite = !item.isFavorite;
    const task = {
      createdBy: this.userInfo.uid,
      status: true
    };
    this.store.dispatch(favoriteActions.createTask({task}));
  }


    

}