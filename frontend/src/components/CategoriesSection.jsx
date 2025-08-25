import CategoryCard from "./CategoryCard"

export default function CategoriesSection({ productsByCategory, categories }) {
    return (
        <div className="d-flex justify-content-center gap-3">
            {categories.map(category => {
                const p = productsByCategory[category];
                if (!p) return null;
                return <CategoryCard key={p.id} product={p} category={category} />
            })}
        </div>
    )
}
