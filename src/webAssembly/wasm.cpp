
#include <cstdio>

#include <iostream>
#include <string>
#include <memory>




struct node{
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
        kdtree(){};
        ~kdtree(){};




};



int main(int argc, char const *argv[])
{
    kdtree tree = kdtree();
    node root;
    root.HANDEL = "Root";

    std::cout << root.HANDEL << "\n" ;
}
