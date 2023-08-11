const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  const allTags = await Tag.findAll({
  // be sure to include its associated Product data
    include: [{ model: Product, through: ProductTag }]
  }).catch((err) => {
    res.json(err);
  });
  res.json(allTags)
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  try {
    const singleTag = await Tag.findByPk(req.params.id, {
  // be sure to include its associated Product data
      include: [{ model: Product, through: ProductTag }]
    })
    if (!singleTag) {
      res.status(404).json({ message: `No tag was found with that ID` })
    }
    res.status(200).json(singleTag);
  } catch {
    res.status(500).json(err)
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create(req.body);
    res.status(200).json(newTag);
  } catch {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updateTag = await Tag.update(req.body, { where: { id: req.params.id } });
    res.status(200).json({ message: `${updateTag} tag updated!` });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({ where: { id: req.params.id } })
    .then(tags => res.json({ message: `${tags} tag deleted` }))
    .catch(err => {
      res.status(400).json(err);
    })
});

module.exports = router;
