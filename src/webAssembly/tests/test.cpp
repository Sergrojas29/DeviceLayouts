#include <vector>
#include <memory>
#include <iostream>
#include <string>
#include <print>
#include "kdtree/kdtree.hpp"
struct scenario
{
    std::string name;
    std::vector<kdtree::Point> points;
    kdtree::Point target;
    kdtree::Point expectedNearest;
};

scenario scenario1 = {
    "1. Basic Grid Case",
    {{1, 1}, {4, 4}, {7, 7}, {1, 7}, {7, 1}},
    {5, 5},
    {4, 4}};

scenario scenario2 = {
    "2. Single Point Tree",
    {{10, 20}},
    {1, 1},
    {10, 20}};

scenario scenario3 = {
    "3. Coincident Target",
    {{0, 0}, {5, 5}, {10, 10}},
    {5, 5},
    {5, 5}};

scenario scenario4 = {
    "4. Collinear Points (Vertical)",
    {{5, 1}, {5, 10}, {5, 2}, {5, 8}},
    {5, 4},
    {5, 2}};
scenario scenario5 = {
    "5. Simple test",
    {
        {2, 3}, 
        {8, 7}
    },
    {6, 4},
    // Correct answer has distance 13
    {8, 7} 
};

scenario scenario6 = {
    "6. Duplicate Points",
    {{1, 1}, {5, 5}, {5, 5}, {10, 10}},
    {4, 4},
    {5, 5}};
scenario scenario7 = {
    "7. Large Coordinates",
    {{100, 500}, {200, 100}, {50, 700}, {800, 800}},
    {150, 150},
    {200, 100}};

scenario scenario8 = {
    "8. Different Quadrants",
    {{-1, -1}, {1, 1}, {-1, 1}, {1, -1}},
    {0.5, 0.5},
    {1, 1}};

scenario scenario9 = {
    "9. Deeply Nested Nearest",
    {
        {50, 50}, {10, 90}, {90, 90}, {10, 10}, {90, 10}, {52, 51} // The actual nearest point
    },
    {51, 51},
    {52, 51}};
scenario scenario10 = {
    "10. Horizontal Split Edge Case",
    {{1, 5}, {10, 5}, {5, 1}, {5, 10}},
    {3, 5},
    {1, 5}};

void testKdtree(const scenario& test)
{
    kdtree::KDTree tree;
    std::cout << test.name << ": \n";

    for (const auto& p : test.points)
        tree.insert(p);

    auto nearest = tree.findNearestNeighbor(test.target);

    if (nearest && *nearest == test.expectedNearest)
        std::cout << "\033[1;32mPASSED !!\033[0m\n";
    else
        std::cout << "\033[31mFAILED!!!\033[0m\n";
}

int main()
{
    testKdtree(scenario1);
    testKdtree(scenario2);
    testKdtree(scenario3);
    testKdtree(scenario4);
    testKdtree(scenario5);
    testKdtree(scenario6);
    testKdtree(scenario7);
    testKdtree(scenario8);
    testKdtree(scenario9);
    testKdtree(scenario10);

    return 0;
}
