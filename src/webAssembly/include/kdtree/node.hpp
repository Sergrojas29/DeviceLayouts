
#pragma once
#include <vector>
#include <memory>

namespace kdtree
{

    using Point = std::vector<float>;

    struct Node
    {
        Point point;
        std::unique_ptr<Node> left;
        std::unique_ptr<Node> right;

        explicit Node(Point p)
            : point(std::move(p)), left(nullptr), right(nullptr) {}
    };
    using NodePtr = std::unique_ptr<Node>;

} // namespace kdtree