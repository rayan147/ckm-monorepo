import { PrismaClient, UserRole, OrderStatus, ShiftStatus, PrepStatus } from '../src';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();
// Encryption service

// Helper function to get random enum value
function getRandomEnumValue<T extends object>(enumObject: T): T[keyof T] {
  const enumValues = Object.values(enumObject);
  return enumValues[Math.floor(Math.random() * enumValues.length)] as T[keyof T];
}

// Organization factory
async function createOrganization() {
  return prisma.organization.create({
    data: {
      name: faker.company.name(),
      imageUrl: faker.image.url(),
    },
  });
}

// Restaurant factory
async function createRestaurant(organizationId: number) {
  return prisma.restaurant.create({
    data: {
      name: faker.company.name(),
      imageUrl: faker.image.url(),
      address: faker.location.streetAddress(true),
      city: faker.location.city(),
      zipCode: faker.location.zipCode(),
      state: faker.location.state(),
      owner: faker.person.firstName(),
      organizationId: organizationId,
    },
  });
}

// User factory
async function createUser(restaurantId: number, role?: UserRole) {
  return prisma.user.create({
    data: {
      email: faker.internet.email(),
      passwordHash: faker.internet.password(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      role: role || getRandomEnumValue(UserRole),
      restaurantId,
    },
  });
}


// Vendor factory
async function createVendor() {
  return prisma.vendor.create({
    data: {
      name: faker.company.name(),
      contact: faker.person.fullName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
    },
  });
}

const extensiveCommercialKitchenIngredients: string[] = [
  // Produce
  "tomatoes", "cherry tomatoes", "roma tomatoes", "beefsteak tomatoes",
  "red onions", "yellow onions", "white onions", "shallots", "scallions",
  "iceberg lettuce", "romaine lettuce", "butterhead lettuce", "arugula", "radicchio",
  "carrots", "baby carrots", "multicolored carrots", "parsnips",
  "red bell peppers", "green bell peppers", "yellow bell peppers", "orange bell peppers",
  "English cucumbers", "pickling cucumbers", "Persian cucumbers",
  "garlic", "garlic scapes", "elephant garlic",
  "russet potatoes", "red potatoes", "Yukon gold potatoes", "fingerling potatoes", "sweet potatoes",
  "baby spinach", "mature spinach", "Swiss chard", "kale", "collard greens",
  "broccoli", "broccolini", "broccoli rabe", "cauliflower", "romanesco",
  "white mushrooms", "cremini mushrooms", "shiitake mushrooms", "oyster mushrooms", "portobello mushrooms",
  "zucchini", "yellow squash", "pattypan squash", "acorn squash", "butternut squash", "spaghetti squash",
  "celery", "celery root", "fennel", "leeks",
  "lemons", "limes", "oranges", "grapefruits", "tangerines", "clementines",
  "Granny Smith apples", "Honeycrisp apples", "Gala apples", "Fuji apples", "Red Delicious apples",
  "Hass avocados", "Florida avocados",
  "green cabbage", "red cabbage", "Napa cabbage", "Savoy cabbage",
  "green beans", "wax beans", "edamame", "sugar snap peas", "snow peas",
  "asparagus", "white asparagus",
  "eggplant", "Japanese eggplant", "Thai eggplant",
  "pumpkin", "kabocha squash", "delicata squash", "hubbard squash",

  // Herbs and Spices
  "basil", "Thai basil", "holy basil", "thyme", "lemon thyme",
  "rosemary", "oregano", "parsley", "cilantro", "sage",
  "mint", "peppermint", "spearmint", "dill", "chives",
  "tarragon", "marjoram", "bay leaves", "lemongrass",
  "black peppercorns", "white peppercorns", "pink peppercorns", "Sichuan peppercorns",
  "ground cumin", "cumin seeds", "ground coriander", "coriander seeds",
  "smoked paprika", "sweet paprika", "hot paprika",
  "ground cinnamon", "cinnamon sticks", "nutmeg", "mace",
  "ground ginger", "crystallized ginger", "turmeric", "saffron",
  "cardamom pods", "ground cardamom", "cloves", "allspice",
  "cayenne pepper", "red pepper flakes", "chipotle powder",
  "fennel seeds", "caraway seeds", "mustard seeds", "celery seeds",
  "vanilla beans", "vanilla extract", "almond extract", "peppermint extract",
  "onion powder", "garlic powder", "dried minced onion", "dried minced garlic",

  // Meats and Proteins
  "chicken breast", "chicken thighs", "whole chicken", "ground chicken",
  "ground beef (80/20)", "ground beef (90/10)", "beef chuck roast", "beef sirloin", "beef tenderloin",
  "pork chops", "pork tenderloin", "pork shoulder", "ground pork",
  "bacon", "pancetta", "prosciutto", "ham", "Canadian bacon",
  "salmon fillets", "salmon steaks", "tuna steaks", "cod fillets", "halibut",
  "shrimp (various sizes)", "scallops", "mussels", "clams", "oysters",
  "lamb chops", "leg of lamb", "ground lamb",
  "turkey breast", "ground turkey", "whole turkey",
  "Italian sausage", "bratwurst", "chorizo", "andouille sausage",
  "duck breast", "duck legs", "foie gras",
  "veal cutlets", "ground veal", "veal shanks",
  "tofu (firm)", "tofu (silken)", "tempeh", "seitan",

  // Dry Ingredients
  "all-purpose flour", "bread flour", "cake flour", "whole wheat flour", "almond flour",
  "granulated sugar", "powdered sugar", "brown sugar (light and dark)", "turbinado sugar", "demerara sugar",
  "baking powder", "baking soda", "cream of tartar", "active dry yeast", "instant yeast",
  "cornstarch", "tapioca starch", "potato starch",
  "panko breadcrumbs", "plain breadcrumbs", "cornmeal", "semolina",
  "rolled oats", "steel-cut oats", "quick oats",
  "white rice", "brown rice", "arborio rice", "basmati rice", "jasmine rice",
  "green lentils", "red lentils", "black lentils", "French lentils",
  "black beans", "kidney beans", "cannellini beans", "chickpeas", "pinto beans",
  "quinoa", "bulgur wheat", "barley", "farro", "millet",
  "couscous", "Israeli couscous", "orzo",
  "almonds", "walnuts", "pecans", "cashews", "pistachios", "pine nuts",
  "raisins", "dried cranberries", "dried apricots", "dried figs", "dates",

  // Pastas
  "spaghetti", "angel hair pasta", "fettuccine", "linguine", "pappardelle",
  "penne", "rigatoni", "ziti", "rotini", "fusilli",
  "farfalle", "orecchiette", "conchiglie", "cavatappi",
  "lasagna noodles", "cannelloni", "manicotti",
  "egg noodles", "rice noodles", "soba noodles", "udon noodles",
  "gnocchi", "tortellini", "ravioli", "agnolotti",

  // Baking Items
  "cocoa powder (natural and Dutch-processed)", "chocolate chips (milk, dark, white)",
  "baking chocolate (unsweetened, bittersweet, semisweet)",
  "molasses", "honey", "maple syrup", "agave nectar", "corn syrup",
  "shredded coconut", "coconut flour", "almond paste", "marzipan",
  "food coloring (various colors)", "sprinkles", "nonpareils",
  "gelatin (powdered and sheets)", "pectin", "xanthan gum",
  "cream cheese", "mascarpone", "ricotta",

  // Dairy and Eggs
  "whole milk", "2% milk", "skim milk", "buttermilk", "half-and-half",
  "heavy cream", "whipping cream", "sour cream", "crème fraîche",
  "unsalted butter", "salted butter", "ghee", "margarine",
  "eggs", "egg whites", "egg yolks", "liquid egg substitute",
  "cheddar cheese", "mozzarella", "parmesan", "feta", "goat cheese",
  "blue cheese", "Gruyère", "Swiss cheese", "Brie", "Camembert",
  "Greek yogurt", "plain yogurt", "flavored yogurt",

  // Oils and Vinegars
  "extra virgin olive oil", "light olive oil", "vegetable oil", "canola oil",
  "grapeseed oil", "avocado oil", "coconut oil", "peanut oil", "sesame oil",
  "walnut oil", "truffle oil",
  "balsamic vinegar", "white balsamic vinegar", "apple cider vinegar",
  "rice vinegar", "white wine vinegar", "red wine vinegar",
  "sherry vinegar", "champagne vinegar", "malt vinegar",

  // Canned and Jarred Goods
  "whole peeled tomatoes", "crushed tomatoes", "diced tomatoes", "tomato sauce", "tomato paste",
  "chicken broth", "beef broth", "vegetable broth", "fish stock",
  "coconut milk", "evaporated milk", "condensed milk",
  "black olives", "green olives", "kalamata olives",
  "dill pickles", "sweet pickles", "pickle relish",
  "capers", "artichoke hearts", "roasted red peppers", "sun-dried tomatoes",
  "anchovy fillets", "sardines", "tuna (in water and oil)",

  // Condiments and Sauces
  "mayonnaise", "light mayonnaise", "miracle whip",
  "yellow mustard", "Dijon mustard", "whole grain mustard", "honey mustard",
  "ketchup", "barbecue sauce", "steak sauce", "Worcestershire sauce",
  "soy sauce", "tamari", "hoisin sauce", "oyster sauce", "fish sauce",
  "hot sauce", "Sriracha", "Tabasco", "chili garlic sauce",
  "salsa (mild, medium, hot)", "pico de gallo", "enchilada sauce",
  "pesto", "marinara sauce", "Alfredo sauce",
  "tahini", "hummus", "tzatziki",
  "teriyaki sauce", "ponzu sauce", "sweet and sour sauce",

  // Grains and Cereals
  "wheat bran", "wheat germ", "flaxseed", "chia seeds",
  "puffed rice", "puffed wheat", "corn flakes", "bran flakes",

  // Sweeteners and Flavorings
  "stevia", "monk fruit sweetener", "erythritol",
  "vanilla bean paste", "rosewater", "orange blossom water",

  // Nuts and Seeds
  "sesame seeds", "poppy seeds", "pumpkin seeds", "sunflower seeds",
  "hazelnuts", "macadamia nuts", "Brazil nuts",

  // Dried Herbs
  "dried basil", "dried oregano", "dried thyme", "dried rosemary",
  "dried sage", "dried dill", "dried tarragon", "dried chives",

  // Miscellaneous
  "nutritional yeast", "dried seaweed (nori, wakame)", "miso paste",
  "curry paste (red, green, yellow)", "harissa paste", "wasabi paste",
  "bouillon cubes (chicken, beef, vegetable)", "gelatin sheets",
  "cornichons", "cocktail onions", "maraschino cherries"
];

const category = ['All', 'Produce', 'Meat', 'fish', 'Baking', 'Dry goods', 'Pantry', 'Dairy']
// Ingredient factory
async function createIngredient(vendorId: number) {
  let ingredientName = extensiveCommercialKitchenIngredients.pop()
  if (ingredientName === undefined) {
    ingredientName = faker.person.fullName()
  }
  let cat = category.pop();

  if (cat === undefined) {
    cat = faker.commerce.department();
  }
  return prisma.ingredient.create({
    data: {
      name: ingredientName,
      category: cat,
      price: faker.number.float()
    },
  });
}

// CookBook factory
async function createCookBook() {
  return prisma.cookBook.create({
    data: {
      name: faker.commerce.productName(),
      imageUrl: faker.image.url(),
      category: faker.commerce.department(),
    },
  });
}

// Recipe factory
async function createRecipe(restaurantId: number, cookBookId: number) {
  return prisma.recipe.create({
    data: {
      name: faker.commerce.productName(),
      imageUrl: [faker.image.urlLoremFlickr({ category: 'food' })],
      description: faker.lorem.paragraph(),
      servings: faker.number.int({ min: 1, max: 10 }),
      cookTime: faker.number.int({ min: 10, max: 120 }),
      prepTime: faker.number.int({ min: 10, max: 120 }),
      restaurantId,
      cookBookId,
    },
  });
}

// Inventory factory
async function createInventory(restaurantId: number) {
  return prisma.inventory.create({
    data: {
      restaurantId,
    },
  });
}

// InventoryItem factory
async function createInventoryItem(inventoryId: number, ingredientId: number, userId: number) {
  try {
    const inventoryItem = await prisma.inventoryItem.create({
      data: {
        inventoryId,
        ingredientId,
        quantity: faker.number.float({ min: 0, max: 1000, precision: 0.01 }),
        unit: faker.science.unit().name,
        minQuantity: faker.number.float({ min: 0, max: 100, precision: 0.01 }),
        restockThreshold: faker.number.float({ min: 10, max: 500, precision: 0.01 }),
        lastUpdatedById: userId,
      },
    });
    console.log(`Created InventoryItem: ${inventoryItem.id}`);
    return inventoryItem;
  } catch (error) {
    console.error('Error creating InventoryItem:', error);
  }
}

// Order factory
async function createOrder(restaurantId: number, vendorId: number) {
  try {
    const order = await prisma.order.create({
      data: {
        restaurantId,
        vendorId,
        status: getRandomEnumValue(OrderStatus),
      },
    });
    console.log(`Created Order: ${order.id}`);
    return order;
  } catch (error) {
    console.error('Error creating Order:', error);
    return undefined;
  }
}

// OrderItem factory
async function createOrderItem(orderId: number, ingredientId: number) {
  try {
    const orderItem = await prisma.orderItem.create({
      data: {
        orderId,
        ingredientId,
        quantity: faker.number.float({ min: 1, max: 100, precision: 0.01 }),
        unit: faker.science.unit().name,
        price: faker.number.float({ min: 0.1, max: 100, precision: 0.01 }),
      },
    });
    console.log(`Created OrderItem: ${orderItem.id}`);
    return orderItem;
  } catch (error) {
    console.error('Error creating OrderItem:', error);
  }
}

// PrepBoard factory
async function createPrepBoard() {
  try {
    const prepBoard = await prisma.prepBoard.create({
      data: {
        status: getRandomEnumValue(PrepStatus),
        name: faker.system.fileName()
      },
    });
    console.log(`Created PrepBoard: ${prepBoard.id}`);
    return prepBoard;
  } catch (error) {
    console.error('Error creating PrepBoard:', error);
    return undefined;
  }
}

// PrepItem factory
async function createPrepItem(prepBoardId: number, recipeId: number, userId: number) {
  try {
    const prepItem = await prisma.prepItem.create({
      data: {
        prepBoardId,
        recipeId,
        quantity: faker.number.int({ min: 1, max: 20 }),
        status: getRandomEnumValue(PrepStatus),
        assignedToId: userId,
      },
    });
    console.log(`Created PrepItem: ${prepItem.id}`);
    return prepItem;
  } catch (error) {
    console.error('Error creating PrepItem:', error);
  }
}

// Parse the JSON file
const unitsData = {
  "volume": {
    "gallon": {},
    "quart": {},
    "pint": {},
    "cup": {},
    "fluidOunce": {},
    "tablespoon": {},
    "teaspoon": {},
    "milliliter": {},
    "liter": {}
  },
  "weight": {
    "kilogram": {},
    "gram": {},
    "milligram": {},
    "pound": {},
    "ounce": {}
  }
};

// Extract relevant units for cooking
const cookingUnits = [
  ...Object.keys(unitsData.volume),
  ...Object.keys(unitsData.weight)
];

// RecipeIngredient factory
async function createRecipeIngredient(recipeId: number, ingredientId: number) {
  try {
    const unit = faker.helpers.arrayElement(cookingUnits);
    let quantity: number;

    // Adjust quantity based on the unit
    switch (unit) {
      case 'teaspoon':
      case 'tablespoon':
        quantity = faker.number.int({ min: 1, max: 10 });
        break;
      case 'cup':
      case 'pint':
      case 'quart':
        quantity = faker.number.float({ min: 0.25, max: 4, precision: 0.25 });
        break;
      case 'gallon':
        quantity = faker.number.float({ min: 0.25, max: 2, precision: 0.25 });
        break;
      case 'fluidOunce':
      case 'ounce':
        quantity = faker.number.int({ min: 1, max: 16 });
        break;
      case 'pound':
      case 'kilogram':
        quantity = faker.number.float({ min: 0.25, max: 5, precision: 0.25 });
        break;
      case 'gram':
        quantity = faker.number.int({ min: 10, max: 500 });
        break;
      case 'milligram':
        quantity = faker.number.int({ min: 100, max: 1000 });
        break;
      case 'milliliter':
        quantity = faker.number.int({ min: 10, max: 1000 });
        break;
      case 'liter':
        quantity = faker.number.float({ min: 0.1, max: 2, precision: 0.1 });
        break;
      default:
        quantity = faker.number.float({ min: 0.1, max: 10, precision: 0.1 });
    }

    const recipeIngredient = await prisma.recipeIngredient.create({
      data: {
        recipeId,
        ingredientId,
        quantity,
        unit,
      },
    });
    console.log(`Created RecipeIngredient: ${recipeIngredient.id}`);
    return recipeIngredient;
  } catch (error) {
    console.error('Error creating RecipeIngredient:', error);
  }
}

// RecipeInstruction factory
async function createRecipeInstruction(recipeId: number, stepNumber: number) {
  try {
    const encryptedInstruction = faker.science.unit().name
    const recipeInstruction = await prisma.recipeInstruction.create({
      data: {
        recipeId,
        stepNumber,
        instruction: encryptedInstruction,
        imageUrl: faker.image.urlLoremFlickr({ category: 'food' }),
      },
    });
    console.log(`Created RecipeInstruction: ${recipeInstruction.id}`);
    return recipeInstruction;
  } catch (error) {
    console.error('Error creating RecipeInstruction:', error);
    throw error
  }
}

// Session factory
async function createSession(userId: number) {
  try {
    const session = await prisma.session.create({
      data: {
        userId,
        token: faker.string.uuid(),
        expiresAt: faker.date.future(),
        code: faker.string.nanoid(),
      },
    });
    console.log(`Created Session: ${session.id}`);
    return session;
  } catch (error) {
    console.error('Error creating Session:', error);
  }
}

// Shift factory
async function createShift(userId: number) {
  try {
    const startTime = faker.date.future();
    const shift = await prisma.shift.create({
      data: {
        userId,
        startTime,
        endTime: faker.date.between({ from: startTime, to: faker.date.future({ refDate: startTime }) }),
        status: getRandomEnumValue(ShiftStatus),
      },
    });
    console.log(`Created Shift: ${shift.id}`);
    return shift;
  } catch (error) {
    console.error('Error creating Shift:', error);
  }
}

// Cleanup database function
async function cleanupDatabase() {
  const tablenames = await prisma.$queryRaw<
    Array<{ tablename: string }>
  >`SELECT tablename FROM pg_tables WHERE schemaname='public'`;

  const tables = tablenames
    .map(({ tablename }) => tablename)
    .filter((name) => name !== '_prisma_migrations')
    .map((name) => `"public"."${name}"`)
    .join(', ');

  try {
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE ${tables} CASCADE;`);
    console.log('Database cleaned up');
  } catch (error) {
    console.log('Error during cleanup:', { error });
  }
}

// menuItemRecipe factory
async function createMenuItemRecipe(menuItemId: number, recipeId: number) {
  return prisma.menuItemRecipe.create({
    data: {
      menuItemId,
      recipeId,
    },
  });
}

// Menu factory
async function createMenu(restaurantId: number) {
  return prisma.menu.create({
    data: {
      name: faker.commerce.department(),
      restaurantId,
    },
  });
}

// MenuItem factory
async function createMenuItem(menuId: number, recipeId: number) {
  const price = faker.number.float({ min: 1, max: 100, precision: 0.01 });
  const name = faker.commerce.productName();
  const foodCost = faker.number.float({ min: 0.1, max: price, precision: 0.01 });
  //foodCostPercentage
  // suggestedPrice
  // breakEvenPrice
  // quantity

  // const foodCostPercentage = (foodCost / price) * 100;
  //  const suggestedPrice = price * 2;
  //  const breakEvenPrice = foodCost / price;
  //  const quantity = faker.number.int({ min: 1, max: 100 });

  const menuItem = await prisma.menuItem.create({
    data: {
      menuId,
      price,
      name,
      foodCost,


    },
  });
  console.log(`Created MenuItem: ${menuItem.id}`);
  return menuItem;
}



// Main seeding function
async function main() {
  // Cleanup database
  await cleanupDatabase();

  // Create an organization
  const organization = await createOrganization();

  // Create restaurants
  const restaurants = await Promise.all(
    Array.from({ length: 3 }, () => createRestaurant(organization.id))
  );

  // Create users for each restaurant
  const users = await Promise.all(
    restaurants.flatMap(restaurant => [
      createUser(restaurant.id, UserRole.ADMIN),
      createUser(restaurant.id, UserRole.MANAGER),
      createUser(restaurant.id, UserRole.CHEF),
      createUser(restaurant.id, UserRole.STAFF),
      ...Array.from({ length: 3 }, () => createUser(restaurant.id))
    ])
  );

  // Create vendors
  const vendors = await Promise.all(Array.from({ length: 5 }, createVendor));

  // Create ingredients
  const ingredients = await Promise.all(
    vendors.flatMap(vendor =>
      Array.from({ length: 10 }, () => createIngredient(vendor.id))
    )
  );

  // Create cookbooks
  const cookBooks = await Promise.all(Array.from({ length: 3 }, createCookBook));

  // Create recipes
  const recipes = await Promise.all(
    restaurants.flatMap(restaurant =>
      cookBooks.flatMap(cookbook =>
        Array.from({ length: 5 }, () => createRecipe(restaurant.id, cookbook.id))
      )
    )
  );

  // Create inventories and inventory items
  for (const restaurant of restaurants) {
    const inventory = await createInventory(restaurant.id);
    await Promise.all(
      ingredients.map(ingredient =>
        createInventoryItem(inventory.id, ingredient.id, users[0].id)
      )
    );
  }

  // Create orders and order items
  for (const restaurant of restaurants) {
    for (const vendor of vendors) {
      const order = await createOrder(restaurant.id, vendor.id);
      if (order) {
        await Promise.all(
          ingredients.slice(0, 5).map(ingredient =>
            createOrderItem(order.id, ingredient.id)
          )
        );
      } else {
        console.error('Failed to create order');
      }
    }
  }

  // Create prep boards and prep items
  const prepBoards = await Promise.all(
    restaurants.map(() => createPrepBoard())
  );

  for (const prepBoard of prepBoards) {
    if (prepBoard) {
      await Promise.all(
        Array.from({ length: 5 }, () =>
          createPrepItem(
            prepBoard.id,
            recipes[Math.floor(Math.random() * recipes.length)].id,
            users[Math.floor(Math.random() * users.length)].id
          )
        )
      );
    } else {
      console.error('Failed to create prep board');
    }
  }

  // Create recipe ingredients and instructions
  for (const recipe of recipes) {
    await Promise.all(
      Array.from({ length: 5 }, () =>
        createRecipeIngredient(
          recipe.id,
          ingredients[Math.floor(Math.random() * ingredients.length)].id
        ),
      )
    );

    await Promise.all(
      Array.from({ length: 5 }, (_, index) =>
        createRecipeInstruction(recipe.id, index + 1)
      )
    );
  }

  // Create shifts
  await Promise.all(
    users.flatMap(user =>
      Array.from({ length: 5 }, () => createShift(user.id))
    )
  );

  // Create sessions
  await Promise.all(
    users.flatMap(user =>
      Array.from({ length: 2 }, () => createSession(user.id))
    )
  );


  // Create menus

  const menus = await Promise.all(
    restaurants.map(restaurant => createMenu(restaurant.id))
  );

  // Create menu items
  for (const menu of menus) {
    if (menu) {
      await Promise.all(
        recipes.slice(0, 5).map(recipe =>
          createMenuItem(menu.id, recipe.id)
        )
      );
    } else {
      console.error('Failed to create menu item');
    }
  }

  // Create menuItemRecipes
  const menuItems = await prisma.menuItem.findMany();
  await Promise.all(
    menuItems.map(menuItem =>
      createMenuItemRecipe(menuItem.id, recipes[Math.floor(Math.random() * recipes.length)].id)
    )
  );




  console.log('Seed data created successfully!');
}

main()
  .catch(e => {
    console.error('Error in main function:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
