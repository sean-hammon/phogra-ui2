import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { GalleryService } from './galleries/gallery.service';
import { GalleryProvider } from './galleries/gallery.provider';
import { PhotoService } from './photos/photo.service';
import { PhotoProvider } from './photos/photo.provider';
import { TokenRequestInterceptor, TokenResponseInterceptor } from './auth/token.interceptor';
import { AuthService } from './auth/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

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
        PhotoProvider,
        AuthService,
        JwtHelperService,
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
