import paymentSheet from './payment-sheet.route'

import express from 'express';
const router = express.Router();

router.use('/payment-sheet', paymentSheet);

export const stripe = router;