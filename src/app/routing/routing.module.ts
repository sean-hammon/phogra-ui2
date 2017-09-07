import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PhotoComponent } from '../photo/photo.component'
import { RouteResolver } from './route.resolver';
import { GalleryComponent } from '../gallery/gallery.component';
import { ViewportComponent } from '../viewport/viewport.component';

const routes: Routes = [
    {
        path: '',
        component: ViewportComponent,
        resolve: {
            success: RouteResolver
        },
        children: [
            {
                path: 'gallery/:slug',
                children: [
                    {
                        path: '**',
                        component: GalleryComponent,
                    }
                ]
            },
            {
                path: 'photo/:slug',
                children: [
                    {
                        path: '**',
                        component: PhotoComponent,
                    }
                ]
            },
            {
                path: '',
                component: PhotoComponent
            },
        ]
    },
    {
        path: '**',
        redirectTo: '/'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
