'use strict';

const request = require(`supertest`);
const {getServer} = require(`../api/api-server`);
const {getMockData} = require(`../lib/get-mock-data`);
const {HttpCode} = require(`../../constants`);

let server;
let mockData;

beforeAll(async () => {
  server = await getServer();
  mockData = await getMockData();
});

describe(`Check REST API to work with search`, () => {
  test(`Get empty offers array`, async () => {
    const res = await request(server).get(`/api/search`).query({query: `Offer search test text`});
    expect(res.statusCode).toBe(HttpCode.OK);
  });

  test(`Get search offers array`, async () => {
    const res = await request(server).get(`/api/search`).query({query: mockData[0].title});
    expect(res.statusCode).toBe(HttpCode.OK);
  });

});
