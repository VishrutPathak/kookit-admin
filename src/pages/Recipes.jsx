// src/pages/Recipes.jsx
import React, { useEffect, useRef, useState } from "react";
import { loadJSON, saveJSON, uid } from "../utils/storage";
import recipesData from "../data/recipes.json";
import { Link } from "react-router-dom";
import { recipeImages, recipeDefaultImage } from "../utils/imageResolver";

export default function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const fileInputRef = useRef(null);
  const [currentForUpload, setCurrentForUpload] = useState(null);

  useEffect(() => {
    const loadRecipes = async () => {
      try {
        setIsLoading(true);
        // Simulate loading delay
        await new Promise(resolve => setTimeout(resolve, 600));
        
        const stored = loadJSON("kookit_recipes", null);
        if (stored && stored.recipes) setRecipes(stored.recipes);
        else setRecipes(recipesData.recipes);
      } catch (error) {
        console.error("Error loading recipes:", error);
        setRecipes(recipesData.recipes);
      } finally {
        setIsLoading(false);
      }
    };

    loadRecipes();
  }, []);

  function persist(next) {
    setRecipes(next);
    saveJSON("kookit_recipes", { recipes: next });
  }

  const addRecipe = () => {
    const title = prompt("Recipe title");
    if (!title) return;
    const newR = {
      id: uid("r"),
      title,
      cuisine: "",
      veg: true,
      tags: [],
      ingredients: [],
      steps: [],
      createdAt: new Date().toISOString(),
      image: ""
    };
    persist([newR, ...recipes]);
  };

  const removeRecipe = (id) => {
    if (!confirm("Delete recipe?")) return;
    persist(recipes.filter(r => r.id !== id));
  };

  const duplicate = (id) => {
    const r = recipes.find(x => x.id === id);
    if (!r) return;
    const copy = { ...r, id: uid("r"), title: r.title + " (Copy)", createdAt: new Date().toISOString() };
    persist([copy, ...recipes]);
  };

  const handleChangeImageClick = (recipeId) => {
    setCurrentForUpload(recipeId);
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

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Please select an image smaller than 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target.result;
      const next = recipes.map(r => r.id === currentForUpload ? { ...r, image: dataUrl } : r);
      persist(next);
      setCurrentForUpload(null);
      e.target.value = "";
    };
    reader.readAsDataURL(file);
  };

  const getImageForRecipe = (r) => {
    if (r.image) return r.image;
    if (recipeImages && recipeImages[r.id]) return recipeImages[r.id];
    if (recipeDefaultImage) return recipeDefaultImage;
    return `https://via.placeholder.com/400x200/4f46e5/ffffff?text=${encodeURIComponent(r.title || "Recipe")}`;
  };

  const resetToDefaults = () => {
    if (!confirm("Reset all recipes to default? This cannot be undone.")) return;
    saveJSON("kookit_recipes", { recipes: recipesData.recipes });
    setRecipes(recipesData.recipes);
  };

  // Internal CSS Styles
  const styles = `
    .recipes-container {
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

    /* Recipe Cards */
    .recipe-card {
      transition: all 0.3s ease;
      border: 1px solid #e9ecef;
      position: relative;
      overflow: hidden;
    }

    .recipe-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
      transition: left 0.5s ease;
    }

    .recipe-card:hover::before {
      left: 100%;
    }

    .card-hover {
      transform: translateY(-8px);
      box-shadow: 0 12px 30px rgba(0,0,0,0.15) !important;
      border-color: #4f46e5;
    }

    .recipe-image-container {
      height: 200px;
      overflow: hidden;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      position: relative;
    }

    .recipe-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
    }

    .recipe-card:hover .recipe-image {
      transform: scale(1.05);
    }

    .recipe-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.7) 100%);
      opacity: 0;
      transition: opacity 0.3s ease;
      display: flex;
      align-items: flex-end;
      padding: 1rem;
    }

    .recipe-card:hover .recipe-overlay {
      opacity: 1;
    }

    /* Badges */
    .cuisine-badge {
      background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
      color: white;
      font-size: 0.7rem;
      font-weight: 500;
    }

    .veg-badge {
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      color: white;
    }

    .nonveg-badge {
      background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
      color: white;
    }

    /* Buttons */
    .btn-glow {
      position: relative;
      overflow: hidden;
      transition: all 0.3s ease;
    }

    .btn-glow:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(79, 70, 229, 0.4);
    }

    .btn-hover {
      transition: all 0.3s ease;
    }

    .btn-hover:hover {
      transform: translateX(3px);
    }

    /* Loading Skeleton */
    .loading-skeleton .skeleton-card {
      background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
      background-size: 200% 100%;
      animation: loading 1.5s infinite;
    }

    .skeleton-title, .skeleton-subtitle, .skeleton-text, 
    .skeleton-button, .skeleton-image {
      background: #e0e0e0;
      border-radius: 4px;
      animation: loading 1.5s infinite;
    }

    .skeleton-title { height: 20px; width: 80%; margin-bottom: 10px; }
    .skeleton-subtitle { height: 14px; width: 60%; margin-bottom: 15px; }
    .skeleton-text { height: 12px; width: 90%; margin-bottom: 5px; }
    .skeleton-button { height: 28px; width: 70px; margin-right: 8px; }
    .skeleton-image { height: 200px; width: 100%; margin-bottom: 15px; }

    @keyframes loading {
      0% { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }

    /* Empty State */
    .empty-state {
      padding: 4rem 2rem;
      text-align: center;
      color: #6c757d;
    }

    .empty-state i {
      font-size: 4rem;
      margin-bottom: 1rem;
      opacity: 0.5;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    /* Action Buttons */
    .action-buttons {
      transition: all 0.3s ease;
    }

    .recipe-card:hover .action-buttons {
      opacity: 1;
      transform: translateY(0);
    }

    /* Tags */
    .tag-pill {
      background: #f1f5f9;
      color: #475569;
      padding: 0.25rem 0.6rem;
      border-radius: 50px;
      font-size: 0.75rem;
      margin-right: 0.5rem;
      margin-bottom: 0.5rem;
      display: inline-block;
    }

    /* Text Gradient */
    .text-gradient {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
  `;

  // Loading Skeleton Component
  const LoadingSkeleton = () => (
    <div className="loading-skeleton">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="skeleton-title" style={{ width: '200px' }}></div>
        <div className="d-flex">
          <div className="skeleton-button" style={{ width: '120px' }}></div>
          <div className="skeleton-button" style={{ width: '140px', marginLeft: '10px' }}></div>
          <div className="skeleton-button" style={{ width: '80px', marginLeft: '10px' }}></div>
        </div>
      </div>
      
      <div className="row">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div key={i} className="col-md-4 mb-4">
            <div className="card skeleton-card h-100">
              <div className="skeleton-image"></div>
              <div className="card-body">
                <div className="skeleton-title"></div>
                <div className="skeleton-subtitle"></div>
                <div className="skeleton-text"></div>
                <div className="skeleton-text" style={{ width: '80%' }}></div>
                <div className="d-flex mt-3">
                  <div className="skeleton-button"></div>
                  <div className="skeleton-button"></div>
                  <div className="skeleton-button"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
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
    <div className="container-fluid recipes-container">
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
          <h2 className="h3 mb-1 fw-bold text-gradient">Recipe Collection</h2>
          <p className="text-muted mb-0">Manage and organize your favorite recipes</p>
        </div>
        <div className="text-end">
          <small className="text-muted d-block">Total Recipes</small>
          <small className="fw-semibold">{recipes.length} recipes</small>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="d-flex justify-content-between align-items-center mb-4 animate-slide-up" style={{ animationDelay: "0.1s" }}>
        <div className="d-flex gap-2">
          <button className="btn btn-primary btn-glow" onClick={addRecipe}>
            <i className="bi bi-plus-circle me-2"></i>
            Add Recipe
          </button>
          <Link to="/recipes/new" className="btn btn-outline-success btn-glow">
            <i className="bi bi-magic me-2"></i>
            Open Creator
          </Link>
        </div>
        <div>
          <button className="btn btn-outline-secondary btn-glow" onClick={resetToDefaults}>
            <i className="bi bi-arrow-clockwise me-2"></i>
            Reset to Defaults
          </button>
        </div>
      </div>

      {/* Recipes Grid */}
      <div className="row">
        {recipes.map((r, index) => (
          <div key={r.id} className="col-xl-4 col-lg-6 mb-4">
            <div 
              className={`card recipe-card h-100 animate-slide-up ${hoveredCard === r.id ? 'card-hover' : ''}`}
              style={{ animationDelay: `${0.2 + index * 0.1}s` }}
              onMouseEnter={() => setHoveredCard(r.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Image with Overlay */}
              <div className="recipe-image-container">
                <img
                  src={getImageForRecipe(r)}
                  alt={r.title}
                  className="recipe-image"
                />
                <div className="recipe-overlay">
                  <div className="text-white">
                    <small className="opacity-75">
                      Created {new Date(r.createdAt).toLocaleDateString()}
                    </small>
                  </div>
                </div>
              </div>

              <div className="card-body d-flex flex-column">
                {/* Header with title and badges */}
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <h5 className="card-title fw-bold text-truncate me-2" style={{ maxWidth: '70%' }}>
                    {r.title}
                  </h5>
                  <div className="d-flex flex-column align-items-end">
                    {r.cuisine && (
                      <span className="badge cuisine-badge mb-1">{r.cuisine}</span>
                    )}
                    <span className={`badge ${r.veg ? 'veg-badge' : 'nonveg-badge'}`}>
                      {r.veg ? 'Vegetarian' : 'Non-Vegetarian'}
                    </span>
                  </div>
                </div>

                {/* Tags */}
                {r.tags && r.tags.length > 0 && (
                  <div className="mb-3">
                    {r.tags.slice(0, 3).map((tag, idx) => (
                      <span key={idx} className="tag-pill">
                        #{tag}
                      </span>
                    ))}
                    {r.tags.length > 3 && (
                      <span className="tag-pill">+{r.tags.length - 3} more</span>
                    )}
                  </div>
                )}

                {/* Description */}
                <p className="flex-grow-1 text-muted small mb-3" style={{ minHeight: '40px' }}>
                  {(r.steps?.[0] || "No description available").slice(0, 120)}
                  {(r.steps?.[0] && r.steps[0].length > 120) && '...'}
                </p>

                {/* Action Buttons */}
                <div className="d-flex justify-content-between align-items-center mt-auto">
                  <div className="d-flex gap-1">
                    <Link 
                      className="btn btn-sm btn-primary btn-glow" 
                      to={`/recipes/${r.id}`}
                    >
                      <i className="bi bi-eye me-1"></i>
                      Open
                    </Link>
                    <button 
                      className="btn btn-sm btn-outline-secondary btn-glow" 
                      onClick={() => duplicate(r.id)}
                    >
                      <i className="bi bi-copy me-1"></i>
                    </button>
                    <button 
                      className="btn btn-sm btn-outline-danger btn-glow" 
                      onClick={() => removeRecipe(r.id)}
                    >
                      <i className="bi bi-trash me-1"></i>
                    </button>
                  </div>

                  <div className="text-end">
                    <button 
                      className="btn btn-sm btn-outline-primary btn-glow" 
                      onClick={() => handleChangeImageClick(r.id)}
                      title="Change image"
                    >
                      <i className="bi bi-image"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Empty State */}
        {recipes.length === 0 && (
          <div className="col-12">
            <div className="empty-state animate-fade-in">
              <i className="bi bi-journal-text"></i>
              <h4 className="text-muted mb-3">No Recipes Found</h4>
              <p className="text-muted mb-4">Get started by creating your first recipe!</p>
              <button className="btn btn-primary btn-lg btn-glow" onClick={addRecipe}>
                <i className="bi bi-plus-circle me-2"></i>
                Create Your First Recipe
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}