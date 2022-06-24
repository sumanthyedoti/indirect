const fs = require("fs");
const path = require("path");
const sass = require("node-sass");

const COMPONENT_TYPES = ["atoms"];
const getComponents = () => {
  COMPONENT_TYPES.forEach((type) => {
    fs.readdir(`src/${type}`, (err, res) => {
      if (err) {
        console.log(err);
        return;
      }
      res.map((file) => {
        const source = `src/${type}/${file}`;
        const destination = `lib/${file.slice(0, -4) + "css"}`;
        compile(source, destination);
      });
    });
  });
};

const compile = (source, destination) => {
  sass.render(
    {
      file: path.resolve(source),
      includePaths: [path.resolve("src")],
      outputStyle: "expanded",
      outFile: "global.css",
    },
    function (err, result) {
      if (err) {
        console.log(err);
        return;
      }
      const css = result.css.toString();
      fs.writeFile(path.resolve(destination), css, (err, res) => {
        if (err) {
          console.log(err);
          return;
        }
      });
    }
  );
};

compile("src/global.scss", "lib/global.css");
getComponents();

module.exports = {
  getComponents,
};
