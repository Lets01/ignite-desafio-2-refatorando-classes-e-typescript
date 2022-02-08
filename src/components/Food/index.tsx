import { useState } from 'react';
import { FiEdit3, FiTrash } from 'react-icons/fi';
import { FoodObject } from '../../types/FoodType';
import { Container, ContainerHeader } from './styles';
import api from '../../services/api';

interface FoodProps {
  food: FoodObject;
  onDeleteFood: (idFood: number) => void;
  onEditFood: (food: FoodObject) => void;
}

export const Food = ({food, onDeleteFood, onEditFood}: FoodProps) => {
  const [ isAvailable, setIsAvailable ] = useState(food.available);

  const toggleAvailable = async () => {
    await api.put(`/foods/${food.id}`, {
      ...food,
      available: !isAvailable,
    });
    setIsAvailable(!isAvailable);
  }

  const setEditingFood = () => {
    onEditFood(food);
  }

  return (
    <Container>
      <ContainerHeader available={isAvailable}>
        <img src={food.image} alt={food.name} />
      </ContainerHeader>
      <section className="body">
        <h2>{food.name}</h2>
        <p>{food.description}</p>
        <p className="price">
          R$ <b>{food.price}</b>
        </p>
      </section>
      <section className="footer">
        <div className="icon-container">
          <button
            type="button"
            className="icon"
            onClick={setEditingFood}
            data-testid={`edit-food-${food.id}`}
          >
            <FiEdit3 size={20} />
          </button>

          <button
            type="button"
            className="icon"
            onClick={() => onDeleteFood(food.id)}
            data-testid={`remove-food-${food.id}`}
          >
            <FiTrash size={20} />
          </button>
        </div>

        <div className="availability-container">
          <p>{isAvailable ? 'Disponível' : 'Indisponível'}</p>

          <label htmlFor={`available-switch-${food.id}`} className="switch">
            <input
              id={`available-switch-${food.id}`}
              type="checkbox"
              checked={isAvailable}
              onChange={toggleAvailable}
              data-testid={`change-status-food-${food.id}`}
            />
            <span className="slider" />
          </label>
        </div>
      </section>
    </Container>
  );
};

