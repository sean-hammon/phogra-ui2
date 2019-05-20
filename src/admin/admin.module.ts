import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PhograModule } from 'phogra/phogra.module';

import { AdminComponent } from './admin.component';
import { LoginComponent } from './login/login.component';
import { AdminRoutingModule } from './routing/routing.module';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';

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
        DashboardComponent,
    ],
    bootstrap: [AdminComponent]
})
export class AdminModule {}
