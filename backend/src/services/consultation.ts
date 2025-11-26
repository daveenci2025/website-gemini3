import { query } from '../db';

export const saveConsultationRequest = async (data: any) => {
  const { name, email, phone, company, reason, notes, date, time } = data;

  // Combine date and time for scheduled_with (assuming UTC for simplicity or relying on DB to handle timezone if provided)
  // The user schema has 'shchedule_utc', let's construct a timestamp.
  const scheduleUtc = new Date(`${date}T${time}:00`).toISOString();

  const text = `
    INSERT INTO consultation_request (
      full_name, email, phone, company, reason, other, scheduled_with, schedule_utc
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *
  `;

  const values = [
    name,
    email,
    phone,
    company,
    reason,
    notes,
    'Astrid Abrahamyan', // Static for now as per plan
    scheduleUtc
  ];

  try {
    const res = await query(text, values);
    return res.rows[0];
  } catch (err) {
    console.error('Error saving consultation request:', err);
    throw err;
  }
};
