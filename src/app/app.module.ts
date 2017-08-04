import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule} from "@ngrx/store";

import { PhograModule } from "../phogra/phogra.module";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpinnerComponent } from './widgets/spinner/spinner.component';
import { MenuIconComponent } from './widgets/menu-icon/menu-icon.component';
import { ViewportComponent } from './viewport/viewport.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { MenuComponent } from './menu/menu.component';
import { menuReducer } from "./store/menu.reducer";

@NgModule({
    declarations: [
        AppComponent,
        SpinnerComponent,
        MenuIconComponent,
        ViewportComponent,
        TopBarComponent,
        MenuComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        StoreModule.forRoot({
            menuState: menuReducer
        }),
        PhograModule
    ],
    providers: [
        Title
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
