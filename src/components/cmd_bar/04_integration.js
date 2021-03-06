import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import TextField from '@material-ui/core/TextField';

import Icon from '@mdi/react';
import { mdiReflectVertical, mdiMathIntegral } from '@mdi/js';

import {
  clearIntegrationAll, setIntegrationFkr,
} from '../../actions/integration';
import { setUiSweepType } from '../../actions/ui';
import {
  LIST_UI_SWEEP_TYPE,
} from '../../constants/list_ui';
import Cfg from '../../helpers/cfg';
import TriBtn from './tri_btn';
import { MuButton, commonStyle, focusStyle } from './common';

const styles = () => (
  Object.assign(
    {
      field: {
        width: 80,
      },
      txtIcon: {
      },
    },
    commonStyle,
  )
);

const iconSize = '16px';

const setFactor = (
  classes, isDisable, refFactor, setIntegrationFkrAct,
) => {
  const onBlur = e => setIntegrationFkrAct(e.target.value);
  const onChange = e => setIntegrationFkrAct(e.target.value);
  const onEnterPress = (e) => {
    if (e.key === 'Enter') {
      setIntegrationFkrAct(e.target.value);
    }
  };

  return (
    <TextField
      className={classes.field}
      disabled={isDisable}
      id="intg-factor-name"
      type="number"
      value={refFactor || 1.00}
      margin="none"
      InputProps={{
        className: classNames(classes.txtInput, 'txtfield-sv-bar-input'),
      }}
      label={<span className={classNames(classes.txtLabel, 'txtfield-sv-bar-label')}>Ref Area</span>}
      onChange={onChange}
      onBlur={onBlur}
      onKeyPress={onEnterPress}
      variant="outlined"
    />
  );
};

const iconColor = criteria => (criteria ? '#fff' : '#000');

const Integration = ({
  classes, refFactorSt,
  isDisableSt, isFocusAddIntgSt, isFocusRmIntgSt, isFocusSetRefSt,
  setUiSweepTypeAct, setIntegrationFkrAct, clearIntegrationAllAct,
}) => {
  const onSweepIntegtAdd = () => setUiSweepTypeAct(LIST_UI_SWEEP_TYPE.INTEGRATION_ADD);
  const onSweepIntegtRm = () => setUiSweepTypeAct(LIST_UI_SWEEP_TYPE.INTEGRATION_RM);
  const onSweepIntegtSR = () => setUiSweepTypeAct(LIST_UI_SWEEP_TYPE.INTEGRATION_SET_REF);

  return (
    <span className={classes.group}>
      <Tooltip title={<span className="txt-sv-tp">Add Integration</span>}>
        <span>
          <MuButton
            className={
              classNames(
                focusStyle(isFocusAddIntgSt, classes),
              )
            }
            disabled={isDisableSt}
            onClick={onSweepIntegtAdd}
          >
            <Icon
              path={mdiMathIntegral}
              size={iconSize}
              color={iconColor(isFocusAddIntgSt || isDisableSt)}
              className={classNames(classes.iconMdi, 'icon-sv-bar-addint')}
            />
            <span className={classNames(classes.txt, classes.txtIcon, 'txt-sv-bar-addint')}>+</span>
          </MuButton>
        </span>
      </Tooltip>
      <Tooltip title={<span className="txt-sv-tp">Remove Integration</span>}>
        <span>
          <MuButton
            className={
              classNames(
                focusStyle(isFocusRmIntgSt, classes),
              )
            }
            disabled={isDisableSt}
            onClick={onSweepIntegtRm}
          >
            <Icon
              path={mdiMathIntegral}
              size={iconSize}
              color={iconColor(isFocusRmIntgSt || isDisableSt)}
              className={classNames(classes.iconMdi, 'icon-sv-bar-rmint')}
            />
            <span className={classNames(classes.txt, classes.txtIcon, 'txt-sv-bar-rmint')}>-</span>
          </MuButton>
        </span>
      </Tooltip>
      <Tooltip title={<span className="txt-sv-tp">Set Integration Reference</span>}>
        <span>
          <MuButton
            className={
              classNames(
                focusStyle(isFocusSetRefSt, classes),
              )
            }
            disabled={isDisableSt}
            onClick={onSweepIntegtSR}
          >
            <Icon
              path={mdiReflectVertical}
              size={iconSize}
              color={iconColor(isFocusSetRefSt || isDisableSt)}
              className={classNames(classes.iconMdi, 'icon-sv-bar-refint')}
            />
          </MuButton>
        </span>
      </Tooltip>
      {
        setFactor(
          classes, isDisableSt, refFactorSt, setIntegrationFkrAct,
        )
      }
      <TriBtn
        content={{ tp: 'Clear All Integration' }}
        cb={clearIntegrationAllAct}
      >
        <Icon
          path={mdiMathIntegral}
          size={iconSize}
          color={iconColor(isDisableSt)}
          className={classNames(classes.iconMdi, 'icon-sv-bar-rmallint')}
        />
        <span className={classNames(classes.txt, classes.txtIcon, 'txt-sv-bar-rmallint')}>x</span>
      </TriBtn>
    </span>
  );
};

const mapStateToProps = (state, props) => ( // eslint-disable-line
  {
    isDisableSt: Cfg.btnCmdIntg(state.layout),
    isFocusAddIntgSt: state.ui.sweepType === LIST_UI_SWEEP_TYPE.INTEGRATION_ADD,
    isFocusRmIntgSt: state.ui.sweepType === LIST_UI_SWEEP_TYPE.INTEGRATION_RM,
    isFocusSetRefSt: state.ui.sweepType === LIST_UI_SWEEP_TYPE.INTEGRATION_SET_REF,
    refFactorSt: state.integration.present.refFactor,
  }
);

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    setUiSweepTypeAct: setUiSweepType,
    setIntegrationFkrAct: setIntegrationFkr,
    clearIntegrationAllAct: clearIntegrationAll,
  }, dispatch)
);

Integration.propTypes = {
  classes: PropTypes.object.isRequired,
  isDisableSt: PropTypes.bool.isRequired,
  isFocusAddIntgSt: PropTypes.bool.isRequired,
  isFocusRmIntgSt: PropTypes.bool.isRequired,
  isFocusSetRefSt: PropTypes.bool.isRequired,
  refFactorSt: PropTypes.number.isRequired,
  setUiSweepTypeAct: PropTypes.func.isRequired,
  setIntegrationFkrAct: PropTypes.func.isRequired,
  clearIntegrationAllAct: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(Integration));
