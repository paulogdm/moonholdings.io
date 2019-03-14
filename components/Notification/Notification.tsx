import React from 'react'

import { NotificationSuccess, NotificationError } from '../../styles'

interface IProps {
  error?: boolean;
  message: string;
  class: string;
  onClick(): void;
}

export const Notification = (props: IProps) => {
  const Note = props.error ? NotificationError : NotificationSuccess;
  return (<Note className={props.class} onClick={props.onClick}>{props.message}</Note>);
}
