import React from 'react'

const PersonList = ({people}) => {

    

    return (
        <ul>
        
            {people.map(person =><li>{person}</li>)}
       
        </ul>
    )
}
    
export default PersonList 