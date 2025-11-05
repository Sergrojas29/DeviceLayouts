#include <iostream>
#include <array>

int main(int argc, char const *argv[])
{
    int a[10];
    std::cout << a[0] << "\n";
    a[17] = 6;

    std::array<int, 10> b;

    b[17] =6;

    return 0;
}
