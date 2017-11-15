import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { PhograModule } from '../phogra/phogra.module';

import { adminReducer } from './store/admin.reducer';
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
        StoreModule.forRoot({
            adminState: adminReducer
        }),
    ],
    declarations: [
        AdminComponent,
        LoginComponent,
    ],
    bootstrap: [AdminComponent]
})
export class AdminModule {}
