const { Router } = require('express');
const {
  getAll,
  getById,
  updateProfile,
  createGoal,
  updateGoal,
  getIncomeReport,
} = require('../controller/creator.controller');
const authenticateToken = require('../../../middlewares/authenticateToken');
const authorizeRole = require('../../../middlewares/authorizeRole');
const validate = require('../../../middlewares/validate');
const upload = require('../../../middlewares/upload');
const {
  goalValidation,
  updateGoalValidation,
  incomeReportValidation,
  creatorIdParam,
} = require('../validation/creator.validation');

const router = Router();

// Creator-only static routes FIRST (must be before /:id)
router.put(
  '/profile',
  authenticateToken,
  authorizeRole('CREATOR'),
  upload.fields([
    { name: 'profile_picture', maxCount: 1 },
    { name: 'banner', maxCount: 1 },
  ]),
  updateProfile
);

router.post(
  '/goals',
  authenticateToken,
  authorizeRole('CREATOR'),
  goalValidation,
  validate,
  createGoal
);

router.patch(
  '/goals/:id',
  authenticateToken,
  authorizeRole('CREATOR'),
  updateGoalValidation,
  validate,
  updateGoal
);

router.get(
  '/income-report',
  authenticateToken,
  authorizeRole('CREATOR'),
  incomeReportValidation,
  validate,
  getIncomeReport
);

// Public routes
router.get('/', getAll);
router.get('/:id', creatorIdParam, validate, getById);

module.exports = router;
