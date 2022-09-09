const assert = require('assert');
const Google = require('../search');

let server;
let message;

beforeEach(async () => {
  message = 'LambdaTest: Most Powerful Cross Browser Testing Tool Online';
});

describe('Search', () => {
  it('can not can search google', async () => {
    assert.notEqual(message, 'wrong title');
  });

  it('can search google', async () => {
    assert.equal(
      message,
      'LambdaTest: Most Powerful Cross Browser Testing Tool Online'
    );
  });
});
