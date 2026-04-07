import { Request, Response } from 'express';
import Thumbnail from "../models/Thumbnail.js";

interface ThumbnailRequestBody {
    title: string;
    prompt: string;
    style: string;
    aspect_ratio: string;
    color_scheme: string;
    text_overlay?: boolean;
}

export const generateThumbnail = async (req: Request<{}, {}, ThumbnailRequestBody>, res: Response) => {
 try {
    const {
        title,
        prompt: user_prompt,
        style,
        aspect_ratio,
        color_scheme,
        text_overlay
    } = req.body;

    const thumbnail = await Thumbnail.create({
        title,
        user_prompt,
        style,
        aspect_ratio,
        color_scheme,
        text_overlay,
        isGenerating: true
    });

    res.status(201).json({
        success: true,
        data: thumbnail
    });

 } catch (error) {
   console.error('Error generating thumbnail:', error);
   res.status(500).json({
       success: false,
       message: 'Failed to generate thumbnail'
   });
 }
}