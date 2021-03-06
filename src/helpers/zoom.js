import * as d3 from 'd3';

const resetZoom = (main) => {
  main.svg.call(main.zoom.transform, d3.zoomIdentity);
  main.svg.selectAll('.brush').call(main.brush.move, null);
};

const MountZoom = (main, zoomed) => {
  const zoomedCb = () => zoomed(main);
  const resetZoomCb = () => {
    d3.event.stopPropagation();
    d3.event.preventDefault();
    resetZoom(main);
  };

  main.zoom.on('zoom', zoomedCb);
  main.svg.call(main.zoom)
    .on('contextmenu.zoom', resetZoomCb);
};

export default MountZoom;
