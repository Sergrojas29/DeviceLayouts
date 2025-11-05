#pragma once
#include "node.hpp"
#include <vector>
#include <memory>
#include <iostream>
#include <print>
#include <optional>


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
        std::optional<Point> findNearestNeighbor(const Point& target) const;
        void print();
        
        
        private:
        void insertHelper(NodePtr& current, Point p, std::size_t depth);
        void printHelper(NodePtr& current, std::size_t depth, std::string LeftOrRight);   
        void findNearestNeighborHelper(const Point& target) const;

        float distance(Point& current ,const Point& target);
        std::size_t getAxis(std::size_t depth)const;

    };

} // namespace kdtree
