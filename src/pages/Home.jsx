import React from 'react';
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock/pizzaBlock";
import Pagination from "../components/Pagination";

const Home = ({searchValue}) => {

    const [items, setItems] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(true)
    const [categoryId, setCategoryId] = React.useState(0)
    const [currentPage, setCurrentPage] = React.useState(1)
    const [sortType, setSortType] = React.useState({name: 'популярности (по убыванию)', sortProperty: 'rating'})

    React.useEffect(() => {
        setIsLoading(true)

        const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc'
        const sortBy = sortType.sortProperty.replace('-', '')
        const category = categoryId > 0 ? `category=${categoryId}` : ''

        fetch(`https://63567f4da2d1844a97763927.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}`)
            .then((res) => res.json())
            .then((arr) => {
                setItems(arr)
                setIsLoading(false)
            })
        window.scrollTo(0, 0)
    }, [categoryId, sortType, sortType, currentPage])

    const pizzas = items.filter((item) => {
        if (item.name.toLowerCase().includes(searchValue.toLowerCase())) {
            return true
        }
        return false
    }).map(item => (<PizzaBlock key={item.id} {...item}/>))

    const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index}/>)

    const onChangePage = (page) => {
        setCurrentPage(page)
    }

    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onChangeCategory={(id) => setCategoryId(id)}/>
                <Sort value={sortType} onChangeSort={(obj) => setSortType(obj)}/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading ? skeletons : pizzas}
            </div>
            <Pagination onChangePage={onChangePage}/>
        </div>
    );
};

export default Home;