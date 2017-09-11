import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { PhograModule } from '../phogra/phogra.module';

import { AdminComponent } from './admin.component';
import { LoginComponent } from '../admin/login/login.component';
import {AdminRoutingModule} from "./routing/routing.module";

@NgModule({
    imports: [
        BrowserModule,
        PhograModule,
        AdminRoutingModule,
    ],
    declarations: [
        AdminComponent,
        LoginComponent,
    ],
    bootstrap: [AdminComponent]
})
export class AdminModule {}
