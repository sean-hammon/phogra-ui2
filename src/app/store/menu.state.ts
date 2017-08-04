export class MenuState
{
    constructor (
        public menuOpen: boolean,
        public activeGallery: any
    ) { }
}

export const initialMenu: MenuState = {
	menuOpen: false,
    activeGallery: {}
};
