// Action types
export const Actions = {
  SET_OVERLAY_STATE: 'SET_OVERLAY_STATE',
  SET_NOTIFICATION: 'SET_NOTIFICATION'
};

// Action creators /////////////////////////////////////////////////////////////////////////////////////////////////////
const createOverlayState = (overlay: boolean) => ({
  type: Actions.SET_OVERLAY_STATE,
  overlay
});

export const actionSetNotification = (notification: string, notificationError: boolean) => ({
  type: Actions.SET_NOTIFICATION,
  notification,
  notificationError
});

// Actions /////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const setOverlayState = (overlay: boolean) => (dispatch: any) =>
  dispatch(createOverlayState(overlay));

export const setNotification = (notification: string, notificationError: boolean) => (dispatch: any) =>
  dispatch(actionSetNotification(notification, notificationError));
