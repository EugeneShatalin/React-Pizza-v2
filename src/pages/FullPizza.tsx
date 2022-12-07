import React from 'react';
import PizzaBlock from "../components/PizzaBlock/pizzaBlock";
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import Skeleton from "../components/PizzaBlock/Skeleton";

const FullPizza: React.FC = () => {
    const [pizza, setPizza] = React.useState<{
        imageUrl: string
        title: string
        price: number
    }>()
    const {id} = useParams()
    const navigate = useNavigate()

    React.useEffect(() => {
        async function fetchPizza() {
            try {
                const {data} = await axios.get(`https://63567f4da2d1844a97763927.mockapi.io/items/${id}`)
                setPizza(data)
            } catch (e) {
                alert('Ошибка загрузки данных пиццы!')
                navigate('/')
            }
        }

        fetchPizza()
    }, [])


    if (!pizza) {
        return <Skeleton/>
    }

    return (
        <div className="pizza-block-wrapper">
            <div className="pizza-block" style={{width: "30%"}}>
                <img
                    style={{width: "100%"}}
                    src={pizza.imageUrl}
                    alt="Pizza"
                />
                <h4 className="pizza-block__title">{pizza.title}</h4>
                <div className="pizza-block__selector">
                    {pizza.price}
                </div>

            </div>
        </div>
    );
};

export default FullPizza;