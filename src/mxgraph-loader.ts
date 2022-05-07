import factory, {type mxGraphExportObject} from 'mxgraph';

export default initialize();

// mxGraph globals
declare global {
  interface Window {
    mxForceIncludes: boolean;
    mxLoadResources: boolean;
    mxLoadStylesheets: boolean;
    mxResourceExtension: string;
  }
}

function initialize(): mxGraphExportObject {
    // set options globally, as it is not working when passing options to the factory (https://github.com/jgraph/mxgraph/issues/479)
    // Required otherwise 'Uncaught ReferenceError: assignment to undeclared variable mx...'
    window.mxForceIncludes = false;
    window.mxLoadResources = false;
    // Required otherwise we got 'Uncaught ReferenceError: assignment to undeclared variable mx...'
    window.mxLoadStylesheets = false;
    window.mxResourceExtension = '.txt';

    return factory({});
}
