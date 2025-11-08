#include <gtest/gtest.h>
#include "kdtree/kdtree.hpp" // Your main k-d tree header

// Assume your kdtree is templated, e.g., kdtree::KDTree<size_t K, typename T>
// We'll test with a 2D tree of doubles.
using Point2D = std::vector<double>;

TEST(KDTreeTest, Construction) {
    // Arrange
    kdtree::KDTree tree;

    // Act (nothing to act)

    // Assert
    // Assuming your tree has methods like isEmpty() and size()
    EXPECT_TRUE(tree.isEmpty());
    EXPECT_EQ(tree.size(), 0);
}

TEST(KDTreeTest, InsertOne) {
    // Arrange
    kdtree::KDTree tree;
    Point2D p1 = {1.0, 2.0};

    // Act
    tree.insert(p1);

    // Assert
    EXPECT_FALSE(tree.isEmpty());
    EXPECT_EQ(tree.size(), 1);
}