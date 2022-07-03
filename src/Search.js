import React, {useState} from "react";
import JokeCard from "./components/JokeCard";

export default function Search(){

     //disable refresh button when there is no search query saved
    // Add display for when there is nothing on page

    const [jokeData, setJokeData] = useState([])

    const [formData, setFormData] = useState(
        {jokeForm: ""}
    ) 

    const [searchQuery, setSearchQuery] = useState("")

    const [loading, setLoading] = useState(false)

    console.log(jokeData)
/*
////////////////////////////////////////
Fetch Database into jokeData 
////////////////////////////////////////
*/
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'dad-jokes.p.rapidapi.com',
            'X-RapidAPI-Key': '2119d3e585mshbb0224458356fcep18055ejsn97d83f5783bb'
        }
    };
    
    const getJokes = async(event) => {
        event.preventDefault()
        setLoading(true)

        try{
            const response = await fetch(`https://dad-jokes.p.rapidapi.com/joke/search?term=${formData.jokeForm}`, options) 

            const data = await response.json();

            let index = []

            for(let i = 0; i < 3; i++){

            const randomNumber = Math.floor(Math.random() * data.body.length)

            index.push(data.body[randomNumber])
            
        }
            setJokeData(index)
            setSearchQuery(formData.jokeForm)

        } finally {
            
        }
    }

   const refreshJokes = async(event) => {
        event.preventDefault()
        setLoading(true)

        try{
            const response = await fetch(`https://dad-jokes.p.rapidapi.com/joke/search?term=${searchQuery}`, options) 

            const data = await response.json();

            let index = []

            for(let i = 0; i < 3; i++){

            const randomNumber = Math.floor(Math.random() * data.body.length)

            index.push(data.body[randomNumber])
            
        }
            setJokeData(index)

        } finally {
           
        }
    }

/*
////////////////////////////////////////
Track Form Inputs
////////////////////////////////////////
*/

    function handleChange(event){
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [event.target.name]: event.target.value
            }
        })
    }

    const jokeContent = <div class="jokeContainer">
                            {jokeData.map(joke =>
                                <JokeCard
                                    key = {joke.id}
                                    setup = {joke.setup}
                                    punchline = {joke.punchline} 
                                />
                            )}

                        </div>

/*
////////////////////////////////////////
Page Render
////////////////////////////////////////
*/
    return(

        <>
            <section className="searchSection">
                <div className="searchSize">

                    <form onSubmit={getJokes}>
                        <div className="search">

                            <input 
                            name="jokeForm" 
                            type="text" 
                            className="searchTerm"
                            onChange={handleChange} 
                            placeholder="What makes you laugh?"
                            />

                            <button type="submit" className="searchButton">
                                <i class="fa fa-search"></i>
                            </button>
                        </div>
                    </form>
                </div>

                
                <button 
                id="refreshButton" 
                className="refreshButton"
                onClick={refreshJokes}
                disabled={!loading}
               >
                    Refresh
                </button>
            </section>

            {loading ?

                <>{jokeContent}</>
            
            :

                <h1 class="jokeHeader">No Results</h1>
            }
        </>
    )

}