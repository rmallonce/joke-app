import React from "react";

export default function Search(props){

    let jokeCards

    let results = document.getElementById("results")

    const [jokeData, setJokeData] = React.useState([])

    const [formData, setFormData] = React.useState(
        {jokeForm: ""}
    )
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
    
    React.useEffect( () => {
    fetch(`https://dad-jokes.p.rapidapi.com/joke/search?term=${formData.jokeForm}`, options)
        .then(res => res.json())
        .then(data => {


        let index = []

        for(let i = 0; i < 3; i++){

        const randomNumber = Math.floor(Math.random() * data.body.length)
         index.push(data.body[randomNumber], data.body[randomNumber])
            
        }

        setJokeData(index)
        console.log(jokeData)
        })
    }, [formData])

    function handleChange(event){
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [event.target.name]: event.target.value
            }
        })
    }


/*
////////////////////////////////////////
Display on Submit Code
////////////////////////////////////////
*/
function handleSubmit(event){
        event.preventDefault()
       
       console.log(jokeData)

       

        results.innerHTML =`
        <div class="jokeContainer">

            <div id=${jokeData[0].id} class="jokeCard">

                <p>${jokeData[0].setup}</p>

                <p>${jokeData[0].punchline}</p>
            
            </div>

            <div id=${jokeData[2].id} class="jokeCard">

                <p>${jokeData[2].setup}</p>

                <p>${jokeData[2].punchline}</p>

            </div>

            <div id=${jokeData[5].id} class="jokeCard">

                <p>${jokeData[5].setup}</p>

                <p>${jokeData[5].punchline}</p>

            </div>

        </div> `
        
}

/*
////////////////////////////////////////
Refresh Button Code
////////////////////////////////////////
*/

function handleRefresh(){

    fetch(`https://dad-jokes.p.rapidapi.com/joke/search?term=${formData.jokeForm}`, options)
    .then(res => res.json())
    .then(data => {


    let index = []

    for(let i = 0; i < 3; i++){

    const randomNumber = Math.floor(Math.random() * data.body.length)
     index.push(data.body[randomNumber], data.body[randomNumber])
        
    }

    setJokeData(index)    

    })

    results.innerHTML =`
        <div class="jokeContainer">

            <div id=${jokeData[0].id} class="jokeCard">

                <p>${jokeData[0].setup}</p>

                <p>${jokeData[0].punchline}</p>
            
            </div>

            <div id=${jokeData[2].id} class="jokeCard">

                <p>${jokeData[2].setup}</p>

                <p>${jokeData[2].punchline}</p>

            </div>

            <div id=${jokeData[5].id} class="jokeCard">

                <p>${jokeData[5].setup}</p>

                <p>${jokeData[5].punchline}</p>

            </div>`
}

  
/*
////////////////////////////////////////
Page Render
////////////////////////////////////////
*/
    return(

        <>
            <section className="searchSection">
                <div className="searchSize">

                    <form onSubmit={handleSubmit}>
                        <div className="search">

                            <input 
                            name="jokeForm" 
                            type="text" 
                            className="searchTerm"
                            onChange={handleChange} 
                            placeholder="What are you looking for?"
                            />

                            <button type="submit" className="searchButton">
                                <i class="fa fa-search"></i>
                            </button>
                        </div>
                    </form>
                </div>

                <p id="refreshButton" className="refreshButton" onClick={handleRefresh}>Refresh</p>
            </section>

            <div id="results">

            </div>
        </>
    )

}