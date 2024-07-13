export type Table = {
  id: number,
  tableNo: string,
  tableSize: string,
  booking?: Array<Booking>
}

type Booking = {
  id: number,
  guestName: string,
  contactInfo: string,
  arrivalTime: string,
  bookingStatus: boolean,
  tableInfoId: number
}

export type CurrentTableInfo = {
  arrivalTime: string,
  selectedTable: number,
  tableNo: string,
  tableSize: string
}

export type CreateBookingType = {
  guestName: string,
  contactInfo: string,
  arrivalTime: string,
  bookingStatus?: boolean,
  tableInfoId: number
}