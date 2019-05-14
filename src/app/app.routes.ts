import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { GalleryComponent } from './gallery/gallery/gallery.component';
import { PhotoComponent } from './photo/photo/photo.component';


const ROUTES = [
    {
        path: '',
        resolve: {

        }
    },
    {
        path: '/gallery/:slug',
        component: GalleryComponent
    },
    {
        path: '/photo/:slug',
        component: PhotoComponent
    },
    {
        path: '**',
        redirectTo: '/'
    }
];


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forRoot(ROUTES)
    ]
})
export class AppRouteModule {}
