#pragma once
#include <array>
#include <cstddef>
#include <cmath>

namespace kdtree
{
    /**
     * @brief d = √((x₂ - x₁)² + (y₂ - y₁)² + ... + (n₂ - n₁)²)
     */
    template <typename T, std::size_t K>
    double euclideanDistance(const std::array<T, K> &a, const std::array<T, K> &b);

    /**
     * @brief d = (x₂ - x₁)² + (y₂ - y₁)² + ... + (n₂ - n₁)²
     * 
     */
    template <typename T, std::size_t K>
    double squaredEuclideanDistance(const std::array<T, K> &a, const std::array<T, K> &b);

    /**
     *  @brief Manhattan distance: |x₁-x₂| + |y₁-y₂| + ...+ |n₁-n₂|
     *  
     */
    template <typename T, std::size_t K>
    T manhattanDistance(const std::array<T, K> &a, const std::array<T, K> &b);

} // namespace kdtree


#include "distance.tpp"