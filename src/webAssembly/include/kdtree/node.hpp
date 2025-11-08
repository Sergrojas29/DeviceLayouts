#pragma once
#include <array>
#include <memory>

namespace kdtree
{
    //! 2D tree Right now!!!!!!!!
    using Point = std::array<float, 2>;
    
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