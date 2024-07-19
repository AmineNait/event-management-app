import mongoose from "mongoose";
import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import { app } from "../../app";
import { Event } from "../../models/Event";

let mongoServer: MongoMemoryServer;

// Configuration avant les tests
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(mongoUri);
  }
});

// Nettoyage après les tests
afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {
  await Event.deleteMany();
});

// Test de la création d'un nouvel événement
test("should create a new event", async () => {
  const eventData = {
    name: "Test Event",
    description: "Test Description",
    startDate: "2024-07-07T10:00:00Z",
    endDate: "2024-07-07T11:00:00Z",
    timezone: "America/New_York",
    color: "#7cd992",
  };

  const response = await request(app)
    .post("/events")
    .send(eventData)
    .expect(201);

  expect(response.body).toMatchObject(
    expect.objectContaining({
      name: "Test Event",
      description: "Test Description",
      startDate: "2024-07-07T10:00:00.000Z",
      endDate: "2024-07-07T11:00:00.000Z",
      timezone: "America/New_York",
      color: "#7cd992",
    })
  );
});

// Test de l'obtention de tous les événements
test("should get all events", async () => {
  const eventData1 = new Event({
    name: "Test Event 1",
    description: "Test Description 1",
    startDate: "2024-07-07T10:00:00Z",
    endDate: "2024-07-07T11:00:00Z",
    timezone: "America/New_York",
    color: "#7cd992",
  });

  const eventData2 = new Event({
    name: "Test Event 2",
    description: "Test Description 2",
    startDate: "2024-07-08T10:00:00Z",
    endDate: "2024-07-08T11:00:00Z",
    timezone: "America/Denver",
    color: "#eb6060",
  });

  await eventData1.save();
  await eventData2.save();

  const response = await request(app).get("/events").expect(200);

  expect(response.body.length).toBe(2); // Vérification du nombre d'événements
  expect(response.body[0]).toMatchObject(
    expect.objectContaining({
      name: "Test Event 1",
      description: "Test Description 1",
      startDate: "2024-07-07T10:00:00.000Z",
      endDate: "2024-07-07T11:00:00.000Z",
      timezone: "America/New_York",
      color: "#7cd992",
    })
  );
  expect(response.body[1]).toMatchObject(
    expect.objectContaining({
      name: "Test Event 2",
      description: "Test Description 2",
      startDate: "2024-07-08T10:00:00.000Z",
      endDate: "2024-07-08T11:00:00.000Z",
      timezone: "America/Denver",
      color: "#eb6060",
    })
  );
});

// Test de l'obtention d'un événement par ID
test("should get a single event by id", async () => {
  const eventData = new Event({
    name: "Test Event",
    description: "Test Description",
    startDate: "2024-07-07T10:00:00Z",
    endDate: "2024-07-07T11:00:00Z",
    timezone: "America/New_York",
    color: "#7cd992",
  });

  await eventData.save();

  const response = await request(app)
    .get(`/events/${eventData._id}`)
    .expect(200);

  expect(response.body).toMatchObject(
    expect.objectContaining({
      name: "Test Event",
      description: "Test Description",
      startDate: "2024-07-07T10:00:00.000Z",
      endDate: "2024-07-07T11:00:00.000Z",
      timezone: "America/New_York",
      color: "#7cd992",
    })
  );
});
