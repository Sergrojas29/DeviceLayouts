#include "kdtree/distance.hpp"
#include "kdtree/node.hpp"

namespace kdtree
{

    double euclideanDistance(const Point &a, const Point &b)
    {
        double ret = 0;

        std::size_t dimensions = a.size();

        for (std::size_t i = 0; i < dimensions; ++i)
        {
            double diff = static_cast<double>(a[i]) - static_cast<double>(b[i]);
            ret += diff * diff;
        }

        return std::sqrt(ret);
    }

    double squaredEuclideanDistance(const Point &a, const Point &b)
    {
        double ret = 0;

        std::size_t dimensions = a.size();

        for (std::size_t i = 0; i < dimensions; ++i)
        {

            double diff = static_cast<double>(a[i]) - static_cast<double>(b[i]);
            ret += diff * diff;
        }
        return ret;
    }

    double manhattanDistance(const Point &a, const Point &b)
    {
        double ret = 0;

        std::size_t dimensions = a.size();
        for (std::size_t i = 0; i < dimensions; ++i)
        {
            ret += std::abs(a[i] - b[i]);
        }
        return ret;
    }

} // using namespace kdtree