var search = function(nums, target) {
    function check(i) {
        const x = nums[i];
        if (x > nums[right]) {
            return target > nums[right] && x >= target;
        }
        return target > nums[right] || x >= target;
    }

    let left = -1, right = nums.length - 1; // 开区间 (-1, n-1)
    while (left + 1 < right) { // 开区间不为空
        const mid = Math.floor((left + right) / 2);
        if (nums[mid] === nums[right]) {
            right--;
        } else if (check(mid, right)) {
            right = mid;
        } else {
            left = mid;
        }
    }
    return nums[right] === target;
};

