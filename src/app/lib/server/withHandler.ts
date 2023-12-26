import { NextApiRequest, NextApiResponse } from "next";

export default function withHandler(method: "GET" | "POST" | "DELETE", func: (req: NextApiRequest, res: NextApiResponse) => void ) {

    return async function (req: NextApiRequest, res: NextApiResponse) {
        if (req.method != method) {
            return res?.status(405).end();
        } 

        try {
            await func(req,res);
        } catch (error) {
            console.log(error);
            return res?.status(500).json( { error });
        }
    };
}