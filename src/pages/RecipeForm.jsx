// src/pages/RecipeForm.jsx
import React, { useEffect, useRef, useState } from "react";
// import AdminLayout from "../components/AdminLayout";
import { loadJSON, saveJSON, uid } from "../utils/storage";
import ingredientsData from "../data/ingredients.json";
import recipesData from "../data/recipes.json";
import { useNavigate, useParams } from "react-router-dom";
import { recipeImages, recipeDefaultImage } from "../utils/imageResolver";

function useIngredients() {
  const stored = loadJSON("kookit_ingredients", null);
  return stored?.ingredients ?? ingredientsData.ingredients;
}

export default function RecipeForm() {
  const { id } = useParams(); // if editing
  const navigate = useNavigate();
  const ingredientsList = useIngredients();
  const fileInputRef = useRef(null);

  const [recipes, setRecipes] = useState([]);
  useEffect(()=>{
    const stored = loadJSON("kookit_recipes", null);
    setRecipes(stored?.recipes ?? recipesData.recipes);
  },[]);

  const existing = id ? recipes.find(r=>r.id===id) : null;

  const [form, setForm] = useState(() => existing ? {...existing} : {
    id: uid("r"),
    title: "",
    cuisine: "",
    veg: true,
    tags: [],
    ingredients: [],
    steps: [],
    image: "",
    createdAt: new Date().toISOString()
  });

  const [imageUrlTemp, setImageUrlTemp] = useState("");

  useEffect(()=>{ if (existing) setForm({...existing}); }, [existing]);

  function persistAndNavigate(nextRecipes) {
    saveJSON("kookit_recipes", { recipes: nextRecipes });
    navigate("/recipes");
  }

  const save = () => {
    const next = recipes.filter(r=>r.id!==form.id);
    next.unshift({...form, updatedAt: new Date().toISOString()});
    persistAndNavigate(next);
  };

  const addIngredientRow = () => {
    setForm({...form, ingredients: [...(form.ingredients||[]), { ingredientId: ingredientsList[0]?.id ?? "", qty: 1, unit: ingredientsList[0]?.unit ?? "" }]});
  };

  const updateIngredientRow = (idx, patch) => {
    const arr = [...(form.ingredients||[])];
    arr[idx] = { ...arr[idx], ...patch };
    setForm({...form, ingredients: arr});
  };

  const removeIngredientRow = (idx) => {
    setForm({...form, ingredients: (form.ingredients||[]).filter((_,i)=>i!==idx)});
  };

  const addStep = () => setForm({...form, steps: [...(form.steps||[]), ""]});
  const updateStep = (i, txt) => setForm({...form, steps: (form.steps||[]).map((s,idx)=> idx===i ? txt : s)});
  const removeStep = (i) => setForm({...form, steps: (form.steps||[]).filter((_,idx)=>idx!==i)});

  // Image helpers
  const openFilePicker = () => fileInputRef.current && fileInputRef.current.click();

  const onFileSelected = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target.result;
      setForm(prev => ({ ...prev, image: dataUrl }));
      e.target.value = "";
    };
    reader.readAsDataURL(file);
  };

  const applyImageUrl = () => {
    if (!imageUrlTemp) return;
    setForm(prev => ({ ...prev, image: imageUrlTemp }));
    setImageUrlTemp("");
  };

  const removeImage = () => setForm(prev => ({ ...prev, image: "" }));

  const getImageForRecipe = (rForm) => {
    if (rForm?.image) return rForm.image;
    if (recipeImages && recipeImages[rForm.id]) return recipeImages[rForm.id];
    if (recipeDefaultImage) return recipeDefaultImage;
    return `https://via.placeholder.com/600x320?text=${encodeURIComponent(rForm.title || "Recipe")}`;
  };

  return (
    <div className="container-fluid">
      <input type="file" accept="image/*" ref={fileInputRef} onChange={onFileSelected} style={{ display: "none" }} />

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>{id ? "Edit Recipe" : "New Recipe"}</h3>
        <div>
          <button className="btn btn-secondary me-2" onClick={()=>navigate(-1)}>Cancel</button>
          <button className="btn btn-primary" onClick={save}>Save</button>
        </div>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-8">
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label small">Title</label>
                  <input className="form-control" value={form.title} onChange={e=>setForm({...form, title: e.target.value})} />
                </div>

                <div className="col-md-3">
                  <label className="form-label small">Cuisine</label>
                  <input className="form-control" value={form.cuisine} onChange={e=>setForm({...form, cuisine: e.target.value})} />
                </div>

                <div className="col-md-3">
                  <label className="form-label small">Veg</label>
                  <select className="form-select" value={form.veg ? "true" : "false"} onChange={e=>setForm({...form, veg: e.target.value==="true"})}>
                    <option value="true">Veg</option>
                    <option value="false">Non-veg</option>
                  </select>
                </div>

                <div className="col-12">
                  <label className="form-label small">Tags (comma separated)</label>
                  <input className="form-control" value={(form.tags||[]).join(", ")} onChange={e=>setForm({...form, tags: e.target.value.split(",").map(s=>s.trim()).filter(Boolean)})} />
                </div>
              </div>
            </div>

            {/* image column */}
            <div className="col-md-4">
              <label className="form-label small d-block mb-2">Recipe Image</label>
              <div className="mb-3">
                <img src={getImageForRecipe(form)} alt={form.title} className="rounded w-100" style={{ height: 160, objectFit: "cover", border: "1px solid #eee" }} />
              </div>

              <div className="d-grid gap-2">
                <button type="button" className="btn btn-outline-primary btn-sm" onClick={openFilePicker}>Upload image</button>
                <div className="input-group input-group-sm">
                  <input type="text" className="form-control" placeholder="Paste image URL" value={imageUrlTemp} onChange={e=>setImageUrlTemp(e.target.value)} />
                  <button className="btn btn-outline-secondary" type="button" onClick={applyImageUrl}>Apply</button>
                </div>
                <button className="btn btn-outline-danger btn-sm" onClick={removeImage}>Remove image</button>
              </div>
            </div>

            <div className="col-12">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h6 className="mb-0">Ingredients</h6>
                <div>
                  <button className="btn btn-sm btn-outline-primary me-2" onClick={addIngredientRow}>Add ingredient</button>
                  <button className="btn btn-sm btn-outline-secondary" onClick={() => setForm({...form, ingredients: []})}>Clear</button>
                </div>
              </div>

              <table className="table">
                <thead className="table-light">
                  <tr><th>Ingredient</th><th>Qty</th><th>Unit</th><th></th></tr>
                </thead>
                <tbody>
                  {(form.ingredients||[]).map((row, idx) => (
                    <tr key={idx}>
                      <td>
                        <select className="form-select" value={row.ingredientId} onChange={e => updateIngredientRow(idx, { ingredientId: e.target.value })}>
                          {ingredientsList.map(i=> <option key={i.id} value={i.id}>{i.name}</option>)}
                        </select>
                      </td>
                      <td><input className="form-control" value={row.qty} onChange={e=>updateIngredientRow(idx, { qty: e.target.value })} /></td>
                      <td><input className="form-control" value={row.unit} onChange={e=>updateIngredientRow(idx, { unit: e.target.value })} /></td>
                      <td className="text-end"><button className="btn btn-sm btn-danger" onClick={()=>removeIngredientRow(idx)}>Remove</button></td>
                    </tr>
                  ))}
                  {(form.ingredients||[]).length===0 && <tr><td colSpan="4" className="text-center text-muted">No ingredients</td></tr>}
                </tbody>
              </table>
            </div>

            <div className="col-12">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h6 className="mb-0">Steps</h6>
                <button className="btn btn-sm btn-outline-primary" onClick={addStep}>Add step</button>
              </div>

              <div>
                {(form.steps||[]).map((s, idx) => (
                  <div key={idx} className="mb-2 input-group">
                    <span className="input-group-text">{idx+1}</span>
                    <input className="form-control" value={s} onChange={e=>updateStep(idx, e.target.value)} />
                    <button className="btn btn-outline-danger" onClick={()=>removeStep(idx)}>Remove</button>
                  </div>
                ))}
                {(form.steps||[]).length===0 && <div className="text-muted">No steps yet.</div>}
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}
