#pragma once
#include "node.hpp"
#include <memory>
#include <optional>
#include <string>
#include <iostream>
#include <cstddef>

namespace kdtree
{
    template <typename T, size_t K>
    class KDTree
    {
    public:
        using Point = kdtree::Point<T, K>;

    private:
        using Node = kdtree::Node<T, K>;
        using NodePtr = kdtree::NodePtr<T, K>;

        NodePtr root;
        size_t count_;

    public:
        explicit KDTree() : root(nullptr), count_(0) {}

        void insert(Point p);
        std::optional<Point> findNearestNeighbor(const Point& target) const;
        void print();

        size_t size() const { return count_; }
        constexpr size_t dimensions() const { return K; }

    private:
        // Private helper methods
        void insertHelper(NodePtr& current, Point p, size_t depth);
        void printHelper(const NodePtr& current, size_t depth, std::string LeftOrRight);
        void findNearestNeighborHelper(const Point& target) const;

        size_t getAxis(size_t depth) const
        {
            return depth % K;
        }
    };

} // namespace kdtree

#include "kdtree.tpp"