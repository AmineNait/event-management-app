import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { Event } from "../models/Event";

const router = express.Router();

/**
 * @swagger
 * /events:
 *   post:
 *     summary: Create a new event
 *     tags: [Events]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - startDate
 *               - endDate
 *               - timezone
 *               - color
 *             properties:
 *               name:
 *                 type: string
 *                 maxLength: 32
 *               description:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date-time
 *               endDate:
 *                 type: string
 *                 format: date-time
 *               timezone:
 *                 type: string
 *               color:
 *                 type: string
 *     responses:
 *       201:
 *         description: Event created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       400:
 *         description: Validation error
 *       500:
 *         description: Internal server error
 */
router.post(
  "/",
  [
    body("name").isString().isLength({ max: 32 }),
    body("description").isString(),
    body("startDate")
      .isISO8601()
      .custom((value: string) => {
        if (new Date(value) < new Date()) {
          throw new Error("Start date must be in the future");
        }
        return true;
      }),
    body("endDate")
      .isISO8601()
      .custom((value: string, { req }) => {
        if (new Date(value) <= new Date(req.body.startDate)) {
          throw new Error("End date must be after start date");
        }
        return true;
      }),
    body("timezone").isString(),
    body("color").isString(),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); // Envoi des erreurs de validation
    }

    const { name, description, startDate, endDate, timezone, color } = req.body;
    try {
      const event = new Event({
        name,
        description,
        startDate,
        endDate,
        timezone,
        color,
      });
      await event.save();
      res.status(201).send(event);
    } catch (error) {
      res.status(500).send("Erreur lors de la création de l'événement");
    }
  }
);

/**
 * @swagger
 * /events:
 *   get:
 *     summary: Get all events
 *     tags: [Events]
 *     responses:
 *       200:
 *         description: List of all events
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Event'
 *       500:
 *         description: Internal server error
 */
router.get("/", async (_req: Request, res: Response) => {
  try {
    const events = await Event.find();
    res.send(events);
  } catch (error) {
    res.status(500).send("Erreur lors de la récupération des événements");
  }
});

/**
 * @swagger
 * /events/{id}:
 *   get:
 *     summary: Get event by ID
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Event ID
 *     responses:
 *       200:
 *         description: Event data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       404:
 *         description: Event not found
 *       500:
 *         description: Internal server error
 */
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).send("Événement non trouvé");
    }
    res.send(event);
  } catch (error) {
    res.status(500).send("Erreur lors de la récupération de l'événement");
  }
});

export default router;
