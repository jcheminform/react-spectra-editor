import * as d3 from 'd3';

const tfRescale = (focus) => {
  const tf = d3.zoomTransform(d3.select('.canvas-main').node());
  const xt = tf.rescaleX(focus.scales.x);
  const yt = tf.rescaleY(focus.scales.y);
  return { xt, yt };
};

const fetchPt = (focus, xt) => {
  const mouseX = xt.invert(d3.mouse(focus.root.node())[0]);
  const bisectDate = d3.bisector(d => +d.x).left;
  const dt = focus.data;
  const ls = dt.length;
  const sortData = ls > 0 && dt[0].x > dt[ls - 1].x ? dt.reverse() : dt;
  const idx = bisectDate(sortData, +mouseX);
  return sortData[idx];
};

const mouseMove = (focus) => {
  const transf = tfRescale(focus);
  const pt = fetchPt(focus, transf.xt);
  if (pt) {
    const tx = transf.xt(pt.x);
    const ty = transf.yt(pt.y);
    focus.compass.attr('transform', `translate(${tx},${ty})`);
    focus.compass.select('.x-hover-line')
      .attr('y1', 0 - ty)
      .attr('y2', focus.h - ty);
  }
};

const rightClick = (focus) => {
  d3.event.preventDefault();
  const transf = tfRescale(focus);
  const pt = fetchPt(focus, transf.xt);
  focus.addToPosListAct(pt);
};

const MountCompass = (canvas) => {
  const { focus } = canvas;
  const { compass, overlay } = focus;

  compass.append('line')
    .attr('class', 'x-hover-line hover-line')
    .attr('stroke', '#777')
    .attr('stroke-width', 1)
    .attr('stroke-dasharray', 2, 2);

  compass.append('circle')
    .attr('r', 4)
    .attr('fill', 'none')
    .attr('stroke', '#777')
    .attr('stroke-width', 2);

  overlay
    .on('mouseover', () => compass.attr('display', null))
    .on('mouseout', () => compass.attr('display', 'none'))
    .on('mousemove', () => mouseMove(focus))
    .on('contextmenu', () => rightClick(focus));
};

export default MountCompass;