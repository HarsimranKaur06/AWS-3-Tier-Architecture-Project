import React from 'react';
import './ProductCatalog.css';
import chair from '../../assets/chair.jpg'; // Path to chair image
import laptopTable from '../../assets/laptop_table.jpeg'; // Path to laptop table image
import lamp from '../../assets/table_lamp.jpeg'; // Path to lamp image
import comfortChair from '../../assets/comfort_chair.jpeg'; // Path to comfort chair image

const ProductCatalog = () => {
  return (
    <div className="product-catalog-container">
      <h1 className="product-catalog-title">Product Catalog</h1>
      <table className="product-catalog-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Code</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><img src={chair} alt="Chair" /></td>
            <td>001</td>
            <td>$80</td>
          </tr>
          <tr>
            <td><img src={laptopTable} alt="Laptop Table" /></td>
            <td>002</td>
            <td>$100</td>
          </tr>
          <tr>
            <td><img src={lamp} alt="Lamp" /></td>
            <td>003</td>
            <td>$30</td>
          </tr>
          <tr>
            <td><img src={comfortChair} alt="Comfort Chair" /></td>
            <td>004</td>
            <td>$50</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ProductCatalog;