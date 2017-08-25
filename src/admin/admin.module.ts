import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { PhograModule } from '../phogra/phogra.module';

import { AdminComponent } from './admin.component';

@NgModule({
    imports: [
        BrowserModule,
        PhograModule
    ],
    declarations: [
        AdminComponent
    ],
    bootstrap: [AdminComponent]
})
export class AdminModule {}
