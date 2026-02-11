// ── Food & Movie Data ───────────────────────────

export const foodItems = [
  { id: 1,  name: "Butter Chicken",   emoji: "🍛", desc: "Creamy tomato-based curry with tender chicken pieces",     tags: ["spicy","indian","rich","non-veg","comfort"],       meta1: "💰 Moderate", meta2: "⏱ 30 min" },
  { id: 2,  name: "Margherita Pizza",  emoji: "🍕", desc: "Classic pizza with tomato, mozzarella, and fresh basil",   tags: ["fast","cheap","italian","vegetarian","comfort"],    meta1: "💰 Cheap",    meta2: "⏱ 15 min" },
  { id: 3,  name: "Sushi Platter",     emoji: "🍣", desc: "Fresh assortment of nigiri, maki, and specialty rolls",   tags: ["healthy","japanese","light","non-veg","premium"],   meta1: "💰 Expensive",meta2: "⏱ 20 min" },
  { id: 4,  name: "Spicy Tacos",       emoji: "🌮", desc: "Corn tortillas loaded with spicy meat and fresh salsa",   tags: ["spicy","cheap","fast","mexican","non-veg"],         meta1: "💰 Cheap",    meta2: "⏱ 10 min" },
  { id: 5,  name: "Caesar Salad",      emoji: "🥗", desc: "Crispy romaine with parmesan, croutons, and dressing",    tags: ["healthy","vegetarian","light","fast"],               meta1: "💰 Moderate", meta2: "⏱ 5 min"  },
  { id: 6,  name: "Ramen Bowl",        emoji: "🍜", desc: "Rich pork broth with noodles, egg, and tender chashu",    tags: ["japanese","rich","comfort","non-veg","spicy"],       meta1: "💰 Moderate", meta2: "⏱ 25 min" },
  { id: 7,  name: "Veggie Burger",     emoji: "🍔", desc: "Plant-based patty with avocado, lettuce & special sauce", tags: ["vegetarian","fast","healthy","comfort"],             meta1: "💰 Moderate", meta2: "⏱ 12 min" },
  { id: 8,  name: "Pad Thai",          emoji: "🍝", desc: "Stir-fried rice noodles with shrimp, peanuts, and lime",  tags: ["thai","fast","non-veg","spicy","cheap"],             meta1: "💰 Cheap",    meta2: "⏱ 15 min" },
  { id: 9,  name: "Falafel Wrap",      emoji: "🌯", desc: "Crispy chickpea falafel with hummus and fresh veggies",   tags: ["vegetarian","healthy","cheap","middle-eastern"],     meta1: "💰 Cheap",    meta2: "⏱ 10 min" },
  { id: 10, name: "Steak & Fries",     emoji: "🥩", desc: "Perfectly seared ribeye with golden crispy fries",        tags: ["non-veg","rich","premium","comfort"],                meta1: "💰 Expensive",meta2: "⏱ 35 min" },
  { id: 11, name: "Dim Sum Basket",    emoji: "🥟", desc: "Steamed dumplings with assorted fillings",               tags: ["chinese","light","non-veg","premium"],               meta1: "💰 Moderate", meta2: "⏱ 20 min" },
  { id: 12, name: "Pasta Carbonara",   emoji: "🍝", desc: "Creamy egg-based pasta with pancetta and pecorino",       tags: ["italian","rich","comfort","non-veg"],                meta1: "💰 Moderate", meta2: "⏱ 20 min" },
  { id: 13, name: "Açaí Bowl",         emoji: "🫐", desc: "Blended açaí with granola, fresh fruits and honey",       tags: ["healthy","vegetarian","light","fast"],                meta1: "💰 Moderate", meta2: "⏱ 5 min"  },
  { id: 14, name: "BBQ Ribs",          emoji: "🍖", desc: "Slow-smoked pork ribs with tangy BBQ glaze",             tags: ["non-veg","rich","comfort","spicy"],                  meta1: "💰 Expensive",meta2: "⏱ 40 min" },
  { id: 15, name: "Paneer Tikka",      emoji: "🧀", desc: "Grilled cottage cheese with aromatic Indian spices",      tags: ["indian","spicy","vegetarian","comfort"],              meta1: "💰 Moderate", meta2: "⏱ 20 min" },
  { id: 16, name: "Fish & Chips",      emoji: "🐟", desc: "Beer-battered fish with crispy chips and tartar sauce",   tags: ["non-veg","comfort","cheap","fast"],                   meta1: "💰 Cheap",    meta2: "⏱ 15 min" },
  { id: 17, name: "Smoothie Bowl",     emoji: "🥤", desc: "Thick tropical smoothie topped with seeds and coconut",   tags: ["healthy","vegetarian","light","fast"],                meta1: "💰 Cheap",    meta2: "⏱ 5 min"  },
  { id: 18, name: "Biryani",           emoji: "🍚", desc: "Fragrant basmati rice layered with spiced meat & saffron",tags: ["indian","spicy","rich","non-veg","premium"],          meta1: "💰 Moderate", meta2: "⏱ 45 min" },
];

export const movieItems = [
  { id: 1,  name: "Inception",             emoji: "🌀", desc: "A thief who enters dreams is given the task of planting an idea", tags: ["sci-fi","thriller","mind-bending","action"],     meta1: "⭐ 8.8", meta2: "🕐 2h 28m" },
  { id: 2,  name: "The Dark Knight",       emoji: "🦇", desc: "Batman faces the Joker, a criminal mastermind of chaos",          tags: ["action","thriller","superhero","dark"],           meta1: "⭐ 9.0", meta2: "🕐 2h 32m" },
  { id: 3,  name: "Spirited Away",         emoji: "🏯", desc: "A girl enters a magical world of spirits to save her parents",    tags: ["animated","fantasy","family","adventure"],        meta1: "⭐ 8.6", meta2: "🕐 2h 5m"  },
  { id: 4,  name: "Shawshank Redemption",  emoji: "⛓️", desc: "A banker sentenced to life in prison forms a lasting friendship",  tags: ["drama","classic","emotional","inspiring"],        meta1: "⭐ 9.3", meta2: "🕐 2h 22m" },
  { id: 5,  name: "Interstellar",          emoji: "🚀", desc: "Astronauts travel through a wormhole to find humanity a new home", tags: ["sci-fi","emotional","mind-bending","adventure"],  meta1: "⭐ 8.7", meta2: "🕐 2h 49m" },
  { id: 6,  name: "Superbad",              emoji: "😂", desc: "Two awkward teens try to have the best night before graduation",   tags: ["comedy","teen","feel-good","classic"],             meta1: "⭐ 7.6", meta2: "🕐 1h 53m" },
  { id: 7,  name: "Get Out",               emoji: "👁️", desc: "A man uncovers a disturbing secret at his girlfriend's estate",    tags: ["horror","thriller","mystery","dark"],              meta1: "⭐ 7.7", meta2: "🕐 1h 44m" },
  { id: 8,  name: "Grand Budapest Hotel",  emoji: "🏨", desc: "A concierge and protégé entangled in art theft and murder",        tags: ["comedy","adventure","quirky","classic"],           meta1: "⭐ 8.1", meta2: "🕐 1h 39m" },
  { id: 9,  name: "Parasite",              emoji: "🪜", desc: "A poor family schemes to infiltrate a wealthy household",          tags: ["thriller","dark","drama","mind-bending"],         meta1: "⭐ 8.5", meta2: "🕐 2h 12m" },
  { id: 10, name: "Spider-Verse",          emoji: "🕷️", desc: "Miles Morales discovers the multiverse of Spider-People",          tags: ["animated","superhero","action","feel-good"],      meta1: "⭐ 8.4", meta2: "🕐 1h 57m" },
  { id: 11, name: "The Conjuring",         emoji: "👻", desc: "Investigators help a family terrorized by a dark presence",        tags: ["horror","thriller","mystery","dark"],              meta1: "⭐ 7.5", meta2: "🕐 1h 52m" },
  { id: 12, name: "La La Land",            emoji: "🎶", desc: "A jazz pianist and aspiring actress fall in love in LA",            tags: ["romance","musical","emotional","feel-good"],      meta1: "⭐ 8.0", meta2: "🕐 2h 8m"  },
  { id: 13, name: "Mad Max: Fury Road",    emoji: "🔥", desc: "A desert warrior and rebel flee across a post-apocalyptic wasteland",tags: ["action","sci-fi","adventure","dark"],            meta1: "⭐ 8.1", meta2: "🕐 2h 0m"  },
  { id: 14, name: "Coco",                  emoji: "🎸", desc: "A boy journeys to the Land of the Dead to find his ancestor",      tags: ["animated","family","emotional","musical"],        meta1: "⭐ 8.4", meta2: "🕐 1h 45m" },
  { id: 15, name: "John Wick",             emoji: "🔫", desc: "A retired assassin seeks vengeance against those who wronged him",  tags: ["action","thriller","dark","intense"],              meta1: "⭐ 7.4", meta2: "🕐 1h 41m" },
  { id: 16, name: "3 Idiots",              emoji: "🎓", desc: "Three friends navigate college life with humor and heart",          tags: ["comedy","drama","inspiring","feel-good"],         meta1: "⭐ 8.4", meta2: "🕐 2h 50m" },
  { id: 17, name: "Avengers: Endgame",     emoji: "🛡️", desc: "The Avengers assemble one last time to undo Thanos' devastation",  tags: ["superhero","action","emotional","adventure"],     meta1: "⭐ 8.4", meta2: "🕐 3h 1m"  },
  { id: 18, name: "Whiplash",              emoji: "🥁", desc: "A young drummer pushes his limits under a ruthless instructor",     tags: ["drama","intense","inspiring","musical"],           meta1: "⭐ 8.5", meta2: "🕐 1h 47m" },
];

export function extractTags(items) {
  const set = new Set();
  items.forEach(item => item.tags.forEach(t => set.add(t)));
  return Array.from(set).sort();
}

export function scoreItems(items, selectedTags) {
  return items
    .map(item => {
      const matchCount = item.tags.filter(t => selectedTags.includes(t)).length;
      return { ...item, matchScore: matchCount, matchPct: Math.round((matchCount / selectedTags.length) * 100) };
    })
    .filter(item => item.matchScore > 0)
    .sort((a, b) => b.matchScore - a.matchScore);
}
