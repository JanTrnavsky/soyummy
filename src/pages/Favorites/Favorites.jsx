import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { fetchFavorites } from 'redux/favorites/favoritesOperation';
import { getFavorites } from 'redux/favorites/favoritesSelectors';

import { Container } from '../../components/Container/Container';
import { Title } from 'components/Title/Title';
import { RecipesItem } from 'components/RecipesItem/RecipesItem';
import { EmptyPlaceholder } from 'pages/EmptyPlaceholder/EmptyPlaceholder';
import { Loader } from 'components/Loader/Loader';
import { Paginator } from 'components/Pagination/Paginator';

import { scrollToTop } from 'utils/scrollUp';
import { RecipesList, Thumb, img } from './Favorites.styled';
import { axiosInstance } from 'service/API/axios';

const Favorites = () => {
  console.log(
    'axios headers: ',
    axiosInstance.defaults.headers.common.Authorization
  );
  const dispatch = useDispatch();
  const storageFavorite = useSelector(getFavorites);

  const [recipes, setRecipes] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  const [total, setTotal] = useState(0);
  const [currentSlice, setcurrentSlice] = useState([0, 4]);
  const history = useNavigate();
  const { search } = useLocation();
  const page = search.slice(-1);
  const [pageNumber, setPageNumber] = useState(+page);
  const perPage = 4;

  useEffect(() => {
    dispatch(fetchFavorites());
    setRecipes(storageFavorite);
    setisLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    setRecipes(storageFavorite);
    setTotal(storageFavorite.length);
  }, [storageFavorite]);

  const handleChange = (event, value) => {
    setPageNumber(value);
    scrollToTop();
  };

  useEffect(() => {
    console.log(Math.ceil(total / perPage));
    if (pageNumber <= 0 || pageNumber > Math.ceil(total / perPage)) {
      setPageNumber(1);
    }

    history(`?page=${pageNumber}`);
    setcurrentSlice([pageNumber * perPage - 4, pageNumber * perPage]);
  }, [history, pageNumber, total]);

  return (
    <Thumb>
      {isLoading ? (
        <Loader />
      ) : (
        <Container>
          <Title>Favorites</Title>
          {storageFavorite && storageFavorite.length > 0 ? (
            <RecipesList>
              {recipes.slice(...currentSlice).map(recipe => {
                return (
                  <li key={recipe._id}>
                    <RecipesItem
                      ViewMode="favorite"
                      id={recipe._id}
                      img={recipe.thumb ?? img}
                      title={recipe.title ?? 'No name'}
                      text={
                        <span>
                          {recipe.about ??
                            recipe.description ??
                            'No description'}
                        </span>
                      }
                      time={recipe.time ? `${recipe.time} min` : ''}
                    />
                  </li>
                );
              })}
            </RecipesList>
          ) : (
            <EmptyPlaceholder text="You currently don't have any own recipes added. Let's add some!" />
          )}
          {recipes && recipes.length > 0 && (
            <Paginator
              count={Math.ceil(total / perPage)}
              page={pageNumber}
              handleChange={handleChange}
            />
          )}
        </Container>
      )}
    </Thumb>
  );
};

export default Favorites;
