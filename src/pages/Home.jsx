import React from 'react';
import Categories from "../components/Categories";
import Sort, {sortList} from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock/pizzaBlock";
import Pagination from "../components/Pagination";
import {SearchContext} from "../App";

import {useDispatch, useSelector} from "react-redux";
import {setCategoryId, setFilters, setPageCount} from "../redux/slices/filterSlice";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import axios from "axios";
import qs from "qs";

const Home = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {categoryId, sort, currentPage} = useSelector(state => state.filter)

    const {searchValue} = React.useContext(SearchContext)

    const [items, setItems] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(true)


    const onChangeCategory = (id) => {
        dispatch(setCategoryId(id))
    }


    React.useEffect(() => {

        if(window.location.hash) {
            const params = qs.parse(window.location.hash.substring(3))

            const sort = sortList.find((obj) => obj.sortProperty === params.sortProperty)

            dispatch(setFilters({
                ...params,
                sort,
            }))
        }
    }, [])


    React.useEffect(() => {
        setIsLoading(true)

        const order = sort.sortProperty.includes('-') ? 'asc' : 'desc'
        const sortBy = sort.sortProperty.replace('-', '')
        const category = categoryId > 0 ? `category=${categoryId}` : ''

        axios.get(`https://63567f4da2d1844a97763927.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}`)
            .then((res) => {
                setItems(res.data)
                setIsLoading(false)
            })

        window.scrollTo(0, 0)
    }, [categoryId, searchValue, sort.sortProperty, currentPage])

    React.useEffect(() => {
        const queryString = qs.stringify({
            sortProperty: sort.sortProperty,
            categoryId,
            currentPage
        })

        navigate(`?${queryString}`)
    }, [categoryId, sort.sortProperty, currentPage])



    const pizzas = items.filter((item) => {
        if (item.name.toLowerCase().includes(searchValue.toLowerCase())) {
            return true
        }
        return false
    }).map(item => (<PizzaBlock key={item.id} {...item}/>))

    const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index}/>)

    const onChangePage = (page) => {
        dispatch(setPageCount(page))
    }

    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onChangeCategory={onChangeCategory}/>
                <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading ? skeletons : pizzas}
            </div>
            <Pagination currentPage={currentPage}  onChangePage={onChangePage}/>
        </div>
    );
};

export default Home;