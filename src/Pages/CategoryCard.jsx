// components/CategoryCard.jsx
import { useNavigate } from "react-router-dom";

const CategoryCard = ({ name }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/category/${name}`)}
      className="cursor-pointer p-4 bg-[#191919] text-white border border-[#FF9D2D] rounded-xl hover:bg-[#2c2c2c]"
    >
      <h3 className="text-lg font-semibold text-center">{name}</h3>
    </div>
  );
};

export default CategoryCard;
