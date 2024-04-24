import connectMongoDB from "@/lib/mongodb";
import Product from "@/models/productModel";
import { NextResponse } from "next/server";

export const GET = async (req: any, { params }: { params: any }) => {
    await connectMongoDB();
    const { category } = params;
    function probel(text: any) {
        return text.replace("=", ' ');
    }
    console.log(probel(category));

    try {
        let products = await Product.find({ isActive: true, category: probel(category) });
        return NextResponse.json({ products }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ products: [] }, { status: 500 })
    }
}




