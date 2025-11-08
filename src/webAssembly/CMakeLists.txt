cmake_minimum_required(VERSION 3.20)
project(kdtree VERSION 1.0.0)

set(CMAKE_CXX_STANDARD 23)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# -------------------------------------------------------------------
# Google Test Integration (THIS IS THE MISSING PART)
# -------------------------------------------------------------------
# Enable testing for CTest
enable_testing()

# Include FetchContent module to download GTest
include(FetchContent)

FetchContent_Declare(
  googletest
  GIT_REPOSITORY https://github.com/google/googletest.git
  GIT_TAG        release-1.11.0
)
FetchContent_MakeAvailable(googletest)
add_library(GTest::GTest INTERFACE IMPORTED)
target_link_libraries(GTest::GTest INTERFACE gtest_main)
# -------------------------------------------------------------------


# --- Your Library ---
add_library(kdtree
    src/kdtree.cpp
    src/distance.cpp
)

target_include_directories(kdtree PUBLIC
    ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# --- Examples ---
add_executable(basic_usage
    examples/basic_usage.cpp
)
target_link_libraries(basic_usage PRIVATE kdtree)

# --- Tests ---
# This command adds the 'tests' directory.
# It MUST come AFTER FetchContent_MakeAvailable(googletest).
add_subdirectory(tests)


# --- Platform-Specific Fixes ---
# Note: Your build is using MSVC, not MinGW, so the MINGW block
# won't run, which is correct for this build.
if (MINGW)
    target_link_libraries(basic_usage PRIVATE stdc++exp)
endif()

if(MSVC)
    target_compile_options(basic_usage PRIVATE /W4)
else()
    target_compile_options(basic_usage PRIVATE -Wall -Wextra -Wpedantic)
endif()