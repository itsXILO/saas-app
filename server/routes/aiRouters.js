import express from "express";
import { auth } from "../middlewares/auth.js";
import { generateArticle, generateBlogTitle, removeImageBackground } from "../controllers/aiControllers.js";

const aiRouter = express.Router();

aiRouter.post('/generate-article', auth, generateArticle);
aiRouter.post('/generate-blog-title', auth, generateBlogTitle);
aiRouter.post('/remove-image-background', auth, removeImageBackground);

export default aiRouter;
