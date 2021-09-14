import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";
import { useEffect, useCallback, useState } from "react";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  
  const getMeals = useCallback(async () => {
    const response = await fetch("https://project-041196-default-rtdb.firebaseio.com/meals.json");
    const data = await response.json();
    setMeals(data);
  }, []);

  useEffect(() => {
    getMeals();
  }, [getMeals]);

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
