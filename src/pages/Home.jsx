import React from 'react';
import Categories from "../components/Categories";
import Sort, {sortList} from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock/pizzaBlock";
import Pagination from "../components/Pagination";
import {SearchContext} from "../App";

import {useDispatch, useSelector} from "react-redux";
import {setCategoryId, setFilters, setPageCount} from "../redux/slices/filterSlice";
import {useNavigate} from "react-router-dom";
import qs from "qs";
import {fetchPizzas} from "../redux/slices/pizzaSlice";

const Home = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isSearch = React.useRef(false)
    const isMounted = React.useRef(false)

    const {items} = useSelector(state => state.pizza)
    const {categoryId, sort, currentPage} = useSelector(state => state.filter)

    const {searchValue} = React.useContext(SearchContext)
    const [isLoading, setIsLoading] = React.useState(true)


    const onChangeCategory = (id) => {
        dispatch(setCategoryId(id))
    }

    const getPizzas = async () => {
        setIsLoading(true)

        const order = sort.sortProperty.includes('-') ? 'asc' : 'desc'
        const sortBy = sort.sortProperty.replace('-', '')
        const category = categoryId > 0 ? `category=${categoryId}` : ''
        const search = searchValue ? `&search=${searchValue}` : ''

        try {
            dispatch(fetchPizzas({
                order,
                sortBy,
                category,
                search,
                currentPage
            }))
            window.scrollTo(0, 0)
        } catch (e) {
            console.log("Error: ", e)
        } finally {
            setIsLoading(false)
        }
    }

    React.useEffect(() => {

        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1))

            const sort = sortList.find((obj) => obj.sortProperty === params.sortProperty)

            dispatch(setFilters({
                ...params,
                sort,
            }))
            isSearch.current = true
        }
    }, [])


    React.useEffect(() => {
        getPizzas();
    }, [categoryId, searchValue, sort.sortProperty, currentPage])

    React.useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortProperty: sort.sortProperty,
                categoryId,
                currentPage
            })
            navigate(`?${queryString}`)
        }
        isMounted.current = true
    }, [categoryId, sort.sortProperty, currentPage])


    const pizzas = items.filter((item) => {
        if (item.title.toLowerCase().includes(searchValue.toLowerCase())) {
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
                <Sort/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading ? skeletons : pizzas}
            </div>
            <Pagination currentPage={currentPage} onChangePage={onChangePage}/>
        </div>
    );
};

export default Home;