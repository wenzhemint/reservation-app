import { FC } from "react"
import { useSelector } from "react-redux"
import styles from "./BookingComp.module.scss"
import { Card, Col, Row } from 'antd'

const BookingComp: FC = () => {
  const tables = useSelector((state: any) => state.booking.tables)
  return (
    <>
      <div className={`${styles.progresComp}`}>
        <Row gutter={16}>
        {tables.map((table: any) => {
          return <li>{table.id}</li>;
        })}
          <Col span={8}>
            <Card title="Card title" bordered={false}>
              Card content
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default BookingComp;