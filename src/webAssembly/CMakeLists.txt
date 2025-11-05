cmake_minimum_required(VERSION 3.20)
project(kdtree VERSION 1.0.0)

set(CMAKE_CXX_STANDARD 23)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

add_library(kdtree INTERFACE)

target_include_directories(kdtree INTERFACE
    ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Example executable
add_executable(kdtree_test
    examples/basic_usage.cpp
)

target_link_libraries(kdtree_test PRIVATE kdtree)

if(MSVC)
    target_compile_options(kdtree_test PRIVATE /W4)
else()
    target_compile_options(kdtree_test PRIVATE -Wall -Wextra -Wpedantic)
endif()