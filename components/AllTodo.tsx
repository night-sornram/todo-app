"use client"

import Todo from "./Todo"
import { RootState, useAppSelector } from '@/store/store'
import {  useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/store/store"
import { clearCompleted } from "@/store/slices/appSlice"
import { Reorder } from "framer-motion"

export default function AllTodo(){
    const todaData = useAppSelector((state: RootState) => state.appReducer)
    const dispatch = useDispatch<AppDispatch>()
    const [state, setState] = useState("All")
    const [data, setData] = useState(todaData)

    useEffect(() => {
        if(state === "All"){
            setData(todaData)
        }else if(state === "Active"){
            setData(todaData.filter((data) => !data.completed))
        }
        else{
            setData(todaData.filter((data) => data.completed))
        }
    }, [todaData,state])
    

    return (
        <div className=" flex flex-col">
            <div className="dark:bg-[#25263d] shadow-xl bg-white w-full   rounded-md flex flex-col">
                <Reorder.Group values={ data } onReorder={setData}>
                    {
                        data.map((data) => (
                            <Reorder.Item value={data} key={data.id} id={data.id}>
                                <Todo key={data.id} id={data.id} title={data.title} completed={data.completed} />
                            </Reorder.Item>
                        ))
                    }
                </Reorder.Group>

                <div className=" flex flex-row justify-between md:px-0 px-4 md:justify-around w-full py-4 font-medium">
                    <h1 className=" text-gray-400 ">
                        {todaData.length} Items left
                    </h1>
                    <div className=" flex-row space-x-3 md:flex hidden">
                        <button onClick={()=>{setState("All")}} className={` ${state === "All" ? " text-blue-500" : " text-gray-400 dark:hover:text-white hover:text-black"}  font-medium `}>
                            All
                        </button>
                        <button  onClick={()=>{setState("Active")}} className={` ${state === "Active" ? " text-blue-500" : " text-gray-400 dark:hover:text-white hover:text-black"}  font-medium `}>
                            Active
                        </button>
                        <button onClick={()=>{setState("Completed")}} className={` ${state === "Completed" ? " text-blue-500" : " text-gray-400 dark:hover:text-white hover:text-black"}  font-medium`}>
                            Completed
                        </button>
                    </div>
                    <div>
                        <button onClick={()=>{dispatch(clearCompleted())}} className=" text-gray-400 dark:hover:text-white hover:text-black font-medium">
                            Clear Completed
                        </button>
                    </div>

                </div> 
            </div>
            <div className=" flex md:hidden mt-5">
                <div className=" flex-row flex space-x-3 p-4 justify-center items-center dark:bg-[#25263d] shadow-xl bg-white w-full   rounded-md">
                    <button onClick={()=>{setState("All")}} className={` ${state === "All" ? " text-blue-500" : " text-gray-400 dark:hover:text-white hover:text-black"}  font-medium `}>
                        All
                    </button>
                    <button  onClick={()=>{setState("Active")}} className={` ${state === "Active" ? " text-blue-500" : " text-gray-400 dark:hover:text-white hover:text-black"}  font-medium `}>
                        Active
                    </button>
                    <button onClick={()=>{setState("Completed")}} className={` ${state === "Completed" ? " text-blue-500" : " text-gray-400 dark:hover:text-white hover:text-black"}  font-medium`}>
                        Completed
                    </button>
                </div>
            </div>
            <div>
                <h1 className="text-center text-gray-400 mt-5">
                    Drag and drop to reorder list
                </h1>
            </div>
        </div>
    )
}


/*
"use client"

import Todo from "./Todo"
import { RootState, useAppSelector } from '@/store/store'
import {  useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/store/store"
import { clearCompleted } from "@/store/slices/appSlice"
import { Reorder } from "framer-motion"

export default function AllTodo(){
    const todaData = useAppSelector((state: RootState) => state.appReducer)
    const dispatch = useDispatch<AppDispatch>()
    const [state, setState] = useState("All")

    

    return (
        <div className=" flex flex-col">
            <div className="dark:bg-[#25263d] shadow-xl bg-white w-full   rounded-md flex flex-col">
                <Reorder.Group values={
                    state === "All" ? todaData : (state === "Active" ? todaData.filter((data) => !data.completed) :
                    todaData.filter((data) => data.completed)) } onReorder={(e)=>console.log(e)}>
                    { 
                        state === "All" ?
                        todaData.map((data) => (
                            <Reorder.Item value={data} key={data.id} id={data.id}>
                                <Todo key={data.id} id={data.id} title={data.title} completed={data.completed} />
                            </Reorder.Item>
                        )) 
                        : ( state === "Active" ? 
                        (
                            todaData.filter((data) => !data.completed).map((data) => (
                                <Todo key={data.id} id={data.id} title={data.title} completed={data.completed} />
                            ))
                        ) 
                        : ( 
                            todaData.filter((data) => data.completed).map((data) => (
                                <Todo key={data.id} id={data.id} title={data.title} completed={data.completed} />
                            ))
                        )
                        )

                        
                    }
                </Reorder.Group>

                <div className=" flex flex-row justify-between md:px-0 px-4 md:justify-around w-full py-4 font-medium">
                    <h1 className=" text-gray-400 ">
                        {todaData.length} Items left
                    </h1>
                    <div className=" flex-row space-x-3 md:flex hidden">
                        <button onClick={()=>{setState("All")}} className={` ${state === "All" ? " text-blue-500" : " text-gray-400 dark:hover:text-white hover:text-black"}  font-medium `}>
                            All
                        </button>
                        <button  onClick={()=>{setState("Active")}} className={` ${state === "Active" ? " text-blue-500" : " text-gray-400 dark:hover:text-white hover:text-black"}  font-medium `}>
                            Active
                        </button>
                        <button onClick={()=>{setState("Completed")}} className={` ${state === "Completed" ? " text-blue-500" : " text-gray-400 dark:hover:text-white hover:text-black"}  font-medium`}>
                            Completed
                        </button>
                    </div>
                    <div>
                        <button onClick={()=>{dispatch(clearCompleted())}} className=" text-gray-400 dark:hover:text-white hover:text-black font-medium">
                            Clear Completed
                        </button>
                    </div>

                </div> 
            </div>
            <div className=" flex md:hidden mt-5">
                <div className=" flex-row flex space-x-3 p-4 justify-center items-center dark:bg-[#25263d] shadow-xl bg-white w-full   rounded-md">
                    <button onClick={()=>{setState("All")}} className={` ${state === "All" ? " text-blue-500" : " text-gray-400 dark:hover:text-white hover:text-black"}  font-medium `}>
                        All
                    </button>
                    <button  onClick={()=>{setState("Active")}} className={` ${state === "Active" ? " text-blue-500" : " text-gray-400 dark:hover:text-white hover:text-black"}  font-medium `}>
                        Active
                    </button>
                    <button onClick={()=>{setState("Completed")}} className={` ${state === "Completed" ? " text-blue-500" : " text-gray-400 dark:hover:text-white hover:text-black"}  font-medium`}>
                        Completed
                    </button>
                </div>
            </div>
        </div>
    )
}
*/