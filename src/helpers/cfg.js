import Format from './format';

const btnCmdAnaViewer = layoutSt => (
  Format.isMsLayout(layoutSt)
    || Format.isRamanLayout(layoutSt)
    || Format.is19FLayout(layoutSt)
    || Format.isUvVisLayout(layoutSt)
    || Format.isTGALayout(layoutSt)
);

const hideCmdAnaViewer = () => false;

const btnCmdAddPeak = layoutSt => Format.isMsLayout(layoutSt);

const btnCmdRmPeak = layoutSt => Format.isMsLayout(layoutSt);

const btnCmdSetRef = layoutSt => !Format.isNmrLayout(layoutSt);

const btnCmdIntg = layoutSt => !Format.isNmrLayout(layoutSt);

const btnCmdMpy = layoutSt => !Format.isNmrLayout(layoutSt);

const btnCmdMpyPeak = (layoutSt, mpySt) => {
  const { smExtext } = mpySt;
  return btnCmdMpy(layoutSt) || !smExtext;
};

const hideCmdThres = layoutSt => Format.isMsLayout(layoutSt);

const btnCmdThres = thresVal => !thresVal;

// const hidePanelPeak = layoutSt => Format.isMsLayout(layoutSt);
const hidePanelPeak = layoutSt => true;  // eslint-disable-line

const hidePanelMpy = layoutSt => !Format.isNmrLayout(layoutSt);

const hidePanelCompare = layoutSt => !Format.isIrLayout(layoutSt);

const hideSolvent = layoutSt => !Format.isNmrLayout(layoutSt);

const Config = {
  btnCmdAnaViewer,
  hideCmdAnaViewer,
  btnCmdAddPeak,
  btnCmdRmPeak,
  btnCmdSetRef,
  btnCmdIntg,
  btnCmdMpy,
  btnCmdMpyPeak,
  hideCmdThres,
  btnCmdThres,
  hidePanelPeak,
  hidePanelMpy,
  hidePanelCompare,
  hideSolvent,
};

export default Config;
