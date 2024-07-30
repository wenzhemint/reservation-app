import { FC } from "react"
import { useSelector, useDispatch } from "react-redux"
import styles from "./ProgresComp.module.scss"
import { Steps } from 'antd'
import { CURRENT_PROGRESS } from "../../utils/helpers/constants"
import * as bookingActions from "../../redux/booking/bookingSlice"

const ProgresComp: FC = () => {
  const dispatch = useDispatch();
  const current = useSelector((state: any) => state.booking.currentProgres)

  const onChange = (value: number) => {
    if(value === CURRENT_PROGRESS.BOOK) {
      dispatch(bookingActions.updateCurrentProgres(CURRENT_PROGRESS.BOOK))
    }
  }
  return (
    <>
      <div className={`${styles.progresComp}`}>
          <Steps 
              current={current}
              onChange={onChange}
              items={[
                {
                  title: 'Book',
                  description: "click to start booking.",
                },
                {
                  title: 'In Progress',
                  description: "Please fill the info.",
                  disabled: true
                },
                {
                  title: 'Done',
                  description: "you are done.",
                  disabled: true
                },
              ]}
          />
      </div>
    </>
  );
};

export default ProgresComp;