#include "kdtree/kdtree.hpp"

namespace kdtree
{

    KDTree::KDTree(std::size_t dimensions)
        : root(nullptr), dimensions_(dimensions), count_(0) {
          };

    void KDTree::insert(Point p)
    {
        insertHelper(root, std::move(p), 0);
        ++count_;
    }

    void KDTree::insertHelper(NodePtr &current, Point p, std::size_t depth)
    {
        if (!current)
        {
            current = std::make_unique<Node>(std::move(p));
            return;
        };

        std::size_t axis = getAxis(depth);

        if (p[axis] < current->point[axis])
        {
            insertHelper(current->left, std::move(p), depth+1);
        }
        else
        {
            insertHelper(current->right, std::move(p), depth+1);
        }
    }

    void KDTree::print(){
        printHelper(root, 0, "");
    }

    void KDTree::printHelper(NodePtr& current, std::size_t depth, std::string LeftOrRight){
        if(current == nullptr) return;

        std::print("Depth: {} ", depth);
        std::print("{} (", LeftOrRight);
        
        for (int i = 0; i < dimensions_; i++)
        {
            std::print("{}{}", current->point[i], (i < dimensions_ - 1 ? ", " : ""));
        }
        std::print(")\n");
        
        ++depth;
        printHelper(current->left, depth, "Left");
        printHelper(current->right, depth, "Right");
    };

    std::optional<Point> KDTree::findNearestNeighbor(const Point& target)const{
        if(root == nullptr) return std::nullopt;
        Point best = root->point;
        return best;
    }



    float KDTree::distance(Point& current ,const Point& target){

    }

    std::size_t KDTree::getAxis(std::size_t depth) const
    {
        return depth % dimensions_;
    }

}; // namespace kdtree