import { useEffect, useState } from "react";
import "./CategoryFilter.css";

function CategoryFilter({
  selectedCategories,
  setSelectedCategories,
}: {
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
}) {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://bookprojectwhalenbackend.azurewebsites.net/api/Book"
        );
        const data = await response.json();
        console.log("Fetched categories:", data);

        let uniqueCategories: string[] = [];

        if (data && Array.isArray(data.books)) {
          uniqueCategories = Array.from(
            new Set(
              data.books
                .map((book: any) => book.category)
                .filter((cat: any) => typeof cat === "string")
            )
          );
        } else {
          console.error("Unexpected response format:", data);
        }

        setCategories(uniqueCategories); // ✅ This now works because it's always defined above
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  function handleCheckboxChange({ target }: { target: HTMLInputElement }) {
    const updatedCategories = selectedCategories.includes(target.value)
      ? selectedCategories.filter((c) => c !== target.value)
      : [...selectedCategories, target.value];

    setSelectedCategories(updatedCategories);
  }

  return (
    <div className="category-filter">
      <h5>Project Types</h5>
      <div className="category-list">
        {categories.map((c) => (
          <div key={c} className="category-item">
            <input
              type="checkbox"
              id={c}
              value={c}
              className="category-checkbox"
              onChange={handleCheckboxChange}
            />
            <label htmlFor={c}>{c}</label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryFilter;












