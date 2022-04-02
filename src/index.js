import glob from 'glob'

const allFiles = glob.sync('**/*.test.js')

console.log(allFiles);
