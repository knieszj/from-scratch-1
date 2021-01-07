import PersonList from "./PersonList";
import './App.css';
import {Component} from "react";

class App extends Component {
    state = {
        people: []
    }


    render() {
        return (
            <div className="App">
                <PersonList people={this.state.people}/>
            </div>
        );
    }
}

export default App;
