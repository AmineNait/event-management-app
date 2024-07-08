import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Event Management API',
      version: '1.0.0',
      description: 'A simple API for managing events',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
    components: {
      schemas: {
        Event: {
          type: 'object',
          required: ['name', 'description', 'startDate', 'endDate', 'timezone', 'color'],
          properties: {
            _id: {
              type: 'string',
              description: 'Event ID'
            },
            name: {
              type: 'string',
              maxLength: 32,
              description: 'Event name'
            },
            description: {
              type: 'string',
              description: 'Event description'
            },
            startDate: {
              type: 'string',
              format: 'date-time',
              description: 'Event start date and time'
            },
            endDate: {
              type: 'string',
              format: 'date-time',
              description: 'Event end date and time'
            },
            timezone: {
              type: 'string',
              description: 'Event timezone'
            },
            color: {
              type: 'string',
              description: 'Event color'
            }
          }
        }
      }
    }
  },
  apis: ['./src/routes/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
