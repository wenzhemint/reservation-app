import axios from 'axios'
import http from './http'
import { CreateBookingType } from '../models/model'

const getAllTables = async () => {
    const res = await http.get(`/tableinfo`)
    return res?.data
}

const getAvailableTables = async (arrivalTime: string) => {
    const res = await http.get(`/tableinfo/available?arrivalTime=${arrivalTime}`)
    return res?.data
}

const createNewBooking = async (booking: CreateBookingType) => {
    const body = {
        guestName: booking.guestName,
        contactInfo: booking.contactInfo,
        arrivalTime: booking.arrivalTime,
        tableInfoId: booking.tableInfoId
    }
    const res = await http.post(`/booking`, body)
    return res?.data
}

export {
    getAllTables,
    getAvailableTables,
    createNewBooking
}