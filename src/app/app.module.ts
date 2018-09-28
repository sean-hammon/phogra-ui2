import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { PhograModule } from '../phogra/phogra.module';

import { AppComponent } from './app.component';
import { SpinnerComponent } from './widgets/spinner/spinner.component';
import { TopbarComponent } from './topbar/topbar.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';

@NgModule({
    declarations: [
        AppComponent,
        SpinnerComponent,
        TopbarComponent,
        BreadcrumbsComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        PhograModule
    ],
    providers: [
        Title,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
