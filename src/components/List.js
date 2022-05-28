import React,{useState,useEffect} from "react"
import "./list.css"
const Todo=()=>{



    const getData=()=>{
        let list=localStorage.getItem("lists")

        if(list){
            return JSON.parse(localStorage.getItem("lists"))
        }else{
            return []
        }
    }
    const [inputData,setInputData]=useState('')
    const [items,setItems] = useState(getData())
    const [toggleSubmit,setToggleSubmit]=useState(true)
    const [isEditItem,setIsEditItem]=useState(null)

    const addItem=()=>{
        if(!inputData){
            alert("plz fill data")
        }else if(inputData && !toggleSubmit){
            setItems(
                items.map((elem)=>{
                    if(elem.id===isEditItem){
                        return {...elem , name:inputData}
                    }
                    return elem;
                })
            )
            setToggleSubmit(true)
            setInputData('')
            setIsEditItem(null)
        }
        else{
            const allinputData={id:new Date().getTime().toString(),name:inputData}
            setItems([...items,allinputData])
            setInputData('')
        }
        

       
    }


    const editItem=(id)=>{
        let newEditItem=items.find((elem)=>{
            return elem.id===id
        })
        setToggleSubmit(false)
        setInputData(newEditItem.name)
        setIsEditItem(id)
    }

    const deleteItem=(id)=>{
        const updatedItem=items.filter((elem)=>{
            return elem.id!==id
        })
        setItems(updatedItem)


    }

    const deleteAll=()=>{
        setItems([])
    }


    useEffect(()=>{
        localStorage.setItem("lists",JSON.stringify(items))
    },[items])
    return (
        <div className="main-div">
            <div className="child-div">
                <h1>Add your list here</h1>
                <div className="addItems">
                    <input type="text" placeholder="add your item......" value={inputData} onChange={(e)=>setInputData(e.target.value)}></input>
                    {
                        toggleSubmit ? <i className="fa-solid fa-plus add-btn" title="Add Item" onClick={addItem}></i> :

                        <i className="fa-solid fa-edit add-btn" title="Update Item" onClick={addItem}></i>

                    }
                </div>

                <div className="showItems">
                    {
                        items.map((elem)=>{
                            return (
                                <div className="eachItem" key={elem.id}>
                        <h3>{elem.name}</h3>
                        
                        <div className="ibutton">
                        <i className="far fa-edit add-btn" title=" Edit Item" onClick={()=>editItem(elem.id)}></i>

<i className="far fa-trash-alt add-btn" title="Delete Item" onClick={()=>deleteItem(elem.id)}></i>
                        </div>
                        

                    </div>
                            )
                        })
                    }
                </div>

                <div className="allItems">
                    <button onClick={deleteAll}>Delete all</button>
                </div>
            </div>
        </div>
    )
}

export default Todo