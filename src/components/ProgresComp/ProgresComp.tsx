import { FC } from "react"
import { useSelector } from "react-redux"
import styles from "./ProgresComp.module.scss"
import { Steps } from 'antd'

const ProgresComp: FC = () => {
  const current = useSelector((state: any) => state.booking.currentProgres)
  return (
    <>
      <div className={`${styles.progresComp}`}>
          <Steps 
              current={current}
              items={[
                {
                  title: 'Book',
                  description: "click to start booking.",
                },
                {
                  title: 'In Progress',
                  description: "Please fill the info.",
                },
                {
                  title: 'Done',
                  description: "you are done.",
                },
              ]}
          />
      </div>
    </>
  );
};

export default ProgresComp;