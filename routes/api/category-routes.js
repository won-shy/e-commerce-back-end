const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try {
    const categoriesData = await Category.findAll({
  // be sure to include its associated Products
      include: [{ model: Product }]
    })
    res.json(categoriesData);
  } catch (err) {
    console.log(err)
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try {
    const categoryData = await Category.findByPk(req.params.id, {
  // be sure to include its associated Products
      include: [{ model: Product }]
    })
    if (!categoryData) {
      res.status(404).json({ message: `No category found with that ID` })
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err)
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updateCategory = await Category.update(req.body, { where: { id: req.params.id } });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({ where: { id: req.params.id } })
    .then(categories => res.json({ message: `${categories} category deleted` }))
    .catch(err => {
      res.status(400).json(err);
    })
});

module.exports = router;
