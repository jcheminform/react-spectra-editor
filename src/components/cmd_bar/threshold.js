import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import CloudDoneOutlinedIcon from '@material-ui/icons/CloudDoneOutlined';
import HowToRegOutlinedIcon from '@material-ui/icons/HowToRegOutlined';
import RefreshOutlinedIcon from '@material-ui/icons/RefreshOutlined';

import Cfg from '../../helpers/cfg';
import {
  updateThresholdValue, resetThresholdValue, toggleThresholdIsEdit,
} from '../../actions/threshold';

const styles = () => ({
  txtField: {
    width: 110,
    margin: '6px 3px 0 3px',
  },
  txtInput: {
    height: 30,
    fontSize: '0.9rem',
    fontFamily: 'Helvetica',
  },
  txtPercent: {
    fontSize: '0.9rem',
    fontFamily: 'Helvetica',
  },
  btn: {
    minWidth: 40,
  },
});

const txtPercent = () => (
  <InputAdornment position="end">
    <span className="txt-percent">
      %
    </span>
  </InputAdornment>
);

const setThreshold = (
  classes, thresVal, updateThresholdValueAct,
) => {
  const onBlur = e => updateThresholdValueAct(e.target.value);
  const onChange = e => updateThresholdValueAct(e.target.value);
  const onEnterPress = (e) => {
    if (e.key === 'Enter') {
      updateThresholdValueAct(e.target.value);
    }
  };

  return (
    <TextField
      className={classNames(classes.txtField, 'txt-cmd-field')}
      disabled={Cfg.btnCmdThres(thresVal)}
      id="outlined-name"
      placeholder="N.A."
      type="number"
      value={thresVal || false}
      margin="none"
      InputProps={{
        endAdornment: txtPercent(),
        className: classNames(classes.txtInput, 'txt-sv-input-label'),
      }}
      label={<span className={classNames('cmd-txt-label')}>Threshold</span>}
      onChange={onChange}
      onBlur={onBlur}
      onKeyPress={onEnterPress}
      variant="outlined"
    />
  );
};

const restoreIcon = (hasEdit, isEdit) => (
  hasEdit && isEdit ? <HowToRegOutlinedIcon /> : <CloudDoneOutlinedIcon />
);

const restoreTp = (hasEdit, isEdit) => (
  hasEdit && isEdit ? 'User Defined Threshold' : 'Auto Picked Threshold'
);

const Threshold = ({
  classes, feature, hasEdit, layoutSt, thresSt,
  updateThresholdValueAct, resetThresholdValueAct, toggleThresholdIsEditAct,
}) => {
  const thresVal = thresSt.value || feature.thresRef;
  const { isEdit } = thresSt;

  return (
    <span className={classes.group}>
      { setThreshold(classes, thresVal, updateThresholdValueAct) }
      <Tooltip title={<span className="txt-sv-tp">Restore Threshold</span>}>
        <Button
          className={classes.btn}
          disabled={Cfg.btnCmdThres(thresVal)}
          onClick={resetThresholdValueAct}
        >
          <RefreshOutlinedIcon />
        </Button>
      </Tooltip>
      {
        Cfg.hideCmdThres(layoutSt)
          ? null
          : (
            <Tooltip title={<span className="txt-sv-tp">{restoreTp(hasEdit, isEdit)}</span>}>
              <Button
                className={classes.btn}
                disabled={Cfg.btnCmdThres(thresVal)}
                onClick={toggleThresholdIsEditAct}
              >
                { restoreIcon(hasEdit, isEdit) }
              </Button>
            </Tooltip>
          )
      }
    </span>
  );
};

const mapStateToProps = (state, props) => ( // eslint-disable-line
  {
    layoutSt: state.layout,
    thresSt: state.threshold,
  }
);

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    updateThresholdValueAct: updateThresholdValue,
    resetThresholdValueAct: resetThresholdValue,
    toggleThresholdIsEditAct: toggleThresholdIsEdit,
  }, dispatch)
);

Threshold.propTypes = {
  classes: PropTypes.object.isRequired,
  feature: PropTypes.object.isRequired,
  hasEdit: PropTypes.bool.isRequired,
  layoutSt: PropTypes.string.isRequired,
  thresSt: PropTypes.object.isRequired,
  updateThresholdValueAct: PropTypes.func.isRequired,
  resetThresholdValueAct: PropTypes.func.isRequired,
  toggleThresholdIsEditAct: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(Threshold));