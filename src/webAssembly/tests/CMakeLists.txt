# This executable will contain all your tests
add_executable(kdtree_tests
    test_kdtree.cpp
    test_nearest_neighbor.cpp
    test_distance.cpp
)

# Link your kdtree library AND the GTest targets
target_link_libraries(kdtree_tests PRIVATE
    kdtree       # Your library
    gtest        
    gtest_main   # Provides main()
)

# Add platform-specific flags for the test executable
if (MINGW)
    target_link_libraries(kdtree_tests PRIVATE stdc++exp)
endif()

if(MSVC)
    target_compile_options(kdtree_tests PRIVATE /W4)
else()
    target_compile_options(kdtree_tests PRIVATE -Wall -Wextra -Wpedantic)
endif()

# Include the GoogleTest module to find tests
include(GoogleTest)

# This command discovers all TEST() and TEST_F() cases
# in your executable and adds them to CTest.
gtest_discover_tests(kdtree_tests)