const router = require("express").Router();

const { Tag, Product } = require("../../models");

const productAttributes = [
  "id",
  "product_name",
  "price",
  "stock",
  "category_id",
];

router.get("/", async (req, res) => {
  try {
    const tags = await Tag.findAll({
      include: [
        {
          model: Product,
          attributes: productAttributes,
        },
      ],
    });

    res.status(200).json(tags);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "Failed to GET tags" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.id, {
      include: [
        {
          model: Product,
          attributes: productAttributes,
        },
      ],
    });

    res.status(200).json(tag);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "Failed to GET tag" });
  }
});

router.post("/", async (req, res) => {
  try {
    const tag = await Tag.create(req.body);

    res.status(200).json(tag);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "Failed to POST tag" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updateTag = await Tag.update(req.body, {
      where: { id: req.params.id },
    });

    res.status(200).json(updateTag);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "Failed to PUT tag" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const tag = await Tag.destroy({
      where: { id: req.params.id },
    });

    res.status(200).json(tag);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "Failed to DELETE tag" });
  }
});

module.exports = router;
