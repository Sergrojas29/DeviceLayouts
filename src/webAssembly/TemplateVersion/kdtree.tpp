
namespace kdtree
{
    

    template <typename T, size_t K>
    void KDTree<T, K>::insert(typename KDTree<T, K>::Point p)
    {
        insertHelper(root, std::move(p), 0);
        ++count_;
    }

   
    template <typename T, size_t K>
    void KDTree<T, K>::insertHelper(
        typename KDTree<T, K>::NodePtr& current,
        typename KDTree<T, K>::Point p,
        size_t depth)
    {
        if (!current)
        {
            current = std::make_unique<typename KDTree<T, K>::Node>(std::move(p));
            return;
        }

        size_t axis = getAxis(depth); 

        if (p[axis] < current->point[axis])
        {
            insertHelper(current->left, std::move(p), depth + 1);
        }
        else
        {
            insertHelper(current->right, std::move(p), depth + 1);
        }
    }

    template <typename T, size_t K>
    void KDTree<T, K>::print()
    {
        printHelper(root, 0, "Root");
    }

    template <typename T, size_t K>
    void KDTree<T, K>::printHelper(
        const typename KDTree<T, K>::NodePtr& current,
        size_t depth,
        std::string LeftOrRight)
    {
        if (current == nullptr) return;

        std::cout << "Depth: " << depth << " ";
        std::cout << LeftOrRight << " (";
        
        for (size_t i = 0; i < K; ++i)
        {
            std::cout << current->point[i];
            if (i < K - 1) std::cout << ", ";
        }
        std::cout << ")\n";
        
        printHelper(current->left, depth + 1, "Left");
        printHelper(current->right, depth + 1, "Right");
    }

    template <typename T, size_t K>
    std::optional<typename KDTree<T, K>::Point> KDTree<T, K>::findNearestNeighbor(const typename KDTree<T, K>::Point& target) const
    {
        // placeholder implementation: no nearest neighbor found
        return std::nullopt;
    }
    
    template <typename T, size_t K>
    void <typename KDTree<T, K>::Point> KDTree<T, K>::findNearestNeighborHelper(const typename KDTree<T, K>::Point& target){

    }

} // namespace kdtree