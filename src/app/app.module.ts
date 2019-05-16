import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { PhograModule } from 'phogra/phogra.module';

import { AppRoutingModule } from './routing/routing.module';
import { AppComponent } from './app.component';
import { SpinnerComponent } from './widgets/spinner/spinner.component';
import { MenuIconComponent } from './widgets/menu-icon/menu-icon.component';
import { PhotoComponent } from './photo/photo.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { MenuComponent } from './menu/menu.component';
import { GalleryMenuDirective } from './menu/menu.directive';
import { AppResolver } from './routing/app.resolver';
import { GalleryComponent } from './gallery/gallery.component';
import { MenuItemComponent } from './menu/menu-item/menu-item.component';
import { ThumbComponent } from './gallery/thumb/thumb.component';
import { ViewportComponent } from './viewport/viewport.component';
import { GalleryResolver } from './routing/gallery.resolver';
import { PhotoResolver } from './routing/photo.resolver';
import { ConstrainedDrag } from './photo/ConstrainedDrag';
import { ThumbCalculator } from './gallery/thumb/ThumbCalculator';

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
        ThumbComponent,
        ViewportComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        PhograModule
    ],
    providers: [
        Title,
        AppResolver,
        GalleryResolver,
        PhotoResolver,
        ConstrainedDrag,
        ThumbCalculator
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
