import { useState } from "react";
const categories = [
"Starter",
"Main Course",
"Dessert",
"Beverage",
"Salad",
"Snack"
];
const AddItem = () =>{
  const [foodName, setFoodName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    //Submit logic here
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-500 flex items-center justify-center py-12 px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-lg">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Add Food Item
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="foodName" className="block text-gray-700 font-medium mb-2">
              Food Name
            </label>
            <input
              id="foodName"
              type="text"
              className="w-full px-4 py-3 rounded-lg bg-gray-100 border-2 border-transparent focus:border-pink-500 outline-none transition duration-200"
              value={foodName}
              onChange={e => setFoodName(e.target.value)}
              placeholder="e.g. Margherita Pizza"
              required
            />
          </div>
          <div>
            <label htmlFor="price" className="block text-gray-700 font-medium mb-2">
              Price
            </label>
            <input
              id="price"
              type="number"
              min="0"
              step="0.01"
              className="w-full px-4 py-3 rounded-lg bg-gray-100 border-2 border-transparent focus:border-pink-500 outline-none transition duration-200"
              value={price}
              onChange={e => setPrice(e.target.value)}
              placeholder="e.g. 12.50"
              required
            />
          </div>
          <div>
            <label htmlFor="category" className="block text-gray-700 font-medium mb-2">
              Category
            </label>
            <select
              id="category"
              className="w-full px-4 py-3 rounded-lg bg-gray-100 border-2 border-transparent focus:border-pink-500 outline-none transition duration-200"
              value={category}
              onChange={e => setCategory(e.target.value)}
              required
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
              Description
            </label>
            <textarea
              id="description"
              className="w-full px-4 py-3 rounded-lg bg-gray-100 border-2 border-transparent focus:border-pink-500 outline-none transition duration-200 resize-none"
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Describe the food item..."
              rows={3}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-pink-500 to-indigo-500 text-white font-bold shadow-lg hover:from-pink-600 hover:to-indigo-600 transition duration-200"
          >
            Add Food Item
          </button>
          {submitted && (
            <div className="text-green-500 font-semibold text-center mt-2 animate-bounce">
              Food item added successfully!
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
export default AddItem;