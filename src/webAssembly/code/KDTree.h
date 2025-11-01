#ifndef KDT_H__
#define KDT_H__

#include <memory>
#include <string>
#include <cmath>



#define K 2;


struct node
{
    float x;
    float y;
    
    std::string HANDEL;
    std::unique_ptr<node> left;
    std::unique_ptr<node> right;
    
    bool is_leaf;
    
};


class KDTree
{
private:
    static int count_of_tree;
public:
    std::unique_ptr<node> root;
    std::string test;

    KDTree();
    ~KDTree(){};

    std::unique_ptr<node> initialize_point(std::string handel, float x_coordinate, float y_coordinate);
    void insert( std::unique_ptr<node> point);
    float get_euclidan_distance(std::unique_ptr<node> current_node , std::unique_ptr<node> new_node);
    std::unique_ptr<node> get_nearest_neighbor();



};






#endif