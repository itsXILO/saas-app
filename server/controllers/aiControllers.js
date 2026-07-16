import OpenAI from "openai";
import sql from "../configs/db.js";
import { clerkClient } from "@clerk/express";
import axios from "axios";
import { v2 as cloudinary } from "cloudinary";
import PDFParser from "pdf2json";

const AI = new OpenAI({
    apiKey: process.env.GEMINI_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});


export const generateArticle = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { prompt, length } = req.body;
    const plan = req.plan;
    const free_usage = req.free_usage;

    if(plan !== 'premium' && free_usage >= 10){
    return res.json({ success: false, message: "Limit reached. Upgrade to continue."})
}
//gemini API call to generate article
const response = await AI.chat.completions.create({
    model: "gemini-3.1-flash-lite",
    messages: [
        {
            role: "user",
            content: prompt,
        },
    ],
    temperature: 0.7,
    max_tokens: length,
});

//output the response from the AI model
const content = response.choices[0].message.content;

//store output in the database
try {
    await sql`INSERT INTO creations (user_id, prompt, content, type)
    VALUES (${userId}, ${prompt}, ${content}, 'article')`;
} catch (dbError) {
    console.error("Failed to save to database:", dbError);
}

if (plan !== 'premium') {
    await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
            free_usage: free_usage + 1
        }
    })
}

res.json({ success: true, content })


  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
}

//===============================

export const generateBlogTitle = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { prompt, length } = req.body;
    const plan = req.plan;
    const free_usage = req.free_usage;

    if(plan !== 'premium' && free_usage >= 10){
    return res.json({ success: false, message: "Limit reached. Upgrade to continue."})
}
//gemini API call to generate article
const response = await AI.chat.completions.create({
    model: "gemini-3.1-flash-lite",
    messages: [
        {
            role: "user",
            content: prompt,
        },
    ],
    temperature: 0.7,
    max_tokens: 100,
});

//output the response from the AI model
const content = response.choices[0].message.content;

//store output in the database
try {
    await sql`INSERT INTO creations (user_id, prompt, content, type)
    VALUES (${userId}, ${prompt}, ${content}, 'blog-title')`;
} catch (dbError) {
    console.error("Failed to save to database:", dbError);
}

if (plan !== 'premium') {
    await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
            free_usage: free_usage + 1
        }
    })
}

res.json({ success: true, content })


  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
}

//===============================

export const generateImage = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { prompt, publish } = req.body;
    const plan = req.plan;
    const image_usage = req.image_usage;

    if(plan !== 'premium' && image_usage >= 3){
    return res.json({ success: false, message: "Free image generation limit reached (3 images). Upgrade to continue."})
}

//clipdrop API call to generate image
const formData = new FormData();
formData.append('prompt', prompt);

const response = await axios.post("https://clipdrop-api.co/text-to-image/v1", formData, {
  headers: {
    'x-api-key': process.env.CLIPDROP_API_KEY,
  },
  responseType: 'arraybuffer',
})

const base64Image = `data:image/png;base64,${Buffer.from(response.data, 'binary').toString('base64')}`;

const { secure_url } = await cloudinary.uploader.upload(base64Image);

//store output in the database
await sql`INSERT INTO creations (user_id, prompt, content, type, publish)
VALUES (${userId}, ${prompt}, ${secure_url}, 'image', ${publish || false})`;

if (plan !== 'premium') {
    await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
            image_usage: image_usage + 1
        }
    })
}

res.json({ success: true, content: secure_url })


  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
}

//===============================

export const removeImageBackground = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { publish } = req.body;
    const plan = req.plan;
    const bg_removal_usage = req.bg_removal_usage;

    if(plan !== 'premium' && bg_removal_usage >= 10){
    return res.json({ success: false, message: "Free background removal limit reached (10 uses). Upgrade to continue."})
}


//using cloudinary to remove background from image and return the secure url of the image


const fileUri = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
const { secure_url } = await cloudinary.uploader.upload(fileUri, {
  transformation: [
    {
      effect: 'background_removal',
      background_removal: 'remove_the_background'
    }
  ]
})



//store output in the database
await sql`INSERT INTO creations (user_id, prompt, content, type, publish)
VALUES (${userId}, 'Remove background from image', ${secure_url}, 'image', ${publish || false})`;

if (plan !== 'premium') {
    await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
            bg_removal_usage: bg_removal_usage + 1
        }
    })
}

res.json({ success: true, content: secure_url })


  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
}

//===============================

export const removeImageObject = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { object, publish } = req.body;
    const plan = req.plan;
    const obj_removal_usage = req.obj_removal_usage;


    if(plan !== 'premium' && obj_removal_usage >= 5){
    return res.json({ success: false, message: "Free object removal limit reached (5 uses). Upgrade to continue."})
}
//cloudinary API call to remove object from image


const fileUri = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
const { public_id } = await cloudinary.uploader.upload(fileUri)

const imageUrl = cloudinary.url(public_id, {
  transformation: [{ effect: `gen_remove:${object}` }],
  resource_type: 'image'
})

await sql`
  INSERT INTO creations (user_id, prompt, content, type, publish)
  VALUES (${userId}, ${`Removed ${object} from image`}, ${imageUrl}, 'image', ${publish || false})
`;

if (plan !== 'premium') {
    await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
            obj_removal_usage: obj_removal_usage + 1
        }
    })
}

res.json({ success: true, content: imageUrl })


  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
}

//====================================================

export const summarizePdf = async (req, res) => {
  try {
    const { userId } = req.auth();
    const plan = req.plan;
    const pdf_usage = req.pdf_usage;


    if(plan !== 'premium' && pdf_usage >= 3){
    return res.json({ success: false, message: "Free document summarization limit reached (3 uses). Upgrade to continue."})
}
//check if file is >5mb
if(req.file.size > 5 * 1024 * 1024){
    return res.json({success: false, message: "Document file size exceeds allowed size (5MB)."})
}

const uint8Array = new Uint8Array(req.file.buffer);
const pdfData = await new Promise((resolve, reject) => {
  const parser = new PDFParser();
  parser.on("pdfParser_dataError", err => reject(err.parserError));
  parser.on("pdfParser_dataReady", () => {
    const text = parser.getRawTextContent();
    console.log("PDF extracted text length:", text.length);
    console.log("PDF extracted text preview:", text.substring(0, 200));
    resolve(text);
  });
  parser.parseBuffer(uint8Array);
});

if (!pdfData || !pdfData.trim()) {
    return res.json({ success: false, message: "Could not extract text from the document. Please try a different file." })
}

//gemini API call to summarize document
const prompt = `You are a document summarizer. Summarize the text below in clear, concise bullet points. Do not ask questions or request more information. Just summarize what is provided.\n\n${pdfData}`

const response = await AI.chat.completions.create({
  model: "gemini-3.1-flash-lite",
  messages: [
    { role: "user", content: prompt }
  ],
  temperature: 0.7,
  max_tokens: 1000,
});

const content = response.choices[0].message.content;


await sql`
  INSERT INTO creations (user_id, prompt, content, type)
  VALUES (${userId}, 'Summarized the uploaded document' ,${content}, 'text')
`;

if (plan !== 'premium') {
    await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
            pdf_usage: pdf_usage + 1
        }
    })
}

res.json({ success: true, content})


  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
}