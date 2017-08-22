import { Component, Input } from '@angular/core';
import { Photo } from "../../../phogra/photos/photo";

@Component({
    selector: 'app-thumb',
    templateUrl: './thumb.component.html',
    styleUrls: ['./thumb.component.sass']
})
export class ThumbComponent {

    @Input()
    thumb: Photo;

}
