// Action types
export const Actions = {
  SET_OVERLAY_STATE: 'SET_OVERLAY_STATE'
};

// Action creators
const createOverlayState = (overlay: boolean) => ({
  type: Actions.SET_OVERLAY_STATE,
  overlay
});

// Actions
export const setOverlayState = (overlay: boolean) => (dispatch: any) =>
  dispatch(createOverlayState(overlay));
