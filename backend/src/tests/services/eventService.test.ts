import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import {
  createEvent,
  getAllEvents,
  getEventById,
} from "../../services/eventService";
import { Event } from "../../models/Event";

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
    startDate: futureDate,
    endDate: new Date(futureDate.getTime() + 60 * 60 * 1000), // Une heure plus tard
    timezone: "America/New_York",
    color: "#7cd992",
  };

  const event = await createEvent(eventData);
  expect(event).toMatchObject(eventData);
});

// Test de l'obtention de tous les événements
test("should get all events", async () => {
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + 1); // Date dans le futur

  const eventData1 = {
    name: "Test Event 1",
    description: "Test Description 1",
    startDate: futureDate,
    endDate: new Date(futureDate.getTime() + 60 * 60 * 1000), // Une heure plus tard
    timezone: "America/New_York",
    color: "#7cd992",
  };

  const eventData2 = {
    name: "Test Event 2",
    description: "Test Description 2",
    startDate: futureDate,
    endDate: new Date(futureDate.getTime() + 2 * 60 * 60 * 1000), // Deux heures plus tard
    timezone: "America/Denver",
    color: "#eb6060",
  };

  await createEvent(eventData1);
  await createEvent(eventData2);

  const events = await getAllEvents();
  expect(events.length).toBe(2);
  expect(events[0]).toMatchObject(eventData1);
  expect(events[1]).toMatchObject(eventData2);
});

// Test de l'obtention d'un événement par ID
test("should get a single event by id", async () => {
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + 1); // Date dans le futur

  const eventData = {
    name: "Test Event",
    description: "Test Description",
    startDate: futureDate,
    endDate: new Date(futureDate.getTime() + 60 * 60 * 1000), // Une heure plus tard
    timezone: "America/New_York",
    color: "#7cd992",
  };

  const createdEvent = await createEvent(eventData);
  const fetchedEvent = await getEventById(createdEvent._id.toString());

  expect(fetchedEvent).toMatchObject(eventData);
});
