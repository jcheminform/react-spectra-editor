import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Dropzone from 'react-dropzone';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';
import { withStyles } from '@material-ui/core/styles';

import Format from '../../helpers/format';
import { rmOthersOne, toggleShow } from '../../actions/jcamp';

const styles = theme => ({
  panel: {
    backgroundColor: '#eee',
    display: 'table-row',
  },
  panelSummary: {
    backgroundColor: '#eee',
    height: 32,
  },
  txtBadge: {
  },
  panelDetail: {
    backgroundColor: '#fff',
    maxHeight: 'calc(90vh - 220px)', // ROI
    overflow: 'auto',
  },
  table: {
    width: '100%',
  },
  tTxt: {
    padding: 0,
  },
  tTxtHide: {
    color: '#D5D8DC',
  },
  tRow: {
    height: 28,
    '&:nth-of-type(even)': {
      backgroundColor: theme.palette.background.default,
    },
  },
  rmBtn: {
    color: 'red',
    padding: '0 5px 0 5px',
    '&:hover': {
      borderRadius: 12,
      backgroundColor: 'red',
      color: 'white',
    },
  },
  showBtn: {
    color: 'steelblue',
    padding: '0 5px 0 5px',
    '&:hover': {
      borderRadius: 12,
      backgroundColor: 'steelblue',
      color: 'white',
    },
  },
  hideBtn: {
    color: 'gray',
    padding: '0 5px 0 5px',
    '&:hover': {
      borderRadius: 12,
      backgroundColor: 'gray',
      color: 'white',
    },
  },
  square: {
    textAlign: 'center !important',
  },
  baseDD: {
    backgroundColor: 'white',
    border: '1px dashed black',
    borderRadius: 5,
    height: 26,
    lineHeight: '26px',
    margin: '7px 0 7px 0',
    textAlign: 'center',
    verticalAlign: 'middle',
    width: '90%',
  },
  enableDD: {
    border: '2px dashed #000',
    color: '#000',
  },
  disableDD: {
    border: '2px dashed #aaa',
    color: '#aaa',
  },
  tpCard: {
  },
  tpMoreTxt: {
    padding: '0 0 0 60px',
  },
  tpLabel: {
    fontSize: 16,
  },
});

const msgDefault = 'Add spectra to compare.';

const tpHint = classes => (
  <span className={classNames(classes.tpCard)}>
    <p className={classNames(classes.tpLabel, 'txt-sv-tp')}>
      - Accept *.dx, *.jdx, *.JCAMP,
    </p>
    <p className={classNames(classes.tpLabel, 'txt-sv-tp')}>
      - Max 5 spectra.
    </p>
  </span>
);

const content = (classes, desc) => (
  <Tooltip
    title={tpHint(classes)}
    placement="bottom"
  >
    <span className={classNames(classes.tpLabel, 'txt-sv-tp')}>
      { desc }
    </span>
  </Tooltip>
);

const inputOthers = (
  classes, addOthersCbSt,
) => {
  const fileName = '';
  const desc = fileName || msgDefault;
  const onDrop = (jcamps) => {
    if (!addOthersCbSt) return;
    addOthersCbSt({ jcamps });
  };

  return (
    <Dropzone
      className="dropbox"
      onDrop={onDrop}
    >
      {
        ({ getRootProps, getInputProps }) => (
          <div
            {...getRootProps()}
            className={classNames(classes.baseDD)}
          >
            <input {...getInputProps()} />
            { content(classes, desc) }
          </div>
        )
      }
    </Dropzone>
  );
};

const compareList = (
  classes, othersSt, rmOthersOneAct, toggleShowAct,
) => {
  const rows = othersSt.map((o, idx) => (
    {
      idx,
      title: o.spectra[0].title,
      color: Format.compareColors(idx),
      rmCb: () => rmOthersOneAct(idx),
      isShow: o.show,
      toggleShowCb: () => toggleShowAct(idx),
    }
  ));

  return (
    <Table className={classes.table}>
      <TableBody>
        {
          rows.map(row => (
            <TableRow key={row.idx} className={classes.tRow} hover>
              <TableCell
                align="right"
                className={classNames(classes.tTxt, classes.square, 'txt-sv-panel-txt')}
                style={{ backgroundColor: row.color }}
              >
                { row.idx + 1 }
              </TableCell>
              <TableCell align="right" className={classNames(classes.tTxt, 'txt-sv-panel-txt', row.isShow ? null : classes.tTxtHide)}>
                { row.title }
              </TableCell>
              <TableCell align="right" className={classNames(classes.tTxt, 'txt-sv-panel-txt')}>
                {
                  row.isShow
                    ? (
                      <VisibilityOutlinedIcon
                        onClick={row.toggleShowCb}
                        className={classes.showBtn}
                      />
                    )
                    : (
                      <VisibilityOffOutlinedIcon
                        onClick={row.toggleShowCb}
                        className={classes.hideBtn}
                      />
                    )
                }
                <HighlightOffIcon onClick={row.rmCb} className={classes.rmBtn} />
              </TableCell>
            </TableRow>
          ))
        }
      </TableBody>
    </Table>
  );
};

const ComparePanel = ({
  classes, expand, onExapnd, othersSt, addOthersCbSt,
  rmOthersOneAct, toggleShowAct,
}) => (
  <ExpansionPanel
    expanded={expand}
    onChange={onExapnd}
    className={classNames(classes.panel)}
    TransitionProps={{ unmountOnExit: true }} // increase ExpansionPanel performance
  >
    <ExpansionPanelSummary
      expandIcon={<ExpandMoreIcon />}
      className={classNames(classes.panelSummary)}
    >
      <Typography className="txt-panel-header">
        <span className={classNames(classes.txtBadge, 'txt-sv-panel-title')}>
          Spectra Comparisons
        </span>
      </Typography>
    </ExpansionPanelSummary>
    <Divider />
    { inputOthers(classes, addOthersCbSt) }
    <div className={classNames(classes.panelDetail)}>
      {
        compareList(classes, othersSt, rmOthersOneAct, toggleShowAct)
      }
    </div>
  </ExpansionPanel>
);

const mapStateToProps = (state, props) => ( // eslint-disable-line
  {
    othersSt: state.jcamp.others,
    addOthersCbSt: state.jcamp.addOthersCb,
  }
);

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    rmOthersOneAct: rmOthersOne,
    toggleShowAct: toggleShow,
  }, dispatch)
);

ComparePanel.propTypes = {
  classes: PropTypes.object.isRequired,
  expand: PropTypes.bool.isRequired,
  onExapnd: PropTypes.func.isRequired,
  othersSt: PropTypes.array.isRequired,
  addOthersCbSt: PropTypes.func.isRequired,
  rmOthersOneAct: PropTypes.func.isRequired,
  toggleShowAct: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps, mapDispatchToProps,
)(withStyles(styles)(ComparePanel));
