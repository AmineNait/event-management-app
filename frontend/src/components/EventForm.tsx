import React from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography, Box, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Event, EventFormProps } from '../types';
import momentTimezone from 'moment-timezone';
import { FormContainer, ColorBox, formControlStyles } from './styles';
import { eventSchema } from '../validationSchema';
import { colors, formattedTimezones } from '../constants';

const EventForm: React.FC<EventFormProps> = ({ addEvent }) => {
  const initialValues = {
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    timezone: 'America/New_York',
    color: '#7cd992',
  };

  const handleSubmit = async (values: typeof initialValues, { resetForm }: { resetForm: () => void }) => {
    try {
      const startUTC = momentTimezone.tz(values.startDate, values.timezone).utc().format();
      const endUTC = momentTimezone.tz(values.endDate, values.timezone).utc().format();
      const response = await axios.post('http://localhost:3000/events', { 
        name: values.name, 
        description: values.description, 
        startDate: startUTC, 
        endDate: endUTC, 
        timezone: values.timezone, 
        color: values.color 
      });
      addEvent(response.data);
      resetForm();
    } catch (error) {
      console.error("There was an error creating the event!", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Create Event
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={eventSchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange }) => (
          <Form>
            <FormContainer>
              <Field
                as={TextField}
                name="name"
                label="Name"
                value={values.name}
                onChange={handleChange}
                inputProps={{ maxLength: 32 }}
                required
              />
              <ErrorMessage name="name" component="div" />
              <Field
                as={TextField}
                name="description"
                label="Description"
                value={values.description}
                onChange={handleChange}
                multiline
                rows={4}
                required
              />
              <ErrorMessage name="description" component="div" />
              <Field
                as={TextField}
                name="startDate"
                label="Start Date"
                type="datetime-local"
                InputLabelProps={{ shrink: true }}
                value={values.startDate}
                onChange={handleChange}
                required
              />
              <ErrorMessage name="startDate" component="div" />
              <Field
                as={TextField}
                name="endDate"
                label="End Date"
                type="datetime-local"
                InputLabelProps={{ shrink: true }}
                value={values.endDate}
                onChange={handleChange}
                required
              />
              <ErrorMessage name="endDate" component="div" />
              <FormControl required>
                <InputLabel id="timezone-select-label">Timezone</InputLabel>
                <Field
                  as={Select}
                  name="timezone"
                  labelId="timezone-select-label"
                  value={values.timezone}
                  onChange={handleChange}
                  sx={formControlStyles}
                >
                  {formattedTimezones.map((tz) => (
                    <MenuItem key={tz.value} value={tz.value}>
                      {tz.label}
                    </MenuItem>
                  ))}
                </Field>
              </FormControl>
              <ErrorMessage name="timezone" component="div" />
              <FormControl>
                <InputLabel id="color-select-label">Color</InputLabel>
                <Field
                  as={Select}
                  name="color"
                  labelId="color-select-label"
                  value={values.color}
                  onChange={handleChange}
                  renderValue={(selected: string) => (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <ColorBox sx={{ backgroundColor: selected }} />
                      {colors.find(c => c.value === selected)?.label}
                    </Box>
                  )}
                >
                  {colors.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      <ColorBox sx={{ backgroundColor: option.value }} />
                      {option.label}
                    </MenuItem>
                  ))}
                </Field>
              </FormControl>
              <ErrorMessage name="color" component="div" />
              <Button type="submit" variant="contained" color="primary">
                Create Event
              </Button>
            </FormContainer>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default EventForm;
