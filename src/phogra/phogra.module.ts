import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { GalleryService } from './galleries/gallery.service';
import { GalleryProvider } from './galleries/gallery.provider';
import { PhotoService } from './photos/photo.service';
import { PhotoProvider } from './photos/photo.provider';

@NgModule({
    declarations: [
    ],
    imports: [
        HttpClientModule
    ],
    providers: [
        GalleryService,
        GalleryProvider,
        PhotoService,
        PhotoProvider
    ]
})
export class PhograModule {}
