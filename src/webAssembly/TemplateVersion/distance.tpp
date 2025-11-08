namespace kdtree
{
    // Didn't use Point template it causes errors

    template <typename T, std::size_t K>
    double euclideanDistance(const std::array<T, K> &a, const std::array<T, K> &b)
    {
        double ret = 0;

        for (std::size_t i = 0; i < K; ++i)
        {
            double diff = static_cast<double>(a[i]) - static_cast<double>(b[i]);
            ret += diff * diff;
        }

        return std::sqrt(ret);
    }

    // In distance.tpp

    template <typename T, std::size_t K>
    double squaredEuclideanDistance(const std::array<T, K> &a, const std::array<T, K> &b)
    {
        double ret = 0;
        for (std::size_t i = 0; i < K; ++i)
        {

            double diff = static_cast<double>(a[i]) - static_cast<double>(b[i]);
            ret += diff * diff;
            
        }
        return ret;
    }

    template <typename T, std::size_t K>
    T manhattanDistance(const std::array<T, K> &a, const std::array<T, K> &b)
    {
        T ret = 0;
        for (std::size_t i = 0; i < K; ++i)
        {
            ret += std::abs(a[i] - b[i]);
        }
        return ret;
    }

} // namespace kdtree
