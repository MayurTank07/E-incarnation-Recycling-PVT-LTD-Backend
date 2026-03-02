import ServicesPage from '../models/ServicesPage.js';
import asyncHandler from '../utils/asyncHandler.js';

export const getServicesPage = asyncHandler(async (req, res) => {
  let servicesPage = await ServicesPage.findOne();
  
  if (!servicesPage) {
    servicesPage = await ServicesPage.create({});
  }

  res.status(200).json({
    success: true,
    data: servicesPage
  });
});

export const updateServicesPage = asyncHandler(async (req, res) => {
  let servicesPage = await ServicesPage.findOne();

  if (!servicesPage) {
    servicesPage = await ServicesPage.create(req.body);
  } else {
    servicesPage = await ServicesPage.findByIdAndUpdate(
      servicesPage._id,
      req.body,
      { new: true, runValidators: true }
    );
  }

  res.status(200).json({
    success: true,
    data: servicesPage
  });
});

export const addServicesPageSection = asyncHandler(async (req, res) => {
  const servicesPage = await ServicesPage.findOne();
  
  if (!servicesPage) {
    return res.status(404).json({
      success: false,
      message: 'Services page not found'
    });
  }

  servicesPage.sections.push(req.body);
  await servicesPage.save();

  res.status(201).json({
    success: true,
    data: servicesPage
  });
});

export const updateServicesPageSection = asyncHandler(async (req, res) => {
  const { sectionId } = req.params;
  const servicesPage = await ServicesPage.findOne();

  if (!servicesPage) {
    return res.status(404).json({
      success: false,
      message: 'Services page not found'
    });
  }

  const section = servicesPage.sections.id(sectionId);
  if (!section) {
    return res.status(404).json({
      success: false,
      message: 'Section not found'
    });
  }

  Object.assign(section, req.body);
  await servicesPage.save();

  res.status(200).json({
    success: true,
    data: servicesPage
  });
});

export const deleteServicesPageSection = asyncHandler(async (req, res) => {
  const { sectionId } = req.params;
  const servicesPage = await ServicesPage.findOne();

  if (!servicesPage) {
    return res.status(404).json({
      success: false,
      message: 'Services page not found'
    });
  }

  servicesPage.sections.pull(sectionId);
  await servicesPage.save();

  res.status(200).json({
    success: true,
    data: servicesPage
  });
});

// Recycling Process Controllers
export const updateRecyclingProcess = asyncHandler(async (req, res) => {
  const servicesPage = await ServicesPage.findOne();

  if (!servicesPage) {
    return res.status(404).json({
      success: false,
      message: 'Services page not found'
    });
  }

  servicesPage.recyclingProcess = req.body;
  await servicesPage.save();

  res.status(200).json({
    success: true,
    data: servicesPage
  });
});

export const addProcessStep = asyncHandler(async (req, res) => {
  const servicesPage = await ServicesPage.findOne();

  if (!servicesPage) {
    return res.status(404).json({
      success: false,
      message: 'Services page not found'
    });
  }

  if (!servicesPage.recyclingProcess) {
    servicesPage.recyclingProcess = { steps: [] };
  }

  servicesPage.recyclingProcess.steps.push(req.body);
  await servicesPage.save();

  res.status(201).json({
    success: true,
    data: servicesPage
  });
});

export const updateProcessStep = asyncHandler(async (req, res) => {
  const { stepId } = req.params;
  const servicesPage = await ServicesPage.findOne();

  if (!servicesPage) {
    return res.status(404).json({
      success: false,
      message: 'Services page not found'
    });
  }

  const step = servicesPage.recyclingProcess.steps.id(stepId);
  if (!step) {
    return res.status(404).json({
      success: false,
      message: 'Process step not found'
    });
  }

  Object.assign(step, req.body);
  await servicesPage.save();

  res.status(200).json({
    success: true,
    data: servicesPage
  });
});

export const deleteProcessStep = asyncHandler(async (req, res) => {
  const { stepId } = req.params;
  const servicesPage = await ServicesPage.findOne();

  if (!servicesPage) {
    return res.status(404).json({
      success: false,
      message: 'Services page not found'
    });
  }

  servicesPage.recyclingProcess.steps.pull(stepId);
  await servicesPage.save();

  res.status(200).json({
    success: true,
    data: servicesPage
  });
});
