import React from 'react';
import PizzaBlock from "../components/PizzaBlock/pizzaBlock";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import Skeleton from "../components/PizzaBlock/Skeleton";

const FullPizza = () => {
    const [pizza, setPizza] = React.useState()
    const { id } = useParams()
    const navigate = useNavigate()

    React.useEffect(() => {
        async function fetchPizza () {
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



    if(!pizza) {
        return <Skeleton />
    }

    return (
        <div>
            <PizzaBlock {...pizza}/>
        </div>
    );
};

export default FullPizza;