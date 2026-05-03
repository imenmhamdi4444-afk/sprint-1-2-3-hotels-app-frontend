import { TypeHotel } from './typeHotel.model';

export class Hotel {
    idHotel?: number;
    nomHotel?: string;
    villeHotel?: string;
    prixNuit?: number;
    etoiles?: number;
    nomType?: string;       // flat string returned by HotelDTO (for display)
    idType?: number;        // for sending type when creating/updating
    typeHotel?: TypeHotel;  // used by add-hotel & update-hotel components
    imageName? : string;
}