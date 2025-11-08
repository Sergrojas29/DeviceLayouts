#include "kdtree/kdtree.hpp"
#include "kdtree/distance.hpp"
#include <iostream>
#include <vector>


int main()
{
    
    kdtree::KDTree tree;



    std::vector<kdtree::Point> allPoints = 
    {{3.0f, 6.0f},{2.0f,7.0f},{17.0f, 15.0f},{6.0f, 12.0f},{13.0f, 15.0f},{9.0f, 1.0f},{10.0f, 19.0f}};

    for (auto &&p : allPoints)
    {
        tree.insert(p);
    }

    tree.print();


    


    return 0;
}

