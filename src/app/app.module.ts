import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { PhograModule } from '../phogra/phogra.module';

import { AppComponent } from './app.component';
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
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        PhograModule
    ],
    providers: [
        Title,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
