import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { compose } from 'redux';

import {
  withStyles, createMuiTheme, MuiThemeProvider,
} from '@material-ui/core/styles';

import SettingsPanel from './settings';
import ModeNavigation from './mode_navigation';
import Manual from './manual';
import { AddPeakPanel, RmPeakPanel } from './peaks';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
});

const styles = () => ({
  panels: {
    height: '65vh',
    overflowX: 'hidden',
    overflowY: 'scroll',
    padding: '0 0 0 0',
  },
});

const PanelViewer = ({
  classes, feature, hasEdit, operations, isMs,
}) => (
  <div>
    <ModeNavigation />
    <div className={classNames(classes.panels)}>
      <MuiThemeProvider
        theme={theme}
      >
        <SettingsPanel
          feature={feature}
          hasEdit={hasEdit}
          operations={operations}
        />
        { isMs ? null : <AddPeakPanel /> }
        { isMs ? null : <RmPeakPanel /> }
        <Manual />
      </MuiThemeProvider>
    </div>
  </div>
);

PanelViewer.propTypes = {
  classes: PropTypes.object.isRequired,
  feature: PropTypes.object.isRequired,
  operations: PropTypes.array.isRequired,
  hasEdit: PropTypes.bool.isRequired,
  isMs: PropTypes.bool.isRequired,
};

export default compose(
  withStyles(styles),
)(PanelViewer);
