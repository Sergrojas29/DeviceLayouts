#include "kdtree/kdtree.hpp"
#include <iostream>

int main(int argc, char const *argv[])
{
    kdtree::KDTree tree(2);

    tree.insert({3.6f, 6.0f});

    std::cout << tree.root.get()->point[0] << "\n";


    return 0;
}

