// src/pages/RecipeEdit.jsx
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { loadJSON, saveJSON, uid } from "../utils/storage";
import ingredientsData from "../data/ingredients.json";
import recipesData from "../data/recipes.json";
import { recipeImages, recipeDefaultImage } from "../utils/imageResolver";

function useIngredients() {
  const stored = loadJSON("kookit_ingredients", null);
  return stored?.ingredients ?? ingredientsData.ingredients;
}

export default function RecipeEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const ingredientsList = useIngredients();

  const fileInputRef = useRef(null);

  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    const stored = loadJSON("kookit_recipes", null);
    setRecipes(stored?.recipes ?? recipesData.recipes);
  }, []);

  const existing = recipes.find(r => r.id === id);

  const [form, setForm] = useState(() => ({
    id: uid("r"),
    title: "",
    cuisine: "",
    veg: true,
    tags: [],
    ingredients: [],
    steps: [],
    image: "",
    createdAt: new Date().toISOString()
  }));
  const [msg, setMsg] = useState(null);
  const [preview, setPreview] = useState(false);
  const [imageUrlTemp, setImageUrlTemp] = useState("");

  useEffect(() => {
    if (existing) setForm({ ...existing });
  }, [existing]);

  // helper to persist recipes array and update local state
  function persistAndNavigate(nextRecipes, goBack = true) {
    saveJSON("kookit_recipes", { recipes: nextRecipes });
    setRecipes(nextRecipes);
    if (goBack) navigate("/recipes");
  }

  const validate = () => {
    if (!form.title || form.title.trim().length < 2) return "Title is required (min 2 chars).";
    if ((form.ingredients || []).length === 0) return "Add at least one ingredient.";
    if ((form.steps || []).length === 0) return "Add at least one step.";
    return null;
  };

  const save = () => {
    const err = validate();
    if (err) {
      setMsg({ type: "danger", text: err });
      return;
    }
    const next = recipes.filter(r => r.id !== form.id);
    next.unshift({ ...form, updatedAt: new Date().toISOString() });
    persistAndNavigate(next);
  };

  const remove = () => {
    if (!confirm("Delete this recipe permanently?")) return;
    const next = recipes.filter(r => r.id !== form.id);
    persistAndNavigate(next);
  };

  const duplicate = () => {
    const copy = { ...form, id: uid("r"), title: `${form.title} (Copy)`, createdAt: new Date().toISOString() };
    const next = [copy, ...recipes];
    persistAndNavigate(next, false);
    setMsg({ type: "success", text: "Recipe duplicated. You can edit the new copy." });
    setTimeout(() => navigate(`/recipes/${copy.id}`), 600);
  };

  // ingredient row helpers
  const addIngredientRow = () => {
    const defaultId = ingredientsList[0]?.id ?? "";
    setForm({ ...form, ingredients: [...(form.ingredients || []), { ingredientId: defaultId, qty: 1, unit: ingredientsList.find(i => i.id === defaultId)?.unit || "" }] });
  };
  const updateIngredientRow = (idx, patch) => {
    const arr = [...(form.ingredients || [])];
    arr[idx] = { ...arr[idx], ...patch };
    setForm({ ...form, ingredients: arr });
  };
  const removeIngredientRow = (idx) => setForm({ ...form, ingredients: form.ingredients.filter((_, i) => i !== idx) });

  // steps helpers
  const addStep = () => setForm({ ...form, steps: [...(form.steps || []), ""] });
  const updateStep = (i, txt) => setForm({ ...form, steps: form.steps.map((s, idx) => idx === i ? txt : s) });
  const removeStep = (i) => setForm({ ...form, steps: form.steps.filter((_, idx) => idx !== i) });

  // small safety for missing ingredient references
  const resolveIngredientName = (id) => {
    const it = ingredientsList.find(x => x.id === id);
    return it ? it.name : `Unknown (${id})`;
  };

  // --- Image helpers ---
  const getImageForRecipe = (rForm) => {
    if (rForm?.image) return rForm.image; // data URL or external URL saved in object
    if (recipeImages && recipeImages[rForm.id]) return recipeImages[rForm.id]; // bundled asset
    if (recipeDefaultImage) return recipeDefaultImage;
    return `https://via.placeholder.com/600x320?text=${encodeURIComponent(rForm.title || "Recipe")}`;
  };

  const openFilePicker = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const onFileSelected = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target.result;
      setForm(prev => ({ ...prev, image: dataUrl }));
      // clear file input
      e.target.value = "";
    };
    reader.readAsDataURL(file);
  };

  const applyImageUrl = () => {
    if (!imageUrlTemp) return setMsg({ type: "danger", text: "Enter an image URL first." });
    setForm(prev => ({ ...prev, image: imageUrlTemp }));
    setImageUrlTemp("");
    setMsg({ type: "success", text: "Image URL applied to recipe." });
  };

  const removeImage = () => {
    setForm(prev => ({ ...prev, image: "" }));
  };

  if (!existing) {
    return (
      <div className="container-fluid">
        <div className="alert alert-warning">Recipe not found.</div>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <input type="file" accept="image/*" ref={fileInputRef} onChange={onFileSelected} style={{ display: "none" }} />

      <div className="d-flex justify-content-between align-items-start mb-3">
        <div>
          <h3 className="mb-1">Edit Recipe</h3>
          <small className="text-muted">{form.title || "Untitled"}</small>
        </div>

        <div className="btn-group">
          <button className="btn btn-outline-secondary" onClick={() => navigate(-1)}>Back</button>
          <button className="btn btn-outline-primary" onClick={() => { setPreview(p => !p); }}>{preview ? "Edit mode" : "Preview"}</button>
          <button className="btn btn-outline-success" onClick={duplicate}>Duplicate</button>
          <button className="btn btn-danger" onClick={remove}>Delete</button>
        </div>
      </div>

      {msg && <div className={`alert alert-${msg.type || "info"}`}>{msg.text}</div>}

      {/* EDIT MODE */}
      {!preview ? (
        <>
          <div className="card shadow-sm mb-3">
            <div className="card-body">
              <div className="row g-3">
                {/* Left column: basic fields */}
                <div className="col-md-8">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label small">Title</label>
                      <input className="form-control" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
                    </div>

                    <div className="col-md-3">
                      <label className="form-label small">Cuisine</label>
                      <input className="form-control" value={form.cuisine} onChange={e => setForm({ ...form, cuisine: e.target.value })} />
                    </div>

                    <div className="col-md-3">
                      <label className="form-label small">Veg / Non-Veg</label>
                      <select className="form-select" value={form.veg ? "true" : "false"} onChange={e => setForm({ ...form, veg: e.target.value === "true" })}>
                        <option value="true">Veg</option>
                        <option value="false">Non-veg</option>
                      </select>
                    </div>

                    <div className="col-12">
                      <label className="form-label small">Tags (comma separated)</label>
                      <input className="form-control" value={(form.tags || []).join(", ")} onChange={e => setForm({ ...form, tags: e.target.value.split(",").map(s => s.trim()).filter(Boolean) })} />
                    </div>
                  </div>
                </div>

                {/* Right column: image controls */}
                <div className="col-md-4">
                  <label className="form-label small d-block mb-2">Recipe Image</label>

                  <div className="mb-3">
                    <img
                      src={getImageForRecipe(form)}
                      alt={form.title}
                      className="rounded w-100"
                      style={{ height: 160, objectFit: "cover", border: "1px solid #eee" }}
                    />
                  </div>

                  <div className="d-grid gap-2">
                    <button type="button" className="btn btn-outline-primary btn-sm" onClick={openFilePicker}>Upload image</button>
                    <div className="input-group input-group-sm">
                      <input type="text" className="form-control" placeholder="Paste image URL" value={imageUrlTemp} onChange={e => setImageUrlTemp(e.target.value)} />
                      <button className="btn btn-outline-secondary" type="button" onClick={applyImageUrl}>Apply</button>
                    </div>
                    <button className="btn btn-outline-danger btn-sm" onClick={removeImage}>Remove image</button>
                  </div>
                </div>

                {/* Ingredients editor */}
                <div className="col-12">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h6 className="mb-0">Ingredients</h6>
                    <div>
                      <button className="btn btn-sm btn-outline-primary me-2" onClick={addIngredientRow}>Add ingredient</button>
                      <button className="btn btn-sm btn-outline-secondary" onClick={() => setForm({ ...form, ingredients: [] })}>Clear</button>
                    </div>
                  </div>

                  <table className="table">
                    <thead className="table-light">
                      <tr><th>Ingredient</th><th>Qty</th><th>Unit</th><th></th></tr>
                    </thead>
                    <tbody>
                      {(form.ingredients || []).map((row, idx) => (
                        <tr key={idx}>
                          <td style={{ minWidth: 200 }}>
                            <select className="form-select" value={row.ingredientId} onChange={e => updateIngredientRow(idx, { ingredientId: e.target.value })}>
                              {ingredientsList.map(i => <option key={i.id} value={i.id}>{i.name}</option>)}
                            </select>
                          </td>
                          <td style={{ width: 140 }}><input className="form-control" value={row.qty} onChange={e => updateIngredientRow(idx, { qty: e.target.value })} /></td>
                          <td style={{ width: 140 }}><input className="form-control" value={row.unit} onChange={e => updateIngredientRow(idx, { unit: e.target.value })} /></td>
                          <td className="text-end"><button className="btn btn-sm btn-danger" onClick={() => removeIngredientRow(idx)}>Remove</button></td>
                        </tr>
                      ))}
                      {(form.ingredients || []).length === 0 && <tr><td colSpan="4" className="text-center text-muted">No ingredients</td></tr>}
                    </tbody>
                  </table>
                </div>

                {/* Steps editor */}
                <div className="col-12">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h6 className="mb-0">Steps</h6>
                    <button className="btn btn-sm btn-outline-primary" onClick={addStep}>Add step</button>
                  </div>

                  <div>
                    {(form.steps || []).map((s, idx) => (
                      <div key={idx} className="mb-2 input-group">
                        <span className="input-group-text" style={{ width: 42 }}>{idx + 1}</span>
                        <input className="form-control" value={s} onChange={e => updateStep(idx, e.target.value)} />
                        <button className="btn btn-outline-danger" onClick={() => removeStep(idx)}>Remove</button>
                      </div>
                    ))}
                    {(form.steps || []).length === 0 && <div className="text-muted">No steps yet.</div>}
                  </div>
                </div>

              </div>

              <div className="mt-3 d-flex justify-content-end">
                <button className="btn btn-secondary me-2" onClick={() => { setForm({ ...existing }); setMsg({ type: "info", text: "Reverted to last saved." }); }}>Revert</button>
                <button className="btn btn-primary" onClick={save}>Save changes</button>
              </div>
            </div>
          </div>
        </>
      ) : (
        // PREVIEW MODE
        <div className="card shadow-sm mb-3">
          <div className="card-body">
            <div className="row">
              <div className="col-md-8">
                <h4>{form.title}</h4>
                <p className="text-muted small mb-1">{form.cuisine} • {form.veg ? "Veg" : "Non-veg"}</p>
                <p className="mb-3">
                  {form.tags && form.tags.map(t => <span key={t} className="badge bg-light text-dark me-1">{t}</span>)}
                </p>

                <h6>Ingredients</h6>
                <ul>
                  {(form.ingredients || []).map((it, i) => (
                    <li key={i}>{it.qty} {it.unit} — {resolveIngredientName(it.ingredientId)}</li>
                  ))}
                </ul>

                <h6>Steps</h6>
                <ol>
                  {(form.steps || []).map((s, i) => <li key={i}>{s}</li>)}
                </ol>
              </div>

              <div className="col-md-4">
                <div className="mb-3">
                  <img src={getImageForRecipe(form)} alt={form.title} className="rounded w-100" style={{ height: 220, objectFit: "cover", border: "1px solid #eee" }} />
                </div>
                <div>
                  <button className="btn btn-outline-primary me-2" onClick={() => setPreview(false)}>Back to edit</button>
                  <button className="btn btn-success" onClick={save}>Save from preview</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
