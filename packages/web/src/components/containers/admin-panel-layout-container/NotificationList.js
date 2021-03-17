import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';

function NotificationList({ list }) {
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
