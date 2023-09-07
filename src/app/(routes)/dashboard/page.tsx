import Link from "next/link"
import { Language } from "@/constant"
import Image from "next/image"



export default function DashBoard() {
    return (
    <div className="flex flex-col p-5">
      <div className="flex items-center mt-9 ">
        <h1 className="text-2xl font-bold">Language Available for Learning </h1>
      </div>

      <div className="flex  flex-wrap gap-11 items-center  mt-9">
      {Language.map((language:any, index:any) => (
          <Link href={`/dashboard/${language.language.toLowerCase()}`} key={index}>
            <div className="flex flex-col w-[210px] h-[220px] text-center hover:bg-slate-100 hover:scale-105 items-center shadow-md shadow-slate-500/50 p-3 border-2 rounded-xl">
              <div className="flex items-center ml-5 ">
                <Image src={language.image} alt={language.language} width={100} height={100} />
              </div>
              <div className="flex flex-col  mt-1">
                <div>
                  <p className="text-lg font-semibold">{language.language}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">{language.followers}</p>
                </div>
              </div>
              <button className="bg-green-300 mt-3 text-gray-800 font-semibold rounded-md p-2">
                START TEST
              </button>
            </div>
          </Link>
        ))}

        


      </div>
     
    </div>
  )

}