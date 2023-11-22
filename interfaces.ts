export interface Hotel {
    _id: string,
    name: string,
    address: string,
    district: string,
    province: string,
    postalcode: string,
    tel: string,
    picture: string,
    __v: string,
    id: string,
}

export interface HotelList {
    success: boolean,
    count: number,
    data: Hotel[]
}