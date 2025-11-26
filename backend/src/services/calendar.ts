import { google } from 'googleapis';

const SCOPES = ['https://www.googleapis.com/auth/calendar'];

export const createCalendarEvent = async (eventDetails: any) => {
    const { name, email, company, phone, reason, notes, date, time } = eventDetails;

    const jwtClient = new google.auth.JWT({
        email: process.env.GOOGLE_CLIENT_EMAIL,
        key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        scopes: SCOPES,
    });

    const calendar = google.calendar({ version: 'v3', auth: jwtClient });

    // Combine date and time into ISO string
    // Assuming date is YYYY-MM-DD and time is HH:MM
    const startDateTime = new Date(`${date}T${time}:00`);
    const endDateTime = new Date(startDateTime.getTime() + 45 * 60000); // 45 min duration

    const event = {
        summary: 'AI Consultation with Astrid (1:1)',
        description: `
      <b>Session Agenda:</b><br/>
      <ul>
        <li>Current stack & bottleneck analysis</li>
        <li>Feasibility check for specific workflows</li>
        <li>ROI estimation & roadmap draft</li>
      </ul>
      <br/>
      <b>Client Details:</b><br/>
      Name: ${name}<br/>
      Company: ${company}<br/>
      Reason: ${reason}<br/>
      Notes: ${notes}
    `,
        start: {
            dateTime: startDateTime.toISOString(),
            timeZone: 'UTC',
        },
        end: {
            dateTime: endDateTime.toISOString(),
            timeZone: 'UTC',
        },
        // attendees: [
        //     { email: email }, // Client
        //     { email: process.env.GOOGLE_CALENDAR_ID } // Consultant (Astrid/Anton)
        // ],
    };

    try {
        const response = await calendar.events.insert({
            calendarId: 'primary', // Use Service Account's calendar to allow invites
            requestBody: event,
        });
        return response.data;
    } catch (error) {
        console.error('Error creating calendar event:', error);
        throw error;
    }
};

export const getBusySlots = async (start: string, end: string) => {
    const jwtClient = new google.auth.JWT({
        email: process.env.GOOGLE_CLIENT_EMAIL,
        key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        scopes: SCOPES,
    });

    const calendar = google.calendar({ version: 'v3', auth: jwtClient });

    try {
        const response = await calendar.freebusy.query({
            requestBody: {
                timeMin: start,
                timeMax: end,
                items: [{ id: process.env.GOOGLE_CALENDAR_ID || 'primary' }],
            },
        });

        const busySlots = response.data.calendars?.[process.env.GOOGLE_CALENDAR_ID || 'primary']?.busy || [];
        return busySlots;
    } catch (error) {
        console.error('Error fetching busy slots:', error);
        throw error;
    }
};
