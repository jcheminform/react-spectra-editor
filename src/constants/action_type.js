const BORDER = {
  UPDATE: 'UPDATE_BORDER',
  RESET: 'RESET_BORDER',
};

const THRESHOLD = {
  UPDATE_VALUE: 'THRESHOLD_UPDATE_VALUE',
  RESET_VALUE: 'THRESHOLD_RESET_VALUE',
  TOGGLE_ISEDIT: 'THRESHOLD_TOGGLE_ISEDIT',
};

const EDITPEAK = {
  CLICK_POINT: 'EDITPEAK_CLICK_POINT',
  ADD_POSITIVE: 'ADD_TO_POSITIVE_EDITPEAK_LIST',
  ADD_NEGATIVE: 'ADD_TO_NEGATIVE_EDITPEAK_LIST',
  RM_NEGATIVE: 'RM_FROM_NEGATIVE_EDITPEAK_LIST',
  RM_POSITIVE: 'RM_FROM_POSITIVE_EDITPEAK_LIST',
  SHIFT: 'EDITPEAK_SHIFT',
};

const STATUS = {
  TOGGLEBTNSUBMIT: 'TOGGLE_BTN_SUBMIT',
  TOGGLEBTNALL: 'TOGGLE_BTN_ALL',
  ENABLEBTNALL: 'ENABLE_BTN_ALL',
};

const MANAGER = {
  RESETALL: 'RESET_ALL',
  RESETSHIFT: 'RESET_SHIFT',
};

const LAYOUT = {
  UPDATE: 'UPDATE_LAYOUT',
};

const SHIFT = {
  SET_REF: 'SHIFT_SET_REF',
  SET_PEAK: 'SHIFT_SET_PEAK',
  RM_PEAK: 'SHIFT_RM_PEAK',
};

const MODE = {
  SET_EDIT: 'SET_EDIT_MODE',
};

const SCAN = {
  SET_TARGET: 'SCAN_SET_TARGET',
  RESET_TARGET: 'SCAN_RESET_TARGET',
  RESET_ALL: 'SCAN_RESET_ALL',
  TOGGLE_ISAUTO: 'SCAN_TOGGLE_ISAUTO',
};

const UI = {
  VIEWER: {
    SET_PANEL_IDX: 'UI_VIEWER_SET_PANEL_IDX',
  },
};

export {
  BORDER, THRESHOLD, EDITPEAK, STATUS, MANAGER, LAYOUT, SHIFT, MODE, SCAN, UI,
};
