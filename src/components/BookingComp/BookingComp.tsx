import { FC, useState, useEffect } from "react"
import { useSelector } from "react-redux"
import styles from "./BookingComp.module.scss"
import { Card } from 'antd'
import * as BookingApi from '../../services/bookings-api'
import { NETWORK_ERROR } from "../../utils/helpers/constants"

type Table = {
  id: number,
  tableName: string,
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

const BookingComp: FC = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [errMessage, setErrMessage] = useState('')
  const [currentTable, setCurrentTable] = useState(0)
  const [availableTables, setAvailableTables] = useState<number[]>([])
  const tables = useSelector((state: any) => state.booking.tables)

  const updateCurrentTable = () => {
    console.log("== updateCurrentTable: ");
  }

  useEffect(() => {
    console.log("== useEffect: ");
    fetchAvailableTables();
  }, [])

  const fetchAvailableTables = async () => {
    setLoading(true);
    await BookingApi.getAvailableTables('2024-07-20T10:10:15Z')
    .then((res) => {
        console.log("== fetchAvailableTables: ", res)
        const filteredTables = filetAvailableTables(res)
        console.log("== filteredTables: ", filteredTables);
        setAvailableTables(filteredTables)
        setLoading(false)
        setError(false)
    })
    .catch((e) => {
        console.log("== error: ", e)
        if(e==NETWORK_ERROR) {
            console.log("== Network Error occured. ")
            setErrMessage(NETWORK_ERROR)
        }
        setLoading(false)
        setError(true)
    })
  }

  const filetAvailableTables = (tables: Array<Table>) : Array<number> => {
    return tables.map((obj) => obj.id)
  }

  const checkIfTableAvailable = (tid: number, abailables: Array<number>): boolean => {
    return abailables.indexOf(tid)!==-1;
  }

  return (
    <>
      <div className={`${styles.bookingComp}`}>
        {
          currentTable==0 ? (
            <div className={`${styles.availableTables}`}>
              {tables.map((table: any, index: number) => {
                return (
                  <div key={index}>
                    <Card 
                      title="Table Info" 
                      bordered={true} 
                      style={{ width: 200 }}
                      className={`${styles.tableCard} ${checkIfTableAvailable(table.id, availableTables) ? styles.isActive : ''}`}
                      onClick={checkIfTableAvailable(table.id, availableTables) ? updateCurrentTable : () => {} }
                    >
                      <p>Table No: { table.tableNo }</p>
                      <p>Table Size: { table.tableSize }</p>
                    </Card>
                  </div>
                )
              })}
            </div>
          ) : (
            <div>
              Booking Form
            </div>
          )
        }
      </div>
    </>
  );
};

export default BookingComp;