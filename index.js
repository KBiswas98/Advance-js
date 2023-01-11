const { reduce, customReduce } = require("./polyfills");
const { promise, concurrentPromise, allPromises } = require("./promise");
const { concurrentPromiseWithCallback } = require("./taskRunner");

const execution = () => {
  const [_nodePath, _filePath, filename] = process.argv

  switch (filename) {
    case "reduce": {
      reduce();
      break;
    }
    case 'promise': {
      promise();
      break;
    }
    case 'concurrent-promise': {
      concurrentPromise();
      break;
    }
    case 'concurrent-task-promise': {
      concurrentPromiseWithCallback();
      break;
    }
    case 'customReduce': {
      customReduce();
      break;
    }
    case 'allPromises': {
      allPromises();
      break;
    }

    default: {
      console.log("Please pass a file name in the argument.");
    }
  }
};

execution();
