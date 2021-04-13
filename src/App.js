import React, { Component } from "react";
import './App.css';
import Customer from './components/Customer';

const customers = [{
  "id": 1,
  "image": "https://placeimg.com/64/64/1",
  "name": "홍길동",
  "birthday": "950406",
  "gender": "남자",
  "job": "학생"
},{
  "id": 2,
  "image": "https://placeimg.com/64/64/2",
  "name": "이순신",
  "birthday": "600406",
  "gender": "남자",
  "job": "장군"
},{
  "id": 3,
  "image": "https://placeimg.com/64/64/3",
  "name": "이황",
  "birthday": "550831",
  "gender": "남자",
  "job": "교수"
}];

class App extends Component {
  render() {
    return (
      <div>
        {
          customers.map( c => {
            return (
              <Customer
                key={c.id}
                id={c.id}
                image={c.image}
                name={c.name}
                birthday={c.birthday}
                gender={c.gender}
                job={c.job}
              />
            )
          })
        }
      </div>
    );
  }
}

export default App;
