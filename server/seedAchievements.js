const AchievementSpec = require("./models/achievementSpecModel");
const utils = require("./test/utils");

const app = require("./app");

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
    description: "This is a nice amount of categories to have",
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
      title: (num + " categories"),
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

  await AchievementSpec.create(firstPayment);
  await AchievementSpec.create(wysi);
  await AchievementSpec.create(impossible);

  for (let i = 1; i < 11; i++) {
    const num = i*10;

    const noAchievement = {
      title: (num + " payments"),
      description: ("Reach " + num + " payments"),
      exp: num,
      requirements: {
        noPayments: {
          target: num
        }
      }
    };

    const largestPayment = {
      title: (num + " spent"),
      description: ("spend " + num + "  in one go"),
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

async function seed() {
  await createCategoryAchievements();
  await createPaymentAchievements();
  process.exit();
}

seed();