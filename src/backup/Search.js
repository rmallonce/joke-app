import React from "react";

export default function Search(props){

    const [jokeData, setJokeData] = React.useState([])

    const [jokeArray, setJokeArray] = React.useState([])

    const [formData, setFormData] = React.useState(
        {jokeForm: ""}
    )

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
        .then(data => setJokeData(data))
    }, [formData])

    function handleChange(event){
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [event.target.name]: event.target.value
            }
        })
    }

    function getJokeText() {

        setJokeArray([])

        let index = []

        for(let i = 0; i < 4; i++){

        const randomNumber = Math.floor(Math.random() * jokeData.body.length)
         index.push(jokeData.body[randomNumber], jokeData.body[randomNumber])
            
        }

        let indexObj = Object.values(index)

        setJokeArray(indexObj)
        
    }

    function handleSubmit(event){
        event.preventDefault()
        
       getJokeText()
       
       console.log(jokeArray)

       console.log(jokeCard)

        
    }

    const jokeCard = jokeArray.map(item => {


        <div id={item.id} className="jokeCard">

           <p>{item.setup}</p>

           <p>{item.punchline}</p>


               
        </div>

    })


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

                <p id="refreshButton" className="refreshButton">Refresh</p>
            </section>

            <div className="jokeContainer">

            {jokeCard}

            </div> 
        </>
    )

}