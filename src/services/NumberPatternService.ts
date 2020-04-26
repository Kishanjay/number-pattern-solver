import { last } from 'lodash';
import * as math from 'mathjs';

type PatternType = 'initial' | 'addition' | 'multiplication';

export interface Pattern {
  type: PatternType;
  pattern: number[];
  delta?: Pattern;
}

function generateFibbonachiSequence(n: number): number[] {
  if (n === 0) {
    return [];
  }
  if (n === 1) {
    return [1];
  }
  if (n === 2) {
    return [1, 1];
  }
  return [...generateFibbonachiSequence(n - 1), n];
}


export default {
  stringToPattern(patternStr: string) {
    return patternStr.split(',')
      .map((i: string) => {
        try {
          return math.evaluate(i);
        } catch (e) {
          return null;
        }
      })
      .filter((i: string | null) => i);
  },

  getAdditionDeltas(patternArr: number[]) {
    return patternArr.reduce((result, cur, index, arr) => {
      if (arr.length <= index + 1) {
        return result;
      }
      result.push(arr[index + 1] - cur);
      return result;
    }, [] as number[]);
  },

  getMultiplicationDeltas(patternArr: number[]) {
    return patternArr.reduce((result, cur, index, arr) => {
      if (arr.length <= index + 1) {
        return result;
      }
      result.push(arr[index + 1] / cur);
      return result;
    }, [] as number[]);
  },

  hasPattern(patternArr: number[]) {
    // All numbers of the array are equal
    const equalPatternFound = patternArr.every((val, _i, arr) => val === arr[0]);
    if (equalPatternFound) {
      return true;
    }

    // The numbers of the array are in line with fibbonachi
    // TODO fix fibbonachi numbers
    const fibSequence = generateFibbonachiSequence(patternArr.length);
    const fibbonachiPatternFound = patternArr.every(
      (_val, index) => patternArr[index] === fibSequence[index],
    );
    if (fibbonachiPatternFound) {
      return true;
    }

    return false;
  },

  solve(patternArr: number[], depth = 0, type: PatternType = 'initial'): Pattern | undefined {
    if (depth > 10 || patternArr.length <= 1) {
      return undefined;
    }
    const pattern: Pattern = {
      type,
      pattern: patternArr,
    };
    if (this.hasPattern(patternArr)) {
      return pattern;
    }

    pattern.delta = this.solve(this.getAdditionDeltas(patternArr), depth + 1, 'addition');
    if (pattern.delta) {
      return pattern;
    }

    pattern.delta = this.solve(this.getMultiplicationDeltas(patternArr), depth + 1, 'multiplication');
    if (pattern.delta) {
      return pattern;
    }

    return undefined;
  },


  predictNext(pattern: Pattern): number {
    const getPrediction = (curPattern: Pattern): number => {
      if (!curPattern.delta) {
        return last(curPattern.pattern) || 0;
      }

      const curDeltaPrediction = getPrediction(curPattern.delta);
      const curValue = last(curPattern.pattern) || 0;

      if (curPattern.delta.type === 'addition') {
        return curValue + curDeltaPrediction;
      }
      if (curPattern.delta.type === 'multiplication') {
        return curValue * curDeltaPrediction;
      }

      return 0;
    };

    const prediction = getPrediction(pattern);
    return prediction;
  },
};
