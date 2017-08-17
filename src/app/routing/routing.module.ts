import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PhotoComponent } from '../photo/photo.component'
import { RouteResolver } from "./route.resolver";
import { GalleryComponent } from "../gallery/gallery.component";

const routes: Routes = [
    {
        path: 'gallery/:slug',
        children: [
            {
                path: "**",
                component: GalleryComponent,
                resolve: {
                    success: RouteResolver
                }
            }
        ]
    },
    {
        path: '',
        pathMatch: 'full',
        component: PhotoComponent
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
