import { Gallery } from "../../phogra/galleries/gallery";

export interface AppState
{
	loading: boolean;
	error: string;
	menuOpen: boolean;
	breadcrumbs: any[];
	current_photo: any;
	current_gallery: any;
	galleries: Gallery[];
	photos: any;

}

export const initialState: AppState = {
    loading: true,
    error: null,
    menuOpen: false,
    breadcrumbs: [],
    current_photo: {},
    current_gallery: {},
    galleries: [],
    photos: []
};
