import mongoose from 'mongoose';

const contactPageSchema = new mongoose.Schema({
  googleMapEmbedUrl: {
    type: String,
    default: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.8123456789!2d72.9109548!3d19.0922584!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7ce17c4670e57%3A0x3479728da0a0cf0f!2sE-Incarnation%20Recycling%20Pvt.%20Ltd.!5e0!3m2!1sen!2sin!4v1234567890'
  },
  googleMapDirectUrl: {
    type: String,
    default: 'https://maps.google.com/?cid=3781179314759847695'
  },
  heroTitle: {
    type: String,
    default: 'Start a Conversation'
  },
  heroSubtitle: {
    type: String,
    default: 'CONTACT US'
  },
  mainAddress: {
    type: String,
    default: 'Unit No. 103, 1st Floor, Bhaveshwar Arcade, A Wing, Lal Bahadur Shastri Marg, Mumbai, Maharashtra 400086.'
  },
  headOfficeAddress: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

const ContactPage = mongoose.model('ContactPage', contactPageSchema);

export default ContactPage;
