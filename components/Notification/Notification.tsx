import React from 'react'

import { NotificationSuccess, NotificationError } from '../../styles'

interface IProps {
  error?: boolean;
  message: string;
}

export const Notification = (props: IProps) => {
  const Note = props.error ? NotificationError : NotificationSuccess;
  return (<Note>{props.message}</Note>);
}
