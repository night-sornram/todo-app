"use client"

import { useState } from "react"
import Image from 'next/image'
import { RootState, useAppSelector } from '@/store/store'
import AllTodo from "./AllTodo"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/store/store"
import { addToDo } from "@/store/slices/appSlice"



export default function Page(){
    const [theme,setTheme] = useState(false)

    const toggleTheme = () => {
        setTheme(!theme)
    }

    const dispatch = useDispatch<AppDispatch>()
    const todaData = useAppSelector((state: RootState) => state.appReducer)
    return(
        <main className={` ${theme && "dark"} `}>
            <div className={`bg-white dark:bg-[#181925] w-screen h-screen flex justify-center ${ !theme ? " bg-[url(../public/images/bg-mobile-light.jpg)] md:bg-[url(../public/images/bg-desktop-light.jpg)]" : " bg-[url(../public/images/bg-mobile-dark.jpg)] md:bg-[url(../public/images/bg-desktop-dark.jpg)]"} bg-no-repeat
            bg-contain `}>
                <div className=" flex flex-col space-y-7 w-11/12 md:w-4/5 lg:w-3/5 xl:w-2/5">
                    <div className=" flex flex-row w-full justify-between mt-24">
                        <h1 className=" text-4xl text-white font-semibold tracking-widest">
                            TODO
                        </h1>
                        <button onClick={toggleTheme}>

                            {
                                !theme ? 
                            <Image src="/images/icon-moon.svg" width={25} height={25} alt="moon-icon" />
                                :
                                <Image src="/images/icon-sun.svg" width={25} height={25} alt="sun-icon" />
                            }
                        </button>
                    </div>

                    <div className="dark:bg-[#25263d] bg-white p-4 rounded-md flex flex-row space-x-3">
                        <div className=" w-5 h-5 border-gray-500 border dark:bg-[#25263d] bg-white rounded-full">

                        </div>
                        <input onKeyDown={(e)=>{
                            if(e.key === "Enter"){
                                let data : StateProp = {
                                    title: e.currentTarget.value,
                                    id: Math.random().toString(36).substr(2, 9),
                                    completed: false
                                }

                                dispatch(addToDo(data))
                                e.currentTarget.value = ""
                                console.log(todaData)
                        }}} type="text" placeholder="Create a new todo..." 
                        className=" outline-none w-full bg-white dark:bg-[#25263d] dark:text-white "/>

                    </div>
                    
                    <AllTodo />
                </div>
            </div>
        </main>
    )
}