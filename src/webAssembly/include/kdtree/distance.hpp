#pragma once
#include "node.hpp"
#include <cmath>
#include <cstddef>

namespace kdtree
{
    template <typename T, size_t K>
    double  euclideanDistance(const Point<T, K> &a, const Point<T, K> &b);

    template <typename T, size_t K>
    double  squaredEuclideanDistance(const Point<T, K> &a, const Point<T, K> &b);

    // Manhattan distance: |x₁-x₂| + |y₁-y₂| + ...
    template <typename T, size_t K>
    double  manhattanDistance(const Point<T, K> &a, const Point<T, K> &b);

} // namespace kdtree
#include "distance.tpp"