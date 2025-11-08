#pragma once
#include "node.hpp"
#include "distance.hpp"
#include <memory>
#include <optional>
#include <string>
#include <iostream>
#include <print>

namespace kdtree

{
    class KDTree
    {
    private:
        NodePtr root;
        std::size_t count_;
        std::size_t dimensions_;

    public:
        explicit KDTree() : root(nullptr), count_(0),dimensions_(2){}

        void insert(Point p);

        //Implemation Need
        std::optional<Point> findNearestNeighbor(const Point& target) const;
        void findNearestNeighborHelper(const Point &target, const NodePtr &current, double &bestDistanceSqrd, Point &bestPoint, std::size_t depth)const;
        
        
        void print();
        std::size_t size() const { return count_; }
        constexpr std::size_t dimensions() const { return dimensions_;}

    private:
        void insertHelper(NodePtr& current, Point p, std::size_t depth);
        void printHelper(const NodePtr& current, std::size_t depth, std::string LeftOrRight);
        
        
        

        std::size_t getAxis(std::size_t depth) const
        {
            return depth % dimensions_;
        }
    };

} // namespace kdtree
