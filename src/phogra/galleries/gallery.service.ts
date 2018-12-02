import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, publishReplay, refCount } from 'rxjs/operators';
import { Gallery } from './gallery';
import { environment } from '../../environments/environment';
import { IRestGalleryResponse } from '../rest/rest.galleries';

@Injectable()
export class GalleryService {

    private apiEndpoint = '/galleries';
    private galleryResults: Observable<Gallery[]>;

    constructor (
        private http: HttpClient
    ) {}

    fetchGalleries(): Observable<Gallery[]> {

        if (!this.galleryResults) {

            this.galleryResults = this.http.get<IRestGalleryResponse>(environment.apiBase + this.apiEndpoint)
                .pipe(
                    map((galleries: IRestGalleryResponse) => {
                        return galleries.data.map(item => Gallery.transformRest(item));
                    }),
                    publishReplay(1),
                    refCount()
                );

        }

        return this.galleryResults;
    }


}
