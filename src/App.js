import React from "react";

import Header from "./components/Header";
import Categories from "./components/Categories";
import Sort from "./components/Sort";
import PizzaBlock from "./components/PizzaBlock";

import './scss/app.scss'


function App() {

    let [pizzas, setPizzas] = React.useState([])

    React.useEffect(() => {
        fetch('https://react-pizza.free.beeceptor.com/items')
            .then((res) => res.json())
            .then((arr) => {
                setPizzas(arr)
            })
    }, [])

    return (
        <div className="wrapper">
            <Header/>
            <div className="content">
                <div className="container">
                    <div className="content__top">
                        <Categories/>
                        <Sort/>
                    </div>
                    <h2 className="content__title">Все пиццы</h2>
                    <div className="content__items">
                        {
                            pizzas.map(pizza => (
                                <PizzaBlock key={pizza.id} {...pizza}/>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
