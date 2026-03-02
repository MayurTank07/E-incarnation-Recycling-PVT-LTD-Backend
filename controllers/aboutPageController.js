import AboutPage from '../models/AboutPage.js';
import asyncHandler from '../utils/asyncHandler.js';
import { deleteFromCloudinary } from '../utils/cloudinaryHelper.js';

export const getAboutPage = asyncHandler(async (req, res) => {
  let aboutPage = await AboutPage.findOne();
  
  if (!aboutPage) {
    aboutPage = await AboutPage.create({});
  }

  res.status(200).json({
    success: true,
    data: aboutPage
  });
});

export const updateAboutPage = asyncHandler(async (req, res) => {
  let aboutPage = await AboutPage.findOne();

  if (!aboutPage) {
    aboutPage = await AboutPage.create(req.body);
  } else {
    aboutPage = await AboutPage.findByIdAndUpdate(
      aboutPage._id,
      req.body,
      { new: true, runValidators: true }
    );
  }

  res.status(200).json({
    success: true,
    data: aboutPage
  });
});

export const addTeamMember = asyncHandler(async (req, res) => {
  const aboutPage = await AboutPage.findOne();
  
  if (!aboutPage) {
    return res.status(404).json({
      success: false,
      message: 'About page not found'
    });
  }

  if (!aboutPage.teamSection) {
    aboutPage.teamSection = { heading: '', description: '', members: [] };
  }

  aboutPage.teamSection.members.push(req.body);
  await aboutPage.save();

  res.status(201).json({
    success: true,
    data: aboutPage
  });
});

export const updateTeamMember = asyncHandler(async (req, res) => {
  const { memberId } = req.params;
  const aboutPage = await AboutPage.findOne();

  if (!aboutPage) {
    return res.status(404).json({
      success: false,
      message: 'About page not found'
    });
  }

  const member = aboutPage.teamSection.members.id(memberId);
  if (!member) {
    return res.status(404).json({
      success: false,
      message: 'Team member not found'
    });
  }

  // Delete old Cloudinary image if image is being updated
  if (req.body.image && member.imagePublicId && req.body.image !== member.image) {
    try {
      await deleteFromCloudinary(member.imagePublicId);
    } catch (error) {
      console.error('Error deleting old team member image from Cloudinary:', error);
    }
  }

  Object.assign(member, req.body);
  await aboutPage.save();

  res.status(200).json({
    success: true,
    data: aboutPage
  });
});

export const deleteTeamMember = asyncHandler(async (req, res) => {
  const { memberId } = req.params;
  const aboutPage = await AboutPage.findOne();

  if (!aboutPage) {
    return res.status(404).json({
      success: false,
      message: 'About page not found'
    });
  }

  const member = aboutPage.teamSection.members.id(memberId);
  
  // Delete Cloudinary image if exists
  if (member && member.imagePublicId) {
    try {
      await deleteFromCloudinary(member.imagePublicId);
    } catch (error) {
      console.error('Error deleting team member image from Cloudinary:', error);
    }
  }

  aboutPage.teamSection.members.pull(memberId);
  await aboutPage.save();

  res.status(200).json({
    success: true,
    data: aboutPage
  });
});

// ===== NEW TEAM CRUD OPERATIONS =====
export const addTeam = asyncHandler(async (req, res) => {
  const aboutPage = await AboutPage.findOne();
  
  if (!aboutPage) {
    return res.status(404).json({
      success: false,
      message: 'About page not found'
    });
  }

  if (!aboutPage.team) {
    aboutPage.team = [];
  }

  aboutPage.team.push(req.body);
  await aboutPage.save();

  res.status(201).json({
    success: true,
    data: aboutPage
  });
});

export const updateTeam = asyncHandler(async (req, res) => {
  const { teamId } = req.params;
  const aboutPage = await AboutPage.findOne();

  if (!aboutPage) {
    return res.status(404).json({
      success: false,
      message: 'About page not found'
    });
  }

  const teamMember = aboutPage.team.id(teamId);
  if (!teamMember) {
    return res.status(404).json({
      success: false,
      message: 'Team member not found'
    });
  }

  // Delete old Cloudinary image if image is being updated
  if (req.body.image && teamMember.imagePublicId && req.body.image !== teamMember.image) {
    try {
      await deleteFromCloudinary(teamMember.imagePublicId);
    } catch (error) {
      console.error('Error deleting old team image from Cloudinary:', error);
    }
  }

  Object.assign(teamMember, req.body);
  await aboutPage.save();

  res.status(200).json({
    success: true,
    data: aboutPage
  });
});

export const deleteTeam = asyncHandler(async (req, res) => {
  const { teamId } = req.params;
  const aboutPage = await AboutPage.findOne();

  if (!aboutPage) {
    return res.status(404).json({
      success: false,
      message: 'About page not found'
    });
  }

  const teamMember = aboutPage.team.id(teamId);
  
  // Delete Cloudinary image if exists
  if (teamMember && teamMember.imagePublicId) {
    try {
      await deleteFromCloudinary(teamMember.imagePublicId);
    } catch (error) {
      console.error('Error deleting team image from Cloudinary:', error);
    }
  }

  aboutPage.team.pull(teamId);
  await aboutPage.save();

  res.status(200).json({
    success: true,
    data: aboutPage
  });
});

// ===== LANDSCAPE IMAGE OPERATIONS =====
export const updateLandscapeImage = asyncHandler(async (req, res) => {
  const aboutPage = await AboutPage.findOne();

  if (!aboutPage) {
    return res.status(404).json({
      success: false,
      message: 'About page not found'
    });
  }

  // Delete old Cloudinary image if image is being updated
  if (req.body.image && aboutPage.landscapeImage?.imagePublicId && req.body.image !== aboutPage.landscapeImage.image) {
    try {
      await deleteFromCloudinary(aboutPage.landscapeImage.imagePublicId);
    } catch (error) {
      console.error('Error deleting old landscape image from Cloudinary:', error);
    }
  }

  aboutPage.landscapeImage = req.body;
  await aboutPage.save();

  res.status(200).json({
    success: true,
    data: aboutPage
  });
});

// ===== CERTIFICATIONS CRUD OPERATIONS =====
export const addCertification = asyncHandler(async (req, res) => {
  const aboutPage = await AboutPage.findOne();
  
  if (!aboutPage) {
    return res.status(404).json({
      success: false,
      message: 'About page not found'
    });
  }

  if (!aboutPage.certifications) {
    aboutPage.certifications = [];
  }

  aboutPage.certifications.push(req.body);
  await aboutPage.save();

  res.status(201).json({
    success: true,
    data: aboutPage
  });
});

export const updateCertification = asyncHandler(async (req, res) => {
  const { certId } = req.params;
  const aboutPage = await AboutPage.findOne();

  if (!aboutPage) {
    return res.status(404).json({
      success: false,
      message: 'About page not found'
    });
  }

  const cert = aboutPage.certifications.id(certId);
  if (!cert) {
    return res.status(404).json({
      success: false,
      message: 'Certification not found'
    });
  }

  // Delete old Cloudinary logo if logo is being updated
  if (req.body.logo && cert.logoPublicId && req.body.logo !== cert.logo) {
    try {
      await deleteFromCloudinary(cert.logoPublicId);
    } catch (error) {
      console.error('Error deleting old certification logo from Cloudinary:', error);
    }
  }

  Object.assign(cert, req.body);
  await aboutPage.save();

  res.status(200).json({
    success: true,
    data: aboutPage
  });
});

export const deleteCertification = asyncHandler(async (req, res) => {
  const { certId } = req.params;
  const aboutPage = await AboutPage.findOne();

  if (!aboutPage) {
    return res.status(404).json({
      success: false,
      message: 'About page not found'
    });
  }

  const cert = aboutPage.certifications.id(certId);
  
  // Delete Cloudinary logo if exists
  if (cert && cert.logoPublicId) {
    try {
      await deleteFromCloudinary(cert.logoPublicId);
    } catch (error) {
      console.error('Error deleting certification logo from Cloudinary:', error);
    }
  }

  aboutPage.certifications.pull(certId);
  await aboutPage.save();

  res.status(200).json({
    success: true,
    data: aboutPage
  });
});
