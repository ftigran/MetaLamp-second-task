const PrettierPlugin = require("prettier-webpack-plugin");
 
module.exports = function() {
    return {
        plugins: [
            new PrettierPlugin()
          ],
    };
}