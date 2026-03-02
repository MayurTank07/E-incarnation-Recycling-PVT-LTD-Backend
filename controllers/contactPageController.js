import ContactPage from '../models/ContactPage.js';
import asyncHandler from '../utils/asyncHandler.js';

export const getContactPage = asyncHandler(async (req, res) => {
  let contactPage = await ContactPage.findOne();
  
  if (!contactPage) {
    contactPage = await ContactPage.create({});
  }

  res.status(200).json({
    success: true,
    data: contactPage
  });
});

export const updateContactPage = asyncHandler(async (req, res) => {
  let contactPage = await ContactPage.findOne();

  if (!contactPage) {
    contactPage = await ContactPage.create(req.body);
  } else {
    contactPage = await ContactPage.findByIdAndUpdate(
      contactPage._id,
      req.body,
      { new: true, runValidators: true }
    );
  }

  res.status(200).json({
    success: true,
    data: contactPage
  });
});
