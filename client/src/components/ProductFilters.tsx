import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import type { Filter } from "@shared/schema";

interface ProductFiltersProps {
  filters: Filter;
  onFilterChange: (filters: Filter) => void;
  minPrice: number;
  maxPrice: number;
}

const categories = ["All", "Earrings", "Necklaces", "Bangles", "Rings", "Sets", "Chains"];
const materials = ["All", "Gold Plated", "Silver", "Rose Gold", "Kundan", "Pearl"];

export function ProductFilters({
  filters,
  onFilterChange,
  minPrice,
  maxPrice,
}: ProductFiltersProps) {
  const priceRange = filters.maxPrice || maxPrice;

  return (
    <Card className="p-6 bg-card border-card-border rounded-2xl sticky top-24">
      <h3 className="text-xl font-heading font-bold text-card-foreground mb-6">
        Filters
      </h3>

      {/* Category Filter */}
      <div className="mb-6">
        <Label className="text-card-foreground font-accent font-semibold mb-3 block">
          Category
        </Label>
        <RadioGroup
          value={filters.category || "All"}
          onValueChange={(value) =>
            onFilterChange({
              ...filters,
              category: value === "All" ? undefined : value,
            })
          }
        >
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2 mb-2">
              <RadioGroupItem
                value={category}
                id={`category-${category}`}
                data-testid={`radio-category-${category.toLowerCase()}`}
              />
              <Label
                htmlFor={`category-${category}`}
                className="text-muted-foreground cursor-pointer hover:text-gold transition-colors"
              >
                {category}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Price Filter */}
      <div className="mb-6">
        <Label className="text-card-foreground font-accent font-semibold mb-3 block">
          Price Range
        </Label>
        <div className="px-2">
          <Slider
            value={[priceRange]}
            onValueChange={([value]) =>
              onFilterChange({
                ...filters,
                maxPrice: value,
              })
            }
            max={maxPrice}
            min={minPrice}
            step={100}
            className="mb-4"
            data-testid="slider-price"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>₹{minPrice}</span>
            <span className="text-gold font-semibold">₹{priceRange}</span>
          </div>
        </div>
      </div>

      {/* Material Filter */}
      <div>
        <Label className="text-card-foreground font-accent font-semibold mb-3 block">
          Material
        </Label>
        <RadioGroup
          value={filters.material || "All"}
          onValueChange={(value) =>
            onFilterChange({
              ...filters,
              material: value === "All" ? undefined : value,
            })
          }
        >
          {materials.map((material) => (
            <div key={material} className="flex items-center space-x-2 mb-2">
              <RadioGroupItem
                value={material}
                id={`material-${material}`}
                data-testid={`radio-material-${material.toLowerCase().replace(/\s+/g, '-')}`}
              />
              <Label
                htmlFor={`material-${material}`}
                className="text-muted-foreground cursor-pointer hover:text-gold transition-colors"
              >
                {material}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </Card>
  );
}
