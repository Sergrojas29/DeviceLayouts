#include <vector>
#include <memory>
#include <iostream>

int main(int argc, char const *argv[])
{
    int* ptr = nullptr;
    if(ptr){
        std::cout << "ptr is null" << "\n";
    }
    
    int num = 5;
    
    ptr = &num;
    
    
    if(ptr){
        std::cout << "ptr is set" << "\n";
    }

    return 0;
}
