import React, { useEffect, useState } from 'react';
import './input-search.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const InputSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]); // Отфильтрованные продукты
  const [products, setProducts] = useState([]);
  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    axios.get("http://localhost:5007/get-all-ad")
      .then(response => {
        setProducts(response.data); // Загружаем все продукты
      })
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  // Функция для поиска продукта по категории
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    const foundProducts = products.filter(item =>
      item.category.toLowerCase().includes(value) // Поиск по категории
    );

    setFilteredProducts(foundProducts);
  };

  // Переход на страницу с деталями продукта
  const showProductDetails = (productId) => {
    navigate(`/details/${productId}`); // Redirect to the details page with the product ID
  };

  return (
    <div className="input__container">
      <div className='input__search'>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder='Nimani qidiryapsiz?' />
        <button>Izlash</button>
      </div>

      <div className="input__result">
        {
          searchTerm && (
            <div className="product__list">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product, index) => (
                  <div className="product__item" key={index} onClick={() => showProductDetails(product._id)}>
                    {/* При нажатии перенаправляем на страницу деталей продукта */}
                    <p>{product.category} - {product.price} $</p>
                  </div>
                ))
              ) : (
                <p>Hech narsa topilmadi</p>
              )}
            </div>
          )
        }
      </div>

</div>
    

  );
};

export default InputSearch;
