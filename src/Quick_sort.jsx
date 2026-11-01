import { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  RotateCcw,
  Code2,
  GraduationCap,
  Layers,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Shuffle,
  Copy,
  Check,
  ChevronRight,
  BookOpen,
  FolderCode,
  Zap,
  Award,
  Globe,
  Lightbulb
} from 'lucide-react';

// ============================================================================
// 1. QUICK SORT TRACE GENERATOR (SHORT, EASY BILINGUAL TEXT)
// ============================================================================
function generateQuickSortTrace(initialArray) {
  const arr = [...initialArray];
  const steps = [];
  const sortedSet = new Set();
  const callStack = [];
  let comparisons = 0;
  let swaps = 0;

  const pushStep = (payload) => {
    steps.push({
      array: [...arr],
      lb: payload.lb ?? null,
      ub: payload.ub ?? null,
      pivotIdx: payload.pivotIdx ?? null,
      pivotVal: payload.pivotVal ?? null,
      i: payload.i ?? null,
      j: payload.j ?? null,
      phase: payload.phase || 'INIT',
      title: payload.title || '',
      titleBn: payload.titleBn || payload.title || '',
      explanation: payload.explanation || '',
      explanationBn: payload.explanationBn || payload.explanation || '',
      tip: payload.tip || '',
      tipBn: payload.tipBn || payload.tip || '',
      formula: payload.formula || '',
      codeLine: payload.codeLine || 1,
      swappedIndices: payload.swappedIndices || [],
      comparedIndices: payload.comparedIndices || [],
      sortedIndices: Array.from(sortedSet),
      callStack: [...callStack],
      comparisons,
      swaps
    });
  };

  // Step 0: Ready
  pushStep({
    lb: 0,
    ub: arr.length - 1,
    pivotIdx: 0,
    pivotVal: arr[0],
    i: 0,
    j: arr.length - 1,
    phase: 'START',
    title: 'Array Ready to Sort',
    titleBn: 'অ্যারে সর্ট করার জন্য প্রস্তুত',
    explanation: `We have ${arr.length} numbers. Press Play or Next to start.`,
    explanationBn: `মোট ${arr.length}টি সংখ্যা রয়েছে। Play বা Next বাটনে চাপ দিয়ে শুরু করুন।`,
    tip: 'Quick Sort splits numbers around a Pivot.',
    tipBn: 'কুইক সর্ট পিভট (Pivot) সংখ্যার সাপেক্ষে ছোটগুলোকে বাঁয়ে এবং বড়গুলোকে ডানে সাজায়।',
    formula: `Pivot = ${arr[0]}`,
    codeLine: 15
  });

  function partition(lb, ub) {
    const pivot = arr[lb];
    let i = lb;
    let j = ub;

    pushStep({
      lb,
      ub,
      pivotIdx: lb,
      pivotVal: pivot,
      i,
      j,
      phase: 'PARTITION_INIT',
      title: `Pick Pivot = ${pivot}`,
      titleBn: `পিভট নির্বাচন = ${pivot}`,
      explanation: `Pivot is arr[${lb}] = ${pivot}. Pointer i starts at ${lb}, j starts at ${ub}.`,
      explanationBn: `প্রথম সংখ্যা ${pivot}-কে Pivot ধরা হলো। পয়েন্টার i=${lb} (শুরু) এবং j=${ub} (শেষ)।`,
      tip: 'Numbers <= Pivot go left; numbers > Pivot go right.',
      tipBn: 'Pivot-এর সমান বা ছোট সংখ্যা বাঁয়ে যাবে, বড় সংখ্যা ডানে যাবে।',
      formula: `Pivot = ${pivot}`,
      codeLine: 2
    });

    while (i < j) {
      pushStep({
        lb,
        ub,
        pivotIdx: lb,
        pivotVal: pivot,
        i,
        j,
        phase: 'OUTER_WHILE',
        title: `Check Pointers: i=${i}, j=${j}`,
        titleBn: `পয়েন্টার চেক: i=${i}, j=${j}`,
        explanation: `Since i < j (${i} < ${j}), scan i to the right and j to the left.`,
        explanationBn: `পয়েন্টার দুটি এখনও ক্রস করেনি (i < j)। এবার i ডানে এবং j বামে এগোবে।`,
        tip: 'Both pointers scan towards each other.',
        tipBn: 'উভয় পাশ থেকে পয়েন্টার দুটি পরস্পরের দিকে এগোতে থাকে।',
        formula: `${i} < ${j} (TRUE)`,
        codeLine: 4
      });

      // Scan i right
      while (true) {
        comparisons++;
        const isLessOrEqual = arr[i] <= pivot;
        const canAdvance = i < ub;

        pushStep({
          lb,
          ub,
          pivotIdx: lb,
          pivotVal: pivot,
          i,
          j,
          comparedIndices: [i, lb],
          phase: 'SCAN_I',
          title: isLessOrEqual ? `arr[${i}]=${arr[i]} <= Pivot: i++` : `STOP i at ${i}: arr[${i}]=${arr[i]} > Pivot`,
          titleBn: isLessOrEqual ? `${arr[i]} <= ${pivot} : i ডানে যাবে (i++)` : `i=${i}-এ থামল! (${arr[i]} > ${pivot})`,
          explanation: isLessOrEqual
            ? canAdvance
              ? `${arr[i]} is <= Pivot (${pivot}). It belongs on left, move i to ${i + 1}.`
              : `${arr[i]} <= Pivot (${pivot}), and reached upper bound.`
            : `Found ${arr[i]} > Pivot (${pivot})! STOP i here. It belongs on the right.`,
          explanationBn: isLessOrEqual
            ? canAdvance
              ? `${arr[i]} সংখ্যাটি Pivot (${pivot})-এর সমান বা ছোট। তাই i++ হয়ে ডানে গেল।`
              : `${arr[i]} <= ${pivot}, এবং i শেষ সীমায় পৌঁছে গেছে।`
            : `${arr[i]} সংখ্যাটি Pivot (${pivot})-এর চেয়ে বড়! তাই i এখানে থেমে গেল।`,
          tip: isLessOrEqual ? 'Smaller numbers stay on left.' : 'Pointer i stops when it finds a number > Pivot.',
          tipBn: isLessOrEqual ? 'ছোট সংখ্যাগুলো স্বাভাবিকভাবেই বাঁয়ে থাকবে।' : 'Pivot-এর চেয়ে বড় সংখ্যা পেলেই পয়েন্টার i থেমে যায়।',
          formula: `${arr[i]} <= ${pivot} (${isLessOrEqual ? 'TRUE' : 'FALSE'})`,
          codeLine: isLessOrEqual && canAdvance ? 6 : 5
        });

        if (isLessOrEqual && canAdvance) {
          i++;
        } else {
          break;
        }
      }

      // Scan j left
      while (true) {
        comparisons++;
        const isGreater = arr[j] > pivot;

        pushStep({
          lb,
          ub,
          pivotIdx: lb,
          pivotVal: pivot,
          i,
          j,
          comparedIndices: [j, lb],
          phase: 'SCAN_J',
          title: isGreater ? `arr[${j}]=${arr[j]} > Pivot: j--` : `STOP j at ${j}: arr[${j}]=${arr[j]} <= Pivot`,
          titleBn: isGreater ? `${arr[j]} > ${pivot} : j বামে আসবে (j--)` : `j=${j}-এ থামল! (${arr[j]} <= ${pivot})`,
          explanation: isGreater
            ? `${arr[j]} is > Pivot (${pivot}). Already on right, move j to ${j - 1}.`
            : `Found ${arr[j]} <= Pivot (${pivot})! STOP j here. It belongs on the left.`,
          explanationBn: isGreater
            ? `${arr[j]} সংখ্যাটি Pivot (${pivot})-এর চেয়ে বড়। তাই j-- হয়ে বামে আসল।`
            : `${arr[j]} সংখ্যাটি Pivot (${pivot})-এর সমান বা ছোট! তাই j এখানে থেমে গেল।`,
          tip: isGreater ? 'Larger numbers stay on right.' : 'Pointer j stops when it finds a number <= Pivot.',
          tipBn: isGreater ? 'বড় সংখ্যাগুলো স্বাভাবিকভাবেই ডানে থাকবে।' : 'Pivot-এর সমান বা ছোট সংখ্যা পেলেই পয়েন্টার j থেমে যায়।',
          formula: `${arr[j]} > ${pivot} (${isGreater ? 'TRUE' : 'FALSE'})`,
          codeLine: isGreater ? 8 : 7
        });

        if (isGreater) {
          j--;
        } else {
          break;
        }
      }

      // Swap arr[i] and arr[j] if i < j
      if (i < j) {
        swaps++;
        const leftVal = arr[i];
        const rightVal = arr[j];
        [arr[i], arr[j]] = [arr[j], arr[i]];

        pushStep({
          lb,
          ub,
          pivotIdx: lb,
          pivotVal: pivot,
          i,
          j,
          swappedIndices: [i, j],
          phase: 'SWAP_IJ',
          title: `Swap arr[${i}] (${leftVal}) ↔ arr[${j}] (${rightVal})`,
          titleBn: `অদলবদল (Swap): ${leftVal} ↔ ${rightVal}`,
          explanation: `i < j (${i} < ${j}): Swap ${leftVal} and ${rightVal} to put each on its correct side.`,
          explanationBn: `পয়েন্টার ক্রস করেনি (${i} < ${j})! তাই ${leftVal} ও ${rightVal} অদলবদল করা হলো।`,
          tip: 'Swap puts smaller number on the left and larger on the right.',
          tipBn: 'অদলবদলের ফলে ছোট সংখ্যাটি বাঁয়ে এবং বড়টি ডানে চলে গেল।',
          formula: `swap(${leftVal}, ${rightVal})`,
          codeLine: 10
        });
      } else {
        pushStep({
          lb,
          ub,
          pivotIdx: lb,
          pivotVal: pivot,
          i,
          j,
          phase: 'POINTERS_CROSSED',
          title: `Pointers Crossed! (i >= j: ${i} >= ${j})`,
          titleBn: `পয়েন্টার ক্রস করেছে! (${i} >= ${j})`,
          explanation: `i and j have crossed! Exit while loop. Pivot will now swap with arr[${j}].`,
          explanationBn: `পয়েন্টার দুটি পরস্পরকে অতিক্রম করেছে! এবার পিভট j=${j} তম স্থানে বসবে।`,
          tip: 'When pointers cross, index j is the permanent home for Pivot.',
          tipBn: 'পয়েন্টার ক্রস করলে ইনডেক্স j হলো পিভটের চূড়ান্ত সঠিক ঘর।',
          formula: `${i} >= ${j} (Crossed)`,
          codeLine: 9
        });
      }
    }

    // Final Swap: Pivot with arr[j]
    swaps++;
    const pivotValAtLb = arr[lb];
    const targetValAtJ = arr[j];
    [arr[lb], arr[j]] = [arr[j], arr[lb]];
    sortedSet.add(j);

    pushStep({
      lb,
      ub,
      pivotIdx: j,
      pivotVal: pivot,
      i,
      j,
      swappedIndices: [lb, j],
      phase: 'SWAP_PIVOT',
      title: `Pivot ${pivot} Locked at Index ${j}!`,
      titleBn: `পিভট ${pivot} তার চূড়ান্ত স্থানে লক হলো (ইনডেক্স ${j})!`,
      explanation: `Swap Pivot arr[${lb}] (${pivotValAtLb}) with arr[${j}] (${targetValAtJ}). Index ${j} is sorted!`,
      explanationBn: `Pivot (${pivotValAtLb}) কে arr[${j}] (${targetValAtJ})-এর সাথে Swap করা হলো। ইনডেক্স ${j} এখন চিরতরে সর্টেড!`,
      tip: 'Notice: All numbers left of Pivot are smaller, and right are bigger.',
      tipBn: 'লক্ষ্য করুন: পিভটের বাঁয়ের সব সংখ্যা ছোট এবং ডানের সব সংখ্যা বড়!',
      formula: `swap(arr[${lb}], arr[${j}]) → loc = ${j}`,
      codeLine: 12
    });

    return j;
  }

  function quickSortRecursive(lb, ub, depth = 0) {
    callStack.push({ fn: `quickSort(${lb}, ${ub})`, lb, ub, depth });

    if (lb < ub) {
      pushStep({
        lb,
        ub,
        pivotIdx: lb,
        pivotVal: arr[lb],
        i: lb,
        j: ub,
        phase: 'RECURSIVE_CALL',
        title: `Partition Subarray [${lb} .. ${ub}]`,
        titleBn: `সাব-অ্যারে পার্টিশন [${lb} .. ${ub}]`,
        explanation: `Sorting subarray from index ${lb} to ${ub} (Pivot = ${arr[lb]}).`,
        explanationBn: `ইনডেক্স ${lb} থেকে ${ub} পর্যন্ত অংশটি পিভট ${arr[lb]}-এর সাপেক্ষে সাজানো হচ্ছে।`,
        tip: 'Divide phase of Quick Sort.',
        tipBn: 'অ্যারে ভেঙে ছোট ছোট অংশে ভাগ করা হচ্ছে।',
        formula: `quickSort(${lb}, ${ub})`,
        codeLine: 17
      });

      const loc = partition(lb, ub);
      quickSortRecursive(lb, loc - 1, depth + 1);
      quickSortRecursive(loc + 1, ub, depth + 1);
    } else if (lb === ub && lb >= 0 && lb < arr.length) {
      sortedSet.add(lb);
      pushStep({
        lb,
        ub,
        pivotIdx: lb,
        pivotVal: arr[lb],
        i: lb,
        j: ub,
        phase: 'BASE_CASE',
        title: `Single Element [${lb}] Already Sorted`,
        titleBn: `একক সংখ্যা [${lb}] এমনিতেই সর্টেড`,
        explanation: `Only 1 element (${arr[lb]}) at index ${lb}. It is already sorted.`,
        explanationBn: `ইনডেক্স ${lb}-এ মাত্র ১টি সংখ্যা (${arr[lb]}) আছে, যা এমনিতেই সাজানো।`,
        tip: 'Base case of recursion.',
        tipBn: 'রিকার্শনের বেস কেস (১টি সংখ্যা সর্ট করতে হয় না)।',
        formula: `lb == ub (${lb})`,
        codeLine: 16
      });
    }

    callStack.pop();
  }

  quickSortRecursive(0, arr.length - 1, 0);

  for (let k = 0; k < arr.length; k++) sortedSet.add(k);
  pushStep({
    lb: 0,
    ub: arr.length - 1,
    pivotIdx: null,
    pivotVal: null,
    i: null,
    j: null,
    phase: 'COMPLETED',
    title: 'Quick Sort Finished! All Sorted!',
    titleBn: 'কুইক সর্ট সম্পন্ন! সব সংখ্যা সাজানো শেষ!',
    explanation: `Done! Total Comparisons: ${comparisons} | Total Swaps: ${swaps}.`,
    explanationBn: `সম্পূর্ণ হয়েছে! মোট তুলনা: ${comparisons} বার | মোট Swap: ${swaps} বার।`,
    tip: 'Try other presets like Sorted or Reverse!',
    tipBn: 'অন্যান্য প্রিসেট দিয়ে বিভিন্ন কেস ট্রাই করে দেখুন!',
    formula: '100% SORTED',
    codeLine: 21
  });

  return steps;
}

// ============================================================================
// 2. LIVE SYNCHRONIZED CODE TEMPLATES FOR VISUALIZER TRACER
// ============================================================================
const TRACER_CODE = {
  cpp: [
    { line: 1, text: 'int partition(vector<int>& arr, int lb, int ub) {' },
    { line: 2, text: '    int pivot = arr[lb]; // Step 1: Pick first element as pivot' },
    { line: 3, text: '    int i = lb, j = ub;  // i = start, j = end' },
    { line: 4, text: '    while (i < j) {' },
    { line: 5, text: '        while (arr[i] <= pivot && i < ub) i++; // Move i right (find > pivot)' },
    { line: 6, text: '            // i stops when arr[i] > pivot' },
    { line: 7, text: '        while (arr[j] > pivot) j--;            // Move j left (find <= pivot)' },
    { line: 8, text: '            // j stops when arr[j] <= pivot' },
    { line: 9, text: '        if (i < j) // If pointers have not crossed' },
    { line: 10, text: '            swap(arr[i], arr[j]); // Swap values at i and j' },
    { line: 11, text: '    }' },
    { line: 12, text: '    swap(arr[lb], arr[j]); // Pointers crossed: Lock pivot at index j' },
    { line: 13, text: '    return j; // Return pivot position' },
    { line: 14, text: '}' },
    { line: 15, text: 'void quickSort(vector<int>& arr, int lb, int ub) {' },
    { line: 16, text: '    if (lb < ub) {' },
    { line: 17, text: '        int loc = partition(arr, lb, ub);' },
    { line: 18, text: '        quickSort(arr, lb, loc - 1); // Sort left side' },
    { line: 19, text: '        quickSort(arr, loc + 1, ub); // Sort right side' },
    { line: 20, text: '    }' },
    { line: 21, text: '}' }
  ],
  python: [
    { line: 1, text: 'def partition(arr, lb, ub):' },
    { line: 2, text: '    pivot = arr[lb]  # Step 1: Pick first element as pivot' },
    { line: 3, text: '    i, j = lb, ub    # i = start, j = end' },
    { line: 4, text: '    while i < j:' },
    { line: 5, text: '        while arr[i] <= pivot and i < ub:' },
    { line: 6, text: '            i += 1   # Move i right (find > pivot)' },
    { line: 7, text: '        while arr[j] > pivot:' },
    { line: 8, text: '            j -= 1   # Move j left (find <= pivot)' },
    { line: 9, text: '        if i < j:     # If pointers have not crossed' },
    { line: 10, text: '            arr[i], arr[j] = arr[j], arr[i]  # Swap values at i and j' },
    { line: 11, text: '    # Pointers crossed: Lock pivot at index j' },
    { line: 12, text: '    arr[lb], arr[j] = arr[j], arr[lb]' },
    { line: 13, text: '    return j  # Return pivot position' },
    { line: 14, text: '' },
    { line: 15, text: 'def quick_sort(arr, lb, ub):' },
    { line: 16, text: '    if lb < ub:' },
    { line: 17, text: '        loc = partition(arr, lb, ub)' },
    { line: 18, text: '        quick_sort(arr, lb, loc - 1)  # Sort left side' },
    { line: 19, text: '        quick_sort(arr, loc + 1, ub)  # Sort right side' },
    { line: 20, text: '    return arr' },
    { line: 21, text: '' }
  ]
};

// ============================================================================
// 3. FULL MULTI-LANGUAGE IMPLEMENTATIONS FOR "CODE" TAB (EASY ENGLISH COMMENTS)
// ============================================================================
const FULL_LANGUAGE_CODES = {
  cpp: {
    name: 'C++',
    file: 'quicksort.cpp',
    runCmd: 'g++ quicksort.cpp -o quicksort && ./quicksort',
    code: `// Quick Sort Algorithm in C++
// Complexity: Best/Average = O(n log n), Worst = O(n^2), Space = O(log n)
#include <iostream>
#include <vector>
using namespace std;

// Step 1: Partition function
// Places the pivot in its correct sorted spot
int partition(vector<int>& arr, int lb, int ub) {
    int pivot = arr[lb]; // Pick the first element as pivot
    int i = lb;          // Left pointer starting at lower bound
    int j = ub;          // Right pointer starting at upper bound

    while (i < j) {
        // Move pointer i to the right while values are <= pivot
        while (arr[i] <= pivot && i < ub) {
            i++;
        }
        // Move pointer j to the left while values are > pivot
        while (arr[j] > pivot) {
            j--;
        }
        // If pointers have not crossed, swap elements at i and j
        if (i < j) {
            swap(arr[i], arr[j]);
        }
    }
    // When pointers cross (i >= j), place pivot at index j
    swap(arr[lb], arr[j]);
    return j; // Return locked pivot position
}

// Step 2: Recursive Quick Sort function
void quickSort(vector<int>& arr, int lb, int ub) {
    if (lb < ub) {
        // Partition array and get pivot index
        int loc = partition(arr, lb, ub);

        // Recursively sort elements before and after pivot
        quickSort(arr, lb, loc - 1); // Sort left side
        quickSort(arr, loc + 1, ub); // Sort right side
    }
}

// Main function to test Quick Sort
int main() {
    vector<int> arr = {5, 2, 8, 3, 1};

    cout << "Original Array: ";
    for (int x : arr) cout << x << " ";
    cout << endl;

    quickSort(arr, 0, arr.size() - 1);

    cout << "Sorted Array:   ";
    for (int x : arr) cout << x << " ";
    cout << endl;

    return 0;
}`
  },
  python: {
    name: 'Python',
    file: 'quicksort.py',
    runCmd: 'python quicksort.py',
    code: `# Quick Sort Algorithm in Python
# Complexity: Best/Average = O(n log n), Worst = O(n^2), Space = O(log n)

# Step 1: Partition function
# Places the pivot in its correct sorted spot
def partition(arr, lb, ub):
    pivot = arr[lb]  # Pick the first element as pivot
    i = lb           # Left pointer starting at lower bound
    j = ub           # Right pointer starting at upper bound

    while i < j:
        # Move pointer i to the right while values are <= pivot
        while arr[i] <= pivot and i < ub:
            i += 1
        # Move pointer j to the left while values are > pivot
        while arr[j] > pivot:
            j -= 1
        # If pointers have not crossed, swap elements at i and j
        if i < j:
            arr[i], arr[j] = arr[j], arr[i]

    # When pointers cross (i >= j), place pivot at index j
    arr[lb], arr[j] = arr[j], arr[lb]
    return j  # Return locked pivot position


# Step 2: Recursive Quick Sort function
def quick_sort(arr, lb, ub):
    if lb < ub:
        # Partition array and get pivot index
        loc = partition(arr, lb, ub)

        # Recursively sort elements before and after pivot
        quick_sort(arr, lb, loc - 1)  # Sort left side
        quick_sort(arr, loc + 1, ub)  # Sort right side
    return arr


# Main function to test Quick Sort
if __name__ == '__main__':
    data = [5, 2, 8, 3, 1]
    print("Original Array:", data)
    quick_sort(data, 0, len(data) - 1)
    print("Sorted Array:  ", data)`
  },
  csharp: {
    name: 'C#',
    file: 'QuickSort.cs',
    runCmd: 'dotnet run (or csc QuickSort.cs && QuickSort.exe)',
    code: `// Quick Sort Algorithm in C# (.NET)
// Complexity: Best/Average = O(n log n), Worst = O(n^2), Space = O(log n)
using System;

class QuickSortProgram {
    // Step 1: Partition method
    // Places the pivot in its correct sorted spot
    static int Partition(int[] arr, int lb, int ub) {
        int pivot = arr[lb]; // Pick the first element as pivot
        int i = lb;          // Left pointer starting at lower bound
        int j = ub;          // Right pointer starting at upper bound

        while (i < j) {
            // Move pointer i to the right while values are <= pivot
            while (arr[i] <= pivot && i < ub) i++;
            // Move pointer j to the left while values are > pivot
            while (arr[j] > pivot) j--;

            // If pointers have not crossed, swap elements at i and j
            if (i < j) {
                int temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
        // When pointers cross (i >= j), place pivot at index j
        arr[lb] = arr[j];
        arr[j] = pivot;
        return j; // Return locked pivot position
    }

    // Step 2: Recursive Quick Sort function
    static void QuickSort(int[] arr, int lb, int ub) {
        if (lb < ub) {
            // Partition array and get pivot index
            int loc = Partition(arr, lb, ub);

            // Recursively sort elements before and after pivot
            QuickSort(arr, lb, loc - 1); // Sort left side
            QuickSort(arr, loc + 1, ub); // Sort right side
        }
    }

    // Main method to test Quick Sort
    static void Main() {
        int[] numbers = { 5, 2, 8, 3, 1 };
        Console.WriteLine("Original: " + string.Join(", ", numbers));

        QuickSort(numbers, 0, numbers.Length - 1);

        Console.WriteLine("Sorted:   " + string.Join(", ", numbers));
    }
}`
  },
  java: {
    name: 'Java',
    file: 'QuickSort.java',
    runCmd: 'javac QuickSort.java && java QuickSort',
    code: `// Quick Sort Algorithm in Java
// Complexity: Best/Average = O(n log n), Worst = O(n^2), Space = O(log n)
import java.util.Arrays;

public class QuickSort {
    // Step 1: Partition method
    // Places the pivot in its correct sorted spot
    static int partition(int[] arr, int lb, int ub) {
        int pivot = arr[lb]; // Pick the first element as pivot
        int i = lb;          // Left pointer starting at lower bound
        int j = ub;          // Right pointer starting at upper bound

        while (i < j) {
            // Move pointer i to the right while values are <= pivot
            while (arr[i] <= pivot && i < ub) i++;
            // Move pointer j to the left while values are > pivot
            while (arr[j] > pivot) j--;

            // If pointers have not crossed, swap elements at i and j
            if (i < j) {
                int temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
        // When pointers cross (i >= j), place pivot at index j
        arr[lb] = arr[j];
        arr[j] = pivot;
        return j; // Return locked pivot position
    }

    // Step 2: Recursive Quick Sort function
    static void quickSort(int[] arr, int lb, int ub) {
        if (lb < ub) {
            // Partition array and get pivot index
            int loc = partition(arr, lb, ub);

            // Recursively sort elements before and after pivot
            quickSort(arr, lb, loc - 1); // Sort left side
            quickSort(arr, loc + 1, ub); // Sort right side
        }
    }

    // Main method to test Quick Sort
    public static void main(String[] args) {
        int[] arr = { 5, 2, 8, 3, 1 };
        System.out.println("Original: " + Arrays.toString(arr));

        quickSort(arr, 0, arr.length - 1);

        System.out.println("Sorted:   " + Arrays.toString(arr));
    }
}`
  },
  c: {
    name: 'C',
    file: 'quicksort.c',
    runCmd: 'gcc quicksort.c -o quicksort && ./quicksort',
    code: `// Quick Sort Algorithm in C
// Complexity: Best/Average = O(n log n), Worst = O(n^2), Space = O(log n)
#include <stdio.h>

// Helper function to swap two numbers
void swap(int* a, int* b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

// Step 1: Partition function
// Places the pivot in its correct sorted spot
int partition(int arr[], int lb, int ub) {
    int pivot = arr[lb]; // Pick the first element as pivot
    int i = lb;          // Left pointer starting at lower bound
    int j = ub;          // Right pointer starting at upper bound

    while (i < j) {
        // Move pointer i to the right while values are <= pivot
        while (arr[i] <= pivot && i < ub) i++;
        // Move pointer j to the left while values are > pivot
        while (arr[j] > pivot) j--;

        // If pointers have not crossed, swap elements at i and j
        if (i < j) {
            swap(&arr[i], &arr[j]);
        }
    }
    // When pointers cross (i >= j), place pivot at index j
    swap(&arr[lb], &arr[j]);
    return j; // Return locked pivot position
}

// Step 2: Recursive Quick Sort function
void quickSort(int arr[], int lb, int ub) {
    if (lb < ub) {
        // Partition array and get pivot index
        int loc = partition(arr, lb, ub);

        // Recursively sort elements before and after pivot
        quickSort(arr, lb, loc - 1); // Sort left side
        quickSort(arr, loc + 1, ub); // Sort right side
    }
}

// Main function to test Quick Sort
int main() {
    int arr[] = { 5, 2, 8, 3, 1 };
    int n = sizeof(arr) / sizeof(arr[0]);

    printf("Original Array: ");
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\n");

    quickSort(arr, 0, n - 1);

    printf("Sorted Array:   ");
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\n");

    return 0;
}`
  },
  js: {
    name: 'JavaScript',
    file: 'quicksort.js',
    runCmd: 'node quicksort.js',
    code: `// Quick Sort Algorithm in JavaScript (Node.js)
// Complexity: Best/Average = O(n log n), Worst = O(n^2), Space = O(log n)

// Step 1: Partition function
// Places the pivot in its correct sorted spot
function partition(arr, lb, ub) {
  const pivot = arr[lb]; // Pick the first element as pivot
  let i = lb;            // Left pointer starting at lower bound
  let j = ub;            // Right pointer starting at upper bound

  while (i < j) {
    // Move pointer i to the right while values are <= pivot
    while (arr[i] <= pivot && i < ub) i++;
    // Move pointer j to the left while values are > pivot
    while (arr[j] > pivot) j--;

    // If pointers have not crossed, swap elements at i and j
    if (i < j) {
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  // When pointers cross (i >= j), place pivot at index j
  [arr[lb], arr[j]] = [arr[j], arr[lb]];
  return j; // Return locked pivot position
}

// Step 2: Recursive Quick Sort function
function quickSort(arr, lb = 0, ub = arr.length - 1) {
  if (lb < ub) {
    // Partition array and get pivot index
    const loc = partition(arr, lb, ub);

    // Recursively sort elements before and after pivot
    quickSort(arr, lb, loc - 1); // Sort left side
    quickSort(arr, loc + 1, ub); // Sort right side
  }
  return arr;
}

// Main execution to test Quick Sort
const arr = [5, 2, 8, 3, 1];
console.log("Original Array:", arr);
console.log("Sorted Array:  ", quickSort(arr));`
  }
};

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: 'In subarray [5, 2, 8, 3, 1] with lb = 0, what is chosen as the Pivot?',
    questionBn: '[5, 2, 8, 3, 1] সাব-অ্যারেতে (lb = 0), কাকে Pivot ধরা হয়?',
    options: ['arr[lb] = 5 (First element)', 'arr[ub] = 1 (Last element)', 'The smallest number (1)', 'A random number'],
    optionsBn: ['arr[lb] = 5 (প্রথম সংখ্যা)', 'arr[ub] = 1 (শেষ সংখ্যা)', 'সবচেয়ে ছোট সংখ্যা (1)', 'যেকোনো সংখ্যা'],
    correctIndex: 0,
    explanation: 'We pick arr[lb] (the first element) as Pivot.',
    explanationBn: 'আমরা সাব-অ্যারের প্রথম উপাদান arr[lb]-কে Pivot হিসেবে গ্রহণ করি।'
  },
  {
    id: 2,
    question: 'When does pointer i (start) stop moving to the right?',
    questionBn: 'পয়েন্টার i কখন ডানে যাওয়া থামায়?',
    options: ['When it finds arr[i] > Pivot', 'When it finds arr[i] <= Pivot', 'At index 0', 'Never'],
    optionsBn: ['যখন সে Pivot-এর চেয়ে বড় সংখ্যা পায় (arr[i] > Pivot)', 'যখন সে Pivot-এর চেয়ে ছোট সংখ্যা পায়', 'ইনডেক্স 0-এ', 'কখনো থামে না'],
    correctIndex: 0,
    explanation: 'i stops as soon as it encounters an element greater than Pivot.',
    explanationBn: 'Pivot-এর চেয়ে বড় সংখ্যা পেলেই i থেমে যায়।'
  },
  {
    id: 3,
    question: 'What happens when pointers cross (i >= j)?',
    questionBn: 'পয়েন্টার দুটি ক্রস করলে (i >= j) কী ঘটে?',
    options: [
      'Swap arr[lb] (Pivot) with arr[j]',
      'Swap arr[i] with arr[j]',
      'Stop the whole program',
      'Restart from beginning'
    ],
    optionsBn: [
      'arr[lb] (Pivot)-কে arr[j]-এর সাথে Swap করা হয়',
      'arr[i] এবং arr[j] Swap করা হয়',
      'পুরো প্রোগ্রাম বন্ধ হয়ে যায়',
      'শুরু থেকে আবার চালানো হয়'
    ],
    correctIndex: 0,
    explanation: 'When i >= j, the partition loop terminates and we swap Pivot with arr[j].',
    explanationBn: 'পয়েন্টার ক্রস করলে লুপ শেষ হয় এবং Pivot-কে arr[j]-এর সাথে Swap করে তার স্থায়ী ঘরে বসানো হয়।'
  }
];

// ============================================================================
// 5. MAIN REACT APPLICATION COMPONENT
// ============================================================================
export default function Quick_sort() {
  // Navigation Tab State
  const [activeTab, setActiveTab] = useState('visualizer'); // 'visualizer' | 'lesson' | 'code'

  // Language State: Default to 'en' as requested!
  const [lang, setLang] = useState('en');

  // Selected Code Language in Code Tab
  const [selectedCodeLang, setSelectedCodeLang] = useState('cpp'); // 'cpp' | 'python' | 'csharp' | 'java' | 'c' | 'js'

  // Live tracer code language (visualizer side panel)
  const [tracerLang, setTracerLang] = useState('cpp'); // 'cpp' | 'python'

  // Array & Trace State (Beginner 5 items default)
  const [inputArray, setInputArray] = useState([5, 2, 8, 3, 1]);
  const [customInputText, setCustomInputText] = useState('5, 2, 8, 3, 1');
  const [inputError, setInputError] = useState('');
  const [currentStepIdx, setCurrentStepIdx] = useState(0);

  // Playback Controls State
  const [isPlaying, setIsPlaying] = useState(false);
  const [speedMs, setSpeedMs] = useState(750);

  // Quiz State
  const [quizAnswers, setQuizAnswers] = useState({});
  const [copiedCode, setCopiedCode] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Compute all Quick Sort steps using useMemo
  const steps = useMemo(() => generateQuickSortTrace(inputArray), [inputArray]);
  const currentStep = steps[currentStepIdx] || steps[0];
  const maxBarValue = useMemo(() => Math.max(...inputArray, 1), [inputArray]);

  // Toast Helper
  const triggerToast = useCallback((msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 2200);
  }, []);

  // Step navigation functions
  const stepForward = useCallback(() => {
    setCurrentStepIdx((prev) => {
      if (prev < steps.length - 1) {
        return prev + 1;
      }
      setIsPlaying(false);
      return prev;
    });
  }, [steps]);

  const stepBackward = useCallback(() => {
    setIsPlaying(false);
    setCurrentStepIdx((prev) => (prev > 0 ? prev - 1 : 0));
  }, []);

  const resetVisualizer = useCallback(() => {
    setIsPlaying(false);
    setCurrentStepIdx(0);
    triggerToast(lang === 'bn' ? 'শুরুতে রিসেট করা হয়েছে' : 'Reset to Step 0');
  }, [triggerToast, lang]);

  // Auto-play timer effect
  useEffect(() => {
    if (!isPlaying) return undefined;
    const timer = setInterval(() => {
      stepForward();
    }, speedMs);
    return () => clearInterval(timer);
  }, [isPlaying, speedMs, stepForward]);

  // Keyboard shortcuts (Left/Right arrows, Space, R)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (activeTab !== 'visualizer') return;

      if (e.key === 'ArrowRight') {
        e.preventDefault();
        setIsPlaying(false);
        stepForward();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        stepBackward();
      } else if (e.key === ' ') {
        e.preventDefault();
        setIsPlaying((prev) => {
          if (!prev && currentStepIdx >= steps.length - 1) {
            setCurrentStepIdx(0);
          }
          return !prev;
        });
      } else if (e.key === 'r' || e.key === 'R') {
        e.preventDefault();
        resetVisualizer();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeTab, stepForward, stepBackward, resetVisualizer, currentStepIdx, steps.length]);

  // Handle Custom Array Input
  const handleApplyCustomArray = (e) => {
    if (e) e.preventDefault();
    const parsed = customInputText
      .split(',')
      .map((s) => parseInt(s.trim(), 10))
      .filter((n) => !Number.isNaN(n));

    if (parsed.length < 2 || parsed.length > 12) {
      setInputError(lang === 'bn' ? '২ থেকে ১২টি সংখ্যা কমা দিয়ে লিখুন।' : 'Enter 2 to 12 numbers separated by commas.');
      return;
    }
    if (parsed.some((n) => n < 1 || n > 99)) {
      setInputError(lang === 'bn' ? '১ থেকে ৯৯ এর মধ্যে সংখ্যা দিন।' : 'Use numbers between 1 and 99.');
      return;
    }

    setInputError('');
    setIsPlaying(false);
    setInputArray(parsed);
    setCurrentStepIdx(0);
    triggerToast(lang === 'bn' ? `অ্যারে লোড হয়েছে (${parsed.length} সংখ্যা)` : `Loaded array (${parsed.length} numbers)`);
  };

  // Preset Generators
  const loadPreset = (type) => {
    setIsPlaying(false);
    setInputError('');
    let nextArr = [];
    if (type === 'beginner') {
      nextArr = [5, 2, 8, 3, 1];
    } else if (type === 'textbook') {
      nextArr = [7, 6, 10, 5, 9, 2, 1, 15, 7];
    } else if (type === 'sorted') {
      nextArr = [1, 2, 3, 4, 5];
    } else if (type === 'reverse') {
      nextArr = [5, 4, 3, 2, 1];
    } else if (type === 'random') {
      nextArr = Array.from({ length: 6 }, () => Math.floor(Math.random() * 20) + 2);
    }
    setCustomInputText(nextArr.join(', '));
    setInputArray(nextArr);
    setCurrentStepIdx(0);
    triggerToast(lang === 'bn' ? 'নতুন প্রিসেট লোড হয়েছে' : 'Preset loaded');
  };

  // Copy code handler
  const handleCopyCode = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    triggerToast(lang === 'bn' ? 'কোড কপি করা হয়েছে!' : 'Code copied to clipboard!');
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* ================================================================== */}
      {/* 1. TOP HEADER (SLIM, SLEEK, NO CSE 281, NO SOUND, NO ZIP)         */}
      {/* ================================================================== */}
      <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800/80 px-3 sm:px-6 py-2">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          {/* Logo & Title */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 via-purple-500 to-amber-500 flex items-center justify-center shadow-md shrink-0">
              <Zap className="w-3.5 h-3.5 text-white" />
            </div>
            <h1 className="text-sm sm:text-base font-extrabold tracking-tight bg-gradient-to-r from-white via-indigo-200 to-amber-200 bg-clip-text text-transparent whitespace-nowrap">
              {lang === 'bn' ? 'কুইক সর্ট' : 'Quick Sort'}
            </h1>
          </div>

          {/* Navigation Tabs (Pill style) */}
          <nav className="flex items-center gap-1 bg-slate-950 p-0.5 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('visualizer')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'visualizer'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Play className="w-3.5 h-3.5" />
              <span>{lang === 'bn' ? 'অ্যানিমেশন' : 'Visualizer'}</span>
            </button>
            <button
              onClick={() => setActiveTab('lesson')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'lesson'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>{lang === 'bn' ? 'সহজ গাইড ও কুইজ' : 'Guide & Quiz'}</span>
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'code'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FolderCode className="w-3.5 h-3.5" />
              <span>{lang === 'bn' ? 'কোড' : 'Code'}</span>
            </button>
          </nav>

          {/* Language Toggle Button */}
          <button
            onClick={() => {
              const nextLang = lang === 'bn' ? 'en' : 'bn';
              setLang(nextLang);
              triggerToast(nextLang === 'bn' ? 'বাংলা চালু' : 'Switched to English');
            }}
            className="px-2.5 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold flex items-center gap-1 transition shrink-0"
            title="Toggle Language"
          >
            <Globe className="w-3 h-3 text-sky-400" />
            <span>{lang === 'bn' ? 'বাং' : 'EN'}</span>
          </button>
        </div>
      </header>

      {/* ================================================================== */}
      {/* 2. MAIN WORKSPACE CONTENT                                          */}
      {/* ================================================================== */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 py-3">
        {/* ================================================================ */}
        {/* TAB 1: INTERACTIVE VISUALIZER (COMPACT, MINIMAL SCROLL)          */}
        {/* ================================================================ */}
        {activeTab === 'visualizer' && (
          <div className="space-y-3">
            {/* UNIFIED COMPACT CONTROL CENTER (SIDE-BY-SIDE MERGED) */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-2.5 sm:p-3 shadow-md space-y-2">
              {/* Row 1: Array Input + Presets */}
              <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-2.5">
                {/* Input form */}
                <form onSubmit={handleApplyCustomArray} className="flex items-center gap-2 flex-1 max-w-md">
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-400">
                      arr =
                    </span>
                    <input
                      type="text"
                      value={customInputText}
                      onChange={(e) => setCustomInputText(e.target.value)}
                      className="w-full pl-14 pr-3 py-1 bg-slate-950 border border-slate-700 rounded-xl text-xs sm:text-sm font-mono text-white focus:outline-none focus:border-indigo-500"
                      placeholder="5, 2, 8, 3, 1"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition shrink-0"
                  >
                    {lang === 'bn' ? 'লোড' : 'Load'}
                  </button>
                </form>

                {/* Presets side by side */}
                <div className="flex flex-wrap items-center gap-1.5 shrink-0">
                  <span className="text-[11px] text-slate-400 mr-1">{lang === 'bn' ? 'প্রিসেট:' : 'Presets:'}</span>
                  <button
                    onClick={() => loadPreset('beginner')}
                    className="px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 transition flex items-center gap-1"
                    title="Easy 5 numbers for beginners"
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>{lang === 'bn' ? 'সহজ [৫টি]' : 'Easy [5]'}</span>
                  </button>
                  <button
                    onClick={() => loadPreset('textbook')}
                    className="px-2 py-1 rounded-lg text-xs font-mono bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
                  >
                    Textbook [7,6..]
                  </button>
                  <button
                    onClick={() => loadPreset('sorted')}
                    className="px-2 py-1 rounded-lg text-xs font-mono bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
                    title="Already Sorted"
                  >
                    Sorted
                  </button>
                  <button
                    onClick={() => loadPreset('reverse')}
                    className="px-2 py-1 rounded-lg text-xs font-mono bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
                    title="Reverse Sorted"
                  >
                    Reverse
                  </button>
                  <button
                    onClick={() => loadPreset('random')}
                    className="px-2 py-1 rounded-lg text-xs font-mono bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition flex items-center gap-1"
                  >
                    <Shuffle className="w-3 h-3" />
                    <span>Random</span>
                  </button>
                </div>
              </div>

              {inputError && (
                <div className="text-xs text-rose-400 flex items-center gap-1 font-medium">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{inputError}</span>
                </div>
              )}

              {/* Row 2: Playback Controls + Speed + Counter */}
              <div className="flex flex-wrap items-center justify-between gap-2.5 pt-2 border-t border-slate-800/80">
                {/* Transport Buttons */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={resetVisualizer}
                    title="Reset (Key: R)"
                    className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={stepBackward}
                    disabled={currentStepIdx === 0}
                    title="Previous (Key: Left Arrow)"
                    className="px-2.5 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-white font-semibold text-xs border border-slate-700 transition flex items-center gap-1"
                  >
                    <SkipBack className="w-3 h-3" />
                    <span>{lang === 'bn' ? 'আগের' : 'Prev'}</span>
                  </button>
                  <button
                    onClick={() => {
                      if (!isPlaying && currentStepIdx >= steps.length - 1) {
                        setCurrentStepIdx(0);
                      }
                      setIsPlaying(!isPlaying);
                    }}
                    title="Play / Pause (Key: Spacebar)"
                    className="px-3.5 py-1 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold text-xs shadow-md transition flex items-center gap-1.5 min-w-[85px] justify-center"
                  >
                    {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                    <span>{isPlaying ? (lang === 'bn' ? 'থামুন' : 'Pause') : (lang === 'bn' ? 'চালান' : 'Play')}</span>
                  </button>
                  <button
                    onClick={() => {
                      setIsPlaying(false);
                      stepForward();
                    }}
                    disabled={currentStepIdx >= steps.length - 1}
                    title="Next (Key: Right Arrow)"
                    className="px-2.5 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-white font-semibold text-xs border border-slate-700 transition flex items-center gap-1"
                  >
                    <span>{lang === 'bn' ? 'পরের' : 'Next'}</span>
                    <SkipForward className="w-3 h-3" />
                  </button>
                </div>

                {/* Speed buttons & Step Counter */}
                <div className="flex items-center gap-2.5">
                  <div className="flex items-center gap-1 bg-slate-950 p-0.5 rounded-xl border border-slate-800">
                    {[
                      { ms: 1200, label: '0.6x' },
                      { ms: 750, label: '1x' },
                      { ms: 380, label: '2x' }
                    ].map((spd) => (
                      <button
                        key={spd.ms}
                        onClick={() => setSpeedMs(spd.ms)}
                        className={`px-2 py-0.5 text-[10px] font-mono rounded-lg transition ${
                          speedMs === spd.ms
                            ? 'bg-indigo-600 text-white font-bold'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        {spd.label}
                      </button>
                    ))}
                  </div>

                  <div className="font-mono text-xs bg-slate-950 px-2 py-0.5 rounded-xl border border-slate-800 text-slate-300">
                    <strong className="text-white">{currentStepIdx}</strong> / {steps.length - 1}
                  </div>
                </div>

                {/* Timeline Scrubber */}
                <div className="w-full flex items-center gap-2 pt-0.5">
                  <input
                    type="range"
                    min={0}
                    max={steps.length - 1}
                    value={currentStepIdx}
                    onChange={(e) => {
                      setIsPlaying(false);
                      setCurrentStepIdx(Number(e.target.value));
                    }}
                    className="w-full accent-indigo-500 h-1 bg-slate-800 rounded-lg cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* ============================================================ */}
            {/* SIDE-BY-SIDE: NARRATOR (ARRAY READY) + RULES (PASHA-PASHI!)   */}
            {/* ============================================================ */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-stretch">
              {/* Left Box: Array Ready to Sort / Current Step Narrator (7 cols) */}
              <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-3 shadow-md relative overflow-hidden flex flex-col justify-between">
                <div
                  className={`absolute left-0 top-0 bottom-0 w-1 ${
                    currentStep.phase === 'SWAP_IJ' || currentStep.phase === 'SWAP_PIVOT'
                      ? 'bg-amber-500'
                      : currentStep.phase === 'COMPLETED'
                      ? 'bg-emerald-500'
                      : 'bg-indigo-500'
                  }`}
                />
                <div className="flex items-start justify-between gap-2.5">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-md font-bold uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                        {currentStep.phase}
                      </span>
                      <span className="text-xs font-mono text-slate-400">
                        {currentStep.lb !== null ? `Subarray: [${currentStep.lb} .. ${currentStep.ub}]` : 'Done'}
                      </span>
                    </div>
                    <h2 className="text-sm font-bold text-white">
                      {lang === 'bn' ? currentStep.titleBn : currentStep.title}
                    </h2>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {lang === 'bn' ? currentStep.explanationBn : currentStep.explanation}
                    </p>

                    {/* 1-Line Easy Tip */}
                    {(currentStep.tip || currentStep.tipBn) && (
                      <div className="mt-1.5 pt-1.5 border-t border-slate-800/80 flex items-center gap-1.5 text-xs text-amber-300">
                        <Lightbulb className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>{lang === 'bn' ? currentStep.tipBn : currentStep.tip}</span>
                      </div>
                    )}
                  </div>

                  {/* Check / Formula box */}
                  <div className="bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 shrink-0 font-mono text-center self-start">
                    <div className="text-[10px] text-slate-500 uppercase">CHECK</div>
                    <div className="text-xs font-bold text-amber-400">{currentStep.formula}</div>
                  </div>
                </div>
              </div>

              {/* Right Box: The 2 Rules (Side by Side with Narrator!) (5 cols) */}
              <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-3 shadow-md flex flex-col justify-between gap-2">
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded bg-sky-500/20 text-sky-400 font-bold text-xs flex items-center justify-center shrink-0">1</div>
                  <div>
                    <div className="font-mono font-bold text-sky-400 text-xs">
                      Rule 1: If i &lt; j → Swap arr[i] ↔ arr[j]
                    </div>
                    <div className="text-slate-400 text-[11px] mt-0.5 leading-snug">
                      {lang === 'bn' ? 'পয়েন্টার ক্রস করেনি; সংখ্যা দুটি অদলবদল হয়।' : 'Pointers not crossed; swap elements.'}
                    </div>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-950 border border-amber-500/30 flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded bg-amber-500/20 text-amber-400 font-bold text-xs flex items-center justify-center shrink-0">2</div>
                  <div>
                    <div className="font-mono font-bold text-amber-400 text-xs">
                      Rule 2: If i &gt;= j → Swap arr[lb] ↔ arr[j]
                    </div>
                    <div className="text-slate-400 text-[11px] mt-0.5 leading-snug">
                      {lang === 'bn' ? 'পয়েন্টার ক্রস করেছে; Pivot লক হয়ে গেল।' : 'Pointers crossed; Pivot locks at index j.'}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ============================================================ */}
            {/* MAIN 12-COLUMN STAGE & LIVE TRACER                           */}
            {/* ============================================================ */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
              {/* LEFT 7 COLS: ANIMATED BARS CANVAS */}
              <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-3 flex flex-col justify-between min-h-[300px] shadow-md">
                {/* Legend Strip */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-800 text-[11px] font-mono">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded bg-amber-400 inline-block" />
                      <span className="text-slate-300">Pivot</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded bg-emerald-400 inline-block" />
                      <span className="text-slate-300">i (start)</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded bg-rose-500 inline-block" />
                      <span className="text-slate-300">j (end)</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded bg-teal-500 inline-block" />
                      <span className="text-slate-300">Sorted</span>
                    </span>
                  </div>

                  <div className="px-2 py-0.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold">
                    Pivot = {currentStep.pivotVal ?? '-'}
                  </div>
                </div>

                {/* Vertical Bars Stage */}
                <div className="my-auto py-3 flex items-end justify-center gap-2 sm:gap-3 px-1 overflow-x-auto select-none">
                  {currentStep.array.map((value, idx) => {
                    const inActiveSubarray =
                      currentStep.lb !== null &&
                      currentStep.ub !== null &&
                      idx >= currentStep.lb &&
                      idx <= currentStep.ub;
                    const isPivot = idx === currentStep.pivotIdx;
                    const isLockedSorted = currentStep.sortedIndices.includes(idx);
                    const isSwapped = currentStep.swappedIndices.includes(idx);
                    const isPointerI = idx === currentStep.i;
                    const isPointerJ = idx === currentStep.j;

                    const heightPx = Math.max(34, Math.round((value / maxBarValue) * 135));

                    let barClasses = 'bg-slate-800/80 border-slate-700 text-slate-400 opacity-55';
                    if (isLockedSorted && !isPivot) {
                      barClasses = 'bg-gradient-to-t from-teal-600 to-emerald-500 border-emerald-300 text-white shadow-md opacity-100';
                    } else if (isPivot) {
                      barClasses = 'bg-gradient-to-t from-amber-600 to-amber-400 border-amber-200 text-slate-950 font-extrabold shadow-lg opacity-100 ring-2 ring-amber-400/60';
                    } else if (isPointerI && isPointerJ) {
                      barClasses = 'bg-gradient-to-t from-fuchsia-600 to-pink-500 border-pink-200 text-white font-bold shadow-md opacity-100';
                    } else if (isPointerI) {
                      barClasses = 'bg-gradient-to-t from-emerald-600 to-green-400 border-emerald-200 text-slate-950 font-bold shadow-md opacity-100';
                    } else if (isPointerJ) {
                      barClasses = 'bg-gradient-to-t from-rose-600 to-pink-500 border-rose-200 text-white font-bold shadow-md opacity-100';
                    } else if (inActiveSubarray) {
                      barClasses = 'bg-gradient-to-t from-indigo-600 to-indigo-500 border-indigo-400 text-white opacity-100';
                    }

                    return (
                      <div
                        key={idx}
                        className={`flex flex-col items-center min-w-[38px] sm:min-w-[44px] transition-transform duration-300 ${
                          isSwapped ? '-translate-y-2 scale-105' : ''
                        }`}
                      >
                        {/* Top Tag: Pivot, lb, ub */}
                        <div className="h-8 flex flex-col items-center justify-end gap-0.5 mb-1 text-[10px] font-mono">
                          {isPivot && (
                            <span className="px-1 py-0.5 rounded bg-amber-400 text-slate-950 font-extrabold text-[9px] shadow">
                              Pivot
                            </span>
                          )}
                          <div className="flex items-center gap-0.5">
                            {idx === currentStep.lb && (
                              <span className="px-1 rounded bg-sky-500/30 text-sky-300 font-bold text-[9px]">lb</span>
                            )}
                            {idx === currentStep.ub && (
                              <span className="px-1 rounded bg-purple-500/30 text-purple-300 font-bold text-[9px]">ub</span>
                            )}
                          </div>
                        </div>

                        {/* Bar */}
                        <div
                          style={{ height: `${heightPx}px` }}
                          className={`w-8 sm:w-10 rounded-t-xl border-t-2 border-x transition-all duration-300 flex items-start justify-center pt-1 text-xs font-mono font-bold ${barClasses}`}
                        >
                          {value}
                        </div>

                        {/* Index Box */}
                        <div
                          className={`w-8 sm:w-10 py-0.5 border rounded-b-lg text-center font-mono text-[10px] ${
                            inActiveSubarray
                              ? 'bg-slate-950 border-indigo-500/50 text-indigo-300 font-semibold'
                              : 'bg-slate-950 border-slate-800 text-slate-500'
                          }`}
                        >
                          [{idx}]
                        </div>

                        {/* Bottom Pointer Badges */}
                        <div className="h-8 flex flex-col items-center justify-start gap-0.5 mt-1 text-[10px] font-mono font-bold">
                          {isPointerI && (
                            <span className="px-1 py-0.5 rounded bg-emerald-500 text-slate-950 shadow">
                              ↑ i={idx}
                            </span>
                          )}
                          {isPointerJ && (
                            <span className="px-1 py-0.5 rounded bg-rose-500 text-white shadow">
                              ↑ j={idx}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Variable Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 pt-2 border-t border-slate-800 text-xs font-mono">
                  <div className="bg-slate-950 border border-amber-500/30 rounded-xl p-1.5 flex items-center justify-between">
                    <span className="text-amber-400 font-bold text-[11px]">Pivot</span>
                    <span className="text-white font-extrabold">{currentStep.pivotVal ?? '-'}</span>
                  </div>
                  <div className="bg-slate-950 border border-sky-500/30 rounded-xl p-1.5 flex items-center justify-between">
                    <span className="text-sky-400 font-bold text-[11px]">lb</span>
                    <span className="text-white font-extrabold">{currentStep.lb ?? '-'}</span>
                  </div>
                  <div className="bg-slate-950 border border-purple-500/30 rounded-xl p-1.5 flex items-center justify-between">
                    <span className="text-purple-400 font-bold text-[11px]">ub</span>
                    <span className="text-white font-extrabold">{currentStep.ub ?? '-'}</span>
                  </div>
                  <div className="bg-slate-950 border border-emerald-500/30 rounded-xl p-1.5 flex items-center justify-between">
                    <span className="text-emerald-400 font-bold text-[11px]">i</span>
                    <span className="text-white font-extrabold">{currentStep.i ?? '-'}</span>
                  </div>
                  <div className="bg-slate-950 border border-rose-500/30 rounded-xl p-1.5 flex items-center justify-between col-span-2 sm:col-span-1">
                    <span className="text-rose-400 font-bold text-[11px]">j</span>
                    <span className="text-white font-extrabold">{currentStep.j ?? '-'}</span>
                  </div>
                </div>
              </div>

              {/* RIGHT 5 COLS: LIVE SYNCHRONIZED CODE + RECURSION STACK */}
              <div className="lg:col-span-5 flex flex-col gap-3">
                {/* Live Synchronized Code */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-md">
                  <div className="bg-slate-950 px-3 py-1.5 border-b border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <Code2 className="w-3.5 h-3.5 text-indigo-400" />
                      <span className="text-xs font-mono font-bold text-slate-200">
                        {lang === 'bn' ? 'সিঙ্ক্রোনাইজড কোড' : 'Live Code Tracer'}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 bg-slate-900 p-0.5 rounded-lg border border-slate-800 text-[11px] font-mono">
                      {[
                        { id: 'cpp', label: 'C++' },
                        { id: 'python', label: 'Python' }
                      ].map((langItem) => (
                        <button
                          key={langItem.id}
                          onClick={() => setTracerLang(langItem.id)}
                          className={`px-2 py-0.5 rounded transition ${
                            tracerLang === langItem.id
                              ? 'bg-indigo-600 text-white font-bold'
                              : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          {langItem.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="p-2 font-mono text-xs leading-5 overflow-x-auto bg-slate-950/60 select-none max-h-[190px]">
                    {TRACER_CODE[tracerLang].map((item) => {
                      const isActive = item.line === currentStep.codeLine;
                      return (
                        <div
                          key={item.line}
                          className={`px-1.5 py-0.5 rounded flex items-center gap-2 ${
                            isActive
                              ? 'bg-indigo-500/25 border-l-4 border-indigo-400 text-white font-bold'
                              : 'text-slate-400'
                          }`}
                        >
                          <span className="w-4 text-right text-[10px] text-slate-600 select-none">
                            {item.line}
                          </span>
                          <span className="whitespace-pre">{item.text}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Recursion Stack Card */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-2.5 shadow-md flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <h3 className="text-[11px] font-mono uppercase text-slate-400 flex items-center gap-1.5 font-bold">
                        <Layers className="w-3.5 h-3.5 text-indigo-400" />
                        <span>{lang === 'bn' ? 'রিকার্শন স্ট্যাক' : 'Call Stack'}</span>
                      </h3>
                      <div className="flex items-center gap-2 text-xs font-mono">
                        <span className="text-sky-400">{lang === 'bn' ? 'তুলনা: ' : 'Comp: '}<strong>{currentStep.comparisons}</strong></span>
                        <span className="text-amber-400">{lang === 'bn' ? 'Swap: ' : 'Swaps: '}<strong>{currentStep.swaps}</strong></span>
                      </div>
                    </div>

                    <div className="space-y-1 max-h-24 overflow-y-auto font-mono text-xs pr-1">
                      {currentStep.callStack.length === 0 ? (
                        <div className="text-slate-500 italic py-2 text-center bg-slate-950/50 rounded-lg border border-slate-800/60 text-[11px]">
                          {lang === 'bn' ? 'কল স্ট্যাক খালি' : 'Stack empty'}
                        </div>
                      ) : (
                        [...currentStep.callStack].reverse().map((frame, index) => {
                          const isTop = index === 0;
                          return (
                            <div
                              key={`${frame.fn}-${index}`}
                              className={`px-2 py-1 rounded-lg border flex items-center justify-between text-xs ${
                                isTop
                                  ? 'bg-indigo-950/60 border-indigo-500/50 text-indigo-200 font-bold'
                                  : 'bg-slate-950 border-slate-800 text-slate-400'
                              }`}
                            >
                              <span>{frame.fn}</span>
                              {isTop && (
                                <span className="text-[9px] bg-indigo-500/30 text-indigo-300 px-1 py-0.5 rounded">
                                  Active
                                </span>
                              )}
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>

                  <div className="mt-2 pt-1.5 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                    <span>Keys: Space / ← / → / R</span>
                    <button
                      onClick={() => setActiveTab('code')}
                      className="text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1"
                    >
                      <span>{lang === 'bn' ? 'কোড দেখুন' : 'View Code'}</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================================================================ */}
        {/* TAB 2: ZERO-TO-HERO GUIDE & QUIZ                                 */}
        {/* ================================================================ */}
        {activeTab === 'lesson' && (
          <div className="space-y-4">
            {/* 4 Simple Steps */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-md space-y-3">
              <h2 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-indigo-400" />
                <span>{lang === 'bn' ? '৪টি সহজ ধাপে কুইক সর্ট বুঝুন' : 'Understand Quick Sort in 4 Easy Steps'}</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-xs">
                <div className="p-3 rounded-xl bg-slate-950 border border-amber-500/30 space-y-1">
                  <div className="font-bold text-amber-400">{lang === 'bn' ? '১. পিভট (Pivot) ধরা' : '1. Pick Pivot'}</div>
                  <p className="text-slate-300 leading-relaxed">
                    {lang === 'bn' ? 'অ্যারের প্রথম সংখ্যা arr[lb]-কে পিভট হিসেবে বেছে নেওয়া হয়।' : 'First element arr[lb] is picked as Pivot.'}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-emerald-500/30 space-y-1">
                  <div className="font-bold text-emerald-400">{lang === 'bn' ? '২. পয়েন্টার চালানো' : '2. Scan Pointers'}</div>
                  <p className="text-slate-300 leading-relaxed">
                    {lang === 'bn' ? 'i ডানে যায় বড় সংখ্যা খুঁজতে, j বামে আসে ছোট সংখ্যা খুঁজতে।' : 'i moves right for > pivot, j moves left for <= pivot.'}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-sky-500/30 space-y-1">
                  <div className="font-bold text-sky-400">{lang === 'bn' ? '৩. অদলবদল (Swap)' : '3. Swap'}</div>
                  <p className="text-slate-300 leading-relaxed">
                    {lang === 'bn' ? 'i < j হলে arr[i] ও arr[j] অদলবদল হয়।' : 'If i < j, swap arr[i] and arr[j].'}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-purple-500/30 space-y-1">
                  <div className="font-bold text-purple-400">{lang === 'bn' ? '৪. পিভট লক' : '4. Lock Pivot'}</div>
                  <p className="text-slate-300 leading-relaxed">
                    {lang === 'bn' ? 'i >= j হলে পিভট-কে arr[j]-এর সাথে swap করে লক করা হয়।' : 'When i >= j, swap Pivot with arr[j] to lock it.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Time & Space Complexity */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3.5 shadow-md">
              <h3 className="text-xs sm:text-sm font-bold text-white mb-2">
                {lang === 'bn' ? 'টাইম ও স্পেস কমপ্লেক্সিটি' : 'Time & Space Complexity'}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
                <div className="p-2 bg-slate-950 border border-slate-800 rounded-xl">
                  <div className="text-slate-400 text-[10px]">Best Case</div>
                  <div className="text-emerald-400 font-bold text-sm">O(n log n)</div>
                </div>
                <div className="p-2 bg-slate-950 border border-slate-800 rounded-xl">
                  <div className="text-slate-400 text-[10px]">Average Case</div>
                  <div className="text-sky-400 font-bold text-sm">O(n log n)</div>
                </div>
                <div className="p-2 bg-slate-950 border border-slate-800 rounded-xl">
                  <div className="text-slate-400 text-[10px]">Worst Case</div>
                  <div className="text-rose-400 font-bold text-sm">O(n²)</div>
                </div>
                <div className="p-2 bg-slate-950 border border-slate-800 rounded-xl">
                  <div className="text-slate-400 text-[10px]">Space</div>
                  <div className="text-purple-400 font-bold text-sm">O(log n)</div>
                </div>
              </div>
            </div>

            {/* Interactive Quiz */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-md space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-emerald-400" />
                  <span>{lang === 'bn' ? 'ইন্টারঅ্যাক্টিভ কুইজ' : 'Interactive Quiz'}</span>
                </h3>
                <span className="text-xs font-mono text-indigo-400 font-bold">
                  Score: {QUIZ_QUESTIONS.filter((q) => quizAnswers[q.id] === q.correctIndex).length} / {QUIZ_QUESTIONS.length}
                </span>
              </div>

              <div className="space-y-2.5">
                {QUIZ_QUESTIONS.map((q, qIdx) => {
                  const selected = quizAnswers[q.id];
                  const isAnswered = selected !== undefined;
                  const isCorrect = selected === q.correctIndex;
                  const questionText = lang === 'bn' ? q.questionBn : q.question;
                  const optionsList = lang === 'bn' ? q.optionsBn : q.options;
                  const explanationText = lang === 'bn' ? q.explanationBn : q.explanation;

                  return (
                    <div key={q.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                      <div className="text-xs font-semibold text-white">Q{qIdx + 1}. {questionText}</div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                        {optionsList.map((opt, oIdx) => {
                          let btnStyle = 'bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-300';
                          if (isAnswered) {
                            if (oIdx === q.correctIndex) {
                              btnStyle = 'bg-emerald-950/60 border-emerald-500/60 text-emerald-200 font-semibold';
                            } else if (oIdx === selected) {
                              btnStyle = 'bg-rose-950/60 border-rose-500/60 text-rose-200';
                            }
                          }
                          return (
                            <button
                              key={oIdx}
                              onClick={() => setQuizAnswers((prev) => ({ ...prev, [q.id]: oIdx }))}
                              className={`text-left text-xs px-2.5 py-1.5 rounded-lg border transition flex items-center justify-between ${btnStyle}`}
                            >
                              <span>{opt}</span>
                              {isAnswered && oIdx === q.correctIndex && (
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                      {isAnswered && (
                        <div className={`text-xs p-1.5 rounded-lg ${isCorrect ? 'bg-emerald-500/10 text-emerald-300' : 'bg-amber-500/10 text-amber-300'}`}>
                          {explanationText}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ================================================================ */}
        {/* TAB 3: CODE IMPLEMENTATIONS (C++, PYTHON, C#, JAVA, C, JS)       */}
        {/* ================================================================ */}
        {activeTab === 'code' && (
          <div className="space-y-3">
            {/* Top Language Switcher Bar */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-2.5 sm:p-3 flex flex-wrap items-center justify-between gap-2.5 shadow-md">
              <div className="flex items-center gap-2">
                <FolderCode className="w-4 h-4 text-emerald-400" />
                <span className="text-xs sm:text-sm font-bold text-white">
                  {lang === 'bn' ? 'প্রোগ্রামিং ল্যাঙ্গুয়েজ নির্বাচন করুন:' : 'Select Programming Language:'}
                </span>
              </div>

              {/* Language Pills */}
              <div className="flex flex-wrap items-center gap-1.5">
                {[
                  { id: 'cpp', label: 'C++' },
                  { id: 'python', label: 'Python' },
                  { id: 'csharp', label: 'C#' },
                  { id: 'java', label: 'Java' },
                  { id: 'c', label: 'C' },
                  { id: 'js', label: 'JavaScript' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedCodeLang(item.id)}
                    className={`px-3 py-1 rounded-xl text-xs font-bold font-mono transition ${
                      selectedCodeLang === item.id
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'bg-slate-950 text-slate-300 border border-slate-800 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Code Display Card with Header & Copy Button */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg">
              <div className="bg-slate-950 px-3.5 py-2 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2 font-mono text-xs font-bold text-emerald-400">
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {FULL_LANGUAGE_CODES[selectedCodeLang].name}
                  </span>
                  <span className="text-slate-300">{FULL_LANGUAGE_CODES[selectedCodeLang].file}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-slate-500 hidden sm:inline">
                    Run: {FULL_LANGUAGE_CODES[selectedCodeLang].runCmd}
                  </span>
                  <button
                    onClick={() => handleCopyCode(FULL_LANGUAGE_CODES[selectedCodeLang].code)}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-mono flex items-center gap-1 transition"
                  >
                    {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCode ? (lang === 'bn' ? 'কপি হয়েছে' : 'Copied') : (lang === 'bn' ? 'কপি' : 'Copy')}</span>
                  </button>
                </div>
              </div>

              {/* Formatted Code Block */}
              <pre className="p-3.5 text-xs font-mono text-slate-200 overflow-x-auto leading-relaxed bg-[#050811] max-h-[500px]">
                <code>{FULL_LANGUAGE_CODES[selectedCodeLang].code}</code>
              </pre>
            </div>
          </div>
        )}
      </main>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-3 right-3 z-50 bg-slate-900 border border-indigo-500/50 text-white px-3 py-1.5 rounded-xl shadow-lg flex items-center gap-2 text-xs font-medium">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
