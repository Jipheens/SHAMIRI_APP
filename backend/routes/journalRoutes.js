import express from 'express';

import {
  createJournalEntry,
  getJournalEntries,
  getJournalEntryById,
  updateJournalEntry,
  deleteJournalEntry,
  getJournalEntriesByUserId,
} from '../controllers/journalEntryController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, createJournalEntry)
router.route('/') .get(getJournalEntries);
router.route('/myjournals/:userId').get(protect, getJournalEntriesByUserId);
router.route('/:id').get(protect, getJournalEntryById)
router.route('/:id').put(protect, updateJournalEntry)
router.route('/:id').delete(protect, deleteJournalEntry);

export default router;
