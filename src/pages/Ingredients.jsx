// src/pages/Ingredients.jsx
import React, { useEffect, useRef, useState } from "react";
import { loadJSON, saveJSON, uid } from "../utils/storage";
import ingredientsData from "../data/ingredients.json";
import { ingredientImages, ingredientDefaultImage } from "../utils/imageResolver";

export default function Ingredients() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const fileInputRef = useRef(null);
  const [currentForUpload, setCurrentForUpload] = useState(null);

  useEffect(() => {
    const loadIngredients = async () => {
      try {
        setIsLoading(true);
        // Simulate loading delay
        await new Promise(resolve => setTimeout(resolve, 600));
        
        const stored = loadJSON("kookit_ingredients", null);
        if (stored && stored.ingredients) setItems(stored.ingredients);
        else setItems(ingredientsData.ingredients);
      } catch (error) {
        console.error("Error loading ingredients:", error);
        setItems(ingredientsData.ingredients);
      } finally {
        setIsLoading(false);
      }
    };

    loadIngredients();
  }, []);

  function persist(nextItems) {
    setItems(nextItems);
    saveJSON("kookit_ingredients", { ingredients: nextItems });
  }

  const addIngredient = () => {
    const name = prompt("Ingredient name");
    if (!name) return;
    const unit = prompt("Unit (e.g. kg, g, pcs, cup)") || "unit";
    const category = prompt("Category (e.g. vegetable, fruit, dairy, meat)") || "other";
    const newItem = { 
      id: uid("ing"), 
      name, 
      unit, 
      category,
      notes: "", 
      image: "" 
    };
    persist([newItem, ...items]);
  };

  const removeIngredient = (id) => {
    if (!confirm("Are you sure you want to delete this ingredient?")) return;
    persist(items.filter(i => i.id !== id));
  };

  const editIngredient = (id) => {
    const it = items.find(i => i.id === id);
    if (!it) return;
    const name = prompt("Edit name", it.name);
    if (!name) return;
    const unit = prompt("Edit unit", it.unit) || it.unit;
    const category = prompt("Category", it.category || "other") || "other";
    const notes = prompt("Notes", it.notes || "") || "";
    persist(items.map(i => i.id === id ? { ...i, name, unit, category, notes } : i));
  };

  // Image upload flow
  const handleChangeImageClick = (ingredientId) => {
    setCurrentForUpload(ingredientId);
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleFileSelected = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert('Please select an image smaller than 2MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target.result;
      const next = items.map(i => i.id === currentForUpload ? { ...i, image: dataUrl } : i);
      persist(next);
      setCurrentForUpload(null);
      e.target.value = "";
    };
    reader.readAsDataURL(file);
  };

  const getImageForIngredient = (it) => {
    if (it.image) return it.image;
    if (ingredientImages && ingredientImages[it.id]) return ingredientImages[it.id];
    return ingredientDefaultImage || `https://via.placeholder.com/80/4f46e5/ffffff?text=${encodeURIComponent(it.name?.charAt(0) || "I")}`;
  };

  const resetToDefaults = () => {
    if (!confirm("Reset all ingredients to default? This cannot be undone.")) return;
    saveJSON("kookit_ingredients", { ingredients: ingredientsData.ingredients });
    setItems(ingredientsData.ingredients);
  };

  // Filter items based on search and category
  const filteredItems = items.filter(item => {
    const matchesSearch = item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.notes?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Get unique categories
  const categories = ["all", ...new Set(items.map(item => item.category).filter(Boolean))];

  // Internal CSS Styles
  const styles = `
    .ingredients-container {
      opacity: 0;
      animation: fadeIn 0.8s ease-out forwards;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .animate-fade-in {
      opacity: 0;
      animation: fadeInUp 0.6s ease-out forwards;
    }

    .animate-slide-up {
      opacity: 0;
      transform: translateY(30px);
      animation: slideUp 0.6s ease-out forwards;
    }

    @keyframes fadeInUp {
      from { 
        opacity: 0; 
        transform: translateY(20px); 
      }
      to { 
        opacity: 1; 
        transform: translateY(0); 
      }
    }

    @keyframes slideUp {
      from { 
        opacity: 0; 
        transform: translateY(30px); 
      }
      to { 
        opacity: 1; 
        transform: translateY(0); 
      }
    }

    /* Table Styles */
    .ingredients-table {
      border-radius: 12px;
      overflow: hidden;
      border: 1px solid #e9ecef;
    }

    .table-row {
      transition: all 0.3s ease;
      border-bottom: 1px solid #f1f5f9;
    }

    .table-row:hover {
      background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
      transform: translateX(5px);
      box-shadow: 0 2px 10px rgba(0,0,0,0.05);
    }

    .table-row:last-child {
      border-bottom: none;
    }

    /* Ingredient Image */
    .ingredient-image {
      width: 60px;
      height: 60px;
      border-radius: 12px;
      object-fit: cover;
      border: 2px solid #e9ecef;
      transition: all 0.3s ease;
    }

    .table-row:hover .ingredient-image {
      border-color: #4f46e5;
      transform: scale(1.05);
    }

    /* Category Badges */
    .category-badge {
      padding: 0.35em 0.65em;
      border-radius: 20px;
      font-size: 0.75rem;
      font-weight: 500;
      text-transform: capitalize;
    }

    .category-vegetable { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; }
    .category-fruit { background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; }
    .category-dairy { background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%); color: #374151; }
    .category-meat { background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); color: white; }
    .category-spice { background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); color: white; }
    .category-other { background: linear-gradient(135deg, #6b7280 0%, #4b5563 100%); color: white; }

    /* Buttons */
    .btn-glow {
      position: relative;
      overflow: hidden;
      transition: all 0.3s ease;
    }

    .btn-glow:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(79, 70, 229, 0.3);
    }

    .btn-icon {
      width: 32px;
      height: 32px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 8px;
      transition: all 0.3s ease;
    }

    .btn-icon:hover {
      transform: scale(1.1);
    }

    /* Search and Filter */
    .search-box {
      border-radius: 10px;
      border: 2px solid #e9ecef;
      transition: all 0.3s ease;
    }

    .search-box:focus {
      border-color: #4f46e5;
      box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
    }

    .filter-select {
      border-radius: 10px;
      border: 2px solid #e9ecef;
      transition: all 0.3s ease;
    }

    .filter-select:focus {
      border-color: #4f46e5;
      box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
    }

    /* Loading Skeleton */
    .loading-skeleton .skeleton-card {
      background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
      background-size: 200% 100%;
      animation: loading 1.5s infinite;
    }

    .skeleton-title, .skeleton-subtitle, .skeleton-text, 
    .skeleton-button, .skeleton-image, .skeleton-row {
      background: #e0e0e0;
      border-radius: 4px;
      animation: loading 1.5s infinite;
    }

    .skeleton-title { height: 24px; width: 200px; margin-bottom: 10px; }
    .skeleton-subtitle { height: 16px; width: 150px; margin-bottom: 20px; }
    .skeleton-image { width: 60px; height: 60px; border-radius: 12px; }
    .skeleton-text { height: 14px; margin-bottom: 8px; }
    .skeleton-button { height: 32px; width: 80px; margin-right: 8px; }
    .skeleton-row { height: 80px; margin-bottom: 10px; border-radius: 8px; }

    @keyframes loading {
      0% { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }

    /* Empty State */
    .empty-state {
      padding: 3rem 2rem;
      text-align: center;
      color: #6c757d;
    }

    .empty-state i {
      font-size: 3rem;
      margin-bottom: 1rem;
      opacity: 0.5;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    /* Text Gradient */
    .text-gradient {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    /* Stats Cards */
    .stat-card {
      background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
      border: 1px solid #e9ecef;
      border-radius: 12px;
      transition: all 0.3s ease;
    }

    .stat-card:hover {
      transform: translateY(-3px);
      box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    }
  `;

  // Loading Skeleton Component
  const LoadingSkeleton = () => (
    <div className="loading-skeleton">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="skeleton-title"></div>
        <div className="d-flex">
          <div className="skeleton-button" style={{ width: '140px' }}></div>
          <div className="skeleton-button" style={{ width: '100px', marginLeft: '10px' }}></div>
        </div>
      </div>
      
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="skeleton-text" style={{ height: '45px' }}></div>
        </div>
        <div className="col-md-3">
          <div className="skeleton-text" style={{ height: '45px' }}></div>
        </div>
        <div className="col-md-3">
          <div className="skeleton-text" style={{ height: '45px' }}></div>
        </div>
      </div>

      <div className="card skeleton-card">
        <div className="card-body">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="skeleton-row mb-3"></div>
          ))}
        </div>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="container-fluid">
        <style>{styles}</style>
        <LoadingSkeleton />
      </div>
    );
  }

  return (
    <div className="container-fluid ingredients-container">
      <style>{styles}</style>
      
      {/* hidden file input used for uploads */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileSelected}
        style={{ display: "none" }}
      />

      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-4 animate-fade-in">
        <div>
          <h2 className="h3 mb-1 fw-bold text-gradient">Ingredients Library</h2>
          <p className="text-muted mb-0">Manage your cooking ingredients and inventory</p>
        </div>
        <div className="text-end">
          <small className="text-muted d-block">Total Ingredients</small>
          <small className="fw-semibold">{items.length} items</small>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="row mb-4 animate-slide-up" style={{ animationDelay: "0.1s" }}>
        <div className="col-md-3">
          <div className="stat-card p-3 text-center">
            <div className="h4 mb-1 text-primary">{items.length}</div>
            <div className="text-muted small">Total Ingredients</div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="stat-card p-3 text-center">
            <div className="h4 mb-1 text-success">{categories.length - 1}</div>
            <div className="text-muted small">Categories</div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="stat-card p-3 text-center">
            <div className="h4 mb-1 text-warning">{items.filter(i => i.image).length}</div>
            <div className="text-muted small">With Images</div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="stat-card p-3 text-center">
            <div className="h4 mb-1 text-info">{filteredItems.length}</div>
            <div className="text-muted small">Filtered Results</div>
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="d-flex justify-content-between align-items-center mb-4 animate-slide-up" style={{ animationDelay: "0.2s" }}>
        <div className="d-flex gap-2">
          <button className="btn btn-primary btn-glow" onClick={addIngredient}>
            <i className="bi bi-plus-circle me-2"></i>
            Add Ingredient
          </button>
          <button className="btn btn-outline-secondary btn-glow" onClick={resetToDefaults}>
            <i className="bi bi-arrow-clockwise me-2"></i>
            Reset to Defaults
          </button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="row mb-4 animate-slide-up" style={{ animationDelay: "0.3s" }}>
        <div className="col-md-6">
          <div className="input-group">
            <span className="input-group-text bg-light border-end-0">
              <i className="bi bi-search text-muted"></i>
            </span>
            <input
              type="text"
              className="form-control search-box border-start-0"
              placeholder="Search ingredients by name or notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-3">
          <select 
            className="form-select filter-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            {categories.filter(cat => cat !== "all").map(category => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-3">
          <div className="text-muted small">
            Showing {filteredItems.length} of {items.length} ingredients
          </div>
        </div>
      </div>

      {/* Ingredients Table */}
      <div className="card shadow-sm ingredients-table animate-slide-up" style={{ animationDelay: "0.4s" }}>
        <div className="card-header bg-transparent border-bottom-0">
          <h6 className="mb-0 fw-semibold">Ingredients List</h6>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th style={{ minWidth: 280 }} className="ps-4">Ingredient</th>
                  <th style={{ minWidth: 100 }}>Unit</th>
                  <th style={{ minWidth: 120 }}>Category</th>
                  <th>Notes</th>
                  <th style={{ width: 180 }} className="text-end pe-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((it, index) => (
                  <tr 
                    key={it.id}
                    className={`table-row animate-fade-in ${hoveredRow === it.id ? 'table-active' : ''}`}
                    style={{ animationDelay: `${0.5 + index * 0.05}s` }}
                    onMouseEnter={() => setHoveredRow(it.id)}
                    onMouseLeave={() => setHoveredRow(null)}
                  >
                    <td className="ps-4">
                      <div className="d-flex align-items-center">
                        <img
                          src={getImageForIngredient(it)}
                          alt={it.name}
                          className="ingredient-image me-3"
                        />
                        <div>
                          <div className="fw-semibold">{it.name}</div>
                          <div className="text-muted small">{it.id}</div>
                        </div>
                      </div>
                    </td>

                    <td>
                      <span className="badge bg-light text-dark border">{it.unit}</span>
                    </td>

                    <td>
                      {it.category && (
                        <span className={`category-badge category-${it.category}`}>
                          {it.category}
                        </span>
                      )}
                    </td>

                    <td>
                      <span className="text-muted small">
                        {it.notes || <em className="text-muted">No notes</em>}
                      </span>
                    </td>

                    <td className="text-end pe-4">
                      <div className="d-flex justify-content-end gap-1">
                        <button 
                          className="btn btn-sm btn-outline-primary btn-icon" 
                          onClick={() => editIngredient(it.id)}
                          title="Edit ingredient"
                        >
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button 
                          className="btn btn-sm btn-outline-success btn-icon" 
                          onClick={() => handleChangeImageClick(it.id)}
                          title="Change image"
                        >
                          <i className="bi bi-image"></i>
                        </button>
                        <button 
                          className="btn btn-sm btn-outline-danger btn-icon" 
                          onClick={() => removeIngredient(it.id)}
                          title="Delete ingredient"
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {/* Empty State */}
                {filteredItems.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center py-5 empty-state">
                      <i className="bi bi-egg"></i>
                      <h5 className="text-muted mt-3 mb-2">No Ingredients Found</h5>
                      <p className="text-muted mb-0">
                        {searchTerm || selectedCategory !== "all" 
                          ? "Try adjusting your search or filter criteria" 
                          : "Get started by adding your first ingredient"
                        }
                      </p>
                      {(searchTerm || selectedCategory !== "all") && (
                        <button 
                          className="btn btn-outline-primary mt-3"
                          onClick={() => {
                            setSearchTerm("");
                            setSelectedCategory("all");
                          }}
                        >
                          Clear Filters
                        </button>
                      )}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}