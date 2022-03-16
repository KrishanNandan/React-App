import classes from "./AvailabelMeals.module.css";
import Card from "../UI/Card";
import Mealitem from "./Mealitem/MealItem";
import { useState, useEffect } from "react";

const AvailableMeals = () => {
  const [Meals, setMeals] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState();
  useEffect(() => {
    const Meals1 = async () => {
      setLoading(true);
      const Arr = await fetch(
        "https://fooddelivery-665ca-default-rtdb.asia-southeast1.firebasedatabase.app/Meals.json"
      );

      if (!Arr.ok) throw new Error("Something Went wrong");
      const meal1 = await Arr.json();
      setMeals(meal1);
      setLoading(false);
    };

    Meals1().catch((e) => {
      setLoading(false);
      setError(e.message);
    });
  }, []);

  if (isLoading) {
    return (
      <section className={classes.mealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (error)
    return (
      <section className={classes.Error}>
        <p>{error}</p>
      </section>
    );

  const mealitems = Meals.map((meal) => {
    return (
      <Mealitem
        key={meal.id}
        id={meal.id}
        name={meal.name}
        description={meal.description}
        price={meal.price}
      />
    );
  });
  return (
    <Card>
      <section className={classes.meals}>
        <ul>{mealitems}</ul>
      </section>
    </Card>
  );
};
export default AvailableMeals;
