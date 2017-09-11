import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { PhograModule } from '../phogra/phogra.module';

import { AdminComponent } from './admin.component';
import {AdminRoutingModule} from "./routing/routing.module";

@NgModule({
    imports: [
        BrowserModule,
        PhograModule,
        AdminRoutingModule,
    ],
    declarations: [
        AdminComponent
    ],
    bootstrap: [AdminComponent]
})
export class AdminModule {}
