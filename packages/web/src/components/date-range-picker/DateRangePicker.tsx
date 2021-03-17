import React, { useState } from 'react';
import { Row, Col } from 'reactstrap';
// @ts-ignore
import CoreDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function DatePicker(props: any): JSX.Element {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState();
  return (
    <Row>
      <Col>
        <h6>Start Date</h6>
        <CoreDatePicker
          selected={startDate}
          isClearable
          onChange={(date: any) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
        />
      </Col>
      <Col>
        <h6>End Date</h6>
        <CoreDatePicker
          selected={endDate}
          isClearable
          onChange={(date: any) => setEndDate(date)}
          selectsEnd
          endDate={endDate}
          minDate={startDate}
        />
      </Col>
    </Row>
  );
}

export default DatePicker;
