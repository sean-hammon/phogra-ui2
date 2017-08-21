import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { GalleryService } from './galleries/gallery.service';
import { GalleryProvider } from './galleries/gallery.provider';
import { PhotoService } from './photos/photo.service';
import { PhotoProvider } from './photos/photo.provider';

@NgModule({
    declarations: [
    ],
    imports: [
        HttpModule
    ],
    providers: [
        GalleryService,
        GalleryProvider,
        PhotoService,
        PhotoProvider
    ]
})
export class PhograModule {}
