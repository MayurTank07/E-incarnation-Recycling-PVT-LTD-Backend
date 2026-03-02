import ContactForm from '../models/ContactForm.js';
import asyncHandler from '../utils/asyncHandler.js';
import { sendContactFormNotification } from '../utils/emailService.js';
import { verifyCaptcha } from '../utils/verifyCaptcha.js';

export const createContactForm = asyncHandler(async (req, res) => {
  const { captchaToken, ...formData } = req.body;

  // Verify captcha token
  const captchaResult = await verifyCaptcha(captchaToken);
  
  if (!captchaResult.success) {
    res.status(400);
    throw new Error(captchaResult.error || 'Captcha verification failed');
  }

  const contactForm = await ContactForm.create(formData);

  // Send email notification asynchronously (don't block response)
  sendContactFormNotification(contactForm.toObject())
    .then(result => {
      if (result.success) {
        console.log(`✅ Contact form notification email sent successfully for ${contactForm.source}`);
      } else {
        console.error('⚠️ Email notification failed but form was saved:', result.error);
      }
    })
    .catch(error => {
      console.error('⚠️ Email notification error:', error);
    });

  res.status(201).json({
    success: true,
    data: contactForm
  });
});

export const getAllContactForms = asyncHandler(async (req, res) => {
  const { status, source, sortBy = 'createdAt', order = 'desc' } = req.query;
  
  const filter = {};
  if (status) filter.status = status;
  if (source) filter.source = source;

  const contactForms = await ContactForm.find(filter)
    .sort({ [sortBy]: order === 'desc' ? -1 : 1 });

  res.json({
    success: true,
    count: contactForms.length,
    data: contactForms
  });
});

export const getContactFormById = asyncHandler(async (req, res) => {
  const contactForm = await ContactForm.findById(req.params.id);

  if (!contactForm) {
    res.status(404);
    throw new Error('Contact form submission not found');
  }

  res.json({
    success: true,
    data: contactForm
  });
});

export const updateContactFormStatus = asyncHandler(async (req, res) => {
  const { status, isRead } = req.body;

  const contactForm = await ContactForm.findById(req.params.id);

  if (!contactForm) {
    res.status(404);
    throw new Error('Contact form submission not found');
  }

  if (status) contactForm.status = status;
  if (typeof isRead !== 'undefined') contactForm.isRead = isRead;
  
  const updatedContactForm = await contactForm.save();

  res.json({
    success: true,
    data: updatedContactForm
  });
});

export const markAsRead = asyncHandler(async (req, res) => {
  const contactForm = await ContactForm.findById(req.params.id);

  if (!contactForm) {
    res.status(404);
    throw new Error('Contact form submission not found');
  }

  contactForm.isRead = true;
  await contactForm.save();

  res.json({
    success: true,
    data: contactForm
  });
});

export const getUnreadCount = asyncHandler(async (req, res) => {
  const contactPageCount = await ContactForm.countDocuments({ 
    source: 'contact_page', 
    isRead: false 
  });
  
  const footerFormCount = await ContactForm.countDocuments({ 
    source: 'footer_form', 
    isRead: false 
  });
  
  const totalCount = contactPageCount + footerFormCount;

  res.json({
    success: true,
    data: {
      total: totalCount,
      contactPage: contactPageCount,
      footerForm: footerFormCount
    }
  });
});

export const deleteContactForm = asyncHandler(async (req, res) => {
  const contactForm = await ContactForm.findById(req.params.id);

  if (!contactForm) {
    res.status(404);
    throw new Error('Contact form submission not found');
  }

  await contactForm.deleteOne();

  res.json({
    success: true,
    message: 'Contact form submission deleted successfully'
  });
});
