import momentTimezone from 'moment-timezone';
import { EventColor } from './types';

export const colors = [
    { label: 'Green', value: EventColor.Green },
    { label: 'Red', value: EventColor.Red },
    { label: 'Yellow', value: EventColor.Yellow }
  ];
    
  export const timezones = [
    'America/Denver',
    'America/New_York',
    'Europe/London',
    'Europe/Berlin',
    'Asia/Dubai',
    'Asia/Bangkok',
    'Asia/Tokyo',
    'Australia/Sydney'
  ];
  
  export const formattedTimezones = timezones.map(tz => {
    const offset = momentTimezone.tz(tz).format('Z');
    return {
      label: `${tz} (UTC${offset})`,
      value: tz,
    };
  });