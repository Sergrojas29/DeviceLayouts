#pragma once
#include "node.hpp"
#include <vector>
#include <memory>


namespace kdtree
{

    class KDTree
    {
    public:
        NodePtr root;
        std::size_t dimensions_;
        std::size_t count_;

        explicit KDTree(std::size_t dimensions);

        void insert(Point p);
        // void search(Point P); 

        void print();

        void insertRecursive(NodePtr& current, Point p, std::size_t depth);

    private:
        void insertHelper(NodePtr& current, Point p, std::size_t depth);    
        std::size_t getAxis(std::size_t depth)const;

    };

} // namespace kdtree
