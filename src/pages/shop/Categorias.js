import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CategoryService } from '../../services/CategoryService';
import { ProductService } from '../../services/ProductService';
import { useCart } from '../../context/CartContext';

export default function Categorias(){
  const [categorias, setCategorias] = useState([]);
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [catsRes, prodsRes] = await Promise.all([
        CategoryService.getCategories(),
        ProductService.getProducts()
      ]);
      setCategorias(catsRes.data || []);
      setProductos(prodsRes.data || []);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };
  
}