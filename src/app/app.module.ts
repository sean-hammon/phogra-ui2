import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { StoreModule} from '@ngrx/store';

import { PhograModule } from '../phogra/phogra.module';

import { AppRoutingModule } from './routing/routing.module';
import { AppComponent } from './app.component';
import { SpinnerComponent } from './widgets/spinner/spinner.component';
import { MenuIconComponent } from './widgets/menu-icon/menu-icon.component';
import { PhotoComponent } from './photo/photo.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { MenuComponent } from './menu/menu.component';
import { GalleryMenuDirective } from './menu/menu.directive';
import { EffectsModule } from '@ngrx/effects';
import { GalleryEffects } from './store/gallery.effects';
import { appReducer } from './store/app.reducer';
import { RouteResolver } from './routing/route.resolver';
import { GalleryComponent } from './gallery/gallery.component';
import { MenuItemComponent } from './menu/menu-item/menu-item.component';
import { ThumbComponent } from './gallery/thumb/thumb.component';

@NgModule({
    declarations: [
        AppComponent,
        SpinnerComponent,
        MenuIconComponent,
        PhotoComponent,
        TopBarComponent,
        MenuComponent,
        GalleryMenuDirective,
        GalleryComponent,
        MenuItemComponent,
        ThumbComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        StoreModule.forRoot({
            appState: appReducer
        }),
        EffectsModule.forRoot([
            GalleryEffects
        ]),
        PhograModule
    ],
    providers: [
        Title,
        RouteResolver
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
