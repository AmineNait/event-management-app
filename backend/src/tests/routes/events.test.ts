import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import request from "supertest";
import { app } from "../../app";

let mongoServer: MongoMemoryServer;

// Avant tous les tests, démarrer un serveur MongoDB en mémoire et se connecter
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.disconnect(); // Déconnexion initiale
  await mongoose.connect(mongoUri);
});

// Après tous les tests, fermer la connexion MongoDB et arrêter le serveur en mémoire
afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

// Avant chaque test, vider la base de données pour un état propre
beforeEach(async () => {
  await mongoose.connection.dropDatabase();
});

// Test de la création d'un nouvel événement
test("should create a new event", async () => {
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + 1); // Date dans le futur

  const eventData = {
    name: "Test Event",
    description: "Test Description",
    startDate: futureDate.toISOString(),
    endDate: new Date(futureDate.getTime() + 60 * 60 * 1000).toISOString(), // Une heure plus tard
    timezone: "America/New_York",
    color: "#7cd992",
  };

  const response = await request(app)
    .post("/events")
    .send(eventData)
    .expect(201);

  // Vérification des données de l'événement créé
  expect(response.body).toMatchObject(
    expect.objectContaining({
      name: "Test Event",
      description: "Test Description",
      startDate: eventData.startDate,
      endDate: eventData.endDate,
      timezone: "America/New_York",
      color: "#7cd992",
    })
  );
});

// Test de l'obtention de tous les événements
test("should get all events", async () => {
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + 1); // Date dans le futur

  const eventData1 = {
    name: "Test Event 1",
    description: "Test Description 1",
    startDate: futureDate.toISOString(),
    endDate: new Date(futureDate.getTime() + 60 * 60 * 1000).toISOString(), // Une heure plus tard
    timezone: "America/New_York",
    color: "#7cd992",
  };

  const eventData2 = {
    name: "Test Event 2",
    description: "Test Description 2",
    startDate: futureDate.toISOString(),
    endDate: new Date(futureDate.getTime() + 2 * 60 * 60 * 1000).toISOString(), // Deux heures plus tard
    timezone: "America/Denver",
    color: "#eb6060",
  };

  await request(app).post("/events").send(eventData1);
  await request(app).post("/events").send(eventData2);

  const response = await request(app).get("/events").expect(200);

  // Vérification du nombre d'événements et de leurs données
  expect(response.body.length).toBe(2);
  expect(response.body[0]).toMatchObject(
    expect.objectContaining({
      name: "Test Event 1",
      description: "Test Description 1",
      startDate: eventData1.startDate,
      endDate: eventData1.endDate,
      timezone: "America/New_York",
      color: "#7cd992",
    })
  );
  expect(response.body[1]).toMatchObject(
    expect.objectContaining({
      name: "Test Event 2",
      description: "Test Description 2",
      startDate: eventData2.startDate,
      endDate: eventData2.endDate,
      timezone: "America/Denver",
      color: "#eb6060",
    })
  );
});

// Test de l'obtention d'un événement par ID
test("should get a single event by id", async () => {
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + 1); // Date dans le futur

  const eventData = {
    name: "Test Event",
    description: "Test Description",
    startDate: futureDate.toISOString(),
    endDate: new Date(futureDate.getTime() + 60 * 60 * 1000).toISOString(), // Une heure plus tard
    timezone: "America/New_York",
    color: "#7cd992",
  };

  const createResponse = await request(app)
    .post("/events")
    .send(eventData)
    .expect(201);

  const eventId = createResponse.body._id;
  const getResponse = await request(app).get(`/events/${eventId}`).expect(200);

  // Vérification des données de l'événement récupéré
  expect(getResponse.body).toMatchObject(
    expect.objectContaining({
      name: "Test Event",
      description: "Test Description",
      startDate: eventData.startDate,
      endDate: eventData.endDate,
      timezone: "America/New_York",
      color: "#7cd992",
    })
  );
});
