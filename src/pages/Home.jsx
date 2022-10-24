import React from 'react';
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Index from "../components/PizzaBlock";

const Home = () => {

    const [pizzas, setPizzas] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(true)

    React.useEffect(() => {
        fetch('https://react-pizza.free.beeceptor.com/items')
            .then((res) => res.json())
            .then((arr) => {
                setPizzas(arr)
                setIsLoading(false)
            })
window.scrollTo(0, 0)
    }, [])

    return (
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
    );
};

export default Home;