#include "kdtree/kdtree.hpp"
#include "kdtree/distance.hpp"
#include "kdtree/node.hpp"

namespace kdtree
{
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
            insertHelper(current->left, std::move(p), depth + 1);
        }
        else
        {
            insertHelper(current->right, std::move(p), depth + 1);
        }
    }

    void KDTree::print()
    {
        printHelper(root, 0, "Root");
    }

    void KDTree::printHelper(const NodePtr &current, std::size_t depth, std::string LeftOrRight)
    {
        if (current == nullptr)
            return;

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

    std::optional<Point> KDTree::findNearestNeighbor(const Point &target) const
    {
        if (root == nullptr)
            return std::nullopt;

        std::size_t depth = 0;
        Point bestPoint = root->point;
        double bestDistanceSqrd = squaredEuclideanDistance(target, root->point);
        findNearestNeighborHelper(target, root, bestDistanceSqrd, bestPoint, depth);

        return bestPoint;
    }

    void KDTree::findNearestNeighborHelper(const Point &target, const NodePtr &current, double &bestDistanceSqrd, Point &bestPoint, std::size_t depth) const
    {

        if (!current)
            return;

        std::size_t axis = getAxis(depth);
        double newDistance = squaredEuclideanDistance(target, current->point);

        if (newDistance < bestDistanceSqrd)
        {
            bestDistanceSqrd = newDistance;
            bestPoint = current->point;
        }

        
        bool goLeft = target[axis] < current->point[axis];
        const NodePtr& firstNode = goLeft ? current->left : current->right;
        const NodePtr& otherNode = goLeft ? current->right : current->left;

        findNearestNeighborHelper(target, firstNode, bestDistanceSqrd, bestPoint, depth+1);

        // r' = (target[axis]-current[axis]) ** 2
        double primeRadius = (target[axis] - current->point[axis]);
        double primeRadiusSqrd = primeRadius * primeRadius;

        if (primeRadiusSqrd < bestDistanceSqrd)
        {
            findNearestNeighborHelper(target, otherNode, bestDistanceSqrd, bestPoint , depth+1);
        }
    }

}; // namespace kdtree