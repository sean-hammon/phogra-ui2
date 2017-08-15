import { NgModule } from "@angular/core";
import { HttpModule } from "@angular/http";
import { GalleryService } from "./galleries/gallery.service";
import { GalleryProvider } from "./galleries/gallery.provider";

@NgModule({
    declarations: [
    ],
    imports: [
        HttpModule
    ],
    providers: [
        GalleryService,
        GalleryProvider
    ]
})
export class PhograModule{}
