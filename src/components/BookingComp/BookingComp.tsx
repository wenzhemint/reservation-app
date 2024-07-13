import { FC, useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import styles from "./BookingComp.module.scss"
import { Card, DatePicker, TimePicker, Spin, Alert, Typography } from 'antd'
import * as BookingApi from '../../services/bookings-api'
import { NETWORK_ERROR } from "../../utils/helpers/constants"
import BookingFormComp from "../BookingFormComp/BookingFormComp"
import dayjs from "dayjs"
import { LoadingOutlined } from '@ant-design/icons'
import { CurrentTableInfo, Table } from "../../models/model"
import * as bookingActions from "../../redux/booking/bookingSlice"

const { Title } = Typography;
const mockTimestamp = '2024-07-20T10:10:15Z'

const BookingComp: FC = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [errMessage, setErrMessage] = useState('')
  const [availableTables, setAvailableTables] = useState<number[]>([])
  const tables = useSelector((state: any) => state.booking.tables)
  const currentTable = useSelector((state: any) => state.booking.selectedTableInfo)

  useEffect(() => {
    console.log("== useEffect: ");
    fetchAvailableTables();
    
  }, [])

  const updateCurrentTable = (table: Table) => {
    const currentTableInfo : CurrentTableInfo = {
      arrivalTime: mockTimestamp,
      selectedTable: table.id,
      tableNo: table.tableNo,
      tableSize: table.tableSize
    }
    dispatch(bookingActions.updateSelectedTableInfo(currentTableInfo))
  }

  const fetchAvailableTables = async () => {
    setLoading(true);
    await BookingApi.getAvailableTables(mockTimestamp)
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

  const onChangeDatePicker = (e: any) => {
    console.log("== onChangeDatePicker: ", e);
  }

  const onChangeTimePicker = (e: any) => {
    console.log("== onChangeTimePicker: ", e);
  }

  return (
    <>
      <div className={`${styles.bookingComp}`}>
        {
          (loading) ? (
            <div className={`${styles.loadingSection}`}>
              <Spin indicator={<LoadingOutlined spin />} size="large" />
            </div>
          ) : (error && !loading) ? (
              <div className={`${styles.errorContent}`}>
                  {errMessage==NETWORK_ERROR ? (
                  <div>
                      <Alert
                      message="Error"
                      description="Network Error occured."
                      type="error"
                      />
                  </div>
                  ) : (
                  <div>
                      <Alert
                      message="Error"
                      description="An Error occured."
                      type="error"
                      />
                  </div>
                  )}
              </div>
          ) : (
            Object.keys(currentTable).length===0 ? (
              <>
                <Title level={3}>Fixed datetime for test</Title>
                <div className={`${styles.datetimePicker}`}>
                  <div>
                      <DatePicker defaultValue={dayjs('2024-07-20', 'YYYY-MM-DD')} disabled onChange={onChangeDatePicker} />
                  </div>
                  <div className={`${styles.timePicker}`}>
                      <TimePicker onChange={onChangeTimePicker} defaultValue={dayjs('10:10:15', 'HH:mm:ss')} disabled />
                  </div>
                </div>
          
                <div className={`${styles.availableTables}`}>
                  {tables.map((table: any, index: number) => {
                    return (
                      <div key={index}>
                        <Card 
                          title="Table Info" 
                          bordered={true} 
                          style={{ width: 200 }}
                          className={`${styles.tableCard} ${checkIfTableAvailable(table.id, availableTables) ? styles.isActive : ''}`}
                          onClick={checkIfTableAvailable(table.id, availableTables) ? () => updateCurrentTable(table) : () => {} }
                        >
                          <p>Table No: { table.tableNo }</p>
                          <p>Table Size: { table.tableSize }</p>
                        </Card>
                      </div>
                    )
                  })}
                </div>
              </>
            ) : (
              <div>
                <BookingFormComp />
              </div>
            )
          )
        }
      </div>
    </>
  );
};

export default BookingComp;