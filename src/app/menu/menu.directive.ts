import { Directive, ElementRef, Renderer2 } from "@angular/core";
import { Store } from "@ngrx/store";
import { Gallery } from "../../phogra/galleries/gallery";
import { GalleryProvider } from "../../phogra/galleries/gallery.provider";
import { galleryState } from "../store/app.state";

@Directive({
    selector: '[gallery-menu]'
})
export class GalleryMenuDirective {

    constructor (
        private renderer: Renderer2,
        private element: ElementRef,
        private store: Store<any>,
        private provider: GalleryProvider
    ) {
        store.select(galleryState)
            .subscribe(galleries => {
                this.buildMenu(galleries);
            });
    }


    private buildMenu(galleries: Gallery[]) {

        if (galleries.length === 0) {
            return;
        }
        let parent = this.element.nativeElement.parentNode;
        let menu = this.renderer.createElement('ul');

        let rootGalleries = this.provider.fetchRootGalleries();
        rootGalleries.forEach((gallery: Gallery) => {
            let menuItem = this.assembleChildren(gallery);
            this.renderer.appendChild(menu, menuItem);
        });

        this.renderer.appendChild(parent, menu);

    }


    private assembleChildren(gallery: Gallery, parent?: Gallery) {

        let childSelected: boolean = false;
        let menuItem = this.renderer.createElement('li');


        gallery.links.ui = "/gallery/" + gallery.slug;
        gallery.path = '';
        if (parent) {
            gallery.links.ui += "/in" + parent.path;
            gallery.path = parent.path;
        }
        gallery.path += '/' + gallery.slug;
        gallery.links.ui += "/" + gallery.id;

        this.renderer.addClass(menuItem, gallery.id);

        let link = this.renderer.createElement('a');
        let text = this.renderer.createText(gallery.title);
        this.renderer.appendChild(link, text);
        this.renderer.setAttribute(link, 'href', gallery.links.ui);

        this.renderer.appendChild(menuItem, link);

        if (gallery.relationships.children) {
            let childrenNode = this.renderer.createElement('ul');

            if (typeof parent === 'undefined') {
                this.renderer.addClass(childrenNode, 'root-children');
            }

            let children = this.provider.fetchByParentId(gallery.id);
            children.forEach((child: Gallery) => {

                let childNode = this.assembleChildren(child, gallery);
                this.renderer.appendChild(childrenNode, childNode);

            });

            this.renderer.appendChild(menuItem, childrenNode);

        }

        return  menuItem;
    }
}
