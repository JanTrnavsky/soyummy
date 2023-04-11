import * as React from 'react';
import {
  GridContainer,
  GridItem,
  RecipeTitle,
} from './SearchRecipesList.styled';
import { CardImg } from 'components/CardMeal/CardMeal.styled';
import { NavLink } from 'react-router-dom';

const SearchRecipesList = ({ recipes, id }) => {
  return (
    <div>
      <GridContainer>
        {recipes &&
          recipes.map(recipe => {
            return (
              <GridItem>
                <NavLink to={`/recipes/${id}`}>
                  <CardImg src={recipe.thumb} alt="img" />
                </NavLink>
                <RecipeTitle>{recipe.title}</RecipeTitle>
              </GridItem>
            );
          })}
      </GridContainer>
    </div>
  );
};

export default SearchRecipesList;
