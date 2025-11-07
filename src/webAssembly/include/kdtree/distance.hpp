#pragma once
#include <cmath>

namespace kdtree
{
    /**
     * @brief d = √((x₂ - x₁)² + (y₂ - y₁)² + ... + (n₂ - n₁)²)
     */
    double euclideanDistance(const Point &a, const Point &b);

    /**
     * @brief d = (x₂ - x₁)² + (y₂ - y₁)² + ... + (n₂ - n₁)²
     * 
     */
    double squaredEuclideanDistance(const Point &a, const Point &b);

    /**
     *  @brief Manhattan distance: |x₁-x₂| + |y₁-y₂| + ...+ |n₁-n₂|
     *  
     */
    double manhattanDistance(const Point &a, const Point &b);

} // namespace kdtree

