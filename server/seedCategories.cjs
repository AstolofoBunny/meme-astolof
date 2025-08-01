require('ts-node').register({
  transpileOnly: true,
  compilerOptions: {
    module: "CommonJS"
  }
});
require('./seedCategories.ts');
