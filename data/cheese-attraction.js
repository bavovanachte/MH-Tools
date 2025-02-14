/**
 * Runny and [Extra Sweet] Cupcake Colby have either null attraction_bonus or low data
 *
 * 2018-07-05: 105/112 cheeses total
 * 2018-11-29: Manually added Crimson
 * 2019-06-26: Manually added Rockforth
 * 2019-09-01: Updated all cheeses via 19 Jul data (should be 112/115 total)
 */

// prettier-ignore
var baselineAttArray = {
  "Abominable Asiago": 0.9990, // Guesstimate | Calculated: 0.9991, Sample: 12078 (Very High)
  "Ancient": 0.9500, // Guesstimate | Calculated: 0.9488, Sample: 32058 (Excellent)
  "Ancient String": 0.9879, // Sample: 61088 (Excellent)
  "Arctic Asiago": 0.8500, // Guesstimate | Calculated: 0.8513, Sample: 10204 (Very High)
  "Ascended": 0.9613, // Sample: 9354 (High)
  "Bland Queso": 0.9000, // Guesstimate | Calculated: 0.8970, Sample: 163254 (Excellent)
  "Brie": 0.8000, // Guesstimate | Calculated: 0.7989, Sample: 173382 (Excellent)
  "Brie String": 0.8000, // Sample: 648462 (Excellent)
  "Candy Corn": 0.9000, // Guesstimate | Calculated: 0.9019, Sample: 3601 (High)
  "Checkmate": 0.9620, // Sample: 8409 (High)
  "Chedd-Ore": 0.9986, // Sample: 17318 (Very High)
  "Cheddar": 0.5000, // Guesstimate | Calculated: 0.4642, Sample: 2937 (High)
  "Cherry": 0.8721, // Sample: 4033 (High)
  "Coggy Colby": 0.9996, // Sample: 160893 (Excellent)
  "Combat": 0.9850, // Guesstimate | Calculated: 0.9851, Sample: 3415 (High)
  "Creamy Havarti": 0.9850, // Guesstimate | Calculated: 0.9883, Sample: 807 (Medium)
  "Crescent": 0.8900, // Guesstimate | Calculated: 0.8891, Sample: 109398 (Excellent)
  "Crimson": 0.9000, // Guesstimate | Calculated: 0.8971, Sample: 4085 (High)
  "Crunchy": 0.9850, // Guesstimate | Calculated: 0.9871, Sample: 15014 (Very High)
  "Crunchy Havarti": 0.9850, // Guesstimate | Calculated: 0.9882, Sample: 875 (Medium)
  "Dewthief Camembert": 0.9300, // Sample: 28624 (Excellent)
  "Diamond": 0.9990, // Guesstimate | Calculated: 1.0000, Sample: 1822 (High)
  "Dragonvine": 0.9994, // Sample: 152979 (Excellent)
  "Dumpling": 0.9442, // Sample: 82625 (Excellent)
  "Duskshade Camembert": 0.9500, // Guesstimate | Calculated: 0.9472, Sample: 34992 (Excellent)
  "Empowered Brie": 0.8000, // Guesstimate | Calculated: 0.7964, Sample: 10151 (Very High)
  "Empowered SUPER|brie+": 0.9995, // Sample: 20955 (Very High)
  "Festive Feta": 0.8379, // Sample: 4959 (High)
  "Fishy Fromage": 0.9900, // Sample: 45407 (Excellent)
  "Flamin' Queso": 0.9992, // Sample: 97765 (Excellent)
  "Fusion Fondue": 0.9722, // Sample: 616 (Medium)
  "Galleon Gouda": 0.9423, // Sample: 5797 (High)
  "Tier 2": 0.9636, // Sample: 8193 (High)
  "Tier 3": 0.9696, // Sample: 14278 (Very High)
  "Tier 4": 0.9811, // Sample: 7166 (High)
  "Tier 5": 0.9829, // Sample: 7131 (High)
  "Tier 6": 0.9869, // Sample: 6040 (High)
  "Tier 7": 0.9889, // Sample: 3468 (High)
  "Tier 8": 0.9989, // Sample: 2053 (High)
  "Gemstone": 0.9900, // Guesstimate | Calculated: 0.9895, Sample: 12359 (Very High)
  "Ghastly Galleon Gouda": 0.9982, // Sample: 73595 (Excellent)
  "Ghoulgonzola": 0.8957, // Sample: 3123 (High)
  "Gilded": 0.8500, // Guesstimate | Calculated: 0.8491, Sample: 9874 (High)
  "Gingerbread": 0.6932, // Sample: 5206 (High)
  "Glazed Pecan Pecorino": 0.9995, // Guesstimate | Calculated: 1.0000, Sample: 71462 (Excellent)
  "Glowing Gruyere": 0.9900, // Guesstimate | Calculated: 0.9886, Sample: 441129 (Excellent)
  "Glutter": 0.9850, // Guesstimate | Calculated: 0.9828, Sample: 2889 (High)
  "Gnarled": 0.9461, // Sample: 18502 (Very High)
  "Gouda": 0.8500, // Guesstimate | Calculated: 0.8475, Sample: 1289890 (Excellent)
  "Graveblossom Camembert": 0.9500, // Guesstimate | Calculated: 0.9453, Sample: 57286 (Excellent)
  "Grilled": 0.9970, // Sample: 1365 (High)
  "Gumbo": 0.9850, // Guesstimate | Calculated: 0.9847, Sample: 11667 (Very High)
  "Hot Queso": 0.9900, // Guesstimate | Calculated: 0.9885, Sample: 144818 (Excellent)
  "Inferno Havarti": 0.9851, // Sample: 11549 (Very High)
  "Lactrodectus Lancashire": 0.9997, // Sample: 18745 (Very High)
  "Limelight": 0.9500, // Guesstimate | Calculated: 0.9458, Sample: 34886 (Excellent)
  "Lockbox Limburger": 0.9981, // Sample: 37255 (Excellent)
  "Lunaria Camembert": 0.9864, // Sample: 17100 (Very High)
  "Magical Havarti": 0.9850, // Guesstimate | Calculated: 0.9839, Sample: 1880 (High)
  "Magical Rancid Radioactive Blue": 0.9978, // Sample: 10803 (Very High)
  "Magical String": 0.9995, // Sample: 86682 (Excellent)
  "Maki": 0.9800, // Guesstimate | Calculated: 0.9783, Sample: 6300 (High)
  "Maki String": 0.9996, // Sample: 61853 (Excellent)
  "Marble": 0.6000, // Guesstimate | Calculated: 0.6229, Sample: 1432 (High)
  "Marble String": 0.6000, // Guesstimate | Calculated: 0.5895, Sample: 6993 (High)
  "Marshmallow Monterey": 0.9862, // Sample: 71299 (Excellent)
  "Master Fusion": 0.9600, // Guesstimate | Calculated: 0.9582, Sample: 53515 (Excellent)
  "Medium Queso": 0.9800, // Guesstimate | Calculated: 0.9786, Sample: 157487 (Excellent)
  "Mild Queso": 0.9500, // Guesstimate | Calculated: 0.9489, Sample: 167783 (Excellent)
  "Mineral": 0.9900, // Guesstimate | Calculated: 0.9879, Sample: 15369 (Very High)
  "Moon": 0.9974, // Sample: 47869 (Excellent)
  "Mozzarella": 0.6000, // Guesstimate | Calculated: 0.6053, Sample: 377 (Medium)
  "Nian Gao'da": 0.9986, // Sample: 38996 (Excellent)
  "Null Onyx Gorgonzola": 0.9992, // Sample: 26184 (Excellent)
  "Nutmeg": 0.9950, // Guesstimate | Calculated: 1.0000, Sample: 636 (Medium)
  "Onyx Gorgonzola": 0.9900, // Guesstimate | Calculated: 0.9861, Sample: 11346 (Very High)
  "Pecan Pecorino": 0.9999, // Sample: 367770 (Excellent)
  "Polluted Parmesan": 0.9535, // Sample: 21680 (Very High)
  "Pungent Havarti": 0.9850, // Guesstimate | Calculated: 0.9887, Sample: 842 (Medium)
  "Radioactive Blue": 0.9400, // Guesstimate | Calculated: 0.9385, Sample: 41323 (Excellent)
  "Rainy": 0.9995, // Guesstimate | Calculated: 0.9998, Sample: 66545 (Excellent)
  "Rancid Radioactive Blue": 0.9500, // Guesstimate | Calculated: 0.9497, Sample: 55461 (Excellent)
  "Resonator": 0.9900, // Guesstimate | Calculated: 0.9897, Sample: 5467 (High)
  "Rewind Raclette": 0.9990, // Sample: 69437 (Excellent)
  "Rift Combat": 0.9600, // Guesstimate | Calculated: 0.9542, Sample: 10846 (Very High)
  "Rift Glutter": 0.9600, // Guesstimate | Calculated: 0.9609, Sample: 10908 (Very High)
  "Rift Rumble": 0.9900, // Guesstimate | Calculated: 0.9875, Sample: 56681 (Excellent)
  "Rift Susheese": 0.9600, // Guesstimate | Calculated: 0.9559, Sample: 11468 (Very High)
  "Riftiago": 0.9600, // Guesstimate | Calculated: 0.9588, Sample: 19425 (Very High)
  "Rockforth": 0.9500, // Guesstimate | Calculated: 0.9485, Sample: 8572 (High)
  "Rumble": 0.9900, // Guesstimate | Calculated: 0.9885, Sample: 17161 (Very High)
  "Runic": 0.9644, // Sample: 41123 (Excellent)
  "Runic String": 0.9996, // Sample: 333103 (Excellent)
  "SB+": 0.9986, // Sample: 577274 (Excellent)
  "Seasoned Gouda": 0.8482, // Sample: 4275 (High)
  "Shell": 0.9850, // Guesstimate | Calculated: 0.9855, Sample: 11346 (Very High)
  "Snowball Bocconcini": 0.8583, // Sample: 4723 (High)
  "Spicy Havarti": 0.9850, // Guesstimate | Calculated: 0.9802, Sample: 1714 (High)
  "Sunrise": 0.9990, // Guesstimate | Calculated: 1.0000, Sample: 313 (Medium)
  "Susheese": 0.9850, // Guesstimate | Calculated: 0.9906, Sample: 3404 (High)
  "Sweet Havarti": 0.9850, // Guesstimate | Calculated: 0.9835, Sample: 1530 (High)
  "Swiss": 0.7500, // Guesstimate | Calculated: 0.7311, Sample: 9345 (High)
  "Swiss String": 0.7620, // Sample: 20167 (Very High)
  "Terre Ricotta": 0.9500, // Guesstimate | Calculated: 0.9422, Sample: 27263 (Excellent)
  "Undead Emmental": 0.9859, // Sample: 4531 (High)
  "Undead String Emmental": 0.9900, // Guesstimate | Calculated: 0.9897, Sample: 1722 (High)
  "Vanilla Stilton": 0.9400, // Guesstimate | Calculated: 0.9414, Sample: 14470 (Very High)
  "Vengeful Vanilla Stilton": 0.9850, // Guesstimate | Calculated: 0.9858, Sample: 17155 (Very High)
  "White Cheddar": 0.5500, // Guesstimate | Calculated: 0.5515, Sample: 5560 (High)
  "Wicked Gnarly": 0.9900, // Guesstimate | Calculated: 0.9877, Sample: 16185 (Very High)
  "Wildfire Queso": 0.9950, // Guesstimate | Calculated: 0.9938, Sample: 36985 (Excellent)
  "Windy": 0.9995, // Guesstimate | Calculated: 0.9998, Sample: 70703 (Excellent)
};
