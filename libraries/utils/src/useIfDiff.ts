import useDiff from './useDiff';

const useIfDiff = (value: any, callback: { (): void }) => {
  if (useDiff(value)) {
    callback();
  }
};

export default useIfDiff;
