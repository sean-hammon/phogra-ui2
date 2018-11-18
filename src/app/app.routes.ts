import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GalleryComponent } from './gallery/gallery/gallery.component';


const ROUTES = [
    {
        path: '',
        component: GalleryComponent
    }
];


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forRoot(ROUTES)
    ]
})
export class AppRouteModule {}
