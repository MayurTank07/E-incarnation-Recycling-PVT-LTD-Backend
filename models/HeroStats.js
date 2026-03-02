import mongoose from 'mongoose';

const heroStatsSchema = new mongoose.Schema({
  recycling: {
    type: Number,
    required: true,
    default: 10000
  },
  reuse: {
    type: Number,
    required: true,
    default: 10000
  },
  forecast2026: {
    type: Number,
    required: true,
    default: 10000
  },
  heroTitle: {
    type: String,
    default: 'Breathing Life Into A Greener Future'
  },
  heroDescription: {
    type: String,
    default: 'Join the movement to reduce waste and protect our planet for future generations through circular economy solutions.'
  },
  heroButtonText: {
    type: String,
    default: 'Know More'
  }
}, {
  timestamps: true
});

const HeroStats = mongoose.model('HeroStats', heroStatsSchema);

export default HeroStats;
