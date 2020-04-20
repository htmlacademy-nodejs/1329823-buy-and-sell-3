'use strict';

const fs = require(`fs`).promises;
const request = require(`supertest`);
const server = require(`./index`);
const {MOCK_FILE_NAME} = require(`../../constants`);

describe(`Check REST API to work with offers`, () => {
  const FAKE_OFFER_ID = `OOOOOO`;
  const FAKE_COMMENT_ID = `OOOOOO`;
  let mockOffer = null;
  let REAL_OFFER_ID = null;
  let REAL_COMMENT_ID = null;

  beforeAll(async () => {
    mockOffer = JSON.parse((await fs.readFile(MOCK_FILE_NAME)).toString())[0];
    REAL_OFFER_ID = mockOffer.id;
    REAL_COMMENT_ID = mockOffer.comments[0].id;
  });

  test(`Check all offers`, async () => {
    const res = await request(server).get(`/api/offers`);
    expect(res.statusCode).toBe(200);
  });

  test(`Check offer by ID`, async () => {
    const res = await request(server)
      .get(`/api/offers/${REAL_OFFER_ID}`);
    expect(res.statusCode).toBe(200);
  });

  test(`Check nonexistent offer`, async () => {
    const res = await request(server)
      .get(`/api/offers/${FAKE_OFFER_ID}`);
    expect(res.statusCode).toBe(400);
  });

  test(`Creating a new offer`, async () => {
    const res = await request(server)
      .post(`/api/offers`)
      .send(mockOffer);
    expect(res.statusCode).toBe(200);
  });

  test(`Creating a new offer without data`, async () => {
    const res = await request(server)
      .post(`/api/offers`)
      .send({});
    expect(res.statusCode).toBe(400);
  });

  test(`Update offer`, async () => {
    const res = await request(server)
      .get(`/api/offers/${REAL_OFFER_ID}`);
    expect(res.statusCode).toBe(200);
  });

  test(`Update nonexistent offer`, async () => {
    const res = await request(server)
      .get(`/api/offers/${FAKE_OFFER_ID}`);
    expect(res.statusCode).toBe(400);
  });

  test(`Delete offer`, async () => {
    const res = await request(server)
      .delete(`/api/offers/${REAL_OFFER_ID}`);
    expect(res.statusCode).toBe(200);
  });


  test(`Delete nonexistent offer`, async () => {
    const res = await request(server)
      .delete(`/api/offers/${FAKE_OFFER_ID}`);
    expect(res.statusCode).toBe(204);
  });

  test(`Getting comments from the offer`, async () => {
    const res = await request(server)
      .get(`/api/offers/${REAL_OFFER_ID}/comments`);
    expect(res.statusCode).toBe(200);
  });

  test(`Getting comments from nonexistent offer`, async () => {
    const res = await request(server)
      .get(`/api/offers/${FAKE_OFFER_ID}/comments`);
    expect(res.statusCode).toBe(400);
  });

  test(`Delete comment from the offer`, async () => {
    const res = await request(server)
      .delete(`/api/offers/${REAL_OFFER_ID}/comments/${REAL_COMMENT_ID}`);
    expect(res.statusCode).toBe(200);
  });

  test(`Delete comment from the nonexistent offer`, async () => {
    const res = await request(server)
      .delete(`/api/offers/${FAKE_OFFER_ID}/comments/${REAL_COMMENT_ID}`);
    expect(res.statusCode).toBe(400);
  });

  test(`Delete nonexistent comment from the offer`, async () => {
    const res = await request(server)
      .delete(`/api/offers/${REAL_OFFER_ID}/comments/${FAKE_COMMENT_ID}`);
    expect(res.statusCode).toBe(400);
  });

  test(`Creating new comment at offer`, async () => {
    const res = await request(server)
      .put(`/api/offers/${REAL_OFFER_ID}/comments`)
      .send({id: 1, text: `New comment text.`});
    expect(res.statusCode).toBe(200);
  });

  test(`Creating new comment at nonexistent offer`, async () => {
    const res = await request(server)
      .put(`/api/offers/${FAKE_OFFER_ID}/comments`)
      .send({id: 1, text: `New comment text.`});
    expect(res.statusCode).toBe(400);
  });

  test(`Creating new comment without data`, async () => {
    const res = await request(server)
      .put(`/api/offers/${REAL_OFFER_ID}/comments`)
      .send({});
    expect(res.statusCode).toBe(400);
  });
});
