export interface MenuState
{
	menuOpen: boolean,
	activeGallery: any
}

export const initialMenu: MenuState = {
	menuOpen: false,
    activeGallery: {}
};
