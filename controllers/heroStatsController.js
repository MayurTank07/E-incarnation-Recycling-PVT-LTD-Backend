import HeroStats from '../models/HeroStats.js';
import asyncHandler from '../utils/asyncHandler.js';

export const getHeroStats = asyncHandler(async (req, res) => {
  let heroStats = await HeroStats.findOne();

  if (!heroStats) {
    heroStats = await HeroStats.create({});
  }

  res.json({
    success: true,
    data: heroStats
  });
});

export const updateHeroStats = asyncHandler(async (req, res) => {
  let heroStats = await HeroStats.findOne();

  if (!heroStats) {
    heroStats = await HeroStats.create(req.body);
  } else {
    const { recycling, reuse, forecast2026, heroTitle, heroDescription, heroButtonText } = req.body;

    if (recycling !== undefined) heroStats.recycling = recycling;
    if (reuse !== undefined) heroStats.reuse = reuse;
    if (forecast2026 !== undefined) heroStats.forecast2026 = forecast2026;
    if (heroTitle !== undefined) heroStats.heroTitle = heroTitle;
    if (heroDescription !== undefined) heroStats.heroDescription = heroDescription;
    if (heroButtonText !== undefined) heroStats.heroButtonText = heroButtonText;

    heroStats = await heroStats.save();
  }

  res.json({
    success: true,
    data: heroStats
  });
});
