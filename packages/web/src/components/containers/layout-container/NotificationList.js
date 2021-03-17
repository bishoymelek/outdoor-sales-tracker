/* eslint-disable react/no-array-index-key */
import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';

const dummyList = [
  {
    title: 'Today',
    isTitle: true
  },
  {
    title: 'Check the updates!'
  }
];
function NotificationList(props) {
  // eslint-disable-next-line react/destructuring-assignment
  const list = props.list || dummyList;
  return (
    <ListGroup className="list-group-accent" tag="div">
      {list &&
        list.map((item, index) => {
          if (item.isTitle) {
            return (
              <ListGroupItem
                key={index}
                className="list-group-item-accent-secondary bg-light text-center font-weight-bold text-muted text-uppercase small"
              >
                {item.title}
              </ListGroupItem>
            );
          }
          return <ListGroupItem key={index}>{item.title}</ListGroupItem>;
        })}
    </ListGroup>
  );
}

export default NotificationList;
