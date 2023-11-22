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

export interface Booking {
    _id: string,
    bookingDate: string,
    checkoutDate: string,
    user: {
        email: string,
        name: string,
        tel: string,
        _id: string,
    },
    hotel: {
        _id: string,
        name: string,
        address: string,
        tel: string,
        id: string,
    },
    createdAt: string,
}

export interface BookingList {
    success: boolean,
    count: number,
    data: Booking[],
}