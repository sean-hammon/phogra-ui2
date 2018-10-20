import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { GalleryService } from './galleries/gallery.service';
import { GalleryProvider } from '../app/gallery/gallery.provider';
import { PhotoService } from './photos/photo.service';
import { PhotoProvider } from './photos/photo.provider';
import { TokenRequestInterceptor, TokenResponseInterceptor } from './auth/token.interceptor';
import { TokenStorage } from './auth/token.storage';
import { AuthService } from './auth/auth.service';
import { reducers, effects } from './store';

@NgModule({
    declarations: [
    ],
    imports: [
        HttpClientModule,
        StoreModule.forFeature('phogra', reducers ),
        EffectsModule.forFeature(effects)
    ],
    providers: [
        GalleryService,
        GalleryProvider,
        PhotoService,
        PhotoProvider,
        AuthService,
        TokenStorage,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenRequestInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenResponseInterceptor,
            multi: true
        }
    ]
})
export class PhograModule {}
