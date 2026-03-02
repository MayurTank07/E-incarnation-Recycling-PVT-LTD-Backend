import Footer from '../models/Footer.js';
import asyncHandler from '../utils/asyncHandler.js';

export const getFooter = asyncHandler(async (req, res) => {
  let footer = await Footer.findOne();

  if (!footer) {
    footer = await Footer.create({});
  }

  res.json({
    success: true,
    data: footer
  });
});

export const updateFooter = asyncHandler(async (req, res) => {
  let footer = await Footer.findOne();

  if (!footer) {
    footer = await Footer.create(req.body);
  } else {
    const { address, phone, email } = req.body;

    if (address !== undefined) footer.address = address;
    if (phone !== undefined) footer.phone = phone;
    if (email !== undefined) footer.email = email;

    footer = await footer.save();
  }

  res.json({
    success: true,
    data: footer
  });
});
