const Sequelize = require("sequelize");
const conn = new Sequelize(
  process.env.DATABASE_URL || "postgres://localhost/acme_categories_test",
  { logging: false }
);

const Category = conn.define("category", {
  name: Sequelize.STRING
});

const Product = conn.define("product", {
  name: Sequelize.STRING
});

Product.belongsTo(Category);

const syncSeed = () => {
  return conn.sync({ force: true }).then(async () => {
    const products = [
      { name: "Shoe" },
      { name: "Ball" },
      { name: "Trampoline" }
    ];
    const [shoe, ball, trampoline] = await Promise.all(
      products.map(prod => Product.create(prod))
    );
    const [outdoor, footWear] = await Promise.all([
      Category.create({ name: "Outdoor" }),
      Category.create({ name: "Foot Wear" })
    ]);
    return Promise.all([
      shoe.setCategory(footWear),
      trampoline.setCategory(outdoor),
      ball.setCategory(outdoor)
    ]);
  });
};

module.exports = {
  syncSeed,
  models: {
    Category,
    Product
  }
};
