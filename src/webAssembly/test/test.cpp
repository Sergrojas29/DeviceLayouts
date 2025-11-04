#include <vector>
#include <memory>
#include <iostream>

namespace kdtree
{

    using Point = std::vector<float>;

    struct Node
    {
        Point point;
        std::unique_ptr<Node> left;
        std::unique_ptr<Node> right;

        explicit Node(Point point)
            : point(std::move(point)), left(nullptr), right(nullptr) {}
    };
    using NodePtr = std::unique_ptr<Node>;

} // namespace kdtree

int main()
{
    using namespace kdtree;
    NodePtr root = std::make_unique<Node>(Point{0.0f, 0.0f});

    root->left = std::make_unique<Node>(Point{3.0, 7.0f});
    root->right = std::make_unique<Node>(Point{2.0, 8.0f});

    std::cout << "Left child: (" << root->left->point[0] << ", "<< root->left->point[1] << ")\n";
    std::cout << "Right child: (" << root->right->point[0] << ", "<< root->right->point[1] << ")\n";

    return 0;
}