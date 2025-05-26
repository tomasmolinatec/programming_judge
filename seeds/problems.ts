
export const sampleProblems = [
  {
    _id: '6818eefdc81628ee3f302893',
    title: 'Sum 2 numbers',
    difficulty: 'easy',
    description:
      'Given two integers, return the sum of the two numbers.',
    inputSpec:
      '• nums — space-separated integers (nums= 2)',
    outputSpec:
      'The sum of the two numbers.',
    samples: [
      {
        input: '2 7',
        output: '9',
      },
    ],
  },
  {
    _id: '682cce895d264a122648434d',
    title: 'Fibonacci',
    difficulty: 'easy',
    description:
      'Given an number return the fibonacci sequence of that number.',
    inputSpec:
      '• num — one positive integer',
    outputSpec:
      'One integer which represetnes the fibonacci sequence of the input',
    samples: [
      {
        input: '7',
        output: '13',
      },
      {
        input: '5',
        output: '5',
      },
      {
        input: '2',
        output: '1',
      },
    ],
  },

  {
    _id: '682ccecf80b69679755550ed',
    title: 'Longest Palindromic Substring',
    difficulty: 'medium',
    description:
      'Given a string s, return the longest palindromic substring in s.',
    inputSpec: 'A single string s (1 ≤ |s| ≤ 2 000)',
    outputSpec: 'The longest palindromic substring. If several, output any one.',
    samples: [
      { input: 'babad', output: 'bab' },
      { input: 'cbbd', output: 'bb' },
    ],
  },

  {
    _id: '682cced6afe5949a6cd016a2',
    title: 'LRU Cache',
    difficulty: 'hard',
    description:
      'Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.  Implement the LRUCache class with get and put operations, both O(1).',
    inputSpec:
      'A sequence of operations:\n• "put key value"\n• "get key"\nCache capacity is given in the first line.',
    outputSpec:
      'For each "get", output the value or -1 if the key is not present.',
    samples: [
      {
        input: '2\nput 1 1\nput 2 2\nget 1\nput 3 3\nget 2\nput 4 4\nget 1\nget 3\nget 4',
        output: '1\n-1\n-1\n3\n4',
      },
    ],
  },

  {
    _id: '682ccedd95e41322e420f06c',
    title: 'Number of Islands',
    difficulty: 'medium',
    description:
      'Given an m × n 2D binary grid, count the number of islands.  An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.',
    inputSpec:
      'm and n (1 ≤ m,n ≤ 300) followed by m lines of n characters each (0 or 1).',
    outputSpec: 'A single integer — the number of islands.',
    samples: [
      {
        input: '4 5\n11000\n11000\n00100\n00011',
        output: '3',
      },
    ],
  },

  {
    _id: '682ccee3fbd406ae72024137',
    title: 'Merge Intervals',
    difficulty: 'easy',
    description:
      'Given an array of intervals where intervals[i] = [start_i, end_i], merge all overlapping intervals and return an array of the non-overlapping intervals that cover all the intervals in the input.',
    inputSpec:
      'n (1 ≤ n ≤ 10⁴) followed by n lines each containing start and end (start ≤ end).',
    outputSpec:
      'The merged list of intervals, each on its own line as "start end", in ascending order.',
    samples: [
      {
        input: '4\n1 3\n2 6\n8 10\n15 18',
        output: '1 6\n8 10\n15 18',
      },
    ],
  },
];