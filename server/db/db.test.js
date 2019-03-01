const db = require("./index");
const { Category, Product } = db.models;

describe("db", () => {
  test("it exists", () => {
    expect(db).toBeTruthy;
  });
  test("has a method syncSeed", () => {
    expect(typeof db.syncSeed).toBe("function");
  });
});

describe("Data Layer", () => {
  beforeEach(async () => {
    await db.syncSeed();
  });
  describe("Category model", () => {
    test("it exists", () => {
      expect(Category).toBeTruthy;
    });
    test("it has a name attribute", () => {
      return Category.create({ name: "outdoor" }).then(cat =>
        expect(cat.name).toBe("outdoor")
      );
    });
  });
  describe("Product model", () => {
    test("it exists", () => {
      expect(Product).toBeTruthy;
    });
    test("it has a name attribute", () => {
      return Product.create({ name: "Shoe" }).then(prod =>
        expect(prod.name).toBe("Shoe")
      );
    });
    test("products belong to categories", async () => {
      const shoe = await Product.create({ name: "Shoe" });
      const footWear = await Category.create({ name: "Foot Wear" });
      shoe.setCategory(footWear);
      expect(shoe.categoryId).toBeTruthy();
    });
  });
});
