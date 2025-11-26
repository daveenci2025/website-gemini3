import { Router, Request, Response } from 'express';
import { createCalendarEvent, getBusySlots } from './services/calendar';
import { saveConsultationRequest } from './services/consultation';

const router = Router();

router.post('/calendar/book', async (req: Request, res: Response) => {
    try {
        // Run both operations in parallel
        const [event, dbRecord] = await Promise.all([
            createCalendarEvent(req.body),
            saveConsultationRequest(req.body)
        ]);

        res.status(200).json({ success: true, event, dbRecord });
    } catch (error) {
        console.error('Booking error:', error);
        res.status(500).json({ success: false, error: 'Failed to book consultation' });
    }
});

router.get('/calendar/availability', async (req: Request, res: Response) => {
    try {
        const { start, end } = req.query;
        if (!start || !end) {
            return res.status(400).json({ error: 'Missing start or end date' });
        }

        // @ts-ignore
        const busySlots = await getBusySlots(start as string, end as string);
        res.json({ busySlots });
    } catch (error) {
        console.error('Availability error:', error);
        res.status(500).json({ error: 'Failed to fetch availability' });
    }
});

export default router;
