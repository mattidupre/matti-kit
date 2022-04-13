// const { v4: uuidv4 } = require('uuid');

let counter = 0;

// eslint-disable-next-line no-return-assign
const createId = () => `#${(counter += 1)}` as string;

export default createId;
