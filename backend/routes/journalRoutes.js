import express from 'express';

import Journal from '../models/journal.js';
import { validateJournalData } from '../validator/journalDataValidator.js';

const journalRouter = express.Router();

// Create a new journal entry
journalRouter.post('/',  async (req, res) => {
    const { mood, stressLevel, energyLevel, triggers, gratitude, copingActivities, sleepQuality, reflection } = req.body;
    // console.log("Creating journal entry for user:",req);
    try {
        // Validate input data
        const errors = validateJournalData({mood, stressLevel, energyLevel, triggers, gratitude, copingActivities, sleepQuality, reflection });
        if (errors.length > 0) {
            return res.status(400).json({ message: errors.join(' ') });
        }
        const newEntry = new Journal({
            user: req.user._id,
            mood,
            stressLevel,
            energyLevel,
            triggers,
            gratitude,
            copingActivities,
            sleepQuality,
            reflection
        });
        await newEntry.save();
        res.status(201).json({ message: 'Journal entry created', entry: newEntry });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});
    
// Get all journal entries for the logged-in user
journalRouter.get('/',  async (req, res) => {
    // console.log("Fetching journal entries for user:", req.user);
    try {
        const entries = await Journal.find({ user: req.user._id }).sort({ date: -1 });   res.status(200).json(entries);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Get a specific journal entry by ID
journalRouter.get('/:id', async (req, res) => {
    try {
        const entry = await Journal.findOne({ _id: req.params.id, user: req.user._id });
        if (!entry) {
            return res.status(404).json({ message: 'Journal entry not found' });
        }
        res.status(200).json(entry);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Update a specific journal entry by ID
journalRouter.put('/:id',  async (req, res) => {
    const { mood, stressLevel, energyLevel, triggers, gratitude, copingActivities, sleepQuality, reflection } = req.body;
    try {
        // Validate input data
        const errors = validateJournalData({ mood, stressLevel, energyLevel, triggers, gratitude, copingActivities, sleepQuality, reflection });
        if (errors.length > 0) {
            return res.status(400).json({ message: errors.join(' ') });
        }
        const updatedEntry = await Journal.findOneAndUpdate(


            { _id: req.params.id, user: req.user._id },
            { mood, stressLevel, energyLevel, triggers, gratitude, copingActivities, sleepQuality, reflection },
            { new: true }
        );
        if (!updatedEntry) {
            return res.status(404).json({ message: 'Journal entry not found' });


        }        res.status(200).json({ message: 'Journal entry updated', entry: updatedEntry });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});
// Delete a specific journal entry by ID
journalRouter.delete('/:id',  async (req, res) => {
    try {
        const deletedEntry = await Journal.findOneAndDelete({ _id: req.params.id, user: req.user._id });
        if (!deletedEntry) {
            return res.status(404).json({ message: 'Journal entry not found' });
        }        res.status(200).json({ message: 'Journal entry deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});
export default journalRouter;
