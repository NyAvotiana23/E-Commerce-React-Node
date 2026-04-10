import { Router } from "express";

const router = Router();

const staticProductData = [
  {
    id: 1,
    name: "Kit Pour Chien",
    category: "Food",
    animal: "Dog",
    price: 560,
  },
  {
    id: 2,
    name: "Medicament",
    category: "Vitamins",
    animal: "Cat",
    price: 2200,
  },
  {
    id: 3,
    name: "Kit Pour Chien",
    category: "Feed",
    animal: "Horse",
    price: 2600,
  },
];

router.get("/", (req, res) => {
  res.json({
    status: "ok",
    data: staticProductData,
    timestamp: new Date().toISOString(),
  });
});

router.post("/", (req, res) => {
  const { name, category, animal, price } = req.body; // 👈 body is already parsed

  // Basic validation
  if (!name || !category || !animal || price == null) {
    return res.status(400).json({
      status: "error",
      message: "Champs manquants : name, category, animal, price requis",
    });
  }

  const newProduct = {
    id: staticProductData.length + 1, // 👈 auto-generate id
    name,
    category,
    animal,
    price: Number(price),
  };

  staticProductData.push(newProduct);

  res.status(201).json({
    status: "ok",
    message: "Produit ajouté avec succès",
    data: newProduct, // 👈 return the created product
    timestamp: new Date().toISOString(),
  });
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const product = staticProductData.find((p) => p.id === id);

  if (product) {
    res.json({
      status: "ok",
      data: product,
      timestamp: new Date().toISOString(),
    });
  } else {
    res.status(404).json({
      status: "not found",
      message: `Produit non trouvé avec l'id : ${id}`,
      timestamp: new Date().toISOString(),
    });
  }
});

// 👇 DELETE route
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = staticProductData.findIndex((p) => p.id === id);

  if (index === -1) {
    return res.status(404).json({
      status: "not found",
      message: `Produit non trouvé avec l'id : ${id}`,
      timestamp: new Date().toISOString(),
    });
  }

  staticProductData.splice(index, 1); // 👈 removes 1 element at index

  res.json({
    status: "ok",
    message: `Produit supprimé avec succès`,
    timestamp: new Date().toISOString(),
  });
});

export default router;
