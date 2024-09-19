import express from 'express';
import { createGroup, addMember, sendMessage, getMessages } from '../controllers/group.controller.js';
import protectRoute from '../middleware/protectRoute.js';

const router = express.Router();

router.post('/create', protectRoute, createGroup);
router.post('/add-member', protectRoute, addMember);
router.post('/send-message', protectRoute, sendMessage);
router.get('/messages/:groupId', protectRoute, getMessages);

export default router;