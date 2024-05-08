'use client'

import { useDispatch } from "react-redux"
import { AppDispatch } from "@/store/store"
import { updateToDo , removeToDo } from "@/store/slices/appSlice"
import Image from "next/image"


export default function Todo({id , title, completed} : {id: string, title: string, completed: boolean}){
    const dispatch = useDispatch<AppDispatch>()
    return(
        <div className=" flex group flex-row justify-between p-4 border-b border-gray-400">
            <div className="flex flex-row space-x-3">
                <button onClick={()=>{dispatch(updateToDo(id))}} className={` ${completed ? ' bg-gradient-to-b from-[#57ddff] to-[#c058f3]' : " bg-white border-gray-500 border"} w-5 h-5 cursor-pointer flex justify-center items-center  dark:bg-[#25263d]  rounded-full`}>
                    {
                        completed &&
                        (
                            <Image src="/images/icon-check.svg" width={10} height={10} alt="check-icon" />
                        )
                    
                    }
                </button>
                <h1 className={` ${completed ? "line-through text-gray-400" : "  text-black dark:text-white"} cursor-pointer`}>
                    {title}
                </h1>
            </div>

            <button onClick={()=>dispatch(removeToDo(id))} className=" text-gray-400 dark:text-white hidden group-hover:block">
                <Image src="/images/icon-cross.svg" width={15} height={15} alt="cross-icon" />
            </button>


            
         </div>
    )
}