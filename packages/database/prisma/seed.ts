import { faker } from '@faker-js/faker';
import { Category, ChecklistFrequency, ChecklistItemType, ChecklistStatus, ConstraintType, DayOfWeek, EquipmentStatus, FeedbackSource, FeedbackStatus, MaintenanceType, OrderStatus, PhotoType, PrepStatus, PrismaClient, ShiftStatus, TaskType, UserRole } from '@prisma/client'
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();
// Helper function to get random enum value
function getRandomEnumValue<T extends object>(enumObject: T): T[keyof T] {
  const enumValues = Object.values(enumObject);
  return enumValues[Math.floor(Math.random() * enumValues.length)] as T[keyof T];
}

// Realistic restaurant types and names
const restaurantTypes = [
  { type: 'Italian', names: ['Bella Pasta', 'Gusto Italiano', 'Trattoria Roma', 'Olive Garden', 'Pasta Paradise', 'Little Italy', 'Pizza Palace'] },
  { type: 'Asian', names: ['Golden Dragon', 'Sakura Sushi', 'Spice of Asia', 'Panda Express', 'Thai Delight', 'Wok & Roll', 'Noodle House'] },
  { type: 'Mexican', names: ['El Mariachi', 'Taco Fiesta', 'Casa Mexicana', 'Spicy Jalapeño', 'Guacamole Grill', 'Cantina del Sol', 'Burrito Bros'] },
  { type: 'American', names: ['Main Street Diner', 'American Grill', 'Hometown Burgers', 'Classic Kitchen', 'Apple Pie Cafe', 'Liberty Diner', 'Stars & Stripes'] },
  { type: 'Mediterranean', names: ['Olive Grove', 'Mediterranean Oasis', 'Falafel King', 'Greek Islands', 'Hummus House', 'Aegean Delights', 'Santorini Grill'] },
  { type: 'Indian', names: ['Taj Mahal', 'Curry House', 'Spice Route', 'Delhi Delights', 'Tandoori Nights', 'Bombay Bistro', 'Masala Kitchen'] },
  { type: 'French', names: ['Le Petit Café', 'Bistro Parisien', 'La Maison', 'Chez Michel', 'Café de Paris', 'Provence', 'Le Croissant'] }
];

// Realistic cities with states and zip codes
const cities = [
  { city: 'New York', state: 'NY', zipCodes: ['10001', '10002', '10003', '10004', '10005'] },
  { city: 'Los Angeles', state: 'CA', zipCodes: ['90001', '90002', '90003', '90004', '90005'] },
  { city: 'Chicago', state: 'IL', zipCodes: ['60601', '60602', '60603', '60604', '60605'] },
  { city: 'Houston', state: 'TX', zipCodes: ['77001', '77002', '77003', '77004', '77005'] },
  { city: 'Phoenix', state: 'AZ', zipCodes: ['85001', '85002', '85003', '85004', '85005'] },
  { city: 'Philadelphia', state: 'PA', zipCodes: ['19101', '19102', '19103', '19104', '19105'] },
  { city: 'San Antonio', state: 'TX', zipCodes: ['78201', '78202', '78203', '78204', '78205'] },
  { city: 'San Diego', state: 'CA', zipCodes: ['92101', '92102', '92103', '92104', '92105'] },
  { city: 'Dallas', state: 'TX', zipCodes: ['75201', '75202', '75203', '75204', '75205'] }
];

// Organization factory with realistic restaurant groups
async function createOrganization() {
  // Choose a restaurant type for this organization's theme
  const randomType = faker.helpers.arrayElement(restaurantTypes);
  
  // Create organization name based on the theme
  const suffix = faker.helpers.arrayElement(['Group', 'Hospitality', 'Restaurants', 'Dining', 'Culinary', 'Ventures']);
  const orgName = `${randomType.type} ${suffix}`;
  
  // High-quality restaurant logos from Unsplash by cuisine
  const restaurantLogos = {
    "Italian": [
      "https://images.unsplash.com/photo-1571805341302-f857308690e3", // Italian restaurant logo
      "https://images.unsplash.com/photo-1623091410901-00e2d268ee9c", // Pasta place logo
      "https://images.unsplash.com/photo-1517949908686-71f4a3119fb4", // Pizza logo
      "https://images.unsplash.com/photo-1581873372796-635b67ca2008"  // Italian bistro
    ],
    "Asian": [
      "https://images.unsplash.com/photo-1564631027894-5bdb17618c16", // Asian restaurant logo
      "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2", // Sushi logo
      "https://images.unsplash.com/photo-1617040619263-41c5a9ca7521", // Noodle logo
      "https://images.unsplash.com/photo-1584362917165-526a968579e8"  // Japanese restaurant
    ],
    "Mexican": [
      "https://images.unsplash.com/photo-1561715276-a2d087060f1d", // Mexican restaurant logo
      "https://images.unsplash.com/photo-1617128734662-66da6c1d3505", // Taco logo
      "https://images.unsplash.com/photo-1564495528622-367e1e3e2d33", // Cantina signage
      "https://images.unsplash.com/photo-1570441262582-a2d4b9a916a5"  // Mexican place
    ],
    "American": [
      "https://images.unsplash.com/photo-1577538926210-fc8a3271ae55", // American grill logo
      "https://images.unsplash.com/photo-1625397995229-07a03f0f5eba", // Diner signage
      "https://images.unsplash.com/photo-1577647098628-0597b8b9928b", // Burger joint logo
      "https://images.unsplash.com/photo-1603684468782-8456eb9e7121"  // American restaurant
    ],
    "Mediterranean": [
      "https://images.unsplash.com/photo-1560707854-8ac1e1417436", // Greek logo
      "https://images.unsplash.com/photo-1531835551805-16d864c8d311", // Olive logo
      "https://images.unsplash.com/photo-1624371176579-ab722b4ac2f8", // Mediterranean restaurant
      "https://images.unsplash.com/photo-1544034578-c80fb6c8b175"  // Greek taverna
    ],
    "Indian": [
      "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8", // Indian restaurant logo
      "https://images.unsplash.com/photo-1542367592-8849eb950fd8", // Spice logo
      "https://images.unsplash.com/photo-1566312276672-3353b25e7602", // Curry house sign
      "https://images.unsplash.com/photo-1570626252916-2383ad49f0dc"  // Indian food logo
    ],
    "French": [
      "https://images.unsplash.com/photo-1566706546605-2bddc94c1041", // French bistro logo
      "https://images.unsplash.com/photo-1530649159659-1e1dfcd0e495", // Patisserie sign
      "https://images.unsplash.com/photo-1595748524151-56ef19297344", // French cafe logo
      "https://images.unsplash.com/photo-1548042103-2e249da75b27"  // Gourmet logo
    ]
  };
  
  // Generic restaurant logos for fallback
  const genericLogos = [
    "https://images.unsplash.com/photo-1518176258769-f227c798150e", // Restaurant logo
    "https://images.unsplash.com/photo-1511047752016-772338693fcc", // Culinary brand
    "https://images.unsplash.com/photo-1586999768265-24af89630739", // Food company
    "https://images.unsplash.com/photo-1571942676516-bcab84649e44"  // Hospitality logo
  ];
  
  // Get logos for this cuisine or use generic
  const logos = restaurantLogos[randomType.type] || genericLogos;
  
  // Select a random logo and add random query param to avoid caching
  const imageUrl = faker.helpers.arrayElement(logos) + "?random=" + faker.string.uuid();
  
  return prisma.organization.create({
    data: {
      name: orgName,
      imageUrl: imageUrl,
    },
  });
}

// Restaurant factory with more realistic data
async function createRestaurant(organizationId: number) {
  // Get the organization to match theme
  const organization = await prisma.organization.findUnique({
    where: { id: organizationId }
  });
  
  // Determine restaurant type based on organization name
  let restaurantType = faker.helpers.arrayElement(restaurantTypes);
  if (organization) {
    const orgNameLower = organization.name.toLowerCase();
    const matchedType = restaurantTypes.find(type => 
      orgNameLower.includes(type.type.toLowerCase())
    );
    if (matchedType) {
      restaurantType = matchedType;
    }
  }
  
  // Choose a name from that type
  const name = faker.helpers.arrayElement(restaurantType.names);
  
  // Generate realistic location data
  const location = faker.helpers.arrayElement(cities);
  const zipCode = faker.helpers.arrayElement(location.zipCodes);
  
  // High-quality restaurant interior images from Unsplash by cuisine
  const restaurantImages = {
    "Italian": [
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5", // Italian restaurant
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b", // Trattoria
      "https://images.unsplash.com/photo-1579027989536-b7b1f875659b", // Pizzeria
      "https://images.unsplash.com/photo-1592861956120-e524fc739696"  // Italian dining
    ],
    "Asian": [
      "https://images.unsplash.com/photo-1526318896980-cf78c088247c", // Asian restaurant
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4", // Sushi bar
      "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d", // Ramen shop
      "https://images.unsplash.com/photo-1537047902294-62a40c20a6ae"  // Japanese interior
    ],
    "Mexican": [
      "https://images.unsplash.com/photo-1513640127641-49ba81f8305c", // Mexican restaurant
      "https://images.unsplash.com/photo-1583593186895-243fe6b520d7", // Taqueria
      "https://images.unsplash.com/photo-1561107075-0712b2ff8f5e", // Cantina
      "https://images.unsplash.com/photo-1509315811345-672d83ef2fbc"  // Colorful Mexican place
    ],
    "American": [
      "https://images.unsplash.com/photo-1555992336-03a23c7b20ee", // American diner
      "https://images.unsplash.com/photo-1514537099923-4c9be60f2c92", // Steakhouse
      "https://images.unsplash.com/photo-1521017432531-fbd92d768814", // Burger joint
      "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7"  // Classic American
    ],
    "Mediterranean": [
      "https://images.unsplash.com/photo-1516714819001-8ee7a13b71d7", // Mediterranean restaurant
      "https://images.unsplash.com/photo-1528605248644-14dd04022da1", // Taverna
      "https://images.unsplash.com/photo-1527359443443-84a48aec73d2", // Greek restaurant
      "https://images.unsplash.com/photo-1565622832143-9294d151fb25"  // Mediterranean setting
    ],
    "Indian": [
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4", // Indian restaurant
      "https://images.unsplash.com/photo-1552566626-2d907a8f3276", // Curry house
      "https://images.unsplash.com/photo-1560023907-5f339617ea30", // Tandoori place
      "https://images.unsplash.com/photo-1514518189759-94d8ee01ecf1"  // Indian dining
    ],
    "French": [
      "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa", // French restaurant
      "https://images.unsplash.com/photo-1600891964599-f61f4d5e5965", // Bistro
      "https://images.unsplash.com/photo-1559329145-75e7e4098c0f", // Patisserie
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4"  // French cafe
    ]
  };
  
  // Generic restaurant images for fallback
  const genericRestaurants = [
    "https://images.unsplash.com/photo-1552566626-52f8b828add9", // Restaurant interior
    "https://images.unsplash.com/photo-1587574293340-e0011c4e8ecf", // Dining area
    "https://images.unsplash.com/photo-1445116572660-236099ec97a0", // Cafe setting
    "https://images.unsplash.com/photo-1559339352-11d035aa65de"  // Restaurant ambiance
  ];
  
  // Get images for this cuisine or use generic
  const cuisineRestaurantImages = restaurantImages[restaurantType.type] || genericRestaurants;
  
  // Select a random restaurant image and add random query param to avoid caching
  const imageUrl = faker.helpers.arrayElement(cuisineRestaurantImages) + "?random=" + faker.string.uuid();
  
  // Generate a realistic owner name
  const ownerFirstName = faker.person.firstName();
  const ownerLastName = faker.person.lastName();
  
  return prisma.restaurant.create({
    data: {
      name: `${name} (${location.city})`,
      imageUrl: imageUrl,
      address: faker.location.streetAddress(true),
      city: location.city,
      zipCode: zipCode,
      state: location.state,
      owner: `${ownerFirstName} ${ownerLastName}`,
      organizationId: organizationId,
    },
  });
}

// Realistic job titles by role
const jobTitles = {
  [UserRole.ADMIN]: ['Chief Executive Officer', 'President', 'Owner', 'Managing Director', 'Chief Operating Officer'],
  [UserRole.MANAGER]: ['General Manager', 'Operations Manager', 'Restaurant Manager', 'Floor Manager', 'Service Manager'],
  [UserRole.CHEF]: ['Executive Chef', 'Head Chef', 'Sous Chef', 'Pastry Chef', 'Kitchen Manager'],
  [UserRole.STAFF]: ['Server', 'Bartender', 'Host', 'Cashier', 'Busser', 'Food Runner', 'Dishwasher']
};

// Common email domains for business accounts
const businessEmailDomains = ['gmail.com', 'outlook.com', 'yahoo.com', 'icloud.com', 'hotmail.com', 'aol.com', 'protonmail.com'];

// User factory with optional organization and restaurants - now with more realistic data
async function createUser(
  restaurantId?: number,
  role?: UserRole,
  options?: {
    isOrganization?: boolean;
    organizationData?: { name: string; imageUrl?: string };
    restaurantsData?: Array<{
      name: string;
      imageUrl?: string;
      address: string;
      city: string;
      zipCode: string;
      state: string;
      owner: string;
    }>;
  }
) {
  // Generate realistic user data
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const assignedRole = role || getRandomEnumValue(UserRole);
  
  // Create more realistic email based on role
  let email = '';
  if (assignedRole === UserRole.ADMIN || assignedRole === UserRole.MANAGER) {
    // Business-style email for management
    const domainSuffix = options?.isOrganization && options.organizationData 
      ? options.organizationData.name.toLowerCase().replace(/[^\w]/g, '') + '.com'
      : faker.helpers.arrayElement(businessEmailDomains);
      
    email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${domainSuffix}`;
  } else {
    // Regular email for staff
    email = faker.internet.email({ firstName, lastName });
  }
  
  // Generate a stronger but readable password
  const password = `${firstName}${faker.number.int({min: 100, max: 999})}!${lastName}`;
  const passwordHash = await bcrypt.hash(password, 10);
  
  // Get a job title appropriate for the role
  const jobTitle = faker.helpers.arrayElement(jobTitles[assignedRole] || ['Employee']);
  
  // Generate realistic profile image - using professional avatars from Unsplash
  const professionalAvatars = [
    "https://images.unsplash.com/photo-1568602471122-7832951cc4c5", // Male professional 
    "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f", // Developer 
    "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e", // Female professional
    "https://images.unsplash.com/photo-1560250097-0b93528c311a", // Business person
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d", // Natural portrait
    "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04", // Chef portrait
    "https://images.unsplash.com/photo-1577202214328-c04b77cefb5d", // Restaurant manager
    "https://images.unsplash.com/photo-1583394838336-acd977736f90", // Kitchen staff
    "https://images.unsplash.com/photo-1566492031773-4f4e44671857", // Hospitality worker
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e", // Professional headshot
  ];
  
  // Add random query param to avoid caching
  const profileImage = faker.helpers.arrayElement(professionalAvatars) + "?random=" + faker.string.uuid();

  // If creating with organization and restaurants
  if (options?.isOrganization) {
    // Use prisma transaction to ensure all operations succeed or fail together
    return prisma.$transaction(async (tx) => {
      // Create organization if specified
      let organization = null;
      if (options.organizationData) {
        // If no organization name provided, create a realistic one
        const orgName = options.organizationData.name || `${lastName} ${faker.helpers.arrayElement(['Group', 'Hospitality', 'Restaurants'])}`;
        
        // If no image provided, create a realistic one with high-quality Unsplash logos
        const defaultOrgLogos = [
          "https://images.unsplash.com/photo-1581873372796-635b67ca2008", // Restaurant logo
          "https://images.unsplash.com/photo-1560015534-cee980ba7e13", // Kitchen logo
          "https://images.unsplash.com/photo-1565622293095-e95c2bf54073", // Food service logo
          "https://images.unsplash.com/photo-1568738351265-c7065f5d4643", // Hospitality brand
          "https://images.unsplash.com/photo-1566492031773-4f4e44671857"  // Restaurant group
        ];
        const imageUrl = options.organizationData.imageUrl || 
          (faker.helpers.arrayElement(defaultOrgLogos) + "?random=" + faker.string.uuid());
        
        organization = await tx.organization.create({
          data: {
            name: orgName,
            imageUrl: imageUrl,
          },
        });
        console.log(`Created organization: ${organization.name} (ID: ${organization.id})`);
      }

      // Create user with auth record and connect to organization if applicable
      const user = await tx.user.create({
        data: {
          email,
          firstName,
          lastName,
          profileImage: profileImage,
          auth: {
            create: {
              passwordHash,
              role: assignedRole
            }
          },
          ...(organization ? { organization: { connect: { id: organization.id } } } : {}),
          ...(restaurantId ? { restaurant: { connect: { id: restaurantId } } } : {})
        },
        include: {
          organization: true
        }
      });
      console.log(`Created ${jobTitle} user: ${user.firstName} ${user.lastName} (${user.email}) with role ${assignedRole}`);

      // Create restaurants and connect to organization and user if applicable
      if (options.restaurantsData && options.restaurantsData.length > 0) {
        for (const restaurantData of options.restaurantsData) {
          // If organization exists, use its theme to generate consistent restaurant data
          let restaurantName = restaurantData.name;
          let restaurantImage = restaurantData.imageUrl;
          
          if (organization) {
            const orgNameLower = organization.name.toLowerCase();
            const matchedType = restaurantTypes.find(type => 
              orgNameLower.includes(type.type.toLowerCase())
            );
            
            if (matchedType && !restaurantName) {
              restaurantName = faker.helpers.arrayElement(matchedType.names);
              const location = faker.helpers.arrayElement(cities);
              restaurantName = `${restaurantName} (${location.city})`;
            }
            
            if (!restaurantImage) {
              // High-quality restaurant images from Unsplash by type
              const cuisineRestaurantImages = {
                "Italian": [
                  "https://images.unsplash.com/photo-1555396273-367ea4eb4db5", // Italian restaurant
                  "https://images.unsplash.com/photo-1514933651103-005eec06c04b", // Trattoria
                ],
                "Asian": [
                  "https://images.unsplash.com/photo-1526318896980-cf78c088247c", // Asian restaurant
                  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4", // Sushi bar
                ],
                "Mexican": [
                  "https://images.unsplash.com/photo-1513640127641-49ba81f8305c", // Mexican restaurant
                  "https://images.unsplash.com/photo-1583593186895-243fe6b520d7", // Taqueria
                ],
                "American": [
                  "https://images.unsplash.com/photo-1555992336-03a23c7b20ee", // American diner
                  "https://images.unsplash.com/photo-1514537099923-4c9be60f2c92", // Steakhouse
                ]
              };
              
              // Get images for this cuisine or use generic
              const cuisineType = matchedType ? matchedType.type : 'American';
              const cuisineImages = cuisineRestaurantImages[cuisineType] || cuisineRestaurantImages["American"];
              
              // Select with random query param
              restaurantImage = faker.helpers.arrayElement(cuisineImages) + "?random=" + faker.string.uuid();
            }
          }
          
          const restaurant = await tx.restaurant.create({
            data: {
              ...restaurantData,
              name: restaurantName || restaurantData.name,
              imageUrl: restaurantImage || restaurantData.imageUrl || "https://images.unsplash.com/photo-1552566626-52f8b828add9?random=" + faker.string.uuid(),
              ...(organization ? { organization: { connect: { id: organization.id } } } : {}),
              users: {
                connect: { id: user.id }
              }
            }
          });
          console.log(`Created restaurant: ${restaurant.name} (ID: ${restaurant.id}) in ${restaurant.city}, ${restaurant.state}`);
        }
      }

      return user;
    });
  }
  // Simple user creation without organization/restaurants
  else {
    return prisma.user.create({
      data: {
        email,
        firstName,
        lastName,
        profileImage,
        auth: {
          create: {
            passwordHash,
            role: assignedRole
          }
        },
        ...(restaurantId ? { restaurant: { connect: { id: restaurantId } } } : {})
      },
    }).then(user => {
      console.log(`Created ${jobTitle} user: ${user.firstName} ${user.lastName} (${user.email}) with role ${assignedRole}`);
      return user;
    });
  }
}

// Common food vendors by type
const vendorTypes = [
  { 
    type: 'Produce', 
    names: ['Fresh Farms', 'Garden Greens Supply', 'Harvest Produce', 'Valley Vegetables', 'Farm Direct'],
    ingredients: ['Lettuce', 'Tomatoes', 'Carrots', 'Onions', 'Bell Peppers', 'Potatoes', 'Broccoli', 'Spinach', 'Cucumbers', 'Mushrooms']
  },
  { 
    type: 'Meat', 
    names: ['Quality Meats', 'Premium Butchers', 'Prime Cuts', 'Meat Market', 'Butcher Block'],
    ingredients: ['Beef', 'Chicken', 'Pork', 'Lamb', 'Turkey', 'Ground Beef', 'Steak', 'Bacon', 'Sausage', 'Ham']
  },
  { 
    type: 'Seafood', 
    names: ['Ocean Fresh', 'Sea Harvest', 'Coastal Catch', 'Harbor Fish', 'Bay Seafood'],
    ingredients: ['Salmon', 'Tuna', 'Shrimp', 'Crab', 'Lobster', 'Cod', 'Tilapia', 'Clams', 'Mussels', 'Scallops']
  },
  { 
    type: 'Bakery', 
    names: ['Artisan Bakers', 'Bread Masters', 'Flour Power', 'Golden Crust', 'Daily Bread'],
    ingredients: ['Bread', 'Rolls', 'Baguette', 'Croissants', 'Muffins', 'Bagels', 'Pastries', 'Cake', 'Cookies', 'Flour']
  },
  { 
    type: 'Dairy', 
    names: ['Dairy Delights', 'Milk & More', 'Cheese Heaven', 'Creamery Co.', 'Dairy Fresh'],
    ingredients: ['Milk', 'Cheese', 'Butter', 'Yogurt', 'Cream', 'Sour Cream', 'Cream Cheese', 'Ice Cream', 'Eggs', 'Buttermilk']
  },
  { 
    type: 'Dry Goods', 
    names: ['Pantry Staples', 'Bulk Supply Co.', 'Essential Goods', 'Grain & Co.', 'Kitchen Basics'],
    ingredients: ['Rice', 'Pasta', 'Beans', 'Lentils', 'Sugar', 'Salt', 'Flour', 'Cereal', 'Oats', 'Nuts']
  }
];

// Vendor factory with realistic food supplier data
async function createVendor() {
  // Choose a vendor type
  const vendorType = faker.helpers.arrayElement(vendorTypes);
  
  // Create a unique realistic vendor name
  // Add location and unique ID to ensure uniqueness
  const location = faker.helpers.arrayElement(cities).city;
  const uniqueId = faker.string.alphanumeric(3).toUpperCase();
  const vendorName = `${faker.helpers.arrayElement(vendorType.names)} ${vendorType.type} Supply - ${location} (${uniqueId})`;
  
  // Create a realistic contact name
  const contactFirstName = faker.person.firstName();
  const contactLastName = faker.person.lastName();
  const contactFullName = `${contactFirstName} ${contactLastName}`;
  
  // Create a business email - only use the first part of the vendor name
  const simplifiedVendorName = vendorName.split(' - ')[0].replace(/\s+/g, '');
  const email = `${contactFirstName.toLowerCase()}.${contactLastName.toLowerCase()}@${simplifiedVendorName.toLowerCase().replace(/[^\w]/g, '')}.com`;
  
  // Create a business phone
  const phone = faker.phone.number('(###) ###-####');
  
  return prisma.vendor.create({
    data: {
      name: vendorName,
      contact: contactFullName,
      email: email,
      phone: phone,
    },
  });
}

// Ingredient factory with realistic food items and pricing
async function createIngredient(vendorId: number) {
  // Get the vendor to match ingredient category
  const vendor = await prisma.vendor.findUnique({
    where: { id: vendorId }
  });
  
  // Determine ingredient type based on vendor name
  let vendorType = faker.helpers.arrayElement(vendorTypes);
  if (vendor) {
    const vendorNameLower = vendor.name.toLowerCase();
    const matchedType = vendorTypes.find(type => 
      vendorNameLower.includes(type.type.toLowerCase())
    );
    if (matchedType) {
      vendorType = matchedType;
    }
  }
  
  // Choose a name from that type's ingredients
  const ingredientName = faker.helpers.arrayElement(vendorType.ingredients);
  
  // Generate realistic category
  const categories = ['Organic', 'Conventional', 'Local', 'Imported', 'Premium', 'Value'];
  const category = faker.helpers.arrayElement(categories) + ' ' + vendorType.type;
  
  // Generate realistic price based on type
  let priceRange;
  switch(vendorType.type) {
    case 'Meat':
    case 'Seafood':
      priceRange = { min: 8.99, max: 29.99 };
      break;
    case 'Dairy':
      priceRange = { min: 2.99, max: 8.99 };
      break;
    case 'Produce':
      priceRange = { min: 0.99, max: 4.99 };
      break;
    default:
      priceRange = { min: 1.99, max: 9.99 };
  }
  
  const price = parseFloat(faker.commerce.price(priceRange.min, priceRange.max));

  return prisma.ingredient.upsert({
    where: {
      name: ingredientName,
    },
    update: {
      category,
      price,
    },
    create: {
      name: ingredientName,
      category,
      price,
    },
  });
}


// Realistic cookbook categories and names
const cookbookTypes = [
  { cuisine: "Italian", books: ["Italian Classics", "Pasta Perfection", "Mediterranean Treasures", "Italian Family Recipes", "Tuscan Kitchen"] },
  { cuisine: "Asian", books: ["Asian Fusion", "Wok Essentials", "Sushi Master", "Thai Flavors", "Chinese Traditions"] },
  { cuisine: "Mexican", books: ["Mexican Fiesta", "Taco Techniques", "South of the Border", "Authentic Mexican", "Spicy Kitchen"] },
  { cuisine: "American", books: ["American Comfort", "Diner Classics", "Homestyle Cooking", "BBQ Bible", "Southern Comfort"] },
  { cuisine: "French", books: ["French Bistro", "Patisserie", "Classic French", "Gourmet French", "Parisian Kitchen"] },
  { cuisine: "Indian", books: ["Indian Spices", "Curry Collection", "Tandoori Master", "Indian Vegetarian", "Spice Route"] },
  { cuisine: "Mediterranean", books: ["Mediterranean Diet", "Greek Table", "Olive Oil & More", "Coastal Cuisine", "Levantine Kitchen"] }
];

// Recipe templates by cuisine
const recipeTemplates = {
  "Italian": [
    { name: "Classic Margherita Pizza", tags: ["Pizza", "Vegetarian", "Quick"], restrictions: ["Vegetarian"] },
    { name: "Spaghetti Carbonara", tags: ["Pasta", "Quick", "Traditional"], restrictions: [] },
    { name: "Lasagna Bolognese", tags: ["Pasta", "Baked", "Family Style"], restrictions: [] },
    { name: "Risotto ai Funghi", tags: ["Rice", "Creamy", "Vegetarian"], restrictions: ["Vegetarian"] },
    { name: "Tiramisu", tags: ["Dessert", "No-Bake", "Coffee"], restrictions: ["Contains Alcohol"] }
  ],
  "Asian": [
    { name: "Sushi Rolls", tags: ["Seafood", "Raw", "Japanese"], restrictions: ["Contains Raw Fish"] },
    { name: "Pad Thai", tags: ["Noodles", "Stir-Fry", "Thai"], restrictions: ["Contains Peanuts"] },
    { name: "General Tso's Chicken", tags: ["Chicken", "Spicy", "Chinese"], restrictions: [] },
    { name: "Beef Pho", tags: ["Soup", "Vietnamese", "Beef"], restrictions: [] },
    { name: "Vegetable Spring Rolls", tags: ["Appetizer", "Fried", "Vegetarian"], restrictions: ["Vegetarian"] }
  ],
  "Mexican": [
    { name: "Authentic Beef Tacos", tags: ["Beef", "Spicy", "Street Food"], restrictions: [] },
    { name: "Chicken Enchiladas", tags: ["Chicken", "Baked", "Cheesy"], restrictions: [] },
    { name: "Guacamole", tags: ["Appetizer", "Fresh", "Vegetarian"], restrictions: ["Vegetarian", "Vegan"] },
    { name: "Chiles Rellenos", tags: ["Vegetarian", "Stuffed", "Spicy"], restrictions: ["Vegetarian"] },
    { name: "Churros con Chocolate", tags: ["Dessert", "Fried", "Sweet"], restrictions: ["Vegetarian"] }
  ],
  "American": [
    { name: "Classic Cheeseburger", tags: ["Beef", "Grilled", "Fast Food"], restrictions: [] },
    { name: "Apple Pie", tags: ["Dessert", "Baked", "Fruit"], restrictions: ["Vegetarian"] },
    { name: "Buffalo Wings", tags: ["Chicken", "Spicy", "Appetizer"], restrictions: [] },
    { name: "Mac and Cheese", tags: ["Pasta", "Baked", "Vegetarian"], restrictions: ["Vegetarian"] },
    { name: "New England Clam Chowder", tags: ["Soup", "Seafood", "Creamy"], restrictions: ["Contains Shellfish"] }
  ]
};

// CookBook factory with realistic categories and names
async function createCookBook() {
  const cookbookType = faker.helpers.arrayElement(cookbookTypes);
  const bookName = faker.helpers.arrayElement(cookbookType.books);
  
  // High-quality cookbook covers from Unsplash by cuisine type
  const cookbookCovers = {
    "Italian": [
      "https://images.unsplash.com/photo-1498579485796-98be3abc076e", // Italian cookbook
      "https://images.unsplash.com/photo-1558985212-91f440870b58", // Pasta book
      "https://images.unsplash.com/photo-1535908786456-b583527c4708", // Italian cuisine
      "https://images.unsplash.com/photo-1518133683791-0b9de5a055f0", // Pizza book
      "https://images.unsplash.com/photo-1561365452-adb940139ffa"  // Mediterranean
    ],
    "Asian": [
      "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd", // Asian cookbook
      "https://images.unsplash.com/photo-1514483127413-f72f273478c3", // Japanese
      "https://images.unsplash.com/photo-1563245370-7cbe797e9104", // Sushi book
      "https://images.unsplash.com/photo-1542683305-710078a12f73", // Asian cuisine
      "https://images.unsplash.com/photo-1551218371-10a933e55c34"  // Chinese food
    ],
    "Mexican": [
      "https://images.unsplash.com/photo-1499889808931-317a0255c0e9", // Mexican cookbook
      "https://images.unsplash.com/photo-1464219222984-216ebffaaf85", // Tacos
      "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2", // Mexican food
      "https://images.unsplash.com/photo-1565299715199-866c917206bb", // Spicy cooking
      "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af"  // Latin cuisine
    ],
    "American": [
      "https://images.unsplash.com/photo-1555507036-ab1f4038808a", // American cookbook
      "https://images.unsplash.com/photo-1529566652340-2c41a1eb6d93", // BBQ
      "https://images.unsplash.com/photo-1521305916504-4a1121188589", // Burgers
      "https://images.unsplash.com/photo-1504480899134-68aa1d9ddd19", // Comfort food
      "https://images.unsplash.com/photo-1589227365533-cee630bd59bd"  // American cuisine
    ],
    "French": [
      "https://images.unsplash.com/photo-1531346680077-ccb2f0d22c2a", // French cookbook
      "https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc", // Patisserie
      "https://images.unsplash.com/photo-1462839227790-a4fefb9a0911", // French cuisine
      "https://images.unsplash.com/photo-1432139509613-5c4255815697", // Gourmet
      "https://images.unsplash.com/photo-1550617931-e17a7b70dce2"  // French gastronomy
    ],
    "Indian": [
      "https://images.unsplash.com/photo-1505253758473-96b7015fcd40", // Indian cookbook
      "https://images.unsplash.com/photo-1542367592-8849eb950fd8", // Spices
      "https://images.unsplash.com/photo-1563379926898-05f4575a45d8", // Curry
      "https://images.unsplash.com/photo-1565557623262-b51c2513a641", // Indian cuisine
      "https://images.unsplash.com/photo-1532509774891-141d37f25ae9"  // Tandoori
    ],
    "Mediterranean": [
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd", // Mediterranean cookbook
      "https://images.unsplash.com/photo-1544510807-78268e067c70", // Greek cuisine
      "https://images.unsplash.com/photo-1550304943-4f24f54ddde9", // Olive oil
      "https://images.unsplash.com/photo-1598866594230-a7c12756260f", // Mediterranean food
      "https://images.unsplash.com/photo-1553025934-296397db4010"  // Herbs and spices
    ]
  };
  
  // Generic cookbook covers for fallback
  const genericCookbooks = [
    "https://images.unsplash.com/photo-1576488489579-6967c02c56fc", // Generic cookbook
    "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7", // Recipe book
    "https://images.unsplash.com/photo-1495195134817-aeb325a55b65", // Cooking book
    "https://images.unsplash.com/photo-1478144444761-6555be04d9e8", // Food book
    "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f"  // Culinary arts
  ];
  
  // Get covers for this cuisine or use generic
  const covers = cookbookCovers[cookbookType.cuisine] || genericCookbooks;
  
  // Pick a random cover and add random query param to avoid caching
  const imageUrl = faker.helpers.arrayElement(covers) + "?random=" + faker.string.uuid();
  
  return prisma.cookBook.create({
    data: {
      name: bookName,
      imageUrl: imageUrl,
      category: cookbookType.cuisine,
    },
  });
}

// Recipe factory with realistic names, descriptions and images
async function createRecipe(restaurantId: number, cookBookId: number) {
  try {
    // Get the cookbook to match cuisine
    const cookbook = await prisma.cookBook.findUnique({
      where: { id: cookBookId }
    });
    
    // Get the restaurant to match cuisine
    const restaurant = await prisma.restaurant.findUnique({
      where: { id: restaurantId }
    });
    
    if (!restaurant) {
      throw new Error(`Restaurant with ID ${restaurantId} not found`);
    }
    
    // Determine cuisine from cookbook or restaurant
    let cuisine = "Italian"; // Default
    if (cookbook) {
      cuisine = cookbook.category;
    } else {
      // Try to infer cuisine from restaurant name
      const restaurantNameLower = restaurant.name.toLowerCase();
      const matchedType = restaurantTypes.find(type => 
        restaurantNameLower.includes(type.type.toLowerCase())
      );
      if (matchedType) {
        cuisine = matchedType.type;
      }
    }
    
    // Get recipes for this cuisine or use a fallback
    const cuisineRecipes = recipeTemplates[cuisine] || recipeTemplates["Italian"];
    const recipeTemplate = faker.helpers.arrayElement(cuisineRecipes);
    
    // Create a guaranteed unique recipe name using timestamp and uuid
    // Format: "Recipe Name at Restaurant Name (Timestamp-UUID)"
    const restaurantName = restaurant ? restaurant.name.split(' (')[0] : 'Test Kitchen';
    const timestamp = Date.now();
    const uuid = uuidv4();
    const recipeName = `${recipeTemplate.name} at ${restaurantName} (${timestamp}-${uuid})`;
    
    // Create a detailed description
    const description = `Our ${recipeTemplate.name} is prepared using the finest ingredients and traditional techniques. 
    This ${cuisine} classic brings authentic flavors to your table with a modern twist. 
    ${faker.lorem.paragraph()}`;
    
    // Generate realistic cook and prep times
    const prepTime = faker.number.int({ min: 10, max: 45 });
    const cookTime = faker.number.int({ min: 15, max: 90 });
    
    // Generate realistic servings
    const servings = faker.number.int({ min: 2, max: 6 });
    
    // Use reliable food image APIs for more realistic images
    // These URLs point to high-quality food images from specialized food image services
    
    // Food image collections by cuisine type
    const foodImageSets = {
      "Italian": [
        "https://images.unsplash.com/photo-1528137871618-79d2761e3fd5", // Pizza
        "https://images.unsplash.com/photo-1563379926898-05f4575a45d8", // Pasta
        "https://images.unsplash.com/photo-1574894709920-11b28e7367e3", // Lasagna
        "https://images.unsplash.com/photo-1546549032-9571cd6b27df", // Risotto
        "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9"  // Tiramisu
      ],
      "Asian": [
        "https://images.unsplash.com/photo-1563612116625-3012372fccce", // Sushi
        "https://images.unsplash.com/photo-1607330289024-1535c6b4e1c1", // Stir-fry
        "https://images.unsplash.com/photo-1569058242567-93de6c36f198", // Noodles
        "https://images.unsplash.com/photo-1498654896293-37aacf113fd9", // Dumplings
        "https://images.unsplash.com/photo-1565557623262-b51c2513a641"  // Curry
      ],
      "Mexican": [
        "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b", // Tacos
        "https://images.unsplash.com/photo-1584208632869-19639024e2e2", // Enchiladas
        "https://images.unsplash.com/photo-1604544203292-0daa7f847478", // Guacamole
        "https://images.unsplash.com/photo-1618040996337-56904b7be876", // Burrito
        "https://images.unsplash.com/photo-1599974579688-8dbdd335c77f"  // Quesadilla
      ],
      "American": [
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd", // Burger
        "https://images.unsplash.com/photo-1600891964092-4316c288032e", // Steak
        "https://images.unsplash.com/photo-1626082927389-6cd097cee6a6", // Fried Chicken
        "https://images.unsplash.com/photo-1543352634-a1c51d9f1fa7", // Mac and Cheese
        "https://images.unsplash.com/photo-1558030006-450675393462"  // BBQ
      ],
      "French": [
        "https://images.unsplash.com/photo-1555507036-ab1f4038808a", // Croissant
        "https://images.unsplash.com/photo-1572453800999-e8d2d1589b7c", // Ratatouille
        "https://images.unsplash.com/photo-1605291081457-4331e9080c22", // Souffle
        "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf", // Coq au Vin
        "https://images.unsplash.com/photo-1587314168485-3236d6710814"  // Crepes
      ],
      "Indian": [
        "https://images.unsplash.com/photo-1585937421612-70a008356c36", // Curry
        "https://images.unsplash.com/photo-1610057099431-d73a1c9d2f2f", // Tandoori
        "https://images.unsplash.com/photo-1586524701498-4dc3947f5d4a", // Naan
        "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8", // Biryani
        "https://images.unsplash.com/photo-1601050690597-df0568f70950"  // Samosa
      ],
      "Mediterranean": [
        "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5", // Hummus
        "https://images.unsplash.com/photo-1619893272468-5973d6e2fbc9", // Falafel
        "https://images.unsplash.com/photo-1603360946369-dc9bb6258143", // Kebab
        "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351", // Seafood
        "https://images.unsplash.com/photo-1623428187969-5da2dcea5eea"  // Mediterranean Salad
      ]
    };
    
    // Generic food images for fallback
    const genericFoodImages = [
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836", // Plate food
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1", // Restaurant dish
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe", // Gourmet food
      "https://images.unsplash.com/photo-1543362906-acfc16c67564", // Fancy meal
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0"  // Fine dining
    ];
    
    // Get relevant image set or use generic food images
    const relevantImages = foodImageSets[cuisine] || genericFoodImages;
    
    // Create array of 3 unique images for the recipe
    // Add random query param to bypass any caching
    const imageUrls = faker.helpers.arrayElements(relevantImages, Math.min(3, relevantImages.length))
      .map(url => `${url}?random=${faker.string.uuid()}`);
    
    // If we don't have enough images, fill with generic ones
    while (imageUrls.length < 3) {
      const randomGeneric = faker.helpers.arrayElement(genericFoodImages);
      if (!imageUrls.includes(randomGeneric)) {
        imageUrls.push(`${randomGeneric}?random=${faker.string.uuid()}`);
      }
    }
    
    // First find users - we'll need them for the version
    const users = await prisma.user.findMany({});
    if (users.length === 0) {
      throw new Error("No users found to assign as recipe version creator");
    }
    
    // Use a transaction to ensure both recipe and version are created together
    return await prisma.$transaction(async (tx) => {
      // Create recipe with realistic tags and dietary restrictions
      const recipe = await tx.recipe.create({
        data: {
          name: recipeName,
          imageUrls: imageUrls,
          description: description,
          servings: servings,
          cookTime: cookTime,
          prepTime: prepTime,
          restaurantId: restaurantId,
          cookBookId: cookBookId,
          tags: {
            create: recipeTemplate.tags.map(tag => ({
              name: tag,
              description: `Recipes tagged as ${tag}`
            }))
          },
          dietaryRestrictions: {
            create: recipeTemplate.restrictions.map(restriction => ({
              name: restriction,
              description: `Recipe suitable for ${restriction} diets`
            }))
          }
        }
      });
    
      // Create initial active version within the same transaction
      await tx.recipeVersion.create({
        data: {
          recipeId: recipe.id,
          versionNumber: 1,
          isActive: true,
          createdById: users[Math.floor(Math.random() * users.length)].id,
          description: "Initial version"
        }
      });
    
      return recipe;
    });
  } catch (error) {
    console.error(`Error in createRecipe: ${error.message}`);
    throw error; // Re-throw to be caught by the caller
  }
}

// Create ingredients FOR SPECIFIC VERSIONS
async function createVersionedIngredient(
  recipeId: number,
  versionId: number,
  ingredientId: number
) {
  return prisma.recipeIngredient.create({
    data: {
      recipeId,
      ingredientId,
      recipeVersionId: versionId,
      quantity: faker.number.float(),
      unit: getRandomUnit()
    }
  });
}

// Fix for userId reference in updateRecipeVersion function
async function updateRecipeVersion(recipeId: number, userId: number) {
  // Deactivate old version
  await prisma.recipeVersion.updateMany({
    where: { recipeId, isActive: true },
    data: { isActive: false }
  });

  // Get next version number
  const latestVersion = await prisma.recipeVersion.findFirst({
    where: { recipeId },
    orderBy: { versionNumber: "desc" }
  });

  // Create new active version
  return prisma.recipeVersion.create({
    data: {
      recipeId,
      versionNumber: (latestVersion?.versionNumber || 0) + 1,
      isActive: true,
      createdById: userId,
      description: "Updated ingredients"
    }
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


const units = {
  volume: {
    gallon: {
      quart: 4,
      pint: 8,
      cup: 16,
      fluidOunce: 128,
      tablespoon: 256,
      teaspoon: 768,
      milliliter: 3785.41,
      liter: 3.78541,
      cubicMeter: 0.00378541,
      cubicFoot: 0.133681,
      cubicInch: 231,
    },
    quart: {
      pint: 2,
      cup: 4,
      fluidOunce: 32,
      tablespoon: 64,
      teaspoon: 192,
      milliliter: 946.353,
      liter: 0.946353,
      cubicMeter: 0.000946353,
      cubicFoot: 0.0334201,
      cubicInch: 57.75,
    },
    // Add other volume units as needed...
  },
  weight: {
    ton: {
      kilogram: 907.185,
      gram: 907185,
      milligram: 907185000,
      metricTon: 0.907185,
      pound: 2000,
      ounce: 32000,
      stone: 142.857,
    },
    kilogram: {
      gram: 1000,
      milligram: 1000000,
      metricTon: 0.001,
      pound: 2.20462,
      ounce: 35.274,
      stone: 0.157473,
    },
    // Add other weight units as needed...
  },
};

// Helper function to get a random unit
function getRandomUnit() {
  const unitTypes = Object.keys(units); // ['volume', 'weight']
  const randomUnitType = unitTypes[Math.floor(Math.random() * unitTypes.length)];
  const unitSubtypes = Object.keys(units[randomUnitType]); // e.g., ['gallon', 'quart', ...]
  const randomUnitSubtype = unitSubtypes[Math.floor(Math.random() * unitSubtypes.length)];
  return randomUnitSubtype;
}

// Helper function to generate a realistic quantity based on the unit
function getRealisticQuantity(unit: string) {
  switch (unit) {
    case 'gallon':
      return faker.number.float({ min: 1, max: 100 }); // Gallons are typically in larger quantities
    case 'quart':
      return faker.number.float({ min: 1, max: 200 });
    case 'pint':
      return faker.number.float({ min: 1, max: 400 });
    case 'cup':
      return faker.number.float({ min: 1, max: 800 });
    case 'fluidOunce':
      return faker.number.float({ min: 1, max: 1600 });
    case 'tablespoon':
      return faker.number.float({ min: 1, max: 3200 });
    case 'teaspoon':
      return faker.number.float({ min: 1, max: 9600 });
    case 'milliliter':
      return faker.number.float({ min: 1, max: 10000 });
    case 'liter':
      return faker.number.float({ min: 1, max: 100 });
    case 'kilogram':
      return faker.number.float({ min: 1, max: 100 });
    case 'gram':
      return faker.number.float({ min: 1, max: 1000 });
    case 'milligram':
      return faker.number.float({ min: 1, max: 100000 });
    case 'pound':
      return faker.number.float({ min: 1, max: 100 });
    case 'ounce':
      return faker.number.float({ min: 1, max: 1600 });
    default:
      return faker.number.float({ min: 1, max: 100 });
  }
}

// InventoryItem factory
async function createInventoryItem(inventoryId: number, ingredientId: number, userId: number) {
  const unit = getRandomUnit();
  const quantity = getRealisticQuantity(unit);
  const minQuantity = faker.number.float({ min: 0, max: quantity });
  const restockThreshold = faker.number.float({ min: minQuantity, max: quantity * 2 });
  const par = faker.number.float({ min: minQuantity, max: restockThreshold });
  const reorderPoint = faker.number.float({ min: minQuantity, max: restockThreshold });
  const maxQuantity = faker.number.float({ min: restockThreshold, max: quantity * 2 });
  const currentPrice = faker.number.float({ min: 0.1, max: 100 });
  const averageCost = faker.number.float({ min: 0.1, max: currentPrice });
  const lastPurchasePrice = faker.number.float({ min: 0.1, max: currentPrice });

  return prisma.inventoryItem.upsert({
    where: {
      inventoryId_ingredientId: {
        inventoryId,
        ingredientId
      }
    },
    update: {
      quantity,
      unit,
      minQuantity,
      restockThreshold,
      lastCountDate: faker.date.past(),
      lastOrderDate: faker.date.past(),
      lastUpdatedById: userId,
      par,
      reorderPoint,
      maxQuantity,
      location: faker.location.streetAddress(),
      barcode: faker.string.numeric(12),
      notes: faker.lorem.sentence(),
      currentPrice,
      averageCost,
      lastPurchasePrice,
    },
    create: {
      inventoryId,
      ingredientId,
      quantity,
      unit,
      minQuantity,
      restockThreshold,
      lastCountDate: faker.date.past(),
      lastOrderDate: faker.date.past(),
      lastUpdatedById: userId,
      par,
      reorderPoint,
      maxQuantity,
      location: faker.location.streetAddress(),
      barcode: faker.string.numeric(12),
      notes: faker.lorem.sentence(),
      currentPrice,
      averageCost,
      lastPurchasePrice,
    },
  });
}

// Order factory
async function createOrder(restaurantId: number, vendorId: number) {
  return prisma.order.create({
    data: {
      restaurantId,
      vendorId,
      status: getRandomEnumValue(OrderStatus),
    },
  });
}

// OrderItem factory
async function createOrderItem(orderId: number, ingredientId: number) {
  return prisma.orderItem.create({
    data: {
      orderId,
      ingredientId,
      quantity: faker.number.float({ min: 1, max: 100 }),
      unit: faker.science.unit().name,
      price: faker.number.float({ min: 0.1, max: 100 }),
    },
  });
}

// PrepBoard factory
async function createPrepBoard() {
  return prisma.prepBoard.create({
    data: {
      status: getRandomEnumValue(PrepStatus),
      name: faker.system.fileName(),
    },
  });
}

// PrepItem factory
async function createPrepItem(prepBoardId: number, recipeId: number, userId: number) {
  return prisma.prepItem.create({
    data: {
      prepBoardId,
      recipeId,
      quantity: faker.number.int({ min: 1, max: 20 }),
      status: getRandomEnumValue(PrepStatus),
      assignedToId: userId,
    },
  });
}

async function createRecipeIngredient(recipeId: number, ingredientId: number) {
  const unit = getRandomUnit()
  const quantity = faker.number.float({ min: 0.1, max: 10 });

  return prisma.recipeIngredient.upsert({
    where: {
      recipeId_ingredientId: {
        recipeId,
        ingredientId
      }
    },
    update: {
      quantity,
      unit
    },
    create: {
      recipeId,
      ingredientId,
      quantity,
      unit
    }
  })

}

// Helper function to generate realistic cooking instructions
function generateCookingInstruction(stepNumber: number) {
  const actions = [
    'Chop',
    'Slice',
    'Dice',
    'Grate',
    'Mix',
    'Whisk',
    'Stir',
    'Boil',
    'Simmer',
    'Fry',
    'Bake',
    'Grill',
    'Roast',
    'Season',
    'Marinate',
    'Knead',
    'Fold',
    'Blend',
    'Strain',
    'Garnish',
  ];
  const _ingredient = faker.food.ingredient();
  const ingredients = [
    'onions',
    'garlic',
    'tomatoes',
    'potatoes',
    'carrots',
    'bell peppers',
    'chicken',
    'beef',
    'fish',
    'pasta',
    'rice',
    'flour',
    'sugar',
    'salt',
    'pepper',
    'olive oil',
    'butter',
    'cheese',
    'herbs',
    'spices',
    _ingredient

  ];

  const action = faker.helpers.arrayElement(actions);
  const ingredient = faker.helpers.arrayElement(ingredients);
  const time = faker.number.int({ min: 1, max: 30 });
  const temperature = faker.number.int({ min: 150, max: 450 });

  switch (stepNumber) {
    case 1:
      return `Prepare the ingredients: ${action} the ${ingredient}.`;
    case 2:
      return `Heat a pan over medium heat and add ${ingredient}.`;
    case 3:
      return `Cook the ${ingredient} for ${time} minutes, stirring occasionally.`;
    case 4:
      return `Preheat the oven to ${temperature}°F (${Math.round((temperature - 32) * (5 / 9))}°C).`;
    case 5:
      return `Combine all the ingredients in a large bowl and ${action} thoroughly.`;
    case 6:
      return `Transfer the mixture to a baking dish and bake for ${time} minutes.`;
    case 7:
      return `Garnish with ${ingredient} and serve hot.`;
    default:
      return `Step ${stepNumber}: ${action} the ${ingredient} and cook for ${time} minutes.`;
  }
}

// RecipeInstruction factory
async function createRecipeInstruction(recipeId: number, stepNumber: number) {
  const instruction = generateCookingInstruction(stepNumber);
  
  // First try to get the recipe to match cuisine
  let cuisine = "food";
  try {
    const recipe = await prisma.recipe.findUnique({
      where: { id: recipeId },
      include: { cookBook: true }
    });
    
    if (recipe?.cookBook?.category) {
      cuisine = recipe.cookBook.category;
    }
  } catch (error) {
    console.log("Error fetching recipe for instruction image:", error.message);
  }
  
  // Cooking technique images by step number
  const cookingImages = {
    1: [ // Preparation step images
      "https://images.unsplash.com/photo-1542010589005-d1eacc3918f2", // Chopping
      "https://images.unsplash.com/photo-1466637574441-749b8f19452f", // Food prep
      "https://images.unsplash.com/photo-1605522561233-768ad7a8fabf"  // Ingredients prep
    ],
    2: [ // Cooking start images
      "https://images.unsplash.com/photo-1507048331197-7d4ac70811cf", // Pan cooking
      "https://images.unsplash.com/photo-1572715655206-3de2cfbe94d0", // Stove cooking
      "https://images.unsplash.com/photo-1516824680357-be81bc1d1129"  // Starting to cook
    ],
    3: [ // Middle of cooking
      "https://images.unsplash.com/photo-1604503468506-a8da13d82791", // Stirring
      "https://images.unsplash.com/photo-1526401842416-1371882d3f50", // Mixing
      "https://images.unsplash.com/photo-1501959915551-4e8d30928317"  // Cooking process
    ],
    4: [ // Oven/baking
      "https://images.unsplash.com/photo-1590274853856-f22d5ee3d228", // Oven
      "https://images.unsplash.com/photo-1544793591-5c931672edfd", // Baking
      "https://images.unsplash.com/photo-1487384090825-251241247c8b"  // Heating
    ],
    5: [ // Almost done cooking
      "https://images.unsplash.com/photo-1551218371-10a933e55c34", // Almost finished
      "https://images.unsplash.com/photo-1515516969-d4008cc6241a", // Cooking sauce
      "https://images.unsplash.com/photo-1498654896293-37aacf113fd9"  // Mid-cooking
    ],
    6: [ // Plating
      "https://images.unsplash.com/photo-1516684732162-798a0062be99", // Plating
      "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d", // Final touches
      "https://images.unsplash.com/photo-1484980972926-edee96e0960d"  // Finishing
    ],
    7: [ // Final presentation
      "https://images.unsplash.com/photo-1495521821757-a1efb6729352", // Garnishing
      "https://images.unsplash.com/photo-1485962093642-5f4386e84429", // Final dish
      "https://images.unsplash.com/photo-1564834744159-ff0ea41ba4b9"  // Presentation
    ]
  };
  
  // Generic cooking images
  const genericCookingImages = [
    "https://images.unsplash.com/photo-1495521821757-a1efb6729352", // Generic cooking
    "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327", // Food prep
    "https://images.unsplash.com/photo-1574484284002-952d92456975"  // Cooking technique
  ];
  
  // Get the right images for this step
  const stepImages = cookingImages[stepNumber] || cookingImages[1] || genericCookingImages;
  
  // Select a random image and add cache buster
  const imageUrl = faker.helpers.arrayElement(stepImages) + "?random=" + faker.string.uuid();
  
  return prisma.recipeInstruction.create({
    data: {
      recipeId,
      stepNumber,
      instruction,
      imageUrl,
    },
  });
}

// Session factory
async function createSession(userId: number) {
  return prisma.session.create({
    data: {
      userId,
      expiresAt: faker.date.future(),
      verificationCode: faker.string.nanoid(),
    },
  });
}

// Shift factory
async function createShift(userId: number) {
  const startTime = faker.date.future();
  return prisma.shift.create({
    data: {
      userId,
      startTime,
      endTime: faker.date.between({ from: startTime, to: faker.date.future({ refDate: startTime }) }),
      status: getRandomEnumValue(ShiftStatus),
    },
  });
}

// Menu factory with realistic restaurant menu names
async function createMenu(restaurantId: number) {
  // Find restaurant to match cuisine type
  const restaurant = await prisma.restaurant.findUnique({
    where: { id: restaurantId }
  });
  
  // Define realistic menu names by restaurant type
  const menuTypes = {
    "Italian": ["Lunch Menu", "Dinner Menu", "Pizza Menu", "Pasta Menu", "Wine List", "Dessert Menu", "Antipasti"],
    "Asian": ["Lunch Special", "Dinner Menu", "Sushi Menu", "Noodle Menu", "Bento Box", "Party Platters", "Chef's Specials"],
    "Mexican": ["Lunch Menu", "Dinner Menu", "Taco Menu", "Combo Plates", "Margarita List", "Kids Menu", "Family Platters"],
    "American": ["Breakfast Menu", "Lunch Menu", "Dinner Menu", "Burger Menu", "Cocktail List", "Kids Menu", "Daily Specials"],
    "Mediterranean": ["Lunch Menu", "Dinner Menu", "Meze Menu", "Seafood Menu", "Wine List", "Vegetarian Options", "Chef's Specials"],
    "Indian": ["Lunch Menu", "Dinner Menu", "Thali Menu", "Curry Selection", "Tandoori Specials", "Vegetarian Menu", "Desserts"],
    "French": ["Breakfast Menu", "Lunch Menu", "Dinner Menu", "Prix Fixe", "Wine List", "Cheese Selection", "Dessert Menu"]
  };
  
  // Default menu names if cuisine can't be determined
  const defaultMenus = ["Breakfast", "Lunch", "Dinner", "Specials", "Drinks", "Desserts", "Kids Menu"];
  
  // Try to determine cuisine type from restaurant name
  let cuisineType = "American"; // Default
  if (restaurant) {
    const restaurantName = restaurant.name.toLowerCase();
    for (const [cuisine, _] of Object.entries(menuTypes)) {
      if (restaurantName.includes(cuisine.toLowerCase())) {
        cuisineType = cuisine;
        break;
      }
    }
  }
  
  // Select menu options based on cuisine
  const menuOptions = menuTypes[cuisineType] || defaultMenus;
  
  return prisma.menu.create({
    data: {
      name: faker.helpers.arrayElement(menuOptions),
      restaurantId,
    },
  });
}

// MenuItem factory
async function createMenuItem(menuId: number, recipeId: number) {
  const price = faker.number.float({ min: 1, max: 100 });
  const name = faker.commerce.productName();
  const foodCost = faker.number.float({ min: 0.1, max: price });

  return prisma.menuItem.create({
    data: {
      menuId,
      price,
      name,
      foodCost,
    },
  });
}

// MenuItemRecipe factory
async function createMenuItemRecipe(menuItemId: number, recipeId: number) {
  return prisma.menuItemRecipe.create({
    data: {
      menuItemId,
      recipeId,
    },
  });
}

// RecipeNutrition factory
async function createRecipeNutrition(recipeId: number) {
  return prisma.recipeNutrition.create({
    data: {
      recipeId,
      servingSize: faker.number.float({ min: 1, max: 10 }),
      servingUnit: faker.science.unit().name,
      calories: faker.number.float({ min: 100, max: 1000 }),
      protein: faker.number.float({ min: 10, max: 100 }),
      carbohydrates: faker.number.float({ min: 10, max: 100 }),
      fat: faker.number.float({ min: 10, max: 100 }),
      fiber: faker.number.float({ min: 1, max: 10 }),
      sugar: faker.number.float({ min: 1, max: 10 }),
      sodium: faker.number.float({ min: 1, max: 10 }),
    },
  });
}

// RecipeCriticalPoint factory
async function createRecipeCriticalPoint(recipeId: number) {
  return prisma.recipeCriticalPoint.create({
    data: {
      recipeId,
      stepNumber: faker.number.int({ min: 1, max: 10 }),
      description: faker.lorem.sentence(),
      threshold: faker.number.float({ min: 1, max: 100 }),
      unit: faker.science.unit().name,
      action: faker.lorem.sentence(),
    },
  });
}

// RecipeStorage factory
async function createRecipeStorage(recipeId: number) {
  return prisma.recipeStorage.create({
    data: {
      recipeId,
      temperature: faker.number.float({ min: -20, max: 20 }),
      method: faker.lorem.word(),
      shelfLife: faker.number.int({ min: 1, max: 100 }),
      containerType: faker.lorem.word(),
      specialNotes: faker.lorem.sentence(),
    },
  });
}

// RecipePhoto factory
async function createRecipePhoto(recipeId: number) {
  // First get the recipe to match cuisine
  const recipe = await prisma.recipe.findUnique({
    where: { id: recipeId },
    include: { cookBook: true }
  });
  
  let cuisine = "food";
  
  // Get cuisine from recipe if available
  if (recipe?.cookBook?.category) {
    cuisine = recipe.cookBook.category;
  }
  
  // Unsplash photo collections by photo type and cuisine
  const photoCollections = {
    // Ingredient photos
    "ingredient": {
      "Italian": [
        "https://images.unsplash.com/photo-1590165882467-5db29484c047", // Italian ingredients
        "https://images.unsplash.com/photo-1628689469838-524a4a973b8e", // Pasta ingredients
        "https://images.unsplash.com/photo-1491016045788-5cee91d933e8"  // Tomatoes and herbs
      ],
      "Asian": [
        "https://images.unsplash.com/photo-1606791422814-b23882b100de", // Asian ingredients
        "https://images.unsplash.com/photo-1606710734732-78816c0df60a", // Asian spices
        "https://images.unsplash.com/photo-1583589252490-4f1ab516914c"  // Rice and veggies
      ],
      "generic": [
        "https://images.unsplash.com/photo-1606923829579-0cb981a83e2b", // Raw ingredients
        "https://images.unsplash.com/photo-1488459716781-31db52582fe9", // Vegetables
        "https://images.unsplash.com/photo-1615485500704-8e990f9900e1"  // Food prep
      ]
    },
    // Cooking process photos
    "process": {
      "Italian": [
        "https://images.unsplash.com/photo-1607877102100-4bfd0bf7ab93", // Making pasta
        "https://images.unsplash.com/photo-1554998171-89445e31c52b", // Pizza prep
        "https://images.unsplash.com/photo-1604152135912-04a022e23696"  // Italian cooking
      ],
      "Asian": [
        "https://images.unsplash.com/photo-1609501676725-7186f017a4b7", // Stir fry
        "https://images.unsplash.com/photo-1601314167099-232775b3d0b0", // Wok cooking
        "https://images.unsplash.com/photo-1626200419199-391ae4a39384"  // Asian cooking
      ],
      "generic": [
        "https://images.unsplash.com/photo-1556911073-38141963c9e0", // Cooking
        "https://images.unsplash.com/photo-1507048331197-7d4ac70811cf", // Kitchen prep
        "https://images.unsplash.com/photo-1428515613728-6b4607e44363"  // Chef cooking
      ]
    },
    // Completed dish photos
    "completed": {
      "Italian": [
        "https://images.unsplash.com/photo-1618164436241-4473940d1f9c", // Italian dish
        "https://images.unsplash.com/photo-1595295333158-4742f28fbd85", // Pasta dish
        "https://images.unsplash.com/photo-1600803734709-83f6e437ecf8"  // Pizza
      ],
      "Asian": [
        "https://images.unsplash.com/photo-1617622141676-9cbd7068c843", // Sushi
        "https://images.unsplash.com/photo-1593829111182-8a237d2bb024", // Asian dish
        "https://images.unsplash.com/photo-1541189548820-61121f7e6bd1"  // Ramen
      ],
      "generic": [
        "https://images.unsplash.com/photo-1547573854-74d2a71d0826", // Plated dish
        "https://images.unsplash.com/photo-1574484284002-952d92456975", // Gourmet plate
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c"  // Food styling
      ]
    },
    // Plating and presentation photos
    "plating": {
      "Italian": [
        "https://images.unsplash.com/photo-1551183053-bf91a1d81141", // Italian plating
        "https://images.unsplash.com/photo-1560717789-0ac7c58ac90a", // Restaurant plate
        "https://images.unsplash.com/photo-1455279032140-49a4bf46c0c1"  // Fine dining
      ],
      "Asian": [
        "https://images.unsplash.com/photo-1579684947550-22e945225d9a", // Asian presentation
        "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d", // Elegant plate
        "https://images.unsplash.com/photo-1535140728325-a4d3707eee73"  // Stylish dish
      ],
      "generic": [
        "https://images.unsplash.com/photo-1516685125522-3c528b8046ee", // Garnishing
        "https://images.unsplash.com/photo-1574484284002-952d92456975", // Plating
        "https://images.unsplash.com/photo-1515516969-d4008cc6241a"  // Food styling
      ]
    }
  };
  
  // Determine photo type
  const photoType = getRandomEnumValue(PhotoType);
  
  // Convert PhotoType enum to category string
  let category;
  switch(photoType) {
    case PhotoType.INGREDIENT:
      category = "ingredient";
      break;
    case PhotoType.PROCESS:
      category = "process";
      break;
    case PhotoType.COMPLETED:
      category = "completed";
      break;
    case PhotoType.PLATING:
      category = "plating";
      break;
    default:
      category = "completed";
  }
  
  // Get the appropriate photo collection
  const photoSet = photoCollections[category] || photoCollections["completed"];
  
  // Try to get cuisine-specific photos or fall back to generic
  const photos = photoSet[cuisine] || photoSet["generic"] || photoSet["Italian"];
  
  // Pick a random photo from the collection
  const url = faker.helpers.arrayElement(photos) + "?random=" + faker.string.uuid();
  
  return prisma.recipePhoto.create({
    data: {
      recipeId,
      url,
      type: photoType,
      stepNumber: faker.number.int({ min: 1, max: 10 }),
      description: faker.lorem.sentence(),
    },
  });
}

// RecipeTemperature factory
async function createRecipeTemperature(recipeId: number) {
  return prisma.recipeTemperature.create({
    data: {
      recipeId,
      stepNumber: faker.number.int({ min: 1, max: 10 }),
      minTemp: faker.number.float({ min: 0, max: 100 }),
      maxTemp: faker.number.float({ min: 100, max: 200 }),
      isCritical: faker.datatype.boolean(),
      holdTime: faker.number.int({ min: 1, max: 60 }),
      description: faker.lorem.sentence(),
    },
  });
}

// RecipeYield factory
async function createRecipeYield(recipeId: number) {
  return prisma.recipeYield.create({
    data: {
      recipeId,
      expectedYield: faker.number.float({ min: 1, max: 10 }),
      actualYield: faker.number.float({ min: 1, max: 10 }),
      unit: faker.science.unit().name,
      wastagePercent: faker.number.float({ min: 0, max: 10 }),
      notes: faker.lorem.sentence(),
    },
  });
}

// RecipeLaborCost factory
async function createRecipeLaborCost(recipeId: number) {
  return prisma.recipeLaborCost.create({
    data: {
      recipeId,
      prepTime: faker.number.int({ min: 10, max: 120 }),
      cookTime: faker.number.int({ min: 10, max: 120 }),
      laborRate: faker.number.float({ min: 10, max: 50 }),
      totalLaborCost: faker.number.float({ min: 10, max: 100 }),
    },
  });
}

// SalesTransactions factory
async function createSalesTransaction(restaurantId: number, menuItemId: number) {
  return prisma.salesTransactions.create({
    data: {
      restaurantId,
      menuItemId,
      price: faker.number.float({ min: 1, max: 100 }),
      total: faker.number.float({ min: 1, max: 100 }),
      transactionDate: faker.date.past(),
    },
  });
}

// MenuCategory factory
async function createMenuCategory(menuId: number) {
  return prisma.menuCategory.create({
    data: {
      name: faker.commerce.department(),
      description: faker.lorem.sentence(),
      displayOrder: faker.number.int({ min: 1, max: 10 }),
      menuId,
    },
  });
}

// RecipeVersion factory
async function createRecipeVersion(recipeId: number, createdById: number) {
  // Find the highest version number for this recipe
  const highestVersion = await prisma.recipeVersion.findFirst({
    where: { recipeId },
    orderBy: { versionNumber: 'desc' },
  });

  // Set the new version number to be one higher than the highest existing version
  // or 1 if no versions exist yet
  const newVersionNumber = highestVersion ? highestVersion.versionNumber + 1 : 1;

  return prisma.recipeVersion.create({
    data: {
      recipeId,
      versionNumber: newVersionNumber,
      description: faker.lorem.sentence(),
      changes: faker.lorem.sentence(),
      isActive: faker.datatype.boolean(),
      createdById,
    },
  });
}

// Equipment factory
async function createEquipment(restaurantId: number) {
  return prisma.equipment.create({
    data: {
      name: faker.commerce.productName(),
      description: faker.lorem.sentence(),
      model: faker.commerce.productName(),
      serialNumber: faker.string.uuid(),
      purchaseDate: faker.date.past(),
      lastMaintenance: faker.date.past(),
      nextMaintenance: faker.date.future(),
      status: getRandomEnumValue(EquipmentStatus),
      location: faker.location.streetAddress(),
      restaurantId,
    },
  });
}

// RecipeEquipment factory
async function createRecipeEquipment(recipeId: number, equipmentId: number) {
  return prisma.recipeEquipment.create({
    data: {
      recipeId,
      equipmentId,
      notes: faker.lorem.sentence(),
    },
  });
}

// MaintenanceLog factory
async function createMaintenanceLog(equipmentId: number) {
  return prisma.maintenanceLog.create({
    data: {
      equipmentId,
      date: faker.date.past(),
      type: getRandomEnumValue(MaintenanceType),
      description: faker.lorem.sentence(),
      cost: faker.number.float({ min: 10, max: 1000 }),
      performedBy: faker.person.fullName(),
      notes: faker.lorem.sentence(),
    },
  });
}

// QualityChecklist factory
async function createQualityChecklist(restaurantId: number) {
  return prisma.qualityChecklist.create({
    data: {
      name: faker.commerce.productName(),
      description: faker.lorem.sentence(),
      restaurantId,
      frequency: getRandomEnumValue(ChecklistFrequency),
      isActive: faker.datatype.boolean(),
    },
  });
}

// ChecklistItem factory
async function createChecklistItem(checklistId: number) {
  return prisma.checklistItem.create({
    data: {
      checklistId,
      description: faker.lorem.sentence(),
      order: faker.number.int({ min: 1, max: 10 }),
      type: getRandomEnumValue(ChecklistItemType),
      requiredPhotos: faker.datatype.boolean(),
    },
  });
}

// ChecklistComplete factory
async function createChecklistComplete(checklistId: number, completedById: number) {
  return prisma.checklistComplete.create({
    data: {
      checklistId,
      completedById,
      date: faker.date.past(),
      notes: faker.lorem.sentence(),
    },
  });
}


// ChecklistItemComplete factory
async function createChecklistItemComplete(checklistCompleteId: number, checklistItemId: number) {
  return prisma.checklistItemComplete.create({
    data: {
      checklistCompleteId,
      checklistItemId,
      status: getRandomEnumValue(ChecklistStatus),
      notes: faker.lorem.sentence(),
      photoUrls: [
        // Quality checklist photos from Unsplash
        faker.helpers.arrayElement([
          "https://images.unsplash.com/photo-1577401239170-897942555fb3", // Cleaning checklist
          "https://images.unsplash.com/photo-1484156818044-c040038b0719", // Health inspection
          "https://images.unsplash.com/photo-1580048915913-4f8f5cb481c4", // Kitchen checklist
          "https://images.unsplash.com/photo-1588421357574-87938a86fa28", // Food safety
          "https://images.unsplash.com/photo-1532153955177-f59af40d6472"  // Quality control
        ]) + "?random=" + faker.string.uuid()
      ],
    },
  });
}

// SupplierPriceHistory factory
async function createSupplierPriceHistory(vendorId: number, ingredientId: number) {
  return prisma.supplierPriceHistory.create({
    data: {
      vendorId,
      ingredientId,
      price: faker.number.float({ min: 1, max: 100 }),
      unit: faker.science.unit().name,
      startDate: faker.date.past(),
      endDate: faker.date.future(),
      notes: faker.lorem.sentence(),
    },
  });
}

async function createCustomerFeedback(restaurantId: number, menuItemId?: number) {
  const users = await prisma.user.findMany();
  const respondedById = users.length > 0 ? users[Math.floor(Math.random() * users.length)].id : null;

  return prisma.customerFeedback.create({
    data: {
      restaurantId,
      menuItemId,
      rating: faker.number.int({ min: 1, max: 5 }),
      comment: faker.lorem.sentence(),
      source: getRandomEnumValue(FeedbackSource),
      tags: [faker.lorem.word(), faker.lorem.word()],
      status: getRandomEnumValue(FeedbackStatus),
      responseText: faker.lorem.sentence(),
      respondedAt: faker.date.past(),
      respondedById, // Ensure this is a valid user ID or null
    },
  });
}

// DietaryRestriction factory
async function createDietaryRestriction() {
  return prisma.dietaryRestriction.create({
    data: {
      name: faker.lorem.word(),
      description: faker.lorem.sentence(),
      icon: faker.helpers.arrayElement([
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c", // Vegan food
        "https://images.unsplash.com/photo-1623428187969-5da2dcea5eea", // Healthy options
        "https://images.unsplash.com/photo-1608500219063-e5086c8c4c6e", // Gluten free
        "https://images.unsplash.com/photo-1563636619-e9143da7973b", // Vegetarian
        "https://images.unsplash.com/photo-1603046891744-9afb2b0c192f"  // Organic
      ]) + "?random=" + faker.string.uuid(),
    },
  });
}

// Allergen factory
async function createAllergen() {
  return prisma.allergen.create({
    data: {
      name: faker.lorem.word(),
      description: faker.lorem.sentence(),
    },
  });
}

// IngredientAllergen factory
async function createIngredientAllergen(ingredientId: number, allergenId: number) {
  return prisma.ingredientAllergen.create({
    data: {
      ingredientId,
      allergenId,
    },
  });
}

// NutritionalRecommendation factory
async function createNutritionalRecommendation(menuItemId: number) {
  return prisma.nutritionalRecommendation.create({
    data: {
      menuItemId,
      recommendation: faker.lorem.sentence(),
    },
  });
}

// LeftoverItem factory
async function createLeftoverItem(restaurantId: number, menuItemId: number, recordedById: number) {
  return prisma.leftoverItem.create({
    data: {
      restaurantId,
      menuItemId,
      date: faker.date.past(),
      quantity: faker.number.int({ min: 1, max: 10 }),
      reason: faker.lorem.sentence(),
      recordedById,
    },
  });
}

// WasteRecord factory
async function createWasteRecord(restaurantId: number, ingredientId: number, recordedById: number) {
  return prisma.wasteRecord.create({
    data: {
      restaurantId,
      ingredientId,
      date: faker.date.past(),
      quantity: faker.number.float({ min: 1, max: 10 }),
      unit: faker.science.unit().name,
      reason: faker.lorem.sentence(),
      recordedById,
    },
  });
}

// ProductionPlan factory
async function createProductionPlan(restaurantId: number, createdById: number) {
  return prisma.productionPlan.create({
    data: {
      restaurantId,
      date: faker.date.future(),
      createdById,
    },
  });
}

// ProductionPlanItem factory
async function createProductionPlanItem(productionPlanId: number, recipeId: number, assignedToId?: number) {
  return prisma.productionPlanItem.create({
    data: {
      productionPlanId,
      recipeId,
      quantity: faker.number.int({ min: 1, max: 10 }),
      unit: faker.science.unit().name,
      assignedToId,
    },
  });
}

// ShiftTask factory
async function createShiftTask(shiftId: number) {
  const startTime = faker.date.past();
  return prisma.shiftTask.create({
    data: {
      shiftId,
      taskType: getRandomEnumValue(TaskType),
      startTime,
      endTime: faker.date.between({ from: startTime, to: faker.date.future({ refDate: startTime }) }),
      duration: faker.number.int({ min: 10, max: 120 }),
      notes: faker.lorem.sentence(),
    },
  });
}

// Availability factory
async function createAvailability(userId: number) {
  return prisma.availability.create({
    data: {
      userId,
      dayOfWeek: getRandomEnumValue(DayOfWeek),
      startTime: faker.date.past(),
      endTime: faker.date.future(),
    },
  });
}

// SchedulingConstraint factory
async function createSchedulingConstraint(userId: number) {
  return prisma.schedulingConstraint.create({
    data: {
      userId,
      date: faker.date.future(),
      constraintsType: getRandomEnumValue(ConstraintType),
      startTime: faker.date.past(),
      endTime: faker.date.future(),
      notes: faker.lorem.sentence(),
    },
  });
}

// InventoryWithdrawal factory
async function createInventoryWithdrawal(inventoryItemId: number, createdById: number, recipeId?: number) {
  return prisma.inventoryWithdrawal.create({
    data: {
      inventoryItemId,
      dateTime: faker.date.past(),
      quantity: faker.number.float({ min: 1, max: 10 }),
      unit: faker.science.unit().name,
      recipeId,
      createdById,
    },
  });
}

// NutritionalInfo factory
async function createNutritionalInfo(menuItemId: number) {
  return prisma.nutritionalInfo.create({
    data: {
      menuItemId,
      calories: faker.number.float({ min: 100, max: 1000 }),
      fat: faker.number.float({ min: 10, max: 100 }),
      saturatedFat: faker.number.float({ min: 1, max: 10 }),
      transFat: faker.number.float({ min: 0, max: 5 }),
      cholesterol: faker.number.float({ min: 0, max: 100 }),
      sodium: faker.number.float({ min: 0, max: 1000 }),
      carbohydrates: faker.number.float({ min: 10, max: 100 }),
      fiber: faker.number.float({ min: 1, max: 10 }),
      sugar: faker.number.float({ min: 1, max: 10 }),
      protein: faker.number.float({ min: 10, max: 100 }),
    },
  });
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
    return tables
  } catch (error) {
    console.log('Error during cleanup:', { error });
  }
}

// Main seeding function
async function main() {
  try {
    // Cleanup database with better error handling
    console.log("Starting database cleanup...");
    await cleanupDatabase();

    // Additional explicit cleanup for tables with potential constraint issues
    console.log("Performing targeted cleanup of recipe-related tables...");
    try {
      // Order matters - clean up child tables first to avoid foreign key constraint errors
      await prisma.recipeIngredient.deleteMany({});
      await prisma.recipeInstruction.deleteMany({});
      await prisma.recipeVersion.deleteMany({});
      await prisma.recipeEquipment.deleteMany({});
      await prisma.recipeTag.deleteMany({});
      await prisma.dietaryRestriction.deleteMany({});
      
      // Now it's safe to delete recipes
      await prisma.recipe.deleteMany({});
      console.log("Recipe tables cleaned successfully");
    } catch (error) {
      console.error("Error during recipe table cleanup:", error.message);
      // Continue with the script despite errors - the general cleanup might have worked
    }

    console.log("Database cleanup completed");
    
    // Verify cleanup
    try {
      const tableCount = await prisma.$queryRaw`
        SELECT COUNT(*) as count FROM (
          SELECT COUNT(*) FROM pg_tables 
          WHERE schemaname='public' 
          AND tablename != '_prisma_migrations'
        ) as tables;
      `;
      console.log('Database tables count:', tableCount);
    } catch (error) {
      console.error("Error verifying cleanup:", error.message);
    }
    
    // Add a delay to ensure database is ready
    console.log("Waiting for database to be ready...");
    await new Promise(resolve => setTimeout(resolve, 3000));
    console.log("Creating themed restaurant groups...");
  
  // Create multiple themed restaurant organizations
  const organizations = await Promise.all([
    // Italian restaurant group
    createOrganization(), // This will automatically pick a theme based on the restaurants
    createOrganization(), // Another restaurant group with a different theme
    createOrganization()  // A third restaurant group
  ]);
  
  console.log(`Created ${organizations.length} restaurant organizations`);

  // Create restaurants for each organization
  const restaurantsByOrg = await Promise.all(
    organizations.map(async (org) => {
      // Create 2-3 restaurants per organization
      const count = faker.number.int({ min: 2, max: 3 });
      return Promise.all(
        Array.from({ length: count }, () => createRestaurant(org.id))
      );
    })
  );
  
  // Flatten the array of restaurants
  const restaurants = restaurantsByOrg.flat();
  
  console.log(`Created ${restaurants.length} restaurants across ${organizations.length} organizations`);

  // Create users for each restaurant with appropriate roles
  const usersPromises = [];
  
  // Create users for each restaurant 
  for (const restaurant of restaurants) {
    // Add an admin (owner/manager)
    usersPromises.push(createUser(restaurant.id, UserRole.ADMIN));
    
    // Add a manager
    usersPromises.push(createUser(restaurant.id, UserRole.MANAGER));
    
    // Add 1-2 chefs
    const chefCount = faker.number.int({ min: 1, max: 2 });
    for (let i = 0; i < chefCount; i++) {
      usersPromises.push(createUser(restaurant.id, UserRole.CHEF));
    }
    
    // Add 2-5 staff members
    const staffCount = faker.number.int({ min: 2, max: 5 });
    for (let i = 0; i < staffCount; i++) {
      usersPromises.push(createUser(restaurant.id, UserRole.STAFF));
    }
  }
  
  // Create a user with their own organization and restaurants (test user)
  usersPromises.push(
    createUser(undefined, UserRole.ADMIN, {
      isOrganization: true,
      organizationData: {
        name: 'Test Kitchen Ventures',
        imageUrl: "https://images.unsplash.com/photo-1581873372796-635b67ca2008?random=" + faker.string.uuid()
      },
      restaurantsData: [
        {
          name: 'Culinary Academy Test Kitchen',
          imageUrl: "https://images.unsplash.com/photo-1556911220-bda9f7f6ec20?random=" + faker.string.uuid(),
          address: '123 Test Street',
          city: 'San Francisco',
          zipCode: '94105',
          state: 'CA',
          owner: 'Test Admin'
        },
        {
          name: 'Recipe Development Lab',
          imageUrl: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?random=" + faker.string.uuid(),
          address: '456 Development Ave',
          city: 'New York',
          zipCode: '10001',
          state: 'NY',
          owner: 'Test Admin'
        }
      ]
    })
  );
  
  // Wait for all users to be created
  const users = await Promise.all(usersPromises);
  
  console.log(`Created ${users.length} users across all restaurants`);

  // Create vendors - one for each vendor type to ensure diverse ingredient coverage
  console.log("Creating food vendors...");
  // Instead of arbitrary number, create one vendor per vendor type
  const vendors = await Promise.all(
    vendorTypes.map(async (_, index) => {
      // Add a small delay between vendor creations to ensure uniqueness
      await new Promise(resolve => setTimeout(resolve, 10 * index));
      return createVendor();
    })
  );
  console.log(`Created ${vendors.length} specialized food vendors`);

  // Create ingredients
  const ingredients = await Promise.all(
    vendors.flatMap(vendor =>
      Array.from({ length: 10 }, () => createIngredient(vendor.id))
    )
  );

  // Create more themed cookbooks
  console.log("Creating themed cookbooks...");
  const cookBooks = await Promise.all(Array.from({ length: 8 }, createCookBook));
  console.log(`Created ${cookBooks.length} cookbooks`);

  // Create recipes with better distribution
  console.log("Creating recipes for each restaurant...");
  
  // Create recipes directly one by one instead of using promises to avoid race conditions
  const recipes = [];
  let totalRecipesToCreate = 0;
  
  // First, count how many recipes we'll need to create
  for (const restaurant of restaurants) {
    // Select 2-3 random cookbooks for this restaurant
    const restaurantCookbooks = faker.helpers.arrayElements(
      cookBooks, 
      faker.number.int({ min: 2, max: 3 })
    );
    
    // For each cookbook, we'll create 1-2 recipes
    for (const cookbook of restaurantCookbooks) {
      const recipeCount = faker.number.int({ min: 1, max: 2 });
      totalRecipesToCreate += recipeCount;
    }
  }
  
  console.log(`Planning to create ${totalRecipesToCreate} recipes sequentially to ensure uniqueness...`);
  let recipeCount = 0;
  
  // Now create recipes one at a time
  for (const restaurant of restaurants) {
    // Select 2-3 random cookbooks for this restaurant
    const restaurantCookbooks = faker.helpers.arrayElements(
      cookBooks, 
      faker.number.int({ min: 2, max: 3 })
    );
    
    // For each cookbook, create 1-2 recipes
    for (const cookbook of restaurantCookbooks) {
      const recipesToCreate = faker.number.int({ min: 1, max: 2 });
      
      for (let i = 0; i < recipesToCreate; i++) {
        try {
          // Create recipes one by one with significant delays to ensure unique timestamps
          await new Promise(resolve => setTimeout(resolve, 100));
          const recipe = await createRecipe(restaurant.id, cookbook.id);
          recipes.push(recipe);
          recipeCount++;
          
          // Log progress periodically
          if (recipeCount % 5 === 0 || recipeCount === totalRecipesToCreate) {
            console.log(`Created ${recipeCount}/${totalRecipesToCreate} recipes`);
          }
        } catch (error) {
          console.error(`Error creating recipe (${recipeCount+1}/${totalRecipesToCreate}): ${error.message}`);
        }
      }
    }
  }
  console.log(`Created ${recipes.length} recipes`);

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

  // Create multiple menus per restaurant (3-5 menus per restaurant)
  console.log("Creating restaurant menus...");
  const menus = [];
  for (const restaurant of restaurants) {
    // Create 3-5 menus per restaurant
    const menuCount = faker.number.int({ min: 3, max: 5 });
    const restaurantMenus = await Promise.all(
      Array.from({ length: menuCount }, () => createMenu(restaurant.id))
    );
    menus.push(...restaurantMenus);
  }
  console.log(`Created ${menus.length} menus for ${restaurants.length} restaurants`);

  // Create menu items with recipes based on cuisine type
  console.log("Creating menu items and linking to recipes...");
  for (const menu of menus) {
    if (menu) {
      // Get restaurant to determine cuisine
      const restaurant = await prisma.restaurant.findUnique({
        where: { id: menu.restaurantId }
      });
      
      // Find recipes with matching cookbook cuisine if possible
      let matchingRecipes = recipes;
      if (restaurant) {
        // Try to infer cuisine from restaurant name
        const restaurantName = restaurant.name.toLowerCase();
        const cuisineTypes = ["Italian", "Asian", "Mexican", "American", "Mediterranean", "Indian", "French"];
        
        for (const cuisine of cuisineTypes) {
          if (restaurantName.includes(cuisine.toLowerCase())) {
            // Find cookbooks with matching cuisine
            const matchingCookbooks = await prisma.cookBook.findMany({
              where: { 
                category: { 
                  contains: cuisine,
                  mode: 'insensitive'
                } 
              }
            });
            
            if (matchingCookbooks.length > 0) {
              // Find recipes from these cookbooks
              const cookbookIds = matchingCookbooks.map(cb => cb.id);
              matchingRecipes = await prisma.recipe.findMany({
                where: { cookBookId: { in: cookbookIds } }
              });
              
              // If we found matching recipes, use them; otherwise fall back to all recipes
              if (matchingRecipes.length === 0) {
                matchingRecipes = recipes;
              }
              break;
            }
          }
        }
      }
      
      // Create 5-10 menu items per menu
      const menuItemCount = faker.number.int({ min: 5, max: 10 });
      const menuItems = await Promise.all(
        Array.from({ length: menuItemCount }, () => {
          // Select a random recipe from matching recipes
          const recipe = faker.helpers.arrayElement(matchingRecipes);
          return createMenuItem(menu.id, recipe.id);
        })
      );
      
      // Create direct links between menu items and recipes
      await Promise.all(
        menuItems.map(menuItem => {
          // Link to 1-3 recipes for each menu item
          const recipeCount = faker.number.int({ min: 1, max: 3 });
          return Promise.all(
            Array.from({ length: recipeCount }, () => {
              const recipe = faker.helpers.arrayElement(matchingRecipes);
              return createMenuItemRecipe(menuItem.id, recipe.id);
            })
          );
        })
      );
    } else {
      console.error('Failed to create menu items: menu is null');
    }
  }

  // Menu item recipes already created above in the menu creation loop

  // Create RecipeNutrition
  await Promise.all(
    recipes.map(recipe => createRecipeNutrition(recipe.id))
  );

  // Create RecipeCriticalPoint
  await Promise.all(
    recipes.map(recipe => createRecipeCriticalPoint(recipe.id))
  );

  // Create RecipeStorage
  await Promise.all(
    recipes.map(recipe => createRecipeStorage(recipe.id))
  );

  // Create RecipePhoto
  await Promise.all(
    recipes.map(recipe => createRecipePhoto(recipe.id))
  );

  // Create RecipeTemperature
  await Promise.all(
    recipes.map(recipe => createRecipeTemperature(recipe.id))
  );

  // Create RecipeYield
  await Promise.all(
    recipes.map(recipe => createRecipeYield(recipe.id))
  );

  // Create RecipeLaborCost
  await Promise.all(
    recipes.map(recipe => createRecipeLaborCost(recipe.id))
  );

  // Create SalesTransactions
  const allMenuItems = await prisma.menuItem.findMany();
  await Promise.all(
    restaurants.flatMap(restaurant =>
      allMenuItems.slice(0, 5).map(menuItem =>
        createSalesTransaction(restaurant.id, menuItem.id)
      )
    )
  );

  // Create MenuCategory
  await Promise.all(
    menus.map(menu => createMenuCategory(menu.id))
  );

  // Create RecipeVersion
  await Promise.all(
    recipes.map(recipe =>
      createRecipeVersion(recipe.id, users[Math.floor(Math.random() * users.length)].id)
    )
  );

  // Create Equipment
  await Promise.all(
    restaurants.map(restaurant => createEquipment(restaurant.id))
  );

  // Create RecipeEquipment
  const equipments = await prisma.equipment.findMany();
  await Promise.all(
    recipes.map(recipe =>
      createRecipeEquipment(recipe.id, equipments[Math.floor(Math.random() * equipments.length)].id)
    )
  );

  // Create MaintenanceLog
  await Promise.all(
    equipments.map(equipment => createMaintenanceLog(equipment.id))
  );

  // Create QualityChecklist
  await Promise.all(
    restaurants.map(restaurant => createQualityChecklist(restaurant.id))
  );

  // Create ChecklistItem
  const qualityChecklists = await prisma.qualityChecklist.findMany();
  await Promise.all(
    qualityChecklists.map(checklist => createChecklistItem(checklist.id))
  );

  // Create ChecklistComplete
  await Promise.all(
    qualityChecklists.map(checklist =>
      createChecklistComplete(checklist.id, users[Math.floor(Math.random() * users.length)].id)
    )
  );

  // Create ChecklistItemComplete
  const checklistCompletes = await prisma.checklistComplete.findMany();
  const checklistItems = await prisma.checklistItem.findMany();
  await Promise.all(
    checklistCompletes.map(complete =>
      createChecklistItemComplete(complete.id, checklistItems[Math.floor(Math.random() * checklistItems.length)].id)
    )
  );

  // Create SupplierPriceHistory
  await Promise.all(
    vendors.flatMap(vendor =>
      ingredients.slice(0, 5).map(ingredient =>
        createSupplierPriceHistory(vendor.id, ingredient.id)
      )
    )
  );

  // Create CustomerFeedback
  await Promise.all(
    restaurants.flatMap(restaurant =>
      menuItems.slice(0, 5).map(menuItem =>
        createCustomerFeedback(restaurant.id, menuItem.id)
      )
    )
  );

  // Create DietaryRestriction
  await Promise.all(
    Array.from({ length: 5 }, createDietaryRestriction)
  );

  // Create Allergen
  await Promise.all(
    Array.from({ length: 5 }, createAllergen)
  );

  // Create IngredientAllergen
  const allergens = await prisma.allergen.findMany();
  await Promise.all(
    ingredients.slice(0, 10).map(ingredient =>
      createIngredientAllergen(ingredient.id, allergens[Math.floor(Math.random() * allergens.length)].id)
    )
  );

  // Create NutritionalRecommendation
  await Promise.all(
    allMenuItems.slice(0, 10).map(menuItem =>
      createNutritionalRecommendation(menuItem.id)
    )
  );

  // Create LeftoverItem
  await Promise.all(
    restaurants.flatMap(restaurant =>
      allMenuItems.slice(0, 5).map(menuItem =>
        createLeftoverItem(restaurant.id, menuItem.id, users[Math.floor(Math.random() * users.length)].id)
      )
    )
  );

  // Create WasteRecord
  await Promise.all(
    restaurants.flatMap(restaurant =>
      ingredients.slice(0, 5).map(ingredient =>
        createWasteRecord(restaurant.id, ingredient.id, users[Math.floor(Math.random() * users.length)].id)
      )
    )
  );

  // Create ProductionPlan
  await Promise.all(
    restaurants.map(restaurant =>
      createProductionPlan(restaurant.id, users[Math.floor(Math.random() * users.length)].id)
    )
  );

  // Create ProductionPlanItem
  const productionPlans = await prisma.productionPlan.findMany();
  await Promise.all(
    productionPlans.map(productionPlan =>
      createProductionPlanItem(
        productionPlan.id,
        recipes[Math.floor(Math.random() * recipes.length)].id,
        users[Math.floor(Math.random() * users.length)].id
      )
    )
  );

  // Create ShiftTask
  const shifts = await prisma.shift.findMany();
  await Promise.all(
    shifts.map(shift => createShiftTask(shift.id))
  );

  // Create Availability
  await Promise.all(
    users.map(user => createAvailability(user.id))
  );

  // Create SchedulingConstraint
  await Promise.all(
    users.map(user => createSchedulingConstraint(user.id))
  );

  // Create InventoryWithdrawal
  const inventoryItems = await prisma.inventoryItem.findMany();
  await Promise.all(
    inventoryItems.slice(0, 10).map(inventoryItem =>
      createInventoryWithdrawal(
        inventoryItem.id,
        users[Math.floor(Math.random() * users.length)].id,
        recipes[Math.floor(Math.random() * recipes.length)].id
      )
    )
  );

  // Create NutritionalInfo
  await Promise.all(
    allMenuItems.slice(0, 10).map(menuItem =>
      createNutritionalInfo(menuItem.id)
    )
  );

    // Log success at the end
    console.log('Seed data created successfully!');
  } catch (e) {
    console.error('Error in main function:', e);
    // Don't exit immediately, let's try to disconnect Prisma properly
    process.exitCode = 1;
  } finally {
    // Always try to disconnect Prisma client
    console.log('Disconnecting from the database...');
    try {
      await prisma.$disconnect();
      console.log('Prisma client disconnected successfully');
    } catch (disconnectError) {
      console.error('Error disconnecting Prisma client:', disconnectError);
    }
  }
}

// Execute main function with proper error handling
main().then(() => {
  if (process.exitCode === 1) {
    console.log('Seed completed with errors');
  } else {
    console.log('Seed completed successfully');
  }
});

