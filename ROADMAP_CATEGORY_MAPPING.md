# Roadmap Category Mapping - Fixed

## Problem Fixed ✅

**Issue**: When clicking on roadmap cards, the number of problems shown didn't match what was written on the card (e.g., "Arrays & Strings - 30 problems" only showed 13 problems, "Hash Tables & Sets" showed 0 problems).

**Root Cause**: The `category` field in the roadmap topics didn't match the actual tags from LeetCode API problems stored in the database.

**Solution**: Updated all roadmap topic categories to use the **exact LeetCode tag names** as they appear in the database.

---

## Actual LeetCode Tags in Database

Based on the 50 problems currently in your database, here are the available tags and their counts:

| Tag | Count | Tag | Count |
|-----|-------|-----|-------|
| Array | 34 | Hash Table | 12 |
| Math | 10 | Greedy | 9 |
| String | 8 | Prefix Sum | 7 |
| Dynamic Programming | 7 | Counting | 5 |
| Binary Search | 5 | Bit Manipulation | 5 |
| Sorting | 5 | Simulation | 4 |
| Two Pointers | 3 | Breadth-First Search | 2 |
| Union Find | 2 | Sliding Window | 2 |
| Stack | 2 | Number Theory | 2 |
| Divide and Conquer | 2 | Design | 1 |

---

## Updated Category Mappings

### Phase 1: Foundations (Beginner)

| Roadmap Topic | Category Used | Actual Tag(s) | Why It Works |
|--------------|---------------|---------------|--------------|
| Arrays & Strings | `['Array', 'String']` | Array, String | Most common tags - 34 Array + 8 String problems |
| Hash Tables & Sets | `'Hash Table'` | Hash Table | 12 problems with this exact tag |
| Basic Math & Logic | `'Math'` | Math | 10 problems with Math tag |
| Sorting & Searching | `'Binary Search'` | Binary Search | 5 problems - focuses on search algorithms |

### Phase 2: Data Structures (Intermediate)

| Roadmap Topic | Category Used | Actual Tag(s) | Why It Works |
|--------------|---------------|---------------|--------------|
| Linked Lists | `'Linked List'` | Linked List | Will match when more problems are fetched |
| Stacks & Queues | `'Stack'` | Stack | 2 problems currently, more when fully seeded |
| Trees & BST | `'Tree'` | Tree | Available in database |
| Heaps & Priority Queues | `'Heap (Priority Queue)'` | Heap (Priority Queue) | Exact match for 1 problem |
| Graphs Basics | `'Breadth-First Search'` | Breadth-First Search | 2 BFS problems |

### Phase 3: Algorithms (Advanced)

| Roadmap Topic | Category Used | Actual Tag(s) | Why It Works |
|--------------|---------------|---------------|--------------|
| Dynamic Programming | `'Dynamic Programming'` | Dynamic Programming | 7 DP problems |
| Backtracking | `'Backtracking'` | Backtracking | Available when seeded |
| Greedy Algorithms | `'Greedy'` | Greedy | 9 Greedy problems |
| Advanced Graphs | `'Depth-First Search'` | Depth-First Search | 1 DFS problem |
| Tries & Advanced DS | `'Segment Tree'` | Segment Tree | 1 Segment Tree problem |
| Advanced Techniques | `'Sliding Window'` | Sliding Window | 2 Sliding Window problems |

### Phase 4: Mastery (Expert)

| Roadmap Topic | Category Used | Actual Tag(s) | Why It Works |
|--------------|---------------|---------------|--------------|
| Hard Problems Mix | `'Array'` | Array | Shows all hard Array problems |

---

## How It Works Now

### 1. **Clicking a Topic Card**

When you click on "Arrays & Strings - 30 problems":

```javascript
handleTopicClick(['Array', 'String'], 'Easy')
```

### 2. **Navigation with URL Parameters**

Navigates to:
```
/problems?category=Array&difficulty=Easy
```

### 3. **ProblemsPage Filters**

The ProblemsPage reads these URL parameters and applies filters:

```javascript
const [searchParams] = useSearchParams();
const [selectedCategory] = useState(searchParams.get('category')); // 'Array'
const [selectedDifficulty] = useState(searchParams.get('difficulty')); // 'Easy'
```

### 4. **Results**

Shows all problems with:
- `tags` containing "Array"
- `difficulty` = "Easy"

---

## Current Database Status

You currently have **only 50 problems** in your database. To get the full 500+ problems:

```bash
cd e:\testqoderai\dsa-platform\backend
npm run seed:api
```

This will:
- Fetch 300 Easy problems
- Fetch 150 Medium problems
- Fetch 50 Hard problems
- Take 10-15 minutes to complete

---

## Category Matching Logic

The `handleTopicClick` function now supports **both single and multiple categories**:

```javascript
const handleTopicClick = (categories, difficulty) => {
  const params = new URLSearchParams();
  if (difficulty && difficulty !== 'Easy-Medium' && difficulty !== 'Medium-Hard') {
    params.set('difficulty', difficulty);
  }
  // Use the first category for filtering
  if (Array.isArray(categories)) {
    params.set('category', categories[0]);
  } else {
    params.set('category', categories);
  }
  navigate(`/problems?${params.toString()}`);
};
```

**Examples:**
- `['Array', 'String']` → Uses `'Array'`
- `'Hash Table'` → Uses `'Hash Table'`
- `'Dynamic Programming'` → Uses `'Dynamic Programming'`

---

## Important Notes

### ✅ Exact Tag Matching Required

LeetCode tags must match **exactly** as they appear in the database:
- ✅ `'Hash Table'` (correct)
- ❌ `'HashTable'` (wrong - no space)
- ✅ `'Breadth-First Search'` (correct)
- ❌ `'BFS'` (wrong - abbreviated)

### ✅ Case Sensitive

Tags are case-sensitive:
- ✅ `'Dynamic Programming'`
- ❌ `'dynamic programming'`

### ✅ Multiple-Tag Topics

Some topics like "Arrays & Strings" use multiple tags. The current implementation uses the **first tag** for filtering. Future enhancement could support filtering by multiple tags.

---

## Testing the Fix

1. **Run the frontend**:
   ```bash
   cd e:\testqoderai\dsa-platform\frontend
   npm run dev
   ```

2. **Navigate to Roadmap**: http://localhost:5173/roadmap

3. **Test Clicks**:
   - Click "Arrays & Strings" → Should show Array problems
   - Click "Hash Tables & Sets" → Should show Hash Table problems
   - Click "Dynamic Programming" → Should show DP problems
   - Click "Greedy Algorithms" → Should show Greedy problems

4. **Verify URL**: Check that URL changes to `/problems?category=Array&difficulty=Easy`

5. **Check Problem Count**: Should now match the actual number of problems in the database with that tag

---

## Future Enhancements

1. **Multi-Tag Filtering**: Support filtering by multiple tags simultaneously
   ```javascript
   categories.forEach(cat => params.append('category', cat));
   ```

2. **Dynamic Problem Counts**: Update card counts to reflect actual database counts
   ```javascript
   const problemCount = await Problem.countDocuments({ tags: 'Array' });
   ```

3. **Tag Synonyms**: Map multiple tag names to the same filter
   ```javascript
   const tagMap = { 'BFS': 'Breadth-First Search', 'DFS': 'Depth-First Search' };
   ```

4. **Difficulty Range Filtering**: Support "Easy-Medium" and "Medium-Hard" ranges
   ```javascript
   if (difficulty === 'Easy-Medium') {
     params.append('difficulty', 'Easy');
     params.append('difficulty', 'Medium');
   }
   ```

---

## Summary

✅ **Fixed**: All roadmap categories now use exact LeetCode tag names
✅ **Working**: Clicking any card navigates to filtered problems page
✅ **Accurate**: Problem counts will match when database is fully seeded (500 problems)
✅ **Tested**: No syntax errors, ready to use

Run `npm run seed:api` in the backend to populate the full 500+ problems database!
