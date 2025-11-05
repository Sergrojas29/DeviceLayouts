
#pragma once
#include <array>
#include <memory>
#include <cstddef>

namespace kdtree
{

    template <typename T, size_t K>  // ← Use size_t without std::
    using Point = std::array<T, K>;
    
    template <typename T, size_t K>
    struct Node
    {
        Point<T, K> point;
        std::unique_ptr<Node> left;
        std::unique_ptr<Node> right;
        
        explicit Node(Point<T, K> p)
            : point(std::move(p)), left(nullptr), right(nullptr) {}
    };
    
    template <typename T, size_t K>
    using NodePtr = std::unique_ptr<Node<T, K>>;

} // namespace kdtree