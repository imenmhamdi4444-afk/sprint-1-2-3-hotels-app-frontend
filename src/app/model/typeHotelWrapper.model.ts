import { TypeHotel } from './typeHotel.model';

export class TypeHotelWrapper {
    _embedded!: { typeHotels: TypeHotel[] };
}
