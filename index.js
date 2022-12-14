const {reduce} = require("./polyfills");

const execution = () => {
  const [_nodePath, _filePath, filename] = process.argv

  switch (filename) {
    case "reduce": {
      reduce();
      break;
    }
    default: {
      console.log("Please pass a file name in the argument.");
    }
  }
};

execution();
