import { NgModule } from "@angular/core";
import { HttpModule } from "@angular/http";
import { GalleryService } from "./galleries/gallery.service";

@NgModule({
    declarations: [
    ],
    imports: [
        HttpModule
    ],
    providers: [
        GalleryService
    ]
})
export class PhograModule{}
