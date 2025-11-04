#include "kdtree/kdtree.hpp"


namespace kdtree{

    KDTree::KDTree(std::size_t dimensions)
        :root(nullptr), dimensions_(dimensions), count_(0)
    {
    };

    void KDTree::insert(Point p){
        //BASECASE
        if(root== nullptr){
            root = std::make_unique<Node>(std::move(p));
        };
    }



};// namespace kdtree