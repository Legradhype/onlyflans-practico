const donationService = require('../service/donation.service');
const { sendSuccess } = require('../../../utils/response');
const asyncHandler = require('../../../utils/asyncHandler');

const donate = asyncHandler(async (req, res) => {
  const data = await donationService.donate(req.user.id, req.body);
  return sendSuccess(res, data, 'Donation successful', 201);
});

const getHistory = asyncHandler(async (req, res) => {
  const data = await donationService.getHistory(req.user.id, req.query);
  return sendSuccess(res, data, 'Donation history retrieved');
});

module.exports = { donate, getHistory };
