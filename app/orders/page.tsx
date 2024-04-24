"use client"
import { orderNumbersGetAPI } from "@/api/AdminRequest";
import Container from "@/components/Core/Container";
import { useQuery } from "@tanstack/react-query";

const Orders = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["ordersnumbers"],
        queryFn: async () => {
            return await orderNumbersGetAPI();
        },
        refetchInterval: 1000
    });
    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Xatolik yuz berdi...</div>;
    return (
        <div>
            <div className="grid grid-cols-2 md:grid-cols-2">
                <div className="bg-red-600 h-screen  border-r-[6px]">
                    <h1 className="py-5 text-center text-white text-4xl font-semibold tracking-wider border-b-[4px] mb-5">Tayyorlanboqda</h1>
                    <Container>
                        <div className=" flex flex-wrap gap-4 text-5xl px-10 pt-10">
                            {data?.data.order_numbers.map((item: any, i: number) => (
                                <div key={i} className="w-full p-2  px-4 border-4 rounded bg-white">{!item.isFinished && item.orderNumber}</div>
                            ))}
                            <div className="w-full p-2  px-4 border-4 rounded bg-white">#1</div>
                            <div className="w-full p-2  px-4 border-4 rounded bg-white">#1</div>
                            <div className="w-full p-2  px-4 border-4 rounded bg-white">#1</div>
                            <div className="w-full p-2  px-4 border-4 rounded bg-white">#1</div>
                            <div className="w-full p-2  px-4 border-4 rounded bg-white">#1</div>
                            <div className="w-full p-2  px-4 border-4 rounded bg-white">#1</div>
                            <div className="w-full p-2  px-4 border-4 rounded bg-white">#1</div>
                            <div className="w-full p-2  px-4 border-4 rounded bg-white">#1</div>
                            <div className="w-full p-2  px-4 border-4 rounded bg-white">#1</div>
                            <div className="w-full p-2  px-4 border-4 rounded bg-white">#1</div>
                            <div className="w-full p-2  px-4 border-4 rounded bg-white">#1</div>
                            <div className="w-full p-2  px-4 border-4 rounded bg-white">#1</div>
                        </div>
                    </Container>
                </div>
                <div className="bg-green-400  h-screen">
                    <h1 className="py-5 text-center text-white text-4xl font-semibold tracking-wider border-b-[4px] mb-5">Tayyor</h1>
                    <Container>
                        <div className="flex flex-wrap items-center gap-4 text-5xl px-10 pt-10">
                            {data?.data.order_numbers.map((item: any, i: number) => (
                                <div key={i} className="w-full p-2  px-4 border-4 rounded bg-white">{item.isFinished && item.orderNumber}</div>
                            ))}
                        </div>
                    </Container>
                </div>
            </div>
        </div>
    )
}

export default Orders;