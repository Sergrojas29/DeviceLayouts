#pragma once
#include "node.hpp"
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

    double manhattanDistance(const Point &a, const Point &b);

} // namespace kdtree

