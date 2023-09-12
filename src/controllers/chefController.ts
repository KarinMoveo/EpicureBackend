import { Request, Response, NextFunction, response } from 'express';
import { getAllChefs } from "../services/chefService";

export async function getAllChefsController(req: Request, res: Response, next: NextFunction) {
   try {
        const allChefs = await getAllChefs();
        return res.status(200).json({ status: 200, data: allChefs, message: "Yay! All chefs are here" });
   } catch (error) {
        return res.status(400).json({ status: 400, message: "Oh oh!" });
   }
}
