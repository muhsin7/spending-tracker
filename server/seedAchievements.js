const AchievementSpec = require("./models/achievementSpecModel");
const Achievement = require("./models/achievementModel");
const User = require("./models/userModel");

const {detectCategoryAchievements} = require("./util/categoryAchievementDetection");
const {detectPaymentAchievements} = require("./util/paymentAchievementDetection");

const app = require("./app");

const noCategoriesMap = new Map([
  [5, "High Fidelity"],
  [10, "10 Things I Hate About You"],
  [15, "Fifteen Minutes"],
  [20, "20 Feet from Stardom"],
  [25, "25th Hour"]
]);


const noPaymentMap = new Map([
  [10, "Rishi's den"],
  [20, "One score"],
  [30, "Flirty thirty"],
  [40, "Life begins at"],
  [50, "Bulls eye"],
  [60, "Five dozen"],
  [70, "Three score and ten"],
  [80, "Gandhi's breakfast"],
  [90, "Top of the shop"],
  [100, "Ton"],
  [110, "Legs eleven"],
  [120, "Baker's dozen"],
  [130, "Time to dance"],
  [140, "Forty winks"],
  [150, "Grandma's house"],
  [160, "Sweet sixteen"],
  [170, "Lucky for some"],
  [180, "The price is right"],
  [190, "Queen bee"],
  [200, "Two centuries"]
]);

const largestPaymentMap = new Map([
  [10, "Perfect 10"],
  [20, "Twice as nice"],
  [30, "Dirty 30"],
  [40, "Over the hill"],
  [50, "Golden age"],
  [60, "Senior citizen"],
  [70, "Lucky 7-0"],
  [80, "Octogenarian"],
  [90, "Nine lives"],
  [100, "Century"],
  [110, "Top gear"],
  [120, "Dozen dozen"],
  [130, "Unlucky for some"],
  [140, "Forty love"],
  [150, "Halfway there"],
  [160, "Antoninus Pius"],
  [170, "Score and ten"],
  [180, "Adulthood"],
  [190, "Nineteen forever"],
  [200, "Double century"]
]);


/**
 * Create category achievements in DB
 */
async function createCategoryAchievements() {
  const firstCategory = {
    title: "Your first category",
    description: "It starts here",
    exp: 20,
    requirements: {
      noCategories: {
        target: 1
      }
    }
  };

  const miscAchievement = {
    title: "Nice",
    description: "Nice",
    exp: 1000,
    requirements: {
      noCategories: {
        target: 69
      }
    }
  };

  await AchievementSpec.create(firstCategory);
  await AchievementSpec.create(miscAchievement);

  for (let i = 1; i < 6; i++) {
    const num = i*5;

    const spec = {
      title: (noCategoriesMap.get(num)),
      description: ("Create " + num + " categories"),
      exp: 2*num,
      requirements: {
        noCategories: {
          target: num
        }
      }
    };
    await AchievementSpec.create(spec);
  }
}

/**
 * Create payment achievements in DB
 */
async function createPaymentAchievements() {
  const firstPayment = {
    title: "Your first payment",
    description: "Create your first payment",
    exp: 20,
    requirements: {
      noPayments: {
        target: 1
      }
    }
  };

  const wysi = {
    title: "WYSI",
    description: "You've probably seen this number everywhere",
    exp: 727,
    requirements: {
      noPayments: {
        target: 727
      }
    }
  };

  const impossible = {
    title: "A million?",
    description: "How much money have you spent?",
    exp: 10000,
    requirements: {
      noPayments: {
        target: 1000000
      }
    }
  };

  const dalmations = {
    title: "Dalmations",
    description: "Spend £101",
    exp: 101,
    requirements: {
      largestPayment: {
        target: 101
      }
    }
  };

  const magic = {
    title: "Magic",
    description: "♩ Magic, 105.4 ♩",
    exp: 100,
    requirements: {
      largestPayment: {
        target: 105.4
      }
    }
  };

  await AchievementSpec.create(firstPayment);
  await AchievementSpec.create(wysi);
  await AchievementSpec.create(impossible);
  await AchievementSpec.create(dalmations);
  await AchievementSpec.create(magic);

  for (let i = 1; i < 21; i++) {
    const num = i*10;

    const noAchievement = {
      title: (noPaymentMap.get(num)),
      description: ("Reach " + num + " payments"),
      exp: num,
      requirements: {
        noPayments: {
          target: num
        }
      }
    };

    const largestPayment = {
      title: (largestPaymentMap.get(num)),
      description: ("Spend £" + num + "  at once"),
      exp: num,
      requirements: {
        largestPayment: {
          target: num
        }
      }
    };
    await AchievementSpec.create(noAchievement);
    await AchievementSpec.create(largestPayment);
  }
}

/**
 * Add unlocked achievements to existing users
 */
async function detectAchievements() {
  const users = await User.find({});

  for (let i = 0; i < users.length; i++) {
    const mockReq = {
      user: {
        id: users[i]._id
      }
    };

    await detectCategoryAchievements(mockReq);
    await detectPaymentAchievements(mockReq);
  }
}

async function seed() {
  await AchievementSpec.deleteMany({});
  await Achievement.deleteMany({});
  await User.updateMany({}, {$set: {exp: 0}});

  await createCategoryAchievements();
  await createPaymentAchievements();
  await detectAchievements();
  process.exit();
}

seed();