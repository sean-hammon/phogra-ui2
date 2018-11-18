import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { PhograModule } from '../phogra/phogra.module';

import { AppComponent } from './app.component';
import { AppRouteModule } from './app.routes';
import { SpinnerComponent } from './widgets/spinner/spinner.component';
import { TopbarComponent } from './topbar/topbar.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { GalleryComponent } from './gallery/gallery/gallery.component';
import { ThumbComponent } from './gallery/thumb/thumb.component';

@NgModule({
    declarations: [
        AppComponent,
        SpinnerComponent,
        TopbarComponent,
        BreadcrumbsComponent,
        GalleryComponent,
        ThumbComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        PhograModule,
        AppRouteModule
    ],
    providers: [
        Title,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
