import { NextRequest, NextResponse } from "next/server";

export async function POST (req: NextRequest, res: NextResponse<ResponseType>) {
    const data = await req.json();
    const { name } = data;

    const existedData 
  
}