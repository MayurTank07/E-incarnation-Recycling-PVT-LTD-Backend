import EprPage from '../models/EprPage.js';
import asyncHandler from '../utils/asyncHandler.js';
import { deleteFromCloudinary } from '../utils/cloudinaryHelper.js';

export const getEprPage = asyncHandler(async (req, res) => {
  let eprPage = await EprPage.findOne();
  
  if (!eprPage) {
    eprPage = await EprPage.create({});
  }

  res.status(200).json({
    success: true,
    data: eprPage
  });
});

export const updateEprPage = asyncHandler(async (req, res) => {
  let eprPage = await EprPage.findOne();

  if (!eprPage) {
    eprPage = await EprPage.create(req.body);
  } else {
    eprPage = await EprPage.findByIdAndUpdate(
      eprPage._id,
      req.body,
      { new: true, runValidators: true }
    );
  }

  res.status(200).json({
    success: true,
    data: eprPage
  });
});

export const addEprService = asyncHandler(async (req, res) => {
  const eprPage = await EprPage.findOne();
  
  if (!eprPage) {
    return res.status(404).json({
      success: false,
      message: 'EPR page not found'
    });
  }

  eprPage.services.push(req.body);
  await eprPage.save();

  res.status(201).json({
    success: true,
    data: eprPage
  });
});

export const updateEprService = asyncHandler(async (req, res) => {
  const { serviceId } = req.params;
  const eprPage = await EprPage.findOne();

  if (!eprPage) {
    return res.status(404).json({
      success: false,
      message: 'EPR page not found'
    });
  }

  const service = eprPage.services.id(serviceId);
  if (!service) {
    return res.status(404).json({
      success: false,
      message: 'Service not found'
    });
  }

  Object.assign(service, req.body);
  await eprPage.save();

  res.status(200).json({
    success: true,
    data: eprPage
  });
});

export const deleteEprService = asyncHandler(async (req, res) => {
  const { serviceId } = req.params;
  const eprPage = await EprPage.findOne();

  if (!eprPage) {
    return res.status(404).json({
      success: false,
      message: 'EPR page not found'
    });
  }

  const service = eprPage.services.id(serviceId);
  if (service && service.imagePublicId) {
    await deleteFromCloudinary(service.imagePublicId);
  }

  eprPage.services.pull(serviceId);
  await eprPage.save();

  res.status(200).json({
    success: true,
    data: eprPage
  });
});

// Coverage CRUD
export const addCoverageItem = asyncHandler(async (req, res) => {
  const eprPage = await EprPage.findOne();
  if (!eprPage) {
    return res.status(404).json({ success: false, message: 'EPR page not found' });
  }
  eprPage.coverage.push(req.body);
  await eprPage.save();
  res.status(201).json({ success: true, data: eprPage });
});

export const updateCoverageItem = asyncHandler(async (req, res) => {
  const { itemId } = req.params;
  const eprPage = await EprPage.findOne();
  if (!eprPage) {
    return res.status(404).json({ success: false, message: 'EPR page not found' });
  }
  const item = eprPage.coverage.id(itemId);
  if (!item) {
    return res.status(404).json({ success: false, message: 'Coverage item not found' });
  }
  Object.assign(item, req.body);
  await eprPage.save();
  res.status(200).json({ success: true, data: eprPage });
});

export const deleteCoverageItem = asyncHandler(async (req, res) => {
  const { itemId } = req.params;
  const eprPage = await EprPage.findOne();
  if (!eprPage) {
    return res.status(404).json({ success: false, message: 'EPR page not found' });
  }
  eprPage.coverage.pull(itemId);
  await eprPage.save();
  res.status(200).json({ success: true, data: eprPage });
});

// Compliance Steps CRUD
export const addComplianceStep = asyncHandler(async (req, res) => {
  const eprPage = await EprPage.findOne();
  if (!eprPage) {
    return res.status(404).json({ success: false, message: 'EPR page not found' });
  }
  eprPage.complianceSteps.push(req.body);
  await eprPage.save();
  res.status(201).json({ success: true, data: eprPage });
});

export const updateComplianceStep = asyncHandler(async (req, res) => {
  const { stepId } = req.params;
  const eprPage = await EprPage.findOne();
  if (!eprPage) {
    return res.status(404).json({ success: false, message: 'EPR page not found' });
  }
  const step = eprPage.complianceSteps.id(stepId);
  if (!step) {
    return res.status(404).json({ success: false, message: 'Compliance step not found' });
  }
  Object.assign(step, req.body);
  await eprPage.save();
  res.status(200).json({ success: true, data: eprPage });
});

export const deleteComplianceStep = asyncHandler(async (req, res) => {
  const { stepId } = req.params;
  const eprPage = await EprPage.findOne();
  if (!eprPage) {
    return res.status(404).json({ success: false, message: 'EPR page not found' });
  }
  eprPage.complianceSteps.pull(stepId);
  await eprPage.save();
  res.status(200).json({ success: true, data: eprPage });
});

// Benefits CRUD
export const addBenefit = asyncHandler(async (req, res) => {
  const eprPage = await EprPage.findOne();
  if (!eprPage) {
    return res.status(404).json({ success: false, message: 'EPR page not found' });
  }
  eprPage.benefits.push(req.body);
  await eprPage.save();
  res.status(201).json({ success: true, data: eprPage });
});

export const updateBenefit = asyncHandler(async (req, res) => {
  const { benefitId } = req.params;
  const eprPage = await EprPage.findOne();
  if (!eprPage) {
    return res.status(404).json({ success: false, message: 'EPR page not found' });
  }
  const benefit = eprPage.benefits.id(benefitId);
  if (!benefit) {
    return res.status(404).json({ success: false, message: 'Benefit not found' });
  }
  Object.assign(benefit, req.body);
  await eprPage.save();
  res.status(200).json({ success: true, data: eprPage });
});

export const deleteBenefit = asyncHandler(async (req, res) => {
  const { benefitId } = req.params;
  const eprPage = await EprPage.findOne();
  if (!eprPage) {
    return res.status(404).json({ success: false, message: 'EPR page not found' });
  }
  eprPage.benefits.pull(benefitId);
  await eprPage.save();
  res.status(200).json({ success: true, data: eprPage });
});

// Why Choose Us Reasons CRUD
export const addWhyChooseUsReason = asyncHandler(async (req, res) => {
  const eprPage = await EprPage.findOne();
  if (!eprPage) {
    return res.status(404).json({ success: false, message: 'EPR page not found' });
  }
  if (!eprPage.whyChooseUs) {
    eprPage.whyChooseUs = { reasons: [] };
  }
  eprPage.whyChooseUs.reasons.push(req.body);
  await eprPage.save();
  res.status(201).json({ success: true, data: eprPage });
});

export const updateWhyChooseUsReason = asyncHandler(async (req, res) => {
  const { reasonId } = req.params;
  const eprPage = await EprPage.findOne();
  if (!eprPage) {
    return res.status(404).json({ success: false, message: 'EPR page not found' });
  }
  const reason = eprPage.whyChooseUs.reasons.id(reasonId);
  if (!reason) {
    return res.status(404).json({ success: false, message: 'Reason not found' });
  }
  Object.assign(reason, req.body);
  await eprPage.save();
  res.status(200).json({ success: true, data: eprPage });
});

export const deleteWhyChooseUsReason = asyncHandler(async (req, res) => {
  const { reasonId } = req.params;
  const eprPage = await EprPage.findOne();
  if (!eprPage) {
    return res.status(404).json({ success: false, message: 'EPR page not found' });
  }
  eprPage.whyChooseUs.reasons.pull(reasonId);
  await eprPage.save();
  res.status(200).json({ success: true, data: eprPage });
});
