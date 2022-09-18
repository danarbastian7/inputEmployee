import {useEffect, useState} from "react"


const List = () => {
    const [counter, setCounter] = useState(0)
    // componentDidMount
    // Ketrigger setelah component mount pertama kali
    useEffect(() => {
        alert("Hellow")
    }, [])

    // componentDidUpdate
    // Ketrigger ketika component mengalami update (props/state)
    useEffect(() => {
        if(!counter){
            return
        }

        if (counter % 3 ===0){
        alert("Fizz")}
        else if (counter % 5 === 0){
        alert("Buzz")}
        else {
        alert("Counter berubah menjadi " + counter)}
    }, [counter])
    // tiap kali `counter` ada perubahan, function ter-execute

    useEffect(() =>{
        return () => {
            alert("Goodbye")
        }
    }, [])


    return (
        <div>
            <h1>List Page</h1>
            <button onClick={() => setCounter(counter + 1)}>Tambah</button>
        </div>
    )
}

export default List