const router = require("express").Router();

const { Category, Product } = require("../../models");

const productAttributes = [
  "id",
  "product_name",
  "price",
  "stock",
  "category_id",
];

router.get("/", async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: [
        {
          model: Product,
          attributes: productAttributes,
        },
      ],
    });

    res.status(200).json(categories);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "Failed to GET categories" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, {
      include: [
        {
          model: Product,
          attributes: productAttributes,
        },
      ],
    });

    res.status(200).json(category);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "Failed to GET category" });
  }
});

router.post("/", async (req, res) => {
  try {
    const category = await Category.create(req.body);

    res.status(200).json(category);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "Failed to POST category" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const category = await Category.update(req.body, {
      where: { id: req.params.id },
    });

    res.status(200).json(category);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "Failed to PUT category" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const category = await Category.destroy({
      where: { id: req.params.id },
    });
    res.status(200).json(category);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "Failed to DELETE category" });
  }
});

module.exports = router;
