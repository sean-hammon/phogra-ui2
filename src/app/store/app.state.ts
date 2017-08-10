import { Gallery } from "../../phogra/galleries/gallery";

export interface AppState
{
	loading: boolean;
	error: string;
	breadcrumbs: any[];
	current_photo: any;
	current_gallery: any;
	galleries: Gallery[];
	photos: any;

}

export const initialState: AppState = {
    loading: true,
    error: null,
    breadcrumbs: [],
    current_photo: {},
    current_gallery: {},
    galleries: [],
    photos: []
};
