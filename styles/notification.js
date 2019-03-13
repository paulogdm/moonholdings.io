import styled from 'styled-components';

export const NotificationDiv = styled.div`
  z-index: 11;
  position: fixed;
  left: 50%;
  margin-left: -160px;
  top: 1rem;
  padding: 1.5rem;
  width: 320px;
  height: auto;
  text-align: center;
  color: ${props => props.theme.offWhite};
  cursor: pointer;
`

export const NotificationSuccess = styled(NotificationDiv)`
  background: ${props => props.theme.green};
`

export const NotificationError = styled(NotificationDiv)`
  background: ${props => props.theme.red};
`
