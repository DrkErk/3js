import { useState, useEffect } from "react"
//
//
//
// {people.map((person) => {
//     return person.name
// })}
//
// - or single line below

export default function People()
{
    const [people, setPeople] = useState([])

    const getPeople = async () =>
    {
        const response = await fetch('https://jsonplaceholder.typicode.com/users') //fetch api request and get a promise
        const result = await response.json() //then once the promise is fufilled. parse the response. set it to result
        setPeople(result)
        

            // Non async
            // const getPeople = () =>
            // {
            //     fetch('https://jsonplaceholder.typicode.com/users') //fetch api request and get a promise
            //         .then((response)=> response.json())             //then once the promise is fufilled. parse the response
            //         .then((result) => console.log(result))   
            // }

        //- YOU CAN GET THE DATA THIS WAY. OR
        //
        // const request = fetch('https://jsonplaceholder.typicode.com/users') //fetch api request and get a promise
        // request.then((response)=>  //then once the promise is fufilled. do the following
        // {
        //     const parse = response.json()

        //     parse.then((result) =>
        //     {
        //        DO WHAT YOU NEED WITH THE PARSE
        //     })
        // })
        //
        //- OR YOU CAN DO IT THIS WAY
        //
        // fetch('https://jsonplaceholder.typicode.com/users') //fetch api request and get a promise
        // .then((response)=>  //then once the promise is fufilled. do the following
        // {
        //     response.json()
        //     .then((result) =>
        //     {
        //         DO WHATEVER
        //     })
        // })
        //
        //- OR YOU CAN DO IT THIS WAY
        //
        // fetch('https://jsonplaceholder.typicode.com/users') //fetch api request and get a promise
        // .then((response)=>  //then once the promise is fufilled. do the following
        // {
        //     return response.json()
        // })
        // .then((result) =>
        // {
        //       DO WHATEVER
        // })
    }
    


    useEffect(()=>
    {
        getPeople()
    }, [])

    return <div>
        <h2>People</h2>
        <ul>
        {people.map(person =>  
        <li key={person.id}>{person.user}</li> 
        )}
        </ul>

    </div>
    
}