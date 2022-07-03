import React from "react";

function jokeCard(props){
        //Add Favorite button with functionality
    return(

        <div key={props.id} class="jokeCard">

                <p>{props.setup}</p>

                <p>{props.punchline}</p>
            
           </div>

    )

}

export default jokeCard