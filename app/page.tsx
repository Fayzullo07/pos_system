"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Home = () => {
  const router = useRouter();
  const data = [
    {
      slug: '/chef',
      name: "Chef"
    },
    {
      slug: '/order',
      name: "Menu"
    },
    {
      slug: '/orders',
      name: "Order Numbers"
    }
  ]
  // useEffect(() => {
  //   router.push("/login")
  // }, [])
  return (
    <div className="h-screen flex items-center justify-center">
      <div className=" text-white font-bold text-lg text-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {data.map((item, i) => (
          <Link key={i} href={item.slug}>
            <div className="border p-10 rounded-md bg-blue-400 cursor-pointer">{item.name}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Home;