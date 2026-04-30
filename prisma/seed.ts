import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const SEED_RECIPES = [
  {
    title: 'Lamb Kofta with Harissa Yogurt',
    category: 'Meat',
    tags: ['Middle Eastern', 'Grilled', 'Summer'],
    prepTime: 20, cookTime: 15, servings: 4, difficulty: 'Medium',
    story: "This recipe takes me back to a warm evening in my grandmother's courtyard — the scent of cumin and charred meat drifting through the jasmine. She never measured a thing, just knew.",
    description: 'Spiced ground lamb shaped around skewers, char-grilled and served with a smoky harissa-swirled yogurt. Simple, bold, and utterly satisfying.',
    ingredients: [
      '700g ground lamb', '1 small onion, finely grated', '3 garlic cloves, minced',
      '2 tsp ground cumin', '1 tsp ground coriander', '½ tsp cinnamon',
      '½ tsp smoked paprika', '1 tsp salt', '¼ tsp black pepper',
      '2 tbsp fresh flat-leaf parsley, chopped', '1 tbsp fresh mint, chopped',
      '—',
      '1 cup Greek yogurt', '2 tbsp harissa paste', '1 tbsp lemon juice',
      '1 tbsp olive oil', 'Salt to taste',
    ],
    steps: [
      'Combine lamb, onion, garlic, spices, herbs, salt and pepper. Mix thoroughly by hand for 2 minutes until the mixture is sticky and holds together.',
      'Divide into 12 portions. Shape each around a flat metal skewer, pressing firmly to adhere.',
      'Refrigerate skewers for at least 30 minutes to firm up.',
      'Make the harissa yogurt: whisk together yogurt, harissa, lemon juice and olive oil. Season with salt. Refrigerate until serving.',
      'Grill over high heat for 5–6 minutes, turning every 2 minutes, until nicely charred on all sides and just cooked through.',
      'Serve immediately over warm flatbread with a generous dollop of harissa yogurt, pickled onions, and fresh herbs.',
    ],
    notes: "Don't overwork the meat or the kofta will become dense. A little fat in the lamb is your friend here — it keeps everything moist.",
  },
  {
    title: 'Shakshuka with Creamy Feta',
    category: 'Dairy',
    tags: ['Middle Eastern', 'Breakfast', 'Vegetarian'],
    prepTime: 10, cookTime: 25, servings: 4, difficulty: 'Easy',
    story: 'A Saturday morning ritual. The whole kitchen smells of cumin and sweet tomatoes, and everyone gathers without being called.',
    description: 'Eggs poached in a richly spiced tomato and pepper sauce, finished with crumbled feta that melts into little pockets of cream.',
    ingredients: [
      '2 tbsp olive oil', '1 large onion, diced', '1 red bell pepper, diced',
      '4 garlic cloves, sliced', '1½ tsp ground cumin', '1 tsp sweet paprika',
      '½ tsp chilli flakes', '2 x 400g tins crushed tomatoes', '1 tsp sugar',
      'Salt and black pepper', '6 large eggs', '100g feta, crumbled',
      '2 tbsp fresh coriander, chopped', 'Crusty bread to serve',
    ],
    steps: [
      'Heat olive oil in a wide, deep skillet over medium heat. Add onion and pepper and cook until softened, about 8 minutes.',
      'Add garlic, cumin, paprika and chilli. Cook 1 minute until fragrant.',
      'Pour in tomatoes and sugar. Season with salt and pepper. Simmer 12–15 minutes until sauce thickens and deepens in colour.',
      'Make 6 wells in the sauce with a spoon. Crack an egg into each well.',
      'Cover and cook over low heat for 6–8 minutes until whites are just set and yolks are still runny.',
      'Scatter feta and coriander over the top. Serve straight from the pan with crusty bread.',
    ],
    notes: 'Use the best quality tinned tomatoes you can find — it makes all the difference. San Marzano are my pick.',
  },
  {
    title: 'Miso-Glazed Salmon',
    category: 'Fish',
    tags: ['Japanese', 'Quick', 'Weeknight'],
    prepTime: 5, cookTime: 12, servings: 2, difficulty: 'Easy',
    story: 'I discovered this in Tokyo — a tiny restaurant, counter seats only, and a piece of salmon that changed how I thought about fish forever. This is my recreation.',
    description: 'Salmon fillets lacquered in a sweet-savory miso glaze and broiled until caramelised. Fifteen minutes, restaurant quality.',
    ingredients: [
      '2 salmon fillets (200g each)', '3 tbsp white miso paste',
      '2 tbsp mirin', '1 tbsp sake (or dry sherry)', '1 tsp sesame oil',
      '1 tsp honey', '1 garlic clove, grated', '¼ tsp fresh ginger, grated',
      '—',
      'Steamed jasmine rice to serve', 'Sliced spring onions, to garnish',
      'Toasted sesame seeds, to garnish',
    ],
    steps: [
      'Whisk together miso, mirin, sake, sesame oil, honey, garlic and ginger into a smooth glaze.',
      'Pat salmon dry. Coat generously with glaze on all sides. Marinate for at least 30 minutes (or overnight in the fridge).',
      'Preheat your grill/broiler to high. Line a baking tray with foil and place salmon skin-side down.',
      'Broil 10–12 minutes until the glaze is deeply caramelised with some charred edges, and the fish flakes easily.',
      'Rest 1 minute. Serve over steamed rice, garnished with spring onions and sesame seeds.',
    ],
    notes: "White miso is milder and sweeter than red. Don't substitute — the balance of the glaze depends on it.",
  },
  {
    title: "Za'atar Pasta with Brown Butter & Pine Nuts",
    category: 'Pasta',
    tags: ['Middle Eastern', 'Fusion', 'Vegetarian'],
    prepTime: 5, cookTime: 20, servings: 4, difficulty: 'Easy',
    story: "Born out of a near-empty fridge and a jar of za'atar I'd been hoarding. It became one of our most-requested weeknight dinners.",
    description: "Nutty browned butter tossed with al dente pasta, za'atar and toasted pine nuts. A handful of ingredients, unexpectedly elegant.",
    ingredients: [
      '400g linguine or spaghetti', '100g unsalted butter',
      "3 tbsp za'atar blend", '50g pine nuts',
      '2 garlic cloves, thinly sliced', 'Zest of 1 lemon',
      '2 tbsp lemon juice', '50g Parmesan, finely grated',
      '1 cup pasta water (reserved)', 'Salt and black pepper',
      'Fresh flat-leaf parsley to finish',
    ],
    steps: [
      'Cook pasta in generously salted boiling water until al dente. Reserve 1 cup pasta water before draining.',
      'While pasta cooks, toast pine nuts in a dry pan over medium heat until golden. Set aside.',
      "In the same pan, melt butter over medium-low heat. Cook until the milk solids turn golden-brown and nutty, about 5 minutes. Add garlic, cook 30 seconds.",
      "Remove from heat. Stir in za'atar, lemon zest and lemon juice.",
      'Add drained pasta to the pan with a splash of pasta water. Toss vigorously to coat, adding more water to achieve a glossy sauce.',
      'Plate and top with pine nuts, Parmesan, parsley, and a crack of black pepper.',
    ],
    notes: 'Brown butter waits for no one — have your pasta ready before you start browning. Once it goes golden, it goes to burnt in seconds.',
  },
  {
    title: 'Fattoush Salad',
    category: 'Salad',
    tags: ['Lebanese', 'Vegetarian', 'Summer'],
    prepTime: 20, cookTime: 10, servings: 6, difficulty: 'Easy',
    story: 'The salad of my childhood summers. The crunch of the fried bread against cold tomatoes — there is nothing else quite like it.',
    description: 'A bright, herb-forward Lebanese bread salad with crisp fried pita, ripe tomatoes, cucumbers and a tangy sumac-lemon dressing.',
    ingredients: [
      '2 large flatbreads / pita', 'Vegetable oil for frying',
      '—',
      '4 ripe tomatoes, roughly chopped', '2 Persian cucumbers, sliced',
      '5 radishes, thinly sliced', '4 spring onions, sliced',
      '1 cup flat-leaf parsley leaves', '½ cup fresh mint leaves',
      '—',
      '4 tbsp olive oil', '3 tbsp lemon juice', '1½ tsp ground sumac',
      '1 tsp pomegranate molasses', '1 garlic clove, minced',
      '½ tsp salt', 'Pinch of sugar',
    ],
    steps: [
      'Tear or cut flatbreads into rough pieces. Fry in 1cm of hot oil until golden and crisp. Drain on paper towels, season with salt.',
      'Whisk together dressing: olive oil, lemon juice, sumac, pomegranate molasses, garlic, salt and sugar.',
      'Combine tomatoes, cucumbers, radishes, spring onions, parsley and mint in a large bowl.',
      'Pour dressing over and toss gently. Taste and adjust seasoning.',
      'Add fried bread just before serving so it keeps some crunch but absorbs a little dressing. Toss once and serve immediately.',
    ],
    notes: "The fried bread is non-negotiable. Baked croutons are fine but they don't give you the same shatter.",
  },
  {
    title: 'Persian Jeweled Rice (Morasa Polo)',
    category: 'Side',
    tags: ['Persian', 'Celebration', 'Vegetarian'],
    prepTime: 30, cookTime: 60, servings: 8, difficulty: 'Hard',
    story: 'Made this for our first dinner party as a couple. Everyone went quiet when it came to the table — that golden crust, those jewel-bright fruits. It felt like a ceremony.',
    description: 'Fragrant saffron rice studded with candied orange peel, barberries, pistachios and almonds, crowned with a prized golden crust (tahdig).',
    ingredients: [
      '3 cups basmati rice', '1 tsp saffron threads', '3 tbsp hot water',
      '4 tbsp butter, divided', '2 tbsp vegetable oil',
      '—',
      '100g dried barberries (zereshk)', '1 tbsp sugar',
      '100g candied orange peel, chopped', '50g slivered almonds, toasted',
      '50g shelled pistachios', '1 tsp ground cardamom',
      '½ tsp cinnamon', 'Salt', '1 large potato, thinly sliced (for tahdig)',
    ],
    steps: [
      'Rinse rice until water runs clear. Soak in cold salted water 1 hour. Drain.',
      'Bloom saffron in 3 tbsp hot (not boiling) water for 15 minutes.',
      'Par-cook rice in a large pot of boiling salted water for 6 minutes — just until the outside softens but the centre is still firm. Drain.',
      'Heat oil and 2 tbsp butter in the pot. Layer potato slices to cover the bottom completely (this becomes the tahdig). Season.',
      'Gently mound rice on top, building it into a loose pyramid. Drizzle remaining butter and half the saffron water over the rice.',
      'Wrap the lid in a clean cloth, place on pot. Cook on medium-high 3 minutes, then reduce to very low. Steam 40–45 minutes.',
      'Meanwhile, sauté barberries with sugar and 1 tbsp butter for 2 minutes. Combine with orange peel, nuts, cardamom and cinnamon.',
      'Spoon rice onto a platter, drizzle remaining saffron water on top. Scatter jewels over the rice. Flip the pot to release the golden tahdig alongside.',
    ],
    notes: 'The cloth on the lid is essential — it absorbs steam and keeps the rice fluffy, not wet. Don\'t skip the soak either.',
  },
  {
    title: 'Tom Kha Gai',
    category: 'Soup',
    tags: ['Thai', 'Coconut', 'Comfort'],
    prepTime: 15, cookTime: 20, servings: 4, difficulty: 'Medium',
    story: 'When the cold sets in and we need something that feels like a warm hand on the shoulder, this is the soup. Every single time.',
    description: 'Silky coconut milk broth scented with galangal, lemongrass and kaffir lime — gentle heat, deep flavour, impossible to leave alone.',
    ingredients: [
      '800ml coconut milk', '400ml chicken stock',
      '3 stalks lemongrass, bruised and cut into pieces',
      '6 slices galangal (or fresh ginger)', '4 kaffir lime leaves, torn',
      "3 bird's eye chillies, bruised", '2 garlic cloves, smashed',
      '400g chicken breast, thinly sliced', '200g oyster mushrooms',
      '3 tbsp fish sauce', '2 tbsp lime juice', '1 tsp palm sugar (or brown sugar)',
      '—',
      'Fresh coriander and sliced red chilli to garnish',
    ],
    steps: [
      'Combine coconut milk and stock in a saucepan over medium heat. Add lemongrass, galangal, kaffir lime leaves, chillies and garlic.',
      'Bring to a gentle simmer. Do not boil hard — it will break the coconut milk. Simmer 10 minutes to infuse.',
      'Add chicken slices and mushrooms. Simmer 5–6 minutes until chicken is just cooked through.',
      'Season with fish sauce, lime juice and sugar. Taste carefully — it should be salty, sour, and gently sweet.',
      'Ladle into bowls, leaving the aromatics behind. Garnish with coriander and fresh chilli.',
    ],
    notes: "Don't fish out the galangal and lemongrass before serving — they're not meant to be eaten, but seeing them in the bowl tells the whole story.",
  },
  {
    title: 'Rosewater & Cardamom Panna Cotta',
    category: 'Dessert',
    tags: ['Middle Eastern', 'Elegant', 'Make-Ahead'],
    prepTime: 15, cookTime: 5, servings: 6, difficulty: 'Medium',
    story: 'The dessert I make when I want the table to fall silent for just a moment. Set the night before, it\'s the calmest thing you can offer guests.',
    description: 'Trembling vanilla panna cotta perfumed with rosewater and green cardamom, served with a dark pomegranate reduction and crushed pistachios.',
    ingredients: [
      '600ml heavy cream', '200ml whole milk',
      '60g caster sugar', '2½ tsp powdered gelatine',
      '3 tbsp cold water', '1 tsp rosewater',
      '½ tsp ground cardamom', '1 tsp vanilla extract',
      '—',
      '200ml pomegranate juice', '2 tbsp sugar',
      '1 tsp lemon juice',
      '—',
      'Crushed pistachios and dried rose petals to garnish',
    ],
    steps: [
      'Sprinkle gelatine over cold water. Let bloom 5 minutes.',
      'Heat cream, milk and sugar in a saucepan over medium heat, stirring, until sugar dissolves. Do not boil.',
      'Remove from heat. Add bloomed gelatine and stir until fully dissolved.',
      'Stir in rosewater, cardamom and vanilla. Taste — the flavour should be present but delicate.',
      'Strain through a fine sieve into a jug. Divide between 6 lightly greased ramekins or glasses.',
      'Refrigerate at least 4 hours, or overnight.',
      'For the pomegranate reduction: simmer pomegranate juice, sugar and lemon juice 10–12 minutes until syrupy. Cool completely.',
      'To unmould, run a thin knife around the edge and invert onto a plate. Or serve in the glass. Drizzle pomegranate reduction and scatter pistachios and rose petals.',
    ],
    notes: 'Too much rosewater is the one mistake. Start with ¾ tsp, taste, then add more. It should whisper, not shout.',
  },
];

async function main() {
  console.log('Seeding database...');

  await prisma.dedication.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      title: 'A Note from the Chef',
      content: '',
    },
  });

  for (let i = 0; i < SEED_RECIPES.length; i++) {
    const r = SEED_RECIPES[i];
    await prisma.recipe.create({
      data: {
        title: r.title,
        category: r.category,
        difficulty: r.difficulty,
        prepTime: r.prepTime,
        cookTime: r.cookTime,
        servings: r.servings,
        description: r.description,
        story: r.story,
        notes: r.notes,
        order: i,
        tags: {
          create: r.tags.map(name => ({ name })),
        },
        ingredients: {
          create: r.ingredients.map((text, idx) => ({
            text: text === '—' ? '—' : text,
            isSeparator: text === '—',
            order: idx,
          })),
        },
        steps: {
          create: r.steps.map((text, idx) => ({
            text,
            order: idx,
          })),
        },
      },
    });
  }

  console.log(`Seeded ${SEED_RECIPES.length} recipes.`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
