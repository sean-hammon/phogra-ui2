import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import {Photo} from '../../phogra/photos/photo';
import { Gallery } from '../../phogra/galleries/gallery';
import { PhotoService } from '../../phogra/photos/photo.service';
import { GalleryProvider } from '../gallery/gallery.provider';

@Injectable()
export class PhotoProvider {

    public currentTag = '';
    public currentIndex = 0;
    private currentGallery: Gallery;

    private photos: Photo[];
    private _galleryPhotos$ = new BehaviorSubject<Photo[]>([]);
    private _currentPhoto$ = new BehaviorSubject<Photo>(null);

    constructor(
        private photosApi: PhotoService,
        galleries: GalleryProvider
    ) {
        galleries.currentGallery()
            .pipe(
                filter((gallery) => !!gallery)
            )
            .subscribe((gallery) => {
                this.currentGallery = gallery;
                this.fetchGalleryPhotos(gallery);
            });
    }

    galleryPhotos(): BehaviorSubject<Photo[]> {
        return this._galleryPhotos$;
    }

    currentPhoto(): BehaviorSubject<Photo> {
        return this._currentPhoto$;
    }

    fetchGalleryPhotos(gallery: Gallery): void {

        this.photosApi.fetchGalleryPhotos(gallery)
            .subscribe((photos) => {
                this._galleryPhotos$.next(photos);
                this.photos = photos;
                this._currentPhoto$.next(this.fetch(0));
            })

    }


    fetch(index: number): Photo {

        const photo: Photo = this.photos[index];
        let previous: Photo = null;
        let next: Photo = null;

        if (index > 0) {
            previous = this.photos[index - 1];
            photo.links.previous = previous.links.ui;
        }
        if (index < this.photos.length - 1) {
            next = this.photos[index + 1];
            photo.links.next = next.links.ui;
        }

        this.updateLinks(photo);

        return this.photos[index];

    }


    random(): Photo {

        this.currentIndex = Math.floor(Math.random() * this.photos.length);
        return this.fetch(this.currentIndex);

    }


    fetchById(photo_id: string): Photo {

        const index = this.photos.findIndex(item => item.id === photo_id);
        return this.fetch(index);

    }


    fetchThumbs(start, end): Photo[] {

        return this.photos.slice(start, end);

    }


    limit(offset: number, length: number): Photo[] {
        return this.photos.slice(offset, offset + length);
    }


    private updateLinks(photo: Photo) {

        photo.links.ui = this.assembleLink(photo.links.ui, this.currentGallery.path);
        photo.links.previous = this.assembleLink(photo.links.previous, this.currentGallery.path);
        photo.links.next = this.assembleLink(photo.links.next, this.currentGallery.path);

    }


    private assembleLink(url, gallery_path): string {

        if (!url) {
            return url;
        }

        let parts = url.split('/');
        parts.splice(parts.length - 1, 0, "in");
        parts.splice(parts.length - 1, 0, gallery_path.substr(1));

        return parts.join('/');
    }
}
