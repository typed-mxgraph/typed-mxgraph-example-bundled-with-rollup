import mx from './mxgraph-loader';
import {registerCustomShapes} from "./custom-shapes";
import {mxGraph, mxGraphModel} from 'mxgraph';

// even though Rollup is bundling all your files together, errors and
// logs will still point to your original source modules
console.log('if you have sourcemaps enabled in your devtools, click on main.ts:5 -->');
console.log(`Use mxGraph ${mx.mxClient.VERSION} with Typescript!`);

const container = document.getElementById('graph-container') as HTMLElement;
// Disables the built-in context menu
mx.mxEvent.disableContextMenu(container);

const graph: mxGraph = new mx.mxGraph(container);
graph.setConnectable(true);
graph.setAllowDanglingEdges(false);

graph.setPanning(true)
new mx.mxRubberband(graph); // Enables rubber band selection

// shapes and styles
registerCustomShapes();
graph.getStylesheet().getDefaultEdgeStyle()['edgeStyle'] = 'orthogonalEdgeStyle';

const model: mxGraphModel = graph.getModel();
model.beginUpdate();
try {
    const parent = graph.getDefaultParent();
    const vertex01 = graph.insertVertex(parent, null, 'a regular rectangle', 10, 10, 100, 100);
    const vertex02 = graph.insertVertex(parent, null, 'a regular ellipse', 350, 90, 50, 50, `shape=${mx.mxConstants.SHAPE_ELLIPSE};fill=orange`);
    graph.insertEdge(parent, null, 'a regular edge', vertex01, vertex02);
    // insert vertices using custom shapes
    graph.insertVertex(parent, null, 'a custom rectangle', 20, 200, 100, 100, 'shape=customRectangle');
    graph.insertVertex(parent, null, 'a custom ellipse', 150, 350, 70, 70, 'shape=customEllipse');
} finally {
    model.endUpdate();
}
