import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { withIronSessionApiRoute } from "iron-session/next";

// export default function withHandler(method: "GET" | "POST" | "DELETE", func: (req: NextApiRequest, res: NextApiResponse) => void ) {

//     return async function (req: NextApiRequest, res: NextApiResponse) {
//         if (req.method != method) {
//             return res?.status(405).end();
//         } 

//         try {
//             await func(req,res);
//         } catch (error) {
//             console.log(error);
//             return res?.status(500).json( { error });
//         }
//     };
// }


 export function withHandler(func: (req:NextRequest, res:NextResponse) => void)  {
    return async function(req:NextRequest, res:NextResponse): Promise<any> {
        try {
            await func(req, res);
        } catch (error) {
            console.log(error);
            return NextResponse.json({
                ok: false,
                message: error
            })
        }
    }
}

 