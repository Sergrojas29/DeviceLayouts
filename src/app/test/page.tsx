'use client'
import {useRef, useState, useEffect} from 'react';
import {ReactSVGPanZoom, TOOL_NONE, fitSelection, zoomOnViewerCenter, fitToViewer} from 'react-svg-pan-zoom';
// Define INITIAL_VALUE manually as per react-svg-pan-zoom documentation
const INITIAL_VALUE = {
  version: 2,
  mode: 'idle',
  focus: false,
  viewerWidth: 5000,
  viewerHeight: 5000,
  SVGWidth: 617,
  SVGHeight: 316,
  scaleFactorMin: 0.1,
  scaleFactorMax: 10,
  tool: TOOL_NONE,
  value: {
    version: 2,
    mode: 'idle',
    focus: false,
    viewerWidth: 5000,
    viewerHeight: 5000,
    SVGWidth: 617,
    SVGHeight: 316,
    scaleFactorMin: 0.1,
    scaleFactorMax: 10,
    tool: TOOL_NONE,
    // Add other default properties if needed
  }
};

export default function App() {
  const Viewer = useRef(null);
  const [tool, setTool] = useState(TOOL_NONE)
  const [value, setValue] = useState(INITIAL_VALUE)

  useEffect(() => {
    Viewer.current.fitToViewer();
  }, []);

  /* Read all the available methods in the documentation */
  const _zoomOnViewerCenter1 = () => Viewer.current.zoomOnViewerCenter(1.1)
  const _fitSelection1 = () => Viewer.current.fitSelection(40, 40, 200, 200)
  const _fitToViewer1 = () => Viewer.current.fitToViewer()

  /* keep attention! handling the state in the following way doesn't fire onZoom and onPam hooks */
  const _zoomOnViewerCenter2 = () => setValue(zoomOnViewerCenter(value, 1.1))
  const _fitSelection2 = () => setValue(fitSelection(value, 40, 40, 200, 200))
  const _fitToViewer2 = () => setValue(fitToViewer(value))


  const handleClick = (event) => {
    // Check if it's a left click (event.button === 0)
    if (event.button === 0) {
      console.log('Left click detected!');
      // Perform desired actions for a left click
    }
  };



  return (
    <div>
      <h1>ReactSVGPanZoom</h1>
      <hr/>

      <button className="btn" onClick={() => _zoomOnViewerCenter1()}>Zoom on center (mode 1)</button>
      <button className="btn" onClick={() => _fitSelection1()}>Zoom area 200x200 (mode 1)</button>
      <button className="btn" onClick={() => _fitToViewer1()}>Fit (mode 1)</button>
      <hr/>

      <button className="btn" onClick={() => _zoomOnViewerCenter2()}>Zoom on center (mode 2)</button>
      <button className="btn" onClick={() => _fitSelection2()}>Zoom area 200x200 (mode 2)</button>
      <button className="btn" onClick={() => _fitToViewer2()}>Fit (mode 2)</button>
      <hr/>

      <ReactSVGPanZoom
        ref={Viewer}
        width={1000} height={1000}
        tool={tool} onChangeTool={setTool}
        value={value} onChangeValue={setValue}
        onZoom={e => console.log('zoom')}
        onPan={e => console.log('pan')}
        onClick={event => console.log('click', event.x, event.y, event.originalEvent)}
      >
        <svg width={617} height={316} onClick={handleClick}>
          <g fillOpacity=".5" strokeWidth="4">
            <rect x="400" y="40" width="100" height="200" fill="#4286f4" stroke="#f4f142"/>
            <circle cx="108" cy="108.5" r="100" fill="#0ff" stroke="#0ff"/>
            <circle cx="180" cy="209.5" r="100" fill="#ff0" stroke="#ff0"/>
            <circle cx="220" cy="109.5" r="100" fill="#f0f" stroke="#f0f"/>
          </g>
        </svg>
      </ReactSVGPanZoom>
    </div>
  )
}