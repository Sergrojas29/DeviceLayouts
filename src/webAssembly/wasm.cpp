
#include <cstdio>


int multiply_by_two(int value){
    return value * 2;
}

int main(int argc, char const *argv[])
{
    int ret = multiply_by_two(4);
    printf("%d", ret);
    return 0;
}
