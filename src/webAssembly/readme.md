##KDTree File Structure



```
kdtree/
├── CMakeLists.txt
├── README.md
├── LICENSE
│
├── include/
│   └── kdtree/
│       ├── kdtree.hpp          
│       ├── kdtree.tpp          
│       ├── node.hpp               
│       ├── distance.hpp        
│       
│
├── src/                        
│   └── kdtree.cpp              
│
├── tests/
│   ├── CMakeLists.txt
│   ├── test_main.cpp
│   ├── test_kdtree.cpp
│   ├── test_nearest_neighbor.cpp
│   └── test_distance.cpp
│
├── examples/
│   ├── basic_usage.cpp
│   ├── nearest_neighbor.cpp
│   └── range_query.cpp
│
└── benchmarks/                 
    └── benchmark_kdtree.cpp

```


```
Creat and build

mkdir build
cmake ..
cmake --build .



```
```
Clear and Rebuild
cd build
rm -rf *
cmake ..
cmake --build .
```