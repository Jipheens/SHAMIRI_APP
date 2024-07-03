import asyncHandler from 'express-async-handler';

import JournalEntry from '../models/journalEntryModel.js';


/**
 * @desc    Create a new journal entry
 * @route   POST /api/journalEntries
 * @access  Private
 */
const createJournalEntry = asyncHandler(async (req, res) => {
  const { title, content, category, date } = req.body;

  const journalEntry = await JournalEntry.create({
    title,
    content,
    category,
    date,
    userId: req.user.id,
  });

  res.status(201).json(journalEntry);
});


/**
 * @desc    Get all journal entries for a user
 * @route   GET /api/journalEntries
 * @access  Private
 */
const getJournalEntries = asyncHandler(async (req, res) => {
  const journalEntries = await JournalEntry.findAll({
    where: { userId: req.user.id },
    order: [['date', 'DESC']],
  });

  res.json(journalEntries);
});


/**
 * @desc    Get journal entries for a specific user by user ID
 * @route   GET /api/journalEntries/myjournals/:userId
 * @access  Private/Admin
 */
const getJournalEntriesByUserId = asyncHandler(async (req, res) => {
    const { userId } = req.params;
  
    const journalEntries = await JournalEntry.findAll({
      where: { userId },
      order: [['date', 'DESC']],
    });
  
    if (journalEntries.length > 0) {
      res.json(journalEntries);
    } else {
      res.status(404).json({ message: 'No journal entries found for this user' });
    }
  });


/**
 * @desc    Get a single journal entry by ID
 * @route   GET /api/journalEntries/:id
 * @access  Private
 */
const getJournalEntryById = asyncHandler(async (req, res) => {
  const journalEntry = await JournalEntry.findByPk(req.params.id);

  if (journalEntry && journalEntry.userId === req.user.id) {
    res.json(journalEntry);
  } else {
    res.status(404).json({ message: 'Journal entry not found' });
  }
});


/**
 * @desc    Update a journal entry
 * @route   PUT /api/journalEntries/:id
 * @access  Private
 */
const updateJournalEntry = asyncHandler(async (req, res) => {
  const { title, content, category, date } = req.body;

  const journalEntry = await JournalEntry.findByPk(req.params.id);

  if (journalEntry && journalEntry.userId === req.user.id) {
    journalEntry.title = title || journalEntry.title;
    journalEntry.content = content || journalEntry.content;
    journalEntry.category = category || journalEntry.category;
    journalEntry.date = date || journalEntry.date;

    const updatedJournalEntry = await journalEntry.save();

    res.json(updatedJournalEntry);
  } else {
    res.status(404).json({ message: 'Journal entry not found' });
  }
});


/**
 * @desc    Delete a journal entry
 * @route   DELETE /api/journalEntries/:id
 * @access  Private
 */
const deleteJournalEntry = asyncHandler(async (req, res) => {
  const journalEntry = await JournalEntry.findByPk(req.params.id);

  if (journalEntry && journalEntry.userId === req.user.id) {
    await journalEntry.destroy();
    res.status(204).end();
  } else {
    res.status(404).json({ message: 'Journal entry not found' });
  }
});

  
  export {
    createJournalEntry,
    getJournalEntries,
    getJournalEntriesByUserId, 
    getJournalEntryById,
    updateJournalEntry,
    deleteJournalEntry,    
  };
  
