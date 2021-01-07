import React from 'react'
import {shallow} from "enzyme";
import App from './App.js'
import PersonList from "./PersonList";


describe('PersonList', () =>{
    
    // let appWrapper
    // beforeEach(() => {
    //     appWrapper = shallow(<PersonList />)
    // })

    it('should not be null', ()=>{
        //setup
           const appWrapper = shallow(<PersonList/>)

        //assert
        expect(appWrapper).not.toBeNull()
       
    })

    it('should have a u list item html element', ()=>{
        const appWrapper = shallow(<PersonList/>)
        expect(appWrapper.html()).toEqual('<ul></ul>')  
 
    })

    it('should render 2 list items for two people', ()=>{
        const personListWrapper = shallow(<PersonList people={['bob','sally']}/>)

        expect(personListWrapper.html()).toEqual('<ul><li>bob</li><li>sally</li></ul>') 

    })
 

})
