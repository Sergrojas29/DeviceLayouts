// #include "../code/KDTree.h"
#include <memory>
#include <string>
#include <cmath>
#include <iostream>

struct node
{
    float x;
    float y;
    
    std::string HANDEL;
    std::unique_ptr<node> left;
    std::unique_ptr<node> right;
    
    bool is_leaf;
    
};

class kdtree

{

public:
    std::unique_ptr<node> root;
    std::string test;
    kdtree();
    ~kdtree();
};

kdtree::kdtree(){
    root = nullptr;
    test = "Hello this test";
};

kdtree::~kdtree(){};




int main(int argc, char const *argv[])
{
    kdtree my_tree;
    std::cout << my_tree.root.get() << std::endl;
    std::cout << my_tree.test << std::endl;
    return 0;
}
