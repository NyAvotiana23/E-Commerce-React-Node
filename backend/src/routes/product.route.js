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


router.get("/:id", (req, res) => {
  // Convert string param to a number
  const id = Number(req.params.id);

  // Use .find() for a single object
  const product = staticProductData.find((p) => p.id === id);

  if (product) {
    res.json({
      status: "ok",
      data: product,
      timestamp: new Date().toISOString(),
    });
  } else {
    // It's good practice to send a 404 status code for "Not Found"
    res.status(404).json({
      status: "not found",
      message: `Produit non trouvé avec l'id : ${id}`,
      timestamp: new Date().toISOString(),
    });
  }
});

export default router;
