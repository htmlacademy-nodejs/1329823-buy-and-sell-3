'use strict';

const request = require(`supertest`);
const {getServer} = require(`../api/api-server`);
const {HttpCode} = require(`../../constants`);
const {getMockData} = require(`../lib/get-mock-data`);

let server;
let mockData;

beforeAll(async () => {
  server = await getServer();
  mockData = await getMockData();
});

const newOfferData = {
  category: [`Камни`],
  description: `Таких предложений больше нет!`,
  picture: `item100.jpg`,
  title: `Продам коллекцию журналов «Огонёк».`,
  sum: 33400,
  type: `offer`,
  comments: []
};

const updatedOfferData = {
  category: [`Журналы`],
  description: `При покупке с меня бесплатная доставка в черте города.`,
  title: `TEST`,
  sum: 1000,
  type: `offer`,
  comments: [],
  picture: `item100.jpg`
};

describe(`Check REST API to work with offers`, () => {

  test(`Check all offers`, async () => {
    const res = await request(server).get(`/api/offers`);
    expect(res.statusCode).toBe(HttpCode.OK);
  });

  test(`Check offer by ID`, async () => {
    const offersId = mockData[0].id;
    const res = await request(server)
      .get(`/api/offers/${offersId}`);
    expect(res.statusCode).toBe(HttpCode.OK);
  });

  test(`Check nonexistent offer`, async () => {
    const offerId = `yreu000`;
    const res = await request(server).get(`/api/offers/${offerId}`);
    expect(res.statusCode).toBe(HttpCode.NOT_FOUND);
  });

  test(`Creating a new offer`, async () => {
    const res = await request(server).post(`/api/offers`).send(newOfferData);
    expect(res.statusCode).toBe(HttpCode.CREATED);
  });

  test(`Creating a new offer without data`, async () => {
    const res = await request(server).post(`/api/offers`).send({});
    expect(res.statusCode).toBe(400);
  });

  test(`Getting comments from the offer`, async () => {
    const offerId = mockData[0].id;
    const res = await request(server).get(`/api/offers/${offerId}/comments`);
    expect(res.statusCode).toBe(HttpCode.OK);
  });

  test(`Getting comments from nonexistent offer`, async () => {
    const offerId = `000fff`;
    const res = await request(server).get(`/api/offers/${offerId}/comments`);
    expect(res.statusCode).toBe(HttpCode.NOT_FOUND);
  });

  test(`Creating new comment at offer`, async () => {
    const offerId = mockData[0].id;
    const commentData = {text: `New test comment`};
    const res = await request(server).post(`/api/offers/${offerId}/comments`).send(commentData);
    expect(res.statusCode).toBe(HttpCode.CREATED);
  });

  test(`Creating new comment without data`, async () => {
    const offerId = mockData[0].id;
    const commentData = {message: `New test comment`};
    const res = await request(server).post(`/api/offers/${offerId}/comments`).send(commentData);
    expect(res.statusCode).toBe(400);
  });

  test(`Creating new comment at nonexistent offer`, async () => {
    const offerId = `000fff`;
    const commentData = {text: `New test comment`};
    const res = await request(server).post(`/api/offers/${offerId}/comments`).send(commentData);
    expect(res.statusCode).toBe(404);
  });

  test(`Update offer`, async () => {
    const offerId = mockData[0].id;
    const res = await request(server).put(`/api/offers/${offerId}`).send(updatedOfferData);
    expect(res.statusCode).toBe(HttpCode.OK);
  });

  test(`Update offer without data`, async () => {
    const offerId = mockData[0].id;
    const res = await request(server).put(`/api/offers/${offerId}`).send({});
    expect(res.statusCode).toBe(400);
  });

  test(`Update nonexistent offer`, async () => {
    const offerId = `000fff`;
    const res = await request(server).put(`/api/offers/${offerId}`).send(updatedOfferData);
    expect(res.statusCode).toBe(404);
  });

  test(`Delete offer`, async () => {
    const offerId = mockData[0].id;
    const res = await request(server).delete(`/api/offers/${offerId}`);
    expect(res.statusCode).toBe(HttpCode.OK);
  });

  test(`Delete nonexistent offer`, async () => {
    const offerId = `000fff`;
    const res = await request(server).delete(`/api/offers/${offerId}`);
    expect(res.statusCode).toBe(HttpCode.NOT_FOUND);
  });

  test(`Delete comment from the offer`, async () => {
    const offerId = mockData[0].id;
    const comment = mockData[0].comments[0];
    const commentId = comment.id;
    const res = await request(server).delete(`/api/offers/${offerId}/comments/${commentId}`);
    expect(res.statusCode).toBe(404);
  });

  test(`Delete comment from the nonexistent offer`, async () => {
    const offerId = `000fff`;
    const comment = mockData[0].comments[0];
    const commentId = comment.id;
    const res = await request(server).delete(`/api/offers/${offerId}/comments/${commentId}`);
    expect(res.statusCode).toBe(404);
  });

  test(`Delete nonexistent comment from the offer`, async () => {
    const offerId = mockData[0].id;
    const commentId = `OOOOOO`;
    const res = await request(server).delete(`/api/offers/${offerId}/comments/${commentId}`);
    expect(res.statusCode).toBe(HttpCode.NOT_FOUND);
  });

});
