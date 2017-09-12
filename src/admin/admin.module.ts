import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { PhograModule } from '../phogra/phogra.module';

import { AdminComponent } from './admin.component';
import { LoginComponent } from '../admin/login/login.component';
import {AdminRoutingModule} from "./routing/routing.module";
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        BrowserModule,
        PhograModule,
        AdminRoutingModule,
        FormsModule,
    ],
    declarations: [
        AdminComponent,
        LoginComponent,
    ],
    bootstrap: [AdminComponent]
})
export class AdminModule {}
