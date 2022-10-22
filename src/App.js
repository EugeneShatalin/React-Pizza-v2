import React from "react";

import Header from "./components/Header";
import Categories from "./components/Categories";
import Sort from "./components/Sort";
import PizzaBlock from "./components/PizzaBlock";

import './scss/app.scss'

import pizzas from './assets/pizzas.json'

function App() {
    console.log(pizzas)
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
                                <PizzaBlock
                                    key = {pizza.id}
                                    imageUrl = {pizza.imageUrl}
                                    name = {pizza.name}
                                    types = {pizza.types}
                                    sizes = {pizza.sizes}
                                    price = {pizza.price}
                                    category = {pizza.category}
                                    rating = {pizza.rating}
                                />
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
