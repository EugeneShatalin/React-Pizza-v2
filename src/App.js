import React from "react";

import Header from "./components/Header";
import Categories from "./components/Categories";
import Sort from "./components/Sort";
import PizzaBlock from "./components/PizzaBlock";

import './scss/app.scss'

function App() {
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
                        <PizzaBlock title='Чизбургер-пицца' price={350}/>
                        <PizzaBlock title='Неаполитанская пицца' price={500}/>
                        <PizzaBlock title='Кальцоне' price={300}/>
                        <PizzaBlock title='Римская пицца' price={350}/>
                        <PizzaBlock title='Жареная пицца' price={600}/>
                        <PizzaBlock title='Сицилийская пицца' price={350}/>
                        <PizzaBlock title='Жареная пицца' price={600}/>
                        <PizzaBlock title='Сицилийская пицца' price={350}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
