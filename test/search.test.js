const assert = require('assert');
const request = require('request');

let message;

beforeEach(async () => {
  message = 'LambdaTest: Most Powerful Cross Browser Testing Tool Online';
});

describe('Search', () => {
  it('can not can search google', async () => {
    const url = 'http://localhost:3002/search';

    request(url, function (error, response, body) {
      assert.equal(response.statusCode, 200);
      assert.equal(body[0], 'wrong title');
      done();
    });
  });

  it('can search google', async () => {
    const url = 'http://localhost:3002/search';

    request(url, function (error, response, body) {
      assert.equal(response.statusCode, 200);
      assert.equal(body[0], message);
      done();
    });
  });
});
