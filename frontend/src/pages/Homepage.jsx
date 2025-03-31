import React, { useState, useEffect } from "react";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editData, setEditData] = useState({});
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    fetchProducts();
  }, []);

  // Function to fetch products
  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/products");
      const data = await response.json();
      if (data.success) {
        setProducts(data.data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Handle delete
  const handleDeleteClick = async (id) => {
    if (!id) {
      console.error("Invalid product ID");
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      const data = await response.json();
      if (data.success) {
        setProducts(prevProducts => prevProducts.filter(product => product._id !== id));
        alert("Product deleted successfully!");
      } else {
        alert("Failed to delete product.");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };
  

  const handleEditClick = (product) => {
    setEditData(product);
    setIsEditModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/products/${editData._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: editData.name,
          price: editData.price,
          image: editData.image,
        }),
      });

      const data = await response.json();
      if (data.success) {
        alert("Product updated successfully!");
        setIsEditModalOpen(false);
        fetchProducts(); // Refresh products
      } else {
        alert("Failed to update product.");
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div className="home-page">
      <h1>Product List</h1>
      {products.length === 0 ? (
        <p>No products added yet.</p>
      ) : (
        <div className="product-list">
          {products.map((product) => (
            <div key={product._id} className="product-card">
              <img src={product.image} alt={product.name} />
              <h2>{product.name}</h2>
              <p>Price: ${product.price}</p>
              <div className="button-group">
                <button className="edit-button" onClick={() => handleEditClick(product)}>
                  Edit
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDeleteClick(product._id)}
                  disabled={loading}
                >
                  {loading ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Edit Product</h2>
            <input
              type="text"
              name="name"
              value={editData.name || ""}
              onChange={handleInputChange}
              placeholder="Product Name"
            />
            <input
              type="number"
              name="price"
              value={editData.price || ""}
              onChange={handleInputChange}
              placeholder="Price"
            />
            <input
              type="text"
              name="image"
              value={editData.image || ""}
              onChange={handleInputChange}
              placeholder="Image URL"
            />
            <div className="modal-buttons">
              <button className="update-button" onClick={handleUpdate}>
                Update
              </button>
              <button className="cancel-button" onClick={() => setIsEditModalOpen(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
