import React from "react";

import Header from "./components/Header";
import Categories from "./components/Categories";
import Sort from "./components/Sort";
import Index from "./components/PizzaBlock";

import './scss/app.scss'
import Skeleton from "./components/PizzaBlock/Skeleton";


function App() {

    const [pizzas, setPizzas] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(true)

    React.useEffect(() => {
        fetch('https://react-pizza.free.beeceptor.com/items')
            .then((res) => res.json())
            .then((arr) => {
                setPizzas(arr)
                setIsLoading(false)
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
                        {isLoading
                            ? [...new Array(6)].map((_, index) => <Skeleton key={index}/>)
                            : pizzas.map(pizza => (<Index key={pizza.id} {...pizza}/>))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
