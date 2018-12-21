import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';

import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';

import { setShiftRef } from '../../actions/shift';
import LIST_SHIFT from '../../constants/list_shift';

const Styles = () => ({
  formControl: {
    margin: '10px 20px 0px 10px',
    minWidth: 150,
  },
});

const txtInputLabel = () => (
  <InputLabel>
    <span className="txt-input-label">
      Reference (ppm)
    </span>
  </InputLabel>
);

const shiftSelection = (shiftRefSt, onChange) => {
  const content = LIST_SHIFT.map(ref => (
    <MenuItem value={ref} key={ref.name}>
      <span className="txt-sv-input-label">
        { `${ref.name}: ${ref.value}` }
      </span>
    </MenuItem>
  ));

  return (
    <Select value={shiftRefSt} onChange={onChange}>
      { content }
    </Select>
  );
};

const ShiftSelect = ({
  classes, shiftRefSt, setShiftRefAct,
}) => {
  const onChange = e => setShiftRefAct(e.target.value);

  return (
    <ExpansionPanelDetails>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Grid item xs={12}>
          <FormControl
            variant="outlined"
            className={classNames(classes.formControl)}
          >
            { txtInputLabel() }
            { shiftSelection(shiftRefSt, onChange) }
          </FormControl>
        </Grid>
      </Grid>
    </ExpansionPanelDetails>
  );
};

const mapStateToProps = (state, props) => ( // eslint-disable-line
  {
    shiftRefSt: state.shift.ref,
  }
);

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    setShiftRefAct: setShiftRef,
  }, dispatch)
);

ShiftSelect.propTypes = {
  classes: PropTypes.object.isRequired,
  shiftRefSt: PropTypes.object.isRequired,
  setShiftRefAct: PropTypes.func.isRequired,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(Styles),
)(ShiftSelect);
