# 🔌 API Integration Guide - Real LeetCode Problems

## Overview

The DSA platform now uses **real data from LeetCode's public API** to fetch actual coding problems instead of using hardcoded sample data.

---

## 🌐 API Source

**LeetCode Public API**
- Problems List: `https://leetcode.com/api/problems/algorithms/`
- Problem Details: `https://leetcode.com/graphql` (GraphQL API)
- **Free to use** - No API key required
- **No rate limiting** for reasonable usage

---

## 📊 What Data is Fetched

### Problem Information
- ✅ **Title** - Problem name
- ✅ **Description** - Full problem statement (HTML cleaned)
- ✅ **Difficulty** - Easy, Medium, or Hard
- ✅ **Tags** - Topics like Array, String, Dynamic Programming
- ✅ **Acceptance Rate** - Real statistics from LeetCode
- ✅ **Submission Count** - Total submissions
- ✅ **Code Snippets** - Starter code for JavaScript, Python, Java, C++
- ✅ **Hints** - Problem hints from LeetCode
- ✅ **Sample Test Cases** - Example inputs

### Company Data
- 6 top tech companies (Google, Amazon, Microsoft, Meta, Apple, Netflix)
- Problems randomly associated with companies
- Company logos from CDN

---

## 🚀 How to Use

### Option 1: Seed with Real LeetCode Data (Recommended)

```bash
cd backend
npm run seed:api
```

**This will:**
- Fetch 50 real problems from LeetCode
- Process problem details including code snippets
- Store in MongoDB with all metadata
- Associate problems with companies
- Takes ~2-3 minutes to complete

**Output:**
```
✅ Database seeded successfully with real LeetCode data!
📊 Total: 50 problems from LeetCode
🏢 Total: 6 companies
```

### Option 2: Use Sample Data (Fast)

```bash
cd backend
npm run seed
```

**This will:**
- Use the original 10 hardcoded problems
- Instant seeding (~1 second)
- Good for testing/development

---

## 🔧 Configuration

### Customize Number of Problems

Edit `backend/seed/seedFromAPI.js`:

```javascript
// Line 115
const problemsToProcess = leetcodeProblems
  .filter(item => !item.paid_only)
  .slice(0, 50);  // Change 50 to desired number (max ~3000)
```

**Recommendations:**
- **50 problems** - Good balance (2-3 minutes)
- **100 problems** - More variety (5-6 minutes)
- **20 problems** - Quick testing (1 minute)

### Filter by Difficulty

```javascript
const problemsToProcess = leetcodeProblems
  .filter(item => !item.paid_only)
  .filter(item => item.difficulty.level === 1)  // Only Easy
  .slice(0, 50);
```

Difficulty levels:
- `1` = Easy
- `2` = Medium
- `3` = Hard

---

## 📝 Data Mapping

### Difficulty Mapping
```javascript
LeetCode Level → Our Format
1              → Easy
2              → Medium
3              → Hard
```

### Category Detection
Problems are categorized based on their tags:
- **Array** - array-related tags
- **String** - string-related tags
- **Linked List** - linked-list tags
- **Tree** - tree, binary-tree tags
- **Graph** - graph tags
- **Dynamic Programming** - dp, dynamic-programming tags
- **Stack** - stack tags
- And more...

### Code Snippets
LeetCode provides starter code in multiple languages:
- JavaScript
- Python3
- Java
- C++
- And 15+ more languages (we use the first 4)

---

## 🛠️ Implementation Details

### API Requests

**1. Fetch Problems List**
```javascript
GET https://leetcode.com/api/problems/algorithms/
```
Returns: Array of 3000+ problems with basic info

**2. Fetch Problem Details (GraphQL)**
```javascript
POST https://leetcode.com/graphql
{
  query: getQuestionDetail
  variables: { titleSlug: "two-sum" }
}
```
Returns: Full problem details, code snippets, hints

### Rate Limiting
- Built-in 500ms delay between requests
- Prevents API throttling
- Respectful to LeetCode servers

### Error Handling
- Network errors are caught and logged
- Continues processing other problems
- Falls back gracefully if API fails

---

## 📊 Sample API Response

### Problems List
```json
{
  "stat_status_pairs": [
    {
      "stat": {
        "question_id": 1,
        "question__title": "Two Sum",
        "question__title_slug": "two-sum",
        "total_acs": 8500000,
        "total_submitted": 18000000
      },
      "difficulty": {
        "level": 1
      },
      "paid_only": false
    }
  ]
}
```

### Problem Details
```json
{
  "data": {
    "question": {
      "content": "<p>Given an array...</p>",
      "topicTags": [
        { "name": "Array", "slug": "array" },
        { "name": "Hash Table", "slug": "hash-table" }
      ],
      "hints": [
        "Use a hash map",
        "Check for complements"
      ],
      "codeSnippets": [
        {
          "lang": "JavaScript",
          "code": "var twoSum = function(nums, target) {...}"
        }
      ],
      "sampleTestCase": "[2,7,11,15]\n9"
    }
  }
}
```

---

## 🎯 Benefits

### Real Data
- ✅ Actual LeetCode problems
- ✅ Real statistics (acceptance rates)
- ✅ Professional problem statements
- ✅ Industry-standard questions

### Fresh Content
- ✅ Access to 3000+ problems
- ✅ Regular updates from LeetCode
- ✅ Latest interview questions
- ✅ Multiple difficulty levels

### Code Quality
- ✅ Tested starter code
- ✅ Multiple language support
- ✅ Standard problem format
- ✅ Professional hints

---

## ⚠️ Important Notes

### Free Tier Limitations
- **No authentication** - Public API only
- **Premium problems** - Excluded (paid_only filter)
- **Rate limiting** - Be respectful, don't spam
- **No submissions** - Can't submit to LeetCode servers

### What Works
✅ Fetching problem lists
✅ Getting problem details
✅ Accessing code snippets
✅ Reading hints and examples
✅ Viewing statistics

### What Doesn't Work
❌ Submitting to LeetCode for validation
❌ Accessing premium-only problems
❌ Getting official test cases
❌ LeetCode user authentication

---

## 🔄 Update Problems

To refresh your database with new problems:

```bash
# Stop the backend server
# Then run:
npm run seed:api
```

This will:
1. Clear existing problems
2. Fetch fresh data from LeetCode
3. Process and store new problems
4. Update company associations

---

## 🚨 Troubleshooting

### Error: Network request failed
**Solution:** Check internet connection, LeetCode might be down

### Error: Too many requests
**Solution:** Increase delay in code (line 126):
```javascript
await new Promise(resolve => setTimeout(resolve, 1000)); // 1 second
```

### No problems fetched
**Solution:** Check if LeetCode API is accessible:
```bash
curl https://leetcode.com/api/problems/algorithms/
```

### Problems missing details
**Solution:** Some older problems may not have full GraphQL data. This is normal.

---

## 📈 Scaling Options

### For Production

**Option A: Cache Problems**
- Seed database once
- Use stored problems
- Update weekly/monthly

**Option B: Real-time Fetching**
- Fetch on demand
- Cache in Redis
- Update regularly

**Option C: Hybrid Approach**
- Store core problems
- Fetch trending problems
- Best of both worlds

---

## 🎓 Alternative APIs

If LeetCode API becomes unavailable, you can use:

1. **HackerRank API**
   - Similar problem structure
   - Public API available

2. **Codeforces API**
   - Competitive programming
   - Well-documented

3. **AtCoder API**
   - Japanese platform
   - English support

4. **Custom Problem Database**
   - Create your own
   - Full control

---

## 📚 Resources

- [LeetCode Official Site](https://leetcode.com)
- [LeetCode API Docs (Unofficial)](https://github.com/aylei/leetcode-api)
- [GraphQL Explorer](https://leetcode.com/graphql)

---

## ✅ Summary

Your DSA platform now has:
- ✅ Real problems from LeetCode
- ✅ Professional code snippets
- ✅ Accurate difficulty ratings
- ✅ Industry-standard content
- ✅ 50+ problems (expandable to 3000+)
- ✅ Free and legal to use

**No API keys required! 🎉**

---

**Happy Coding with Real LeetCode Problems! 🚀**
