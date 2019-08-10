"use strict";

var ztAmp = 100;

// Utility function for determining size of multi-level array
Object.size = function(obj) {
  var size = 0;
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      size++;
    }
  }
  return size;
};

// Rank up wisdom difference requirements
var rankupDiff = {
  novice: 2000, // 2000 - 0
  recruit: 3000, // 5000 - 2000
  apprentice: 7500, // 12500 - 5000
  initiate: 18750, // 31250 - 12500
  journeyman: 34190, // 65440 - 31250
  master: 72373, // 137813 - 65440
  grandmaster: 165375, // 303188 - 137813
  legendary: 363825, // 667013 - 303188
  hero: 800415, // 1467428 - 667013
  knight: 1760913, // 3228341 - 1467428
  lord: 3874008, // 7102349 - 3228341
  baron: 8522819, // 15625168 - 7102349
  count: 18750202, // 34375370 - 15625168
  duke: 41250443, // 75625813 - 34375370
  grandduke: 90750976, // 166376789 - 75625813
  archduke: 199652147, // 366028936 - 166376789
  viceroy: 439234723, // 805263659 - 366028936
  elder: 966316389, // 1771580048 - 805263659
  sage: 2125896058 // 3897476106 - 1771580048
};

var standardCheeseCost = {
  "Cheddar": 10,
  "Marble": 50,
  "Swiss": 100,
  "Brie": 200,
  "Gouda": 600,
  "Marble String": 300,
  "Swiss String": 800,
  "Brie String": 1600
};

var riftWeapons = [
  "Biomolecular Re-atomizer Trap",
  "Christmas Crystalabra Trap",
  "Crystal Tower",
  "Focused Crystal Laser",
  "Multi-Crystal Laser",
  "Mysteriously unYielding Null-Onyx Rampart of Cascading Amperes",
  "Timesplit Dissonance Weapon",
  "Wacky Inflatable Party People Trap"
];

var riftBases = [
  "Attuned Enerchi Induction Base",
  "Clockwork Base",
  "Enerchi Induction Base",
  "Fissure Base",
  "Fracture Base",
  "Rift Base"
];

/**
 * Rift charms with names that do not contain the word "Rift"
 */
var riftCharms = [
  "Cherry Charm",
  "Gnarled Charm",
  "Stagnant Charm",
  "Enerchi Charm",
  "Super Enerchi Charm",
  "Timesplit Charm"
];

var labyrinthMiceClues = {
  "Ash Golem": 1,
  "Automated Stone Sentry": 2,
  "Corridor Bruiser": 0,
  "Dark Templar": 3,
  "Drudge": 1,
  "Fungal Technomorph": 3,
  "Hired Eidolon": 1,
  "Lost": 0,
  "Lost Legionnaire": 0,
  "Masked Pikeman": 1,
  "Mimic": 1,
  "Mind Tearer": 2,
  "Mush Monster": 1,
  "Mushroom Harvester": 1,
  "Mystic Guardian": 2,
  "Mystic Herald": 2,
  "Mystic Scholar": 3,
  "Nightshade Nanny": 2,
  "Reanimated Carver": 0,
  "RR-8": 1,
  "Sanguinarian": 1,
  "Shadow Stalker": 0,
  "Solemn Soldier": 2,
  "Summoning Scholar": 1,
  "Tech Golem": 2,
  "Treasure Brawler": 2
};

var dragons = [
  "Dragon",
  "Dragoon",
  "Ful'Mina, The Mountain Queen",
  "Thunder Strike",
  "Thundering Watcher",
  "Thunderlord",
  "Violet Stormchild",
  "Burly Bruiser",
  "Cork Defender",
  "Corkataur",
  "Corky, the Collector",
  "Fuzzy Drake",
  "Horned Cork Hoarder",
  "Rambunctious Rain Rumbler",
  "Emberstone Scaled",
  "Pyrehyde",
  "Steam Sailor",
  "Vaporior",
  "Warming Wyvern",
  "Bearded Elder",
  "Bruticus, the Blazing",
  "Cinderstorm",
  "Ignatia",
  "Kalor'ignis of the Geyser",
  "Mild Spicekin",
  "Sizzle Pup",
  "Smoldersnap",
  "Stormsurge, the Vile Tempest"
];

var tauntings = [
  "Centaur Ranger",
  "Cyclops Barbarian",
  "Monstrous Black Widow",
  "Tri-dra"
];

var brutes = ["Snow Bowler", "Yeti", "Mammoth"];
var bombSquad = ["Saboteur", "Stickybomber", "Heavy Blaster"];
var berglings = [
  "Incompetent Ice Climber",
  "Polar Bear",
  "Snow Slinger",
  "Snow Soldier",
  "Iceblock",
  "Wolfskie",
  "Snowblind"
];

var compScoreTable = {
  // CC low
  "Bloomed Sylvan":       {"Crazies": 0 , "Gnarlies": 3, "Deepies": 3}, 
  "Cranky Caterpillar":   {"Crazies": 0 , "Gnarlies": 3, "Deepies": 3},
  "Mossy Moosker":        {"Crazies": 0 , "Gnarlies": 3, "Deepies": 3},
  // CC mid
  "Treant Queen":         {"Crazies": 0 , "Gnarlies": 2, "Deepies": 2}, 
  "Spirit Fox":           {"Crazies": 0 , "Gnarlies": 2, "Deepies": 2},
  "Red-Eyed Watcher Owl": {"Crazies": 0 , "Gnarlies": 2, "Deepies": 2},
  // CC high
  "Cyclops Barbarian":    {"Crazies": 0 , "Gnarlies": 1, "Deepies": 1},
    
  // GG low
  "Spirit of Balance":    {"Crazies": 3 , "Gnarlies": 0, "Deepies": 3},
  "Fungal Frog":          {"Crazies": 3 , "Gnarlies": 0, "Deepies": 3},
  "Karmachameleon":       {"Crazies": 3 , "Gnarlies": 0, "Deepies": 3},
  // GG mid
  "Red Coat Bear":        {"Crazies": 2 , "Gnarlies": 0, "Deepies": 2},
  "Rift Tiger":           {"Crazies": 2 , "Gnarlies": 0, "Deepies": 2},
  "Nomadic Warrior":      {"Crazies": 2 , "Gnarlies": 0, "Deepies": 2},
  // GG high
  "Centaur Ranger":       {"Crazies": 1 , "Gnarlies": 0, "Deepies": 1},

  // DL low
  "Twisted Treant":       {"Crazies": 3 , "Gnarlies": 3, "Deepies": 0},
  "Water Sprite":         {"Crazies": 3 , "Gnarlies": 3, "Deepies": 0},
  "Crazed Goblin":        {"Crazies": 3 , "Gnarlies": 3, "Deepies": 0},
  // DL mid
  "Medicine":             {"Crazies": 2 , "Gnarlies": 2, "Deepies": 0},
  "Tree Troll":           {"Crazies": 2 , "Gnarlies": 2, "Deepies": 0},
  "Winged Harpy":         {"Crazies": 2 , "Gnarlies": 2, "Deepies": 0},
  // DL high
  "Tri-dra":              {"Crazies": 1 , "Gnarlies": 1, "Deepies": 0},

  "Grizzled Silth":       {"Crazies": 0 , "Gnarlies": 0, "Deepies": 0},
  "Cherry Sprite":        {"Crazies": 0 , "Gnarlies": 0, "Deepies": 0},
  "Naturalist":           {"Crazies": 0 , "Gnarlies": 0, "Deepies": 0},
  "Gilded Leaf":          {"Crazies": 0 , "Gnarlies": 0, "Deepies": 0},
}


var rage_increase_table = {
  // CC low
  "Bloomed Sylvan":       {"Crazies": 1 , "Gnarlies": 0, "Deepies": 0}, 
  "Cranky Caterpillar":   {"Crazies": 1 , "Gnarlies": 0, "Deepies": 0}, 
  "Mossy Moosker":        {"Crazies": 1 , "Gnarlies": 0, "Deepies": 0}, 
  // CC mid
  "Treant Queen":         {"Crazies": 2 , "Gnarlies": 0, "Deepies": 0}, 
  "Spirit Fox":           {"Crazies": 2 , "Gnarlies": 0, "Deepies": 0}, 
  "Red-Eyed Watcher Owl": {"Crazies": 2 , "Gnarlies": 0, "Deepies": 0}, 
  // CC high
  "Cyclops Barbarian":    {"Crazies": 0 , "Gnarlies": 0, "Deepies": 0},
  // CC funnel-only
  "Cherry Sprite":        {"Crazies": 6 , "Gnarlies": 0, "Deepies": 0},
    
  // GG low
  "Spirit of Balance":    {"Crazies": 0 , "Gnarlies": 1, "Deepies": 0}, 
  "Fungal Frog":          {"Crazies": 0 , "Gnarlies": 1, "Deepies": 0}, 
  "Karmachameleon":       {"Crazies": 0 , "Gnarlies": 1, "Deepies": 0}, 
  // GG mid
  "Red Coat Bear":        {"Crazies": 0 , "Gnarlies": 2, "Deepies": 0},
  "Rift Tiger":           {"Crazies": 0 , "Gnarlies": 2, "Deepies": 0},
  "Nomadic Warrior":      {"Crazies": 0 , "Gnarlies": 2, "Deepies": 0},
  // GG high
  "Centaur Ranger":       {"Crazies": 0 , "Gnarlies": 0, "Deepies": 0},
  // GG funnel-only
  "Naturalist":           {"Crazies": 0 , "Gnarlies": 6, "Deepies": 0},

  // DL low
  "Twisted Treant":       {"Crazies": 0 , "Gnarlies": 0, "Deepies": 1},
  "Water Sprite":         {"Crazies": 0 , "Gnarlies": 0, "Deepies": 1},
  "Crazed Goblin":        {"Crazies": 0 , "Gnarlies": 0, "Deepies": 1},
  // DL mid
  "Medicine":             {"Crazies": 0 , "Gnarlies": 0, "Deepies": 2},
  "Tree Troll":           {"Crazies": 0 , "Gnarlies": 0, "Deepies": 2},
  "Winged Harpy":         {"Crazies": 0 , "Gnarlies": 0, "Deepies": 2},
  // DL high
  "Tri-dra":              {"Crazies": 0 , "Gnarlies": 0, "Deepies": 0},
  // DL funnel-only
  "Grizzled Silth":       {"Crazies": 0 , "Gnarlies": 0, "Deepies": 6},
    
  "Gilded Leaf":          {"Crazies": 2 , "Gnarlies": 2, "Deepies": 2},
}

var catchDepth = {
  "Chipper": 16,
  "Frostlance Guard": 15,
  "Frostwing Commander": 10,
  "General Drheller": 50,
  "Heavy Blaster": 10,
  "Iceblade": 0,
  "Iceblock": 8,
  "Icebreaker": 16,
  "Incompetent Ice Climber": 4,
  "Lady Coldsnap": 8,
  "Living Salt": 20,
  "Lord Splodington": 4,
  "Mammoth": -6,
  "Polar Bear": 8,
  "Princess Fist": 12,
  "Saboteur": 8,
  "Snow Bowler": -4,
  "Snow Slinger": 8,
  "Snow Soldier": 4,
  "Snowblind": 4,
  "Stickybomber": 9,
  "Water Wielder": 0,
  "Wolfskie": 4,
  "Yeti": -4
};

var ftcDepth = {
  "Chipper": 0,
  "Frostlance Guard": 0,
  "Frostwing Commander": 0,
  "General Drheller": -6,
  "Heavy Blaster": -6,
  "Iceblade": -5,
  "Iceblock": -4,
  "Icebreaker": 0,
  "Incompetent Ice Climber": -4,
  "Lady Coldsnap": 0,
  "Living Salt": 0,
  "Lord Splodington": 0,
  "Mammoth": -20,
  "Polar Bear": -4,
  "Princess Fist": 0,
  "Saboteur": -4,
  "Snow Bowler": -16,
  "Snow Slinger": -4,
  "Snow Soldier": -4,
  "Snowblind": -4,
  "Stickybomber": -5,
  "Water Wielder": -5,
  "Wolfskie": -4,
  "Yeti": -16
};

var deltaAmp = {
  "Bruticle": 4,
  "Frostbite": 4,
  "Icicle": 3,
  "Over-Prepared": 1,
  "Penguin": 1,
  "Winter Mage": 5,

  "Derpicorn": 1,
  "Hydrophobe": 1,
  "Puddlemancer": 3,
  "Spring Familiar": 6,
  "Tanglefoot": 2,
  "Vinetail": 5,

  "Firebreather": 4,
  "Firefly": 2,
  "Hot Head": 1,
  "Monarch": 1,
  "Stinger": 4,
  "Summer Mage": 5,

  "Fall Familiar": 6,
  "Harvest Harrier": 3,
  "Harvester": 5,
  "Pumpkin Head": 1,
  "Scarecrow": 1,
  "Whirleygig": 1
};

var pressureMice = {
  "Steam Sailor": 5,
  "Warming Wyvern": 15,
  "Vaporior": 40,
  "Pyrehyde": 100,
  "Emberstone Scaled": 1500
};

var freshness2stale = {
  "-6": 1,
  "-5": 0.9,
  "-4": 0.8,
  "-3": 0.7,
  "-2": 0.6,
  "-1": 0.55,
  "0": 0.5,
  "1": 0.45,
  "2": 0.4,
  "3": 0.3,
  "4": 0.2,
  "5": 0.1,
  "6": 0
};

var reverseParseFreshness = {
  "-6": "Über Stale (100% stale rate)",
  "-5": "Ultimately Stale (90% stale rate)",
  "-4": "Insanely Stale (80% stale rate)",
  "-3": "Extremely Stale (70% stale rate)",
  "-2": "Very Stale (60% stale rate)",
  "-1": "Stale (55.5% stale rate)",
  "0": "No Effect (50% stale rate)",
  "1": "Fresh (45% stale rate)",
  "2": "Very Fresh (40% stale rate)",
  "3": "Extremely Fresh (30% stale rate)",
  "4": "Insanely Fresh (20% stale rate)",
  "5": "Ultimately Fresh (10% stale rate)",
  "6": "Über Fresh (0% stale rate)"
};

var parseFreshness = {
  "Uber Stale": -6,
  "Ultimately Stale": -5,
  "Insanely Stale": -4,
  "Extremely Stale": -3,
  "Very Stale": -2,
  "Stale": -1,
  "No Effect": 0,
  "Fresh": 1,
  "Very Fresh": 2,
  "Extremely Fresh": 3,
  "Insanely Fresh": 4,
  "Ultimately Fresh": 5,
  "Uber Fresh": 6
};

/**
 * Maps types to integers for lookup in the powers array
 */
var typeEff = {
  Arcane: 1,
  Draconic: 2,
  Forgotten: 3,
  Hydro: 4,
  Parental: 5,
  Physical: 6,
  Shadow: 7,
  Tactical: 8,
  Law: 9,
  Rift: 10
};

// Power, power bonus (%), attraction bonus (%), luck, cheese effect
var basesArray = {
  "10 Layer Birthday Cake Base": [300, 10, 10, 10, "No Effect"],
  "2017 New Year's Base": [200, 7, 0, 10, "Fresh"],
  "2018 New Year's Base": [200, 7, 0, 10, "Fresh"],
  "2019 New Year's Base": [200, 7, 0, 10, "Fresh"],
  "Aqua Base": [230, 0, 0, 8, "No Effect"],
  "Attuned Enerchi Induction Base": [500, 10, 10, 10, "Stale"],
  "Ancient Booster Base": [300, 0, 10, 10, "Fresh"],
  "Aurora Base": [250, 3, 5, 6, "Very Fresh"],
  "Bacon Base": [200, 0, 15, 0, "Extremely Fresh"],
  "Bamboozler Base": [200, 10, 5, 0, "Very Fresh"],
  "Birthday Banana Cake Base": [300, 11, 11, 11, "Fresh"],
  "Birthday Cake Base": [175, 11, 5, 0, "No Effect"],
  "Birthday Drag\xE9e Cake Base": [175, 5, 15, 6, "Very Fresh"],
  "Black Widow Base": [100, 10, 10, 10, "No Effect"],
  "Bronze Tournament Base": [300, 5, 3, 5, "Fresh"],
  "Candy Cane Base": [300, 0, 0, 8, "Fresh"],
  "Carrot Birthday Cake Base": [175, 5, 5, 3, "Fresh"],
  "Cheesecake Base": [175, 3, 20, 0, "No Effect"],
  "Chocolate Birthday Cake Base": [175, 8, 5, 1, "No Effect"],
  "Claw Shot Base": [250, 10, 5, 4, "Very Fresh"],
  "Clockwork Base": [800, 20, 5, 13, "No Effect"],
  "Crushed Birthday Cake Base": [185, 3, 15, 5, "Uber Stale"],
  "Cupcake Birthday Base": [300, 7, 7, 7, "Extremely Fresh"],
  "Deadwood Plank Base": [350, 10, 5, 10, "No Effect"],
  "Deep Freeze Base": [35, 0, 0, 0, "Uber Fresh"],
  "Dehydration Base": [225, 0, 5, 4, "Insanely Fresh"],
  "Denture Base": [100, 10, 0, 0, "No Effect"],
  "Denture Base (Toothlet Charged)": [1500, 25, 25, 20, "No Effect"],
  "Depth Charge Base": [450, 10, 0, 10, "No Effect"],
  "Dog Jade Base": [375, 12, 10, 10, "Stale"],
  "Dragon Jade Base": [300, 10, 0, 10, "No Effect"],
  "Enerchi Induction Base": [100, 10, 0, 10, "Stale"],
  "Explosive Base": [300, 5, 5, 0, "Stale"],
  "Extra Sweet Cupcake Birthday Base": [300, 8, 8, 8, "Extremely Fresh"],
  "Eerie Base": [300, 8, 5, 8, "Very Stale"],
  "Eerier Base": [300, 10, 0, 10, "Stale"],
  "Fan Base": [175, 12, 0, 2, "Very Fresh"],
  "Festive Winter Hunt Base": [100, 0, 15, 10, "Very Fresh"],
  "Firecracker Base": [300, 5, 5, 4, "Stale"],
  "Fissure Base": [450, 15, 5, 12, "Stale"],
  "Fracture Base": [200, 10, 0, 10, "Fresh"],
  "Furoma Base": [100, 10, 10, 10, "No Effect"],
  "Gingerbread Base": [225, 8, 0, 4, "Insanely Fresh"],
  "Golden Tournament Base": [500, 15, 10, 8, "Extremely Fresh"],
  "Glowing Golem Guardian Base": [500, 20, 5, 10, "Fresh"],
  "Hearthstone Base": [200, 0, 10, 2, "Very Fresh"],
  "Horse Jade Base": [325, 10, 10, 10, "Stale"],
  "Hothouse Base": [250, 3, 5, 6, "Very Fresh"],
  "Jade Base": [300, 10, 0, 4, "Extremely Fresh"],
  "Labyrinth Base": [100, 12, 0, 10, "Very Stale"],
  "Living Base": [250, 12, 0, 8, "Very Fresh"],
  "Living Grove Base": [450, 10, 5, 8, "Very Fresh"],
  "Magma Base": [300, 8, 5, 10, "Insanely Stale"],
  "Magnet Base": [250, 10, 0, 5, "Fresh"],
  "Minotaur Base": [1000, 20, 10, 15, "Fresh"],
  "Molten Shrapnel Base": [300, 12, 5, 8, "Extremely Stale"],
  "Monkey Jade Base": [350, 12, 10, 10, "Stale"],
  "Monolith Base": [300, 12, 0, 0, "No Effect"],
  "Overgrown Ember Stone Base": [450, 10, 18, 12, "Ultimately Stale"],
  "Papyrus Base": [400, 0, 0, 10, "Fresh"],
  "Physical Brace Base": [300, 0, 5, 8, "No Effect"],
  "Pig Jade Base": [375, 12, 10, 10, "Stale"],
  "Polar Base": [200, 10, 0, 4, "Insanely Fresh"],
  "Polluted Base": [500, 10, 0, 5, "Stale"],
  "Refined Pollutinum Base": [500, 12, 5, 10, "No Effect"],
  "Remote Detonator Base": [300, 10, 10, 4, "Stale"],
  "Rift Base": [250, 12, 0, 11, "Fresh"],
  "Rooster Jade Base": [350, 12, 10, 10, "Stale"],
  "Runic Base": [200, 12, 10, 5, "No Effect"],
  "Seasonal Base": [300, 0, 8, 6, "No Effect"],
  "Sheep Jade Base": [325, 12, 10, 10, "Stale"],
  "Silver Tournament Base": [400, 10, 5, 7, "Very Fresh"],
  "Skello-ton Base": [300, 5, 5, 8, "No Effect"],
  "Snake Jade Base": [300, 10, 10, 10, "No Effect"],
  "Soiled Base": [400, 12, 5, 6, "Very Fresh"],
  "Spellbook Base": [500, 14, 5, 7, "Fresh"],
  "Spiked Base": [300, 12, 0, 3, "Very Stale"],
  "Sprinkly Sweet Cupcake Birthday Base": [300, 9, 9, 9, "Extremely Fresh"],
  "Stone Base": [150, 10, 0, 0, "Fresh"],
  "Tidal Base": [800, 8, 10, 10, "Fresh"],
  "Tiki Base": [200, 18, 5, 0, "Very Fresh"],
  "Tribal Base": [175, 18, 2, 0, "Fresh"],
  "Tribal Kaboom Base": [200, 18, 2, 0, "Very Fresh"],
  "Ultimate Iceberg Base": [200, 5, 10, 5, "Very Fresh"],
  "Washboard Base": [250, 10, 8, 8, "Extremely Stale"],
  "Wooden Base": [35, 0, 0, 0, "Very Fresh"],
  "Wooden Base with Target": [75, 0, 20, 0, "No Effect"]
};
var baseKeys = Object.keys(basesArray);
baseKeys.sort();

// Power type, power, power bonus (%), attraction bonus (%), luck, cheese effect
// prettier-ignore
var weaponsArray = {
  "2010 Blastoff Trap": ["Tactical", 2600, 15, 0, 25, "Very Stale"],
  "2012 Big Boom Trap": ["Tactical", 2500, 15, 20, 25, "Extremely Stale"],
  "500 Pound Spiked Crusher": ["Physical", 250, 10, 0, 1, "No Effect"],
  "Admiral's Galleon Trap": ["Shadow", 2500, 25, 0, 15, "No Effect"],
  "Ambrosial Portal": ["Shadow", 1025, 0, 5, 0, "Fresh"],
  "Ambush": ["Tactical", 3000, 5, 0, 12, "Fresh"],
  "Ancient Box Trap": ["Forgotten", 4300, 10, 0, 4, "No Effect"],
  "Ancient Gauntlet": ["Physical", 1050, 4, 20, 4, "Extremely Fresh"],
  "Ancient Spear Gun": ["Hydro", 3600, 5, 10, 12, "Fresh"],
  "Anniversary Ambush": ["Tactical", 3000, 5, 0, 25, "No Effect"],
  "Anniversary Ancient Box Trap": ["Forgotten", 4300, 10, 0, 10, "No Effect"],
  "Anniversary Arcane Capturing Rod Of Never Yielding Mystery": ["Arcane", 3800, 12, 0, 25, "Insanely Stale"],
  "Anniversary DeathBot": ["Physical", 2400, 15, 10, 25, "Stale"],
  "Anniversary Reaper's Perch": ["Shadow", 3300, 10, 5, 25, "Stale"],
  "Arcane Blast Trap": ["Arcane", 3400, 8, 0, 20, "Insanely Fresh"],
  "Arcane Capturing Rod Of Never Yielding Mystery": ["Arcane", 3800, 12, 0, 18, "Insanely Stale"],
  "Bandit Deflector": ["Law", 1500, 11, 0, 0, "No Effect"],
  "Biomolecular Re-atomizer Trap": ["Rift", 1500, 2, 2, 0, "Very Fresh"],
  "Birthday Candle Kaboom": ["Physical", 2400, 30, 20, 14, "Very Stale"],
  "Birthday Party Pi\xF1ata Bonanza": ["Physical", 2500, 35, 0, 10, "Stale"],
  "Blackstone Pass Trap": ["Tactical", 3000, 15, 0, 12, "Very Fresh"],
  "Blazing Ember Spear Trap": ["Draconic", 5500, 15, 10, 12, "Extremely Stale"],
  "Bottomless Grave": ["Shadow", 1500, 0, 0, 5, "No Effect"],
  "Brain Extractor": ["Shadow", 2000, 5, 5, 6, "Fresh"],
  "Bubbles: The Party Crasher Trap": ["Hydro", 5800, 18, 8, 8, "Very Stale"],
  "Cackle Lantern Trap": ["Shadow", 2200, 5, 10, 12, "Extremely Stale"],
  "Candy Crusher Trap": ["Shadow", 2000, 3, 15, 15, "No Effect"],
  "Chesla's Revenge": ["Tactical", 5000, 2, 10, 16, "Extremely Fresh"],
  "Christmas Cactus Trap": ["Law", 1800, 5, 15, 4, "Fresh"],
  "Christmas Cracker Trap": ["Physical", 3000, 15, 5, 24, "Very Fresh"],
  "Christmas Crystalabra Trap": ["Rift", 1200, 0, 5, 4, "Fresh"],
  "Chrome Arcane Capturing Rod Of Never Yielding Mystery": ["Arcane", 5000, 10, 10, 20, "No Effect"],
  "Chrome DeathBot": ["Physical", 2800, 20, 15, 30, "Very Stale"],
  "Chrome DrillBot": ["Physical", 3900, 20, 0, 26, "Insanely Stale"],
  "Chrome Grand Arcanum Trap": ["Arcane", 5000, 12, 5, 23, "Fresh"],
  "Chrome MonstroBot": ["Physical", 8500, 22, 10, 30, "No Effect"],
  "Chrome Nannybot": ["Shadow", 1200, 5, 5, 6, "Fresh"],
  "Chrome Oasis Water Node Trap": ["Hydro", 5500, 15, 5, 24, "Fresh"],
  "Chrome Onyx Mallet": ["Physical", 5000, 30, 0, 20, "Very Stale"],
  "Chrome Phantasmic Oasis Trap": ["Hydro", 6200, 20, 15, 28, "Very Fresh"],
  "Chrome RhinoBot": ["Physical", 6000, 10, 0, 27, "Ultimately Stale"],
  "Chrome Sphynx Wrath": ["Tactical", 6500, 15, 10, 28, "Very Fresh"],
  "Chrome Storm Wrought Ballista Trap": ["Draconic", 6200, 18, 15, 20, "Stale"],
  "Chrome Tacky Glue Trap": ["Physical", 70, 0, 30, 20, "Stale"],
  "Chrome Temporal Turbine": ["Shadow", 6000, 25, 5, 28, "No Effect"],
  "Clockapult of Time": ["Shadow", 2275, 10, 5, 10, "Extremely Fresh"],
  "Clockapult of Winter Past": ["Shadow", 2275, 10, 5, 10, "Extremely Fresh"],
  "Clockwork Portal Trap": ["Shadow", 3900, 12, 10, 20, "No Effect"],
  "Creepy Coffin Trap": ["Shadow", 1800, 5, 5, 7, "Extremely Stale"],
  "Crystal Crucible Trap": ["Forgotten", 7800, 10, 2, 8, "Very Fresh"],
  "Crystal Mineral Crusher Trap": ["Forgotten", 8000, 10, 5, 5, "Fresh"],
  "Crystal Tower": ["Rift", 900, 0, 0, 0, "No Effect"],
  "Digby DrillBot": ["Physical", 3200, 18, 0, 5, "No Effect"],
  "Dimensional Chest Trap": ["Tactical", 5200, 8, 10, 21, "Extremely Fresh"],
  "Double Diamond Adventure": ["Hydro", 3500, 0, 5, 18, "Insanely Fresh"],
  "Dragon Lance": ["Draconic", 4950, 30, 5, 12, "Extremely Stale"],
  "Dragon Slayer Cannon": ["Draconic", 10000, 35, 10, 25, "No Effect"],
  "Dragonvine Ballista Trap": ["Draconic", 5750, 15, 5, 14, "Stale"],
  "Dreaded Totem Trap": ["Shadow", 3000, 15, 10, 10, "Very Stale"],
  "Droid Archmagus Trap": ["Arcane", 5000, 15, 10, 20, "Stale"],
  "Ember Prison Core Trap": ["Law", 4500, 25, 10, 16, "Stale"],
  "Endless Labyrinth Trap": ["Forgotten", 10000, 15, 5, 9, "Very Stale"],
  "Engine Doubler": ["Law", 1500, 12, 0, 0, "No Effect"],
  "Enraged RhinoBot": ["Physical", 5900, 10, 0, 20, "Insanely Stale"],
  "Event Horizon Trap": ["Arcane", 6000, 12, 10, 25, "No Effect"],
  "Explosive Toboggan Ride": ["Hydro", 2700, 14, 3, 16, "Extremely Fresh"],
  "Festive Forgotten Fir Trap": ["Forgotten", 7000, 20, 5, 10, "Fresh"],
  "Festive Gauntlet Crusher": ["Physical", 1200, 5, 25, 5, "Extremely Fresh"],
  "Fluffy DeathBot": ["Physical", 2400, 15, 10, 2, "Stale"],
  "Focused Crystal Laser": ["Rift", 1750, 0, 0, 0, "No Effect"],
  "Forgotten Pressure Plate Trap": ["Forgotten", 3500, 10, 10, 2, "Fresh"],
  "Giant Speaker": ["Tactical", 2850, 5, 5, 22, "No Effect"],
  "Gingerbread House Surprise": ["Tactical", 2200, 10, 10, 8, "Uber Fresh"],
  "Glacier Gatler": ["Hydro", 4800, 10, 10, 20, "Very Fresh"],
  "Goldfrost Crossbow Trap": ["Shadow", 5000, 18, 0, 20, "Very Fresh"],
  "Golem Guardian Arcane Trap": ["Arcane", 6000, 15, 20, 28, "Fresh"],
  "Golem Guardian Forgotten Trap": ["Forgotten", 7000, 15, 20, 15, "Fresh"],
  "Golem Guardian Hydro Trap": ["Hydro", 10000, 15, 20, 28, "Fresh"],
  "Golem Guardian Physical Trap": ["Physical", 7000, 15, 20, 32, "Fresh"],
  "Golem Guardian Tactical Trap": ["Tactical", 5000, 15, 20, 30, "Fresh"],
  "Gorgon Trap": ["Shadow", 2000, 5, 5, 7, "Very Stale"],
  "Gouging Geyserite Trap": ["Tactical", 9000, 20, 10, 23, "Fresh"],
  "Grand Arcanum Trap": ["Arcane", 4800, 12, 5, 22, "No Effect"],
  "Grungy Deathbot": ["Physical", 2400, 15, 10, 2, "Stale"],
  "Harpoon Gun": ["Hydro", 3000, 7, 0, 0, "Stale"],
  "Harrowing Holiday Harpoon Harp": ["Draconic", 5000, 12, 5, 13, "Very Fresh"],
  "Haunted Shipwreck Trap": ["Hydro", 5000, 20, 10, 10, "Very Stale"],
  "Heat Bath": ["Hydro", 4000, 5, 0, 14, "Stale"],
  "High Tension Spring": ["Physical", 75, 5, 20, 2, "No Effect"],
  "HitGrab Horsey": ["Physical", 550, 2, 0, 20, "Very Fresh"],
  "HitGrab Rainbow Rockin' Horse": ["Physical", 1250, 2, 10, 25, "Uber Fresh"],
  "HitGrab Rockin' Horse": ["Physical", 1250, 2, 10, 25, "No Effect"],
  "Holiday Hydro Hailstone Trap": ["Hydro", 3500, 20, 5, 20, "Fresh"],
  "Horrific Venus Mouse Trap": ["Tactical", 3400, 12, 1, 16, "No Effect"],
  "Ice Blaster": ["Hydro", 3800, 5, 5, 12, "Fresh"],
  "Ice Maiden": ["Draconic", 5200, 12, 0, 8, "No Effect"],
  "Icy RhinoBot": ["Physical", 4950, 0, 0, 8, "Very Stale"],
  "Infinite Labyrinth Trap": ["Forgotten", 11011, 15, 5, 11, "Stale"],
  "Infinite Winter Horizon Trap": ["Arcane", 6000, 10, 15, 26, "Extremely Fresh"],
  "Interdimensional Crossbow Trap":["Shadow", 4500, 15, 15, 18, "Fresh"],
  "Isle Idol Trap": ["Physical", 5050, 0, 0, 7, "Stale"],
  "Isle Idol Hydroplane Skin": ["Hydro", 3500, 5, 15, 10, "Stale"],
  "Isle Idol Stakeshooter Skin": ["Tactical", 3750, 12, 5, 14, "Stale"],
  "Judge Droid Trap": ["Law", 2000, 10, 0, 6, "Very Fresh"],
  "Kraken Chaos": ["Hydro", 3400, 0, 0, 18, "Very Stale"],
  "Law Laser Trap": ["Law", 1750, 20, 10, 3, "Fresh"],
  "Maniacal Brain Extractor": ["Shadow", 2600, 10, 0, 13, "Very Fresh"],
  "Meteor Prison Core Trap": ["Law", 3000, 20, 10, 8, "No Effect"],
  "Moonbeam Barrier Trap": ["Shadow", 4000, 10, 10, 15, "Stale"],
  "Mouse DeathBot": ["Physical", 2400, 15, 10, 2, "Stale"],
  "Mouse Hot Tub": ["Physical", 70, 3, 35, 2, "No Effect"],
  "Mouse Mary O'Nette": ["Physical", 250, 0, 6, 5, "Fresh"],
  "Mouse Rocketine": ["Physical", 650, 6, 0, 0, "Extremely Stale"],
  "Mouse Trebuchet": ["Physical", 600, 2, 4, 1, "Very Fresh"],
  "Multi-Crystal Laser": ["Rift", 1000, 0, 0, 3, "No Effect"],
  "Mutated Venus Mouse Trap": ["Tactical", 2300, 15, 0, 8, "Insanely Stale"],
  "Mysteriously unYielding Null-Onyx Rampart of Cascading Amperes": ["Rift", 1835, 2, 5, 5, "No Effect"],
  "Mystic Pawn Pincher": ["Tactical", 60, 5, 20, 0, "Fresh"],
  "Nannybot": ["Parental", 525, 5, 0, 5, "No Effect"],
  "Net Cannon": ["Hydro", 3000, 0, 3, 5, "Stale"],
  "New Horizon Trap": ["Arcane", 6217, 15, 10, 26, "Fresh"],
  "New Year's Fireworks Trap": ["Physical", 6000, 12, 10, 23, "Stale"],
  "Ninja Ambush Trap": ["Tactical", 3000, 5, 0, 12, "Fresh"],
  "Nutcracker Nuisance Trap": ["Arcane", 3000, 18, 15, 16, "Insanely Fresh"],
  "NVMRC Forcefield Trap": ["Physical", 2350, 12, 10, 12, "No Effect"],
  "Oasis Water Node Trap": ["Hydro", 5200, 12, 10, 20, "No Effect"],
  "Obelisk of Incineration": ["Arcane", 2150, 10, 0, 1, "Insanely Stale"],
  "Obelisk of Slumber": ["Arcane", 2100, 0, 10, 0, "Extremely Fresh"],
  "Obvious Ambush Trap": ["Tactical", 3000, 15, 0, 12, "Very Stale"],
  "Onyx Mallet": ["Physical", 3800, 12, 0, 6, "Stale"],
  "Paradise Falls Trap": ["Hydro", 4000, 25, 25, 22, "Very Stale"],
  "PartyBot": ["Physical", 2850, 15, 15, 25, "Stale"],
  "Phantasmic Oasis Trap": ["Hydro", 5850, 15, 20, 26, "No Effect"],
  "Pneumatic Tube Trap": ["Physical", 2300, 20, 5, 18, "No Effect"],
  "Pumpkin Pummeler": ["Shadow", 1150, 5, 10, 5, "Fresh"],
  "Queso Fount Trap": ["Hydro", 11000, 30, 10, 25, "Stale"],
  "Reaper's Perch": ["Shadow", 3300, 10, 5, 16, "Stale"],
  "Rewers Riposte": ["Tactical", 2900, 15, 5, 25, "Fresh"],
  "RhinoBot": ["Physical", 4950, 0, 0, 8, "Very Stale"],
  "Rocket Propelled Gavel Trap": ["Physical", 6200, 15, 0, 22, "Stale"],
  "Rune Shark Trap": ["Hydro", 6700, 15, 20, 27, "Very Fresh"],
  "S.A.M. F.E.D. DN-5": ["Tactical", 2750, 5, 20, 15, "Fresh"],
  "S.L.A.C.": ["Law", 300, 5, 10, 0, "No Effect"],
  "S.L.A.C. II": ["Law", 1500, 6, 15, 0, "No Effect"],
  "S.U.P.E.R. Scum Scrubber": ["Hydro", 4000, 15, 15, 15, "Stale"],
  "Sandcastle Shard Trap": ["Shadow", 3000, 5, 15, 12, "Fresh"],
  "Sandstorm MonstroBot": ["Physical", 8000, 20, 5, 27, "No Effect"],
  "Sandtail Sentinel": ["Physical", 6800, 17, 10, 25, "No Effect"],
  "Scarlet Ember Root Trap": ["Forgotten", 6000, 3, 10, 7, "Very Stale"],
  "School of Sharks": ["Hydro", 9850, 15, 20, 30, "Extremely Fresh"],
  "Scum Scrubber": ["Hydro", 3000, 15, 0, 13, "Stale"],
  "Shrink Ray Trap": ["Physical", 1000, 5, 2, 8, "Fresh"],
  "Sinister Portal": ["Shadow", 1025, 5, 0, 0, "Stale"],
  "Smoldering Stone Sentinel Trap": ["Physical", 12000, 25, 10, 25, "Very Stale"],
  "Snow Barrage": ["Tactical", 1450, 20, 20, 28, "Very Fresh"],
  "Snowglobe Trap": ["Physical", 2350, 12, 10, 16, "No Effect"],
  "Soul Catcher": ["Shadow", 1500, 5, 5, 5, "No Effect"],
  "Soul Harvester": ["Shadow", 2200, 5, 5, 12, "No Effect"],
  "Sphynx Wrath": ["Tactical", 6100, 10, 10, 25, "Very Fresh"],
  "Sprinkly Cupcake Surprise Trap": ["Arcane", 3500, 9, 9, 9, "Very Fresh"],
  "Stale Cupcake Golem Trap": ["Forgotten", 6700, 7, 0, 0, "No Effect"],
  "Steam Laser Mk. I": ["Hydro", 4200, 8, 0, 14, "No Effect"],
  "Steam Laser Mk. II": ["Hydro", 4800, 12, 10, 18, "Fresh"],
  "Steam Laser Mk. II (Broken!)": ["Hydro", 0, 0, 0, 0, "Uber Fresh"],
  "Steam Laser Mk. III": ["Hydro", 4800, 12, 10, 18, "Fresh"],
  "Storm Wrought Ballista Trap": ["Draconic", 6000, 15, 10, 15, "Stale"],
  "Supply Grabber": ["Law", 1500, 10, 0, 0, "No Effect"],
  "Surprise Party Trap": ["Law", 2000, 11, 11, 4, "Extremely Fresh"],
  "Swiss Army Mouse Trap": ["Physical", 1200, 2, 2, 10, "No Effect"],
  "Tacky Glue Trap": ["Physical", 70, 0, 40, 2, "Stale"],
  "Tarannosaurus Rex Trap": ["Forgotten", 5200, 12, 0, 8, "Fresh"],
  "Technic Pawn Pincher": ["Tactical", 60, 5, 20, 0, "Stale"],
  "Temporal Turbine": ["Shadow", 5000, 20, 0, 25, "Stale"],
  "Terrifying Spider Trap": ["Shadow", 2400, 5, 5, 13, "No Effect"],
  "The Forgotten Art of Dance": ["Forgotten", 5000, 12, 6, 6, "No Effect"],
  "The Law Draw": ["Law", 1100, 5, 20, 5, "Fresh"],
  "Thorned Venus Mouse Trap": ["Tactical", 3400, 5, 2, 14, "Very Fresh"],
  "Timesplit Dissonance Weapon": ["Rift", 3000, 10, 10, 7, "No Effect"],
  "Ultra MegaMouser MechaBot Trap": ["Physical", 2250, 5, 15, 8, "No Effect"],
  "Veiled Vine Trap": ["Tactical", 3500, 12, 0, 20, "Very Stale"],
  "Venus Mouse Trap": ["Tactical", 1900, 0, 5, 5, "Extremely Fresh"],
  "Wacky Inflatable Party People Trap": ["Rift", 1100, 11, 11, 4, "Fresh"],
  "Warden Slayer Trap": ["Physical", 6000, 15, 15, 17, "No Effect"],
  "Warpath Thrasher": ["Physical", 4500, 10, 5, 6, "Stale"],
  "Well of Wisdom Trap": ["Tactical", 4000, 3, 25, 22, "Insanely Fresh"],
  "Wrapped Gift Trap": ["Physical", 1100, 5, 10, 5, "No Effect"],
  "Zugzwang's First Move": ["Tactical", 3660, 15, 0, 17, "Very Fresh"],
  "Zugzwang's Last Move": ["Tactical", 2200, 15, 0, 7, "Fresh"],
  "Zugzwang's Ultimate Move": ["Tactical", 4500, 20, 10, 20, "Very Fresh"],
  "Zurreal's Folly": ["Tactical", 2930, 20, 15, 12, "Ultimately Stale"]
};
var weaponKeys = Object.keys(weaponsArray);
weaponKeys.sort();

// Power, power bonus (%), attraction bonus (%), luck, cheese effect
var charmsArray = {
  "2014 Charm": [2014, 0, 0, 0, "No Effect"],
  "2015 Charm": [2015, 0, 0, 0, "No Effect"],
  "2016 Charm": [2016, 0, 0, 0, "No Effect"],
  "2017 Charm": [2017, 0, 0, 0, "No Effect"],
  "2018 Charm": [2018, 0, 0, 0, "No Effect"],
  "2019 Charm": [2019, 0, 0, 0, "No Effect"],
  "Airship Charm": [800, 0, 0, 5, "No Effect"],
  "Amplifier Charm": [0, 0, 0, 0, "No Effect"],
  "Ancient Charm": [600, 5, 5, 5, "Extremely Fresh"],
  "Antiskele Charm": [0, 0, 0, 0, "No Effect"],
  "Artisan Charm": [120, 0, 5, 0, "No Effect"],
  "Athlete Charm": [120, 1, 0, 3, "No Effect"],
  "Attraction Charm": [0, 0, 5, 0, "No Effect"],
  "Baitkeep Charm": [0, 0, 0, 0, "No Effect"],
  "Black Powder Charm": [0, 3, 0, 5, "Fresh"],
  "Blue Double Sponge Charm": [0, 0, 0, 0, "No Effect"],
  "Brain Charm": [0, 0, 0, 0, "Extremely Fresh"],
  "Bravery Charm": [0, 0, 0, 0, "No Effect"],
  "Cackle Charm": [250, 1, 0, 0, "Stale"],
  "Cactus Charm": [250, 1, 4, 2, "Stale"],
  "Candy Charm": [500, 5, 10, 5, "No Effect"],
  "Champion Charm": [400, 5, 0, 3, "No Effect"],
  "Cherry Charm": [250, 0, 5, 2, "No Effect"],
  "Chrome Charm": [0, 3, 0, 5, "Fresh"],
  "Clarity Charm": [0, 0, 0, 0, "No Effect"],
  "Compass Magnet Charm": [200, 5, 2, 3, "Fresh"],
  "Cupcake Charm": [0, 0, 7, 7, "Fresh"],
  "Crucible Cloning Charm": [0, 0, 0, 0, "No Effect"],
  "Dark Chocolate Charm": [250, 1, 0, 0, "Stale"],
  "Derr Power Charm": [0, 0, 0, 0, "No Effect"],
  "Diamond Boost Charm": [0, 0, 0, 0, "No Effect"],
  "Door Guard Charm": [0, 3, 0, 5, "Fresh"],
  "Dragonbreath Charm": [0, 5, 0, 0, "No Effect"],
  "Dragonbane Charm": [0, 0, 0, 0, "No Effect"],
  "Dreaded Charm": [0, 0, 0, 0, "No Effect"],
  "Dusty Coal Charm": [0, 3, 0, 5, "Fresh"],
  "Eggscavator Charge Charm": [0, 0, 0, 0, "No Effect"],
  "Eggstra Charm": [0, 0, 0, 0, "No Effect"],
  "Eggstra Charge Charm": [0, 0, 0, 0, "No Effect"],
  "Elub Power Charm": [0, 0, 0, 0, "No Effect"],
  "Ember Charm": [0, 500, 0, 0, "No Effect"],
  "EMP400 Charm": [0, 0, 0, 0, "Stale"],
  "Empowered Anchor Charm": [300, 4, 0, 0, "No Effect"],
  "Enerchi Charm": [100, 1, 0, 0, "No Effect"],
  "Extra Sweet Cupcake Charm": [0, 0, 8, 8, "Fresh"],
  "Extreme Ancient Charm": [800, 7, 7, 7, "Insanely Fresh"],
  "Extreme Attraction Charm": [0, 0, 50, 0, "No Effect"],
  "Extreme Dragonbane Charm": [0, 0, 0, 0, "No Effect"],
  "Extreme Luck Charm": [0, 0, 0, 5, "No Effect"],
  "Extreme Polluted Charm": [0, 0, 0, 0, "No Effect"],
  "Extreme Power Charm": [600, 5, 0, 0, "No Effect"],
  "Extreme Queso Pump Charm": [100, 10, 10, 8, "Very Fresh"],
  "Extreme Regal Charm": [2000, 0, 75, 8, "No Effect"],
  "Extreme Snowball Charm": [400, 4, 4, 8, "No Effect"],
  "Extreme Spooky Charm": [400, 4, 4, 8, "No Effect"],
  "Extreme Wealth Charm": [0, 0, 0, 0, "No Effect"],
  "Factory Repair Charm": [11, 11, 11, 5, "No Effect"],
  "Festive Anchor Charm": [300, 4, 0, 0, "No Effect"],
  "Festive Ultimate Luck Charm": [0, 0, 0, 20, "No Effect"],
  "Festive Ultimate Lucky Power Charm": [2400, 20, 0, 20, "No Effect"],
  "Festive Ultimate Power Charm": [2400, 20, 0, 0, "No Effect"],
  "Firecracker Charm": [0, 3, 0, 0, "No Effect"],
  "First Ever Charm": [40, 0, 0, 0, "No Effect"],
  "Flamebane Charm": [0, 0, 0, 0, "No Effect"],
  "Forgotten Charm": [0, 0, 0, 0, "No Effect"],
  "Freshness Charm": [0, 0, 0, 0, "Very Fresh"],
  "Gargantua Charm": [250, 5, 0, 0, "No Effect"],
  "Gemstone Boost Charm": [0, 0, 0, 0, "No Effect"],
  "Gift Wrapped Charm": [0, 0, 0, 2, "No Effect"],
  "Gilded Charm": [360, 3, 20, 3, "Extremely Fresh"],
  "Glowing Gourd Charm": [0, 10, 0, 0, "No Effect"],
  "Gnarled Charm": [250, 0, 5, 2, "No Effect"],
  "Golden Anchor Charm": [300, 4, 0, 0, "No Effect"],
  "Golem Guardian Charm": [0, 0, 0, 0, "No Effect"],
  "Greasy Glob Charm": [0, 3, 0, 5, "Fresh"],
  "Growth Charm": [0, 0, 0, 0, "No Effect"],
  "Grub Salt Charm": [0, 0, 0, 0, "No Effect"],
  "Grub Scent Charm": [0, 0, 0, 0, "No Effect"],
  "Grubling Bonanza Charm": [0, 0, 0, 0, "No Effect"],
  "Grubling Chow Charm": [0, 0, 0, 0, "No Effect"],
  "Horsepower Charm": [0, 0, 0, 0, "No Effect"],
  "Hunter's Horn Rewind Charm": [0, 0, 0, 0, "No Effect"],
  "Hydro Charm": [0, 0, 0, 0, "No Effect"],
  "Lantern Oil Charm": [200, 2, 2, 1, "Fresh"],
  "Let It Snow Charm": [0, 0, 0, 5, "No Effect"],
  "Luck Charm": [0, 0, 0, 1, "No Effect"],
  "Lucky Power Charm": [120, 1, 0, 1, "No Effect"],
  "Lucky Rabbit Charm": [0, 0, 0, 6, "No Effect"],
  "Lucky Valentine Charm": [0, 0, 25, 5, "Fresh"],
  "Magmatic Crystal Charm": [0, 3, 0, 5, "Fresh"],
  "Mining Charm": [250, 1, 0, 0, "No Effect"],
  "Mobile Charm": [0, 5, 0, 5, "Extremely Stale"],
  "Monger Charm": [0, 0, 0, 0, "No Effect"],
  "Monkey Fling Charm": [0, 0, 0, 0, "No Effect"],
  "Nanny Charm": [120, 1, 5, 0, "Very Fresh"],
  "Nerg Power Charm": [0, 0, 0, 0, "No Effect"],
  "Nightlight Charm": [120, 0, 0, 2, "No Effect"],
  "Nightshade Farming Charm": [50, 3, 2, 0, "No Effect"],
  "Nitropop Charm": [120, 4, 0, 1, "No Effect"],
  "Oxygen Burst Charm": [0, 0, 0, 0, "No Effect"],
  "Party Charm": [0, 3, 0, 3, "No Effect"],
  "Pointy Charm": [0, 0, 0, 0, "No Effect"],
  "Polluted Charm": [0, 0, 0, 0, "No Effect"],
  "Power Charm": [120, 1, 0, 0, "No Effect"],
  "Prospector's Charm": [200, 1, 0, 0, "No Effect"],
  "Queso Pump Charm": [50, 5, 5, 0, "Fresh"],
  "Rainbow Luck Charm": [800, 0, 0, 12, "No Effect"],
  "Ramming Speed Charm": [0, 0, 0, 0, "No Effect"],
  "Reality Restitch Charm": [0, 10, 10, 5, "Fresh"],
  "Realm Ripper Charm": [0, 0, 0, 0, "No Effect"],
  "Red Double Sponge Charm": [0, 0, 0, 0, "No Effect"],
  "Red Sponge Charm": [0, 0, 0, 0, "No Effect"],
  "Regal Charm": [1000, 0, 20, 6, "No Effect"],
  "Rift Airship Charm": [500, 0, 0, 5, "No Effect"],
  "Rift Antiskele Charm": [0, 0, 0, 0, "No Effect"],
  "Rift Charm": [100, 1, 0, 0, "Stale"],
  "Rift Extreme Luck Charm": [0, 0, 0, 5, "No Effect"],
  "Rift Luck Charm": [0, 0, 0, 1, "No Effect"],
  "Rift Power Charm": [500, 5, 0, 0, "No Effect"],
  "Rift Super Luck Charm": [0, 0, 0, 3, "No Effect"],
  "Rift Ultimate Luck Charm": [0, 0, 0, 20, "No Effect"],
  "Rift Ultimate Lucky Power Charm": [2400, 20, 0, 20, "No Effect"],
  "Rift Ultimate Power Charm": [2400, 20, 0, 0, "No Effect"],
  "Rift Vacuum Charm": [0, 0, 0, 0, "No Effect"],
  "Rift Wealth Charm": [0, 0, 0, 0, "No Effect"],
  "Roof Rack Charm": [0, 3, 0, 5, "Fresh"],
  "Rook Crumble Charm": [0, 0, 0, 0, "No Effect"],
  "Rotten Charm": [160, 1, 0, 0, "Stale"],
  "Safeguard Charm": [0, 0, 0, 0, "No Effect"],
  "Scholar Charm": [0, 0, 0, 0, "No Effect"],
  "Scientist's Charm": [100, 0, 0, 0, "No Effect"],
  "Searcher Charm": [0, 0, 0, 0, "No Effect"],
  "Shadow Charm": [0, 0, 0, 0, "No Effect"],
  "Shattering Charm": [0, 0, 0, 0, "No Effect"],
  "Shamrock Charm": [0, 0, 0, 3, "No Effect"],
  "Sheriff's Badge Charm": [0, 0, 0, 0, "No Effect"],
  "Shielding Charm": [0, 0, 0, 0, "No Effect"],
  "Shine Charm": [0, 0, 0, 0, "No Effect"],
  "Shortcut Charm": [0, 0, 0, 0, "No Effect"],
  "Small Power Charm": [60, 0, 0, 0, "No Effect"],
  "Smart Water Jet Charm": [0, 0, 0, 0, "No Effect"],
  "Snakebite Charm": [0, 0, 0, 0, "No Effect"],
  "Snowball Charm": [100, 1, 1, 2, "No Effect"],
  "Soap Charm": [10, 10, 0, 0, "No Effect"],
  "Softserve Charm": [100, 0, 0, 0, "No Effect"],
  "Spellbook Charm": [0, 0, 0, 0, "No Effect"],
  "Spiked Anchor Charm": [900, 12, 0, 0, "Very Stale"],
  "Sponge Charm": [0, 0, 0, 0, "No Effect"],
  "Spooky Charm": [100, 1, 1, 2, "No Effect"],
  "Spore Charm": [400, 3, 2, 3, "Stale"],
  "Sprinkly Sweet Cupcake Charm": [0, 0, 9, 9, "Fresh"],
  "Stagnant Charm": [250, 0, 5, 2, "No Effect"],
  "Stalemate Charm": [0, 0, 0, 0, "No Effect"],
  "Sticky Charm": [150, 0, 0, 0, "No Effect"],
  "Striker Charm": [0, 0, 0, 1, "No Effect"],
  "Super Ancient Charm": [700, 6, 6, 6, "Extremely Fresh"],
  "Super Attraction Charm": [0, 0, 20, 0, "No Effect"],
  "Super Brain Charm": [100, 10, 10, 1, "Insanely Fresh"],
  "Super Cactus Charm": [500, 3, 5, 3, "Stale"],
  "Super Dragonbane Charm": [0, 0, 0, 0, "No Effect"],
  "Super Enerchi Charm": [500, 5, 0, 0, "Fresh"],
  "Super Lantern Oil Charm": [300, 5, 5, 3, "Very Fresh"],
  "Super Luck Charm": [0, 0, 0, 3, "No Effect"],
  "Super Nightshade Farming Charm": [300, 3, 2, 1, "Fresh"],
  "Super Polluted Charm": [0, 0, 0, 0, "No Effect"],
  "Super Power Charm": [360, 3, 0, 0, "No Effect"],
  "Super Queso Pump Charm": [50, 5, 5, 5, "Very Fresh"],
  "Super Regal Charm": [1500, 0, 50, 7, "No Effect"],
  "Super Rift Vacuum Charm": [100, 0, 0, 0, "No Effect"],
  "Super Rotten Charm": [200, 2, 0, 0, "Insanely Stale"],
  "Super Salt Charm": [0, 0, 0, 0, "No Effect"],
  "Super Snowball Charm": [200, 2, 2, 4, "No Effect"],
  "Super Soap Charm": [25, 10, 0, 0, "No Effect"],
  "Super Spooky Charm": [200, 2, 2, 4, "No Effect"],
  "Super Spore Charm": [500, 5, 5, 5, "Very Stale"],
  "Super Warpath Archer Charm": [0, 0, 0, 0, "No Effect"],
  "Super Warpath Cavalry Charm": [0, 0, 0, 0, "No Effect"],
  "Super Warpath Commander's Charm": [0, 0, 0, 0, "No Effect"],
  "Super Warpath Mage Charm": [0, 0, 0, 0, "No Effect"],
  "Super Warpath Scout Charm": [0, 0, 0, 0, "No Effect"],
  "Super Warpath Warrior Charm": [0, 0, 0, 0, "No Effect"],
  "Super Wax Charm": [250, 0, 0, 0, "No Effect"],
  "Super Wealth Charm": [0, 0, 0, 0, "No Effect"],
  "Supply Schedule Charm": [0, 3, 0, 5, "Fresh"],
  "Tarnished Charm": [0, 0, 0, 0, "Uber Stale"],
  "Taunting Charm": [0, 0, 0, 0, "No Effect"],
  "Timesplit Charm": [3000, 25, 20, 18, "Uber Stale"],
  "Torch Charm": [120, 1, 0, 3, "No Effect"],
  "Treasure Trawling Charm": [0, 0, 0, 0, "No Effect"],
  "Ultimate Charm": [0, 0, 0, 0, "No Effect"],
  "Ultimate Anchor Charm": [0, 0, 0, 0, "No Effect"],
  "Ultimate Ancient Charm": [900, 8, 8, 8, "Insanely Fresh"],
  "Ultimate Attraction Charm": [0, 0, 100, 0, "No Effect"],
  "Ultimate Luck Charm": [0, 0, 0, 20, "No Effect"],
  "Ultimate Lucky Power Charm": [2400, 20, 0, 20, "No Effect"],
  "Ultimate Polluted Charm": [0, 0, 0, 0, "No Effect"],
  "Ultimate Power Charm": [2400, 20, 0, 0, "No Effect"],
  "Ultimate Snowball Charm": [800, 8, 8, 20, "No Effect"],
  "Ultimate Spooky Charm": [800, 8, 8, 20, "No Effect"],
  "Ultimate Spore Charm": [1200, 10, 10, 10, "Extremely Stale"],
  "Ultimate Wealth Charm": [0, 0, 0, 0, "No Effect"],
  "Uncharged Scholar Charm": [0, 0, 0, 0, "No Effect"],
  "Unstable Charm": [0, 0, 0, 1, "No Effect"],
  "Valentine Charm": [0, 0, 25, 0, "Fresh"],
  "Warpath Archer Charm": [0, 0, 0, 0, "No Effect"],
  "Warpath Cavalry Charm": [0, 0, 0, 0, "No Effect"],
  "Warpath Commander's Charm": [0, 0, 0, 0, "No Effect"],
  "Warpath Mage Charm": [0, 0, 0, 0, "No Effect"],
  "Warpath Scout Charm": [0, 0, 0, 0, "No Effect"],
  "Warpath Warrior Charm": [0, 0, 0, 0, "No Effect"],
  "Water Jet Charm": [0, 0, 0, 0, "No Effect"],
  "Wax Charm": [150, 0, 0, 0, "No Effect"],
  "Wealth Charm": [0, 0, 0, 0, "No Effect"],
  "Wild Growth Charm": [0, 0, 0, 0, "No Effect"],
  "Winter Charm": [0, 0, 0, 4, "No Effect"],
  "Winter Builder Charm": [0, 0, 0, 5, "No Effect"],
  "Winter Hoarder Charm": [0, 0, 0, 5, "No Effect"],
  "Winter Miser Charm": [0, 0, 0, 5, "No Effect"],
  "Winter Screw Charm": [0, 0, 0, 2, "No Effect"],
  "Winter Spring Charm": [0, 0, 0, 2, "No Effect"],
  "Winter Wood Charm": [0, 0, 0, 2, "No Effect"],
  "Yellow Double Sponge Charm": [0, 0, 0, 0, "No Effect"],
  "Yellow Sponge Charm": [0, 0, 0, 0, "No Effect"]
};
var charmKeys = Object.keys(charmsArray);
charmKeys.sort();

// Weapons that interact with Snowball Charms to give 20% power bonus
var festiveTraps = [
  "Christmas Cactus Trap",
  "Christmas Cracker Trap",
  "Christmas Crystalabra Trap",
  "Double Diamond Adventure",
  "Explosive Toboggan Ride",
  "Festive Forgotten Fir Trap",
  "Festive Gauntlet Crusher",
  "Gingerbread House Surprise",
  "Glacier Gatler",
  "Goldfrost Crossbow Trap",
  "Golem Guardian Arcane Trap",
  "Golem Guardian Forgotten Trap",
  "Golem Guardian Hydro Trap",
  "Golem Guardian Physical Trap",
  "Golem Guardian Tactical Trap",
  "Harrowing Holiday Harpoon Harp",
  "Holiday Hydro Hailstone Trap",
  "Ice Blaster",
  "Infinite Winter Horizon Trap",
  "Nutcracker Nuisance Trap",
  "Snow Barrage",
  "Snowglobe Trap",
  "Wrapped Gift Trap"
];

/**
 * Weapons that interact with Spooky Charms to give 20% power bonus
 * Below are notable weapons without this bonus:
 *  Haunted Shipwreck, Pumpkin Pummeler, (Maniacal) Brain Extractor
 *  Cackle Lantern, Soul Catcher/Harvester, Terrifying Spider
 */
var halloweenTraps = [
  "Admiral's Galleon Trap",
  "Candy Crusher Trap",
  "Sandcastle Shard Trap"
];

var wereMice = [
  "Alpha Weremouse",
  "Mischievous Wereminer",
  "Night Shift Materials Manager",
  "Reveling Lycanthrope",
  "Wealthy Werewarrior",
  "Werehauler",
  "Wereminer"
];

var cosmicCritters = [
  "Arcane Summoner",
  "Cursed Taskmaster",
  "Hypnotized Gunslinger",
  "Meteorite Golem",
  "Meteorite Mystic",
  "Night Watcher"
];

/**
 * Maps Furoma Rift battery level to bonus power and luck
 * Level : [Power, Luck]
 */
var batteryEffects = {
  0: [0, 0],
  1: [90, 0],
  2: [500, 1],
  3: [3000, 2],
  4: [8500, 5],
  5: [16000, 10],
  6: [30000, 12],
  7: [50000, 25],
  8: [90000, 35],
  9: [190000, 50],
  10: [300000, 100]
};
