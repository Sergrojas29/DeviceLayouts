#include <gtest/gtest.h>
#include "kdtree/distance.hpp" // Assumes your distance functions are here
#include <vector>

// Basic GTest syntax: TEST(TestSuiteName, TestName)
TEST(DistanceTest, Euclidean2D) {
    // Arrange
    std::vector<double> p1 = {0.0, 0.0};
    std::vector<double> p2 = {3.0, 4.0};

    // Act
    // Assuming a function signature like: 
    // double kdtree::distance::euclidean(const Point& p1, const Point& p2);
    double dist = kdtree::distance::euclidean(p1, p2);

    // Assert
    EXPECT_DOUBLE_EQ(dist, 5.0);
}

TEST(DistanceTest, Euclidean3D_SamePoint) {
    // Arrange
    std::vector<double> p1 = {1.5, 2.5, 3.5};
    std::vector<double> p2 = {1.5, 2.5, 3.5};

    // Act
    double dist = kdtree::distance::euclidean(p1, p2);

    // Assert
    EXPECT_DOUBLE_EQ(dist, 0.0);
}