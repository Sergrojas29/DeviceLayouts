#include "KDTree.h"

KDTree::KDTree(){
    root = NULL;
    test= "it worked";
}


std::unique_ptr<node> KDTree::initialize_point(std::string handel, float x_coordinate, float y_coordinate){
    std::unique_ptr<node> point;
    point->HANDEL = handel;
    point->x = x_coordinate;
    point->y = y_coordinate;
    return point;
};

void KDTree::insert(std::unique_ptr<node> point){
    return ;
};

float KDTree::get_euclidan_distance(std::unique_ptr<node> current_node, std::unique_ptr<node> new_node){
    return 1.0f;
};

std::unique_ptr<node> KDTree::get_nearest_neighbor(){
    std::unique_ptr<node> point;
    
    return point; 
}
