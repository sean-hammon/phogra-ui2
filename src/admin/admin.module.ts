import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { PhograModule } from '../phogra/phogra.module';

import { adminReducer } from './store/admin.reducer';
import { AdminComponent } from './admin.component';
import { LoginComponent } from './login/login.component';
import {AdminRoutingModule} from "./routing/routing.module";
import { FormsModule } from '@angular/forms';
import { LoginEffects } from './store/login.effects';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminGuard } from 'admin/routing/admin.guard';

@NgModule({
    imports: [
        BrowserModule,
        PhograModule.forRoot(),
        AdminRoutingModule,
        FormsModule,
        StoreModule.forRoot({
            adminState: adminReducer
        }),
        EffectsModule.forRoot([
            LoginEffects
        ]),
    ],
    declarations: [
        AdminComponent,
        LoginComponent,
        DashboardComponent,
    ],
    providers: [
        AdminGuard
    ],
    bootstrap: [AdminComponent]
})
export class AdminModule {}
