#include "kdtree/kdtree.hpp"

namespace kdtree
{

    KDTree::KDTree(std::size_t dimensions)
        : root(nullptr), dimensions_(dimensions), count_(0) {
          };

    void KDTree::insert(Point p)
    {
        insertHelper(root, std::move(p) , 0);
        ++count_;
    }

    void KDTree::insertHelper(NodePtr& current, Point p, std::size_t depth)
    {
        if (!current)
        {
            current = std::make_unique<Node>(std::move(p));
            return;
        };

        std::size_t axis = getAxis(depth);
        
        if(p[axis] < current->point[axis]){
            insertHelper(current->left, std::move(p), depth++);
        }else
        {
            insertHelper(current->right, std::move(p), depth++);
        }
        

    }

    void KDTree::insertRecursive(NodePtr& current, Point p, std::size_t depth){
        
    }


    std::size_t KDTree::getAxis(std::size_t depth) const{
        return depth % dimensions_;
    }

}; // namespace kdtree