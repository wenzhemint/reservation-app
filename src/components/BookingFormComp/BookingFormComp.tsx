import { FC, useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import styles from "./BookingFormComp.module.scss"
import * as BookingApi from '../../services/bookings-api'
import { CURRENT_PROGRESS, NETWORK_ERROR } from "../../utils/helpers/constants"
import {
  Button,
  DatePicker,
  TimePicker,
  Form,
  Input,
  Radio,
  Select,
  FormProps,
  Alert,
  Spin,
  Typography
} from 'antd'
import dayjs from "dayjs"
import * as bookingActions from "../../redux/booking/bookingSlice"
import { LoadingOutlined } from '@ant-design/icons'

const { Title } = Typography
type FieldType = {
  guestName?: string;
  contactInfo?: string;
}

const BookingFormComp: FC = () => {
  const dispatch = useDispatch();
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 24 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 24 },
    },
  }
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [errMessage, setErrMessage] = useState('')
  const selectedTable = useSelector((state: any) => state.booking.selectedTableInfo)

  useEffect(() => {

  }, [])

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);

    const guestName = values.guestName
    const contactInfo = values.contactInfo

    if(!guestName || !contactInfo) {
      return;
    }
    
    createBooking(guestName, contactInfo)
  }
  
  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  }

  const createBooking = async (guestName: string, contactInfo: string) => {
    setLoading(true);
    const newBooking = {
      guestName: guestName,
      contactInfo: contactInfo,
      arrivalTime: selectedTable.arrivalTime,
      tableInfoId: selectedTable.selectedTable
    }
    await BookingApi.createNewBooking(newBooking)
    .then((res) => {
        console.log("== tablesList: ", res)
        dispatch(bookingActions.updateSelectedTableInfo({}))
        dispatch(bookingActions.updateCurrentProgres(CURRENT_PROGRESS.DONE))
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

  return (
    <>
      {
        (error && !loading) && (
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
        )
      }
      {
        (loading) ? (
          <div className={`${styles.loadingSection}`}>
              <Spin indicator={<LoadingOutlined spin />} size="large" />
          </div>
        ) : (
          <div className={`${styles.bookingFormComp}`}>
            <Title level={3}>Please Fill Booking Information</Title>
            <Form
              {...formItemLayout}
              labelAlign="left"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              style={{ maxWidth: 600, textAlign: 'start' }}
            >
              <Form.Item 
                label="Guest Name"
                name="guestName" 
                rules={[{ required: true, message: 'Please input Guest Name!' }]}
              >
                <Input placeholder="Please enter Guest Name" />
              </Form.Item>
              <Form.Item 
                label="Contact Info"
                name="contactInfo" 
                rules={[{ required: true, message: 'Please input Contact Info!' }]}
              >
                <Input placeholder="Please enter Contact Info" />
              </Form.Item>
              <Form.Item label="Table No.">
                <Select defaultValue="fixed" disabled>
                  <Select.Option value="fixed">{selectedTable.tableNo}</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label="Table Size">
                <Radio.Group defaultValue={selectedTable.tableSize} disabled>
                  <Radio value="M"> M </Radio>
                  <Radio value="L"> L </Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item label="Arrival Date">
                <DatePicker defaultValue={dayjs('2024-07-20', 'YYYY-MM-DD')} disabled />
              </Form.Item>
              <Form.Item label="Arrival Time">
                <TimePicker defaultValue={dayjs('10:10:15', 'HH:mm:ss')} disabled />
              </Form.Item>
              <Form.Item style={{textAlign: 'center'}}>
                <Button type="primary" htmlType="submit" style={{textTransform: 'uppercase', width: '100%'}}>
                  create booking
                </Button>
              </Form.Item>
            </Form>
          </div>
        )
      }
    </>
  );
};

export default BookingFormComp;