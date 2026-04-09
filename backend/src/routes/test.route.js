import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "Backend is running successfully oeee!",
    timestamp: new Date().toISOString(),
  });
});

export default router;
