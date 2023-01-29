import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, OnInit, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Courses } from '@core/interfaces/Courses';
import { Status } from '@core/interfaces/ToDo';
import { AuthService } from 'src/app/auth/auth.service';
import * as favoriteActions from '@core/state/favorite/favorite.actions';
import { Store } from '@ngrx/store';
import { isTemplateMiddle } from 'typescript';
import { takeUntil } from 'rxjs';
import { BaseComponent } from '@core/root/base.component';
import { favoriteSelector } from '@core/state/favorite/favorite.reducer';
import { UserInfo } from '@core/interfaces/User';
import {OwlOptions} from "ngx-owl-carousel-o";
import { Router } from '@angular/router';
@Component({
  selector: 'app-cources',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent extends BaseComponent {


  constructor(private _authService: AuthService, private readonly store: Store,private router : Router) {
     super()
    this.store.select(favoriteSelector).pipe(
      takeUntil(this.stop$)
    ).subscribe((data: any) => {
      console.log('data', data)
      if (data?.tasks?.length) {
        let favorites = data.tasks.map((item: { productId: any; }) => item.productId);
        console.log(favorites)
        this.courses.forEach(item => {
          console.log("===", favorites.indexOf(item.id))
          item.isFavorite =  favorites.indexOf(item.id) > -1 ? true : false
        })
      } else {
        this.courses.forEach(item => {
          item.isFavorite = false;
        })
      }
      console.log(this.courses)
    })
   }

  showSignup: boolean = true;
  showSignin: boolean = false;

  term: string = '';
  carouselOption: OwlOptions                                                        = {
    loop     : false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag : true,
    dots     : false,
    navSpeed : 700,
    margin   : 10,
    navText  : [`<i class="pi pi-chevron-left"></i>`, `<i class="pi pi-chevron-right"></i>`],
    //items    : 3,
    responsive: {
      0  : {
        items: 4
      },
      400: {
        items: 4
      },
      740: {
        items: 7
      },
      940: {
        items: 7
      }
    },
    nav       : true,
    autoplay  : true,
    //autoWidth: true,
  };
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
  marketCategoryItems: { title: string, isActive?: boolean, label: string }[] = [
    {
      title: 'FAVORITES',
      label: 'FAVORITES',
      isActive: true
    },
    {
      title   : 'MAIN',
      label   : 'MAIN',
      
    },
     {
       title: 'STORE VALUE',
       label: 'Store Value',
     },
     {
       title: 'MEMES',
       label: 'Memes',
     },
     {
       title: 'SMART_CONTRACT',
       label: 'Smart Contract',
     },
    
     {
       title: 'CEX',
       label: 'Cex',
     },
     {
       title: 'NFTs',
       label: 'NFTs',
     },
     {
      title: 'IRT',
      label: 'IRT',
    },
     


  ];

  get userInfo(): any
  {
    return this._authService.userData;
  }





  ngOnInit(): void {
      this._authService.getUserInfoFetch().pipe(takeUntil(this.stop$)).subscribe((userinfo:UserInfo={})=> {
    if (this.userInfo){ 
      console.log("this.userInfo",this.userInfo)
      this.store.dispatch(favoriteActions.getTasks());
    }
  })
  }

  onSubmit() {

  }

  delTask(task:any) {

  }
  toggleFavorate(item : Courses){
    item.isFavorite = !item.isFavorite;
    console.log(item.isFavorite);
    const task = {
      createdBy: this.userInfo.uid,
      status: true,
      productId: item.id
    };
    console.log("44444444",item.isFavorite)
    if (!item.isFavorite) {
      this.store.dispatch(favoriteActions.deleteTask({taskid: item.id}))
    } else {
      this.store.dispatch(favoriteActions.createTask({ task }));
    }
  }
  redirectToFavoraite(item:any){
    this.marketCategoryItems = this.marketCategoryItems.map(item => {
      return Object.assign(item, {isActive: false})
    });
    item.isActive          = true;
    if (item.title !== 'FAVORITES') return ;
    this.router.navigate(['/favorites']);

  }
  checkSignIn(signInSelected :boolean){
    this.showSignin = signInSelected;
    this.showSignup = !this.showSignin;
  }


    

}