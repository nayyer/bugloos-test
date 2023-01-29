import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CoursesRouting} from "src/app/features/courses/courses.routing";

import {MatIconModule} from "@angular/material/icon";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatTooltipModule} from "@angular/material/tooltip";

import {TranslateModule} from "@ngx-translate/core";
import {SharedModule} from "@shared/shared.module";
import { CoursesComponent } from './courses.component';
import { CoursesService } from './courses.service';
import { MatCardModule} from '@angular/material/card';
import { MatInputModule} from '@angular/material/input';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatListModule} from '@angular/material/list';
import { MatButtonModule} from '@angular/material/button';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {CarouselModule} from "ngx-owl-carousel-o";
@NgModule({
  declarations: [CoursesComponent],
    imports: [
        CommonModule,
        CoursesRouting,
        FormsModule,
        MatIconModule,
        MatCheckboxModule,
        MatTooltipModule,
        TranslateModule,
        SharedModule,
        MatButtonModule,
        MatCardModule,
        MatInputModule,
        MatFormFieldModule,
        MatListModule,
        ReactiveFormsModule,
        DragDropModule,
        CarouselModule

    ],
  providers: [
    CoursesService
  ]
})
export class CoursesModule {
}
