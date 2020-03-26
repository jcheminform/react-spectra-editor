import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { withStyles } from '@material-ui/core/styles';

import { updateOperation } from './actions/submit';
import { resetInitCommon, resetInitNmr, resetInitMs } from './actions/manager';
import { updateMetaPeaks } from './actions/meta';
import LayerPrism from './layer_prism';
import Format from './helpers/format';

const styles = () => ({
});

class LayerInit extends React.Component {
  constructor(props) {
    super(props);

    this.normChange = this.normChange.bind(this);
    this.execReset = this.execReset.bind(this);
    this.initReducer = this.initReducer.bind(this);
  }

  componentDidMount() {
    this.execReset();
    this.initReducer();
  }

  componentDidUpdate(prevProps) {
    this.normChange(prevProps);
  }

  normChange(prevProps) {
    const prevFeatures = prevProps.entity.features;
    const prevPeak = prevFeatures.editPeak || prevFeatures.autoPeak;
    const { entity } = this.props;
    const nextFeatures = entity.features;
    const nextPeak = nextFeatures.editPeak || nextFeatures.autoPeak;

    if (prevPeak !== nextPeak) {
      this.execReset();
    }
  }

  execReset() {
    const {
      entity, updateMetaPeaksAct,
      resetInitCommonAct, resetInitMsAct, resetInitNmrAct,
    } = this.props;
    resetInitCommonAct();
    const { layout, features } = entity;
    if (Format.isMsLayout(layout)) {
      // const { autoPeak, editPeak } = features; // TBD
      const autoPeak = features.autoPeak || features[0];
      const editPeak = features.editPeak || features[0];
      const baseFeat = editPeak || autoPeak;
      resetInitMsAct(baseFeat);
    }
    if (Format.isNmrLayout(layout)) {
      const { integration, multiplicity } = features;
      updateMetaPeaksAct(entity);
      resetInitNmrAct({
        integration, multiplicity,
      });
    }
  }

  initReducer() {
    const { operations, updateOperationAct } = this.props;
    updateOperationAct(operations[0]);
  }

  render() {
    const {
      entity, cLabel, xLabel, yLabel, operations, forecast, molSvg, editorOnly,
    } = this.props;
    const target = entity.spectra[0];

    const xxLabel = !xLabel && xLabel === '' ? `X (${target.xUnit})` : xLabel;
    const yyLabel = !yLabel && yLabel === '' ? `Y (${target.yUnit})` : yLabel;

    return (
      <LayerPrism
        entity={entity}
        cLabel={cLabel}
        xLabel={xxLabel}
        yLabel={yyLabel}
        forecast={forecast}
        operations={operations}
        molSvg={molSvg}
        editorOnly={editorOnly}
      />
    );
  }
}

const mapStateToProps = (state, props) => ( // eslint-disable-line
  {}
);

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    resetInitCommonAct: resetInitCommon,
    resetInitNmrAct: resetInitNmr,
    resetInitMsAct: resetInitMs,
    updateOperationAct: updateOperation,
    updateMetaPeaksAct: updateMetaPeaks,
  }, dispatch)
);

LayerInit.propTypes = {
  entity: PropTypes.object.isRequired,
  cLabel: PropTypes.string.isRequired,
  xLabel: PropTypes.string.isRequired,
  yLabel: PropTypes.string.isRequired,
  molSvg: PropTypes.string.isRequired,
  editorOnly: PropTypes.bool.isRequired,
  forecast: PropTypes.object.isRequired,
  operations: PropTypes.array.isRequired,
  resetInitCommonAct: PropTypes.func.isRequired,
  resetInitNmrAct: PropTypes.func.isRequired,
  resetInitMsAct: PropTypes.func.isRequired,
  updateOperationAct: PropTypes.func.isRequired,
  updateMetaPeaksAct: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps, mapDispatchToProps,
)(withStyles(styles)(LayerInit));
