import { FC, useContext, useEffect, useState } from "react"
import styles from "./BookingBlock.module.scss"
import { Alert, Spin, ConfigProvider, Button, Typography } from 'antd'
import { useSelector, useDispatch } from "react-redux"
import { CURRENT_PROGRESS, NETWORK_ERROR } from "../../utils/helpers/constants"
import { LoadingOutlined } from '@ant-design/icons'
import { TinyColor } from '@ctrl/tinycolor'
import * as bookingActions from "../../redux/booking/bookingSlice"
import BookingComp from "../BookingComp/BookingComp"

const { Title } = Typography;
type BookingBlockProps = {
    loading: boolean;
    error: boolean;
    errMessage: string;
}
const colors1 = ['#6253E1', '#04BEFE'];
const colors3 = ['#40e495', '#30dd8a', '#2bb673'];
const getHoverColors = (colors: string[]) =>
    colors.map((color) => new TinyColor(color).lighten(5).toString());
const getActiveColors = (colors: string[]) =>
    colors.map((color) => new TinyColor(color).darken(5).toString());
  
const BookingBlock: FC<BookingBlockProps> = ({ loading, error, errMessage }) => {
    const dispatch = useDispatch();
    const current = useSelector((state: any) => state.booking.currentProgres)

    useEffect(() => {
        console.log("BookingBlock mounted.")
    }, [])

    const nextProgress = () => {
        let progresIndex = 0;
        if(current===CURRENT_PROGRESS.BOOK) {
            progresIndex = CURRENT_PROGRESS.INFO
        } else if(current===CURRENT_PROGRESS.INFO) {
            progresIndex = CURRENT_PROGRESS.DONE
        } else {
            progresIndex = CURRENT_PROGRESS.BOOK
        }
        dispatch(bookingActions.updateSelectedTableInfo({}))
        dispatch(bookingActions.updateCurrentProgres(progresIndex))
    }

    return (
      <>
        <div className={`${styles.bookingBlock}`}>
            {(loading) ? (
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
                <div className={`${styles.bookingSection}`}>
                    {(current===CURRENT_PROGRESS.INFO) ? (
                        <BookingComp />
                    ) : (current===CURRENT_PROGRESS.DONE) ? (
                        <div className={`${styles.guideSection}`}>
                            <Title level={3}>Your booking has been created successfully!</Title>
                            <div className={`${styles.guideBtn}`}>
                                <ConfigProvider
                                    theme={{
                                        components: {
                                        Button: {
                                            colorPrimary: `linear-gradient(116deg,  ${colors3.join(', ')})`,
                                            colorPrimaryHover: `linear-gradient(116deg, ${getHoverColors(colors3).join(', ')})`,
                                            colorPrimaryActive: `linear-gradient(116deg, ${getActiveColors(colors3).join(', ')})`,
                                            lineWidth: 0,
                                        },
                                        },
                                    }}
                                    >
                                    <Button type="primary" size="large" onClick={nextProgress} >
                                        All Set
                                    </Button>
                                </ConfigProvider>
                            </div>
                        </div>
                    ) : (
                        <div className={`${styles.guideSection}`}>
                            <Title level={3}>Click and start Booking</Title>
                            <div className={`${styles.guideBtn}`}>
                                <ConfigProvider
                                    theme={{
                                        components: {
                                        Button: {
                                            colorPrimary: `linear-gradient(135deg, ${colors1.join(', ')})`,
                                            colorPrimaryHover: `linear-gradient(135deg, ${getHoverColors(colors1).join(', ')})`,
                                            colorPrimaryActive: `linear-gradient(135deg, ${getActiveColors(colors1).join(', ')})`,
                                            lineWidth: 0,
                                        },
                                        },
                                    }}
                                    >
                                    <Button type="primary" size="large" onClick={nextProgress} >
                                        Start Booking
                                    </Button>
                                </ConfigProvider>
                            </div>
                        </div>
                    )}
                    
                </div>
            )}
        </div>
      </>
    );
  };
  
  export default BookingBlock;